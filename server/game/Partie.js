import {Jeu} from "./Jeu";
import {MessageManager} from "../ws/MessageManager";

export class Partie {

    constructor(id, nom, ownerName) {
        this.id = id;
        this.nom = nom;
        this.ownerName = ownerName;

        this.maxJoueurs = 2;
        this.joueurs = [];//tableau des joueurs présents dans le salon
        this.start = false;
        this.tour = null;
        this.init();//permet de charger le plateau
    }

    init() {
        this.nbTours = 0;
        this.plateau = [[-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1]];
    }

    nbJoueurs() {
        return this.joueurs.length;
    }

    addJoueur(joueur) {

        //si le joueur est déjà dans un salon le retire
        if(joueur.salon !== null) {
            joueur.salon.removeJoueur(joueur);
        }

        //on ajoute le joueur dans la liste des joueurs du salon auquel il vient d'arrivé
        //si il est déjà ici on l'ajoute pas une deuxième fois
        if(!this.joueurs.includes(joueur)) {
            this.joueurs.push(joueur);
        }

        //on note le nouveau salon du joueur
        joueur.salon = this;

        joueur.send(MessageManager.jointSalonMessageComposer, {});
        this.send(MessageManager.updateJoueurMessageComposer, {joueurs:this.lesJoueurs()});

        //si la partie est à présente complète on lance le lancement du jeu ici
        this.lancer(true);
    }

    lancer(random) {
        if(this.nbJoueurs() === this.maxJoueurs) {
            this.start = true;

            if(random) {
                this.tour = this.joueurs[Math.round(Math.random())]; //random O ou 1
                this.tour.send(MessageManager.playJeuMessageComposer, {});//annonce à ce joueur que c'est lui qui commence la partie
            } else {
                this.tourSuivant();
            }

            this.send(MessageManager.alertMessageComposer, {message:"La partie commence ! C'est le joueur " + this.tour.pseudo + " qui vient d'être sélectionné pour commencer à jouer."});
        }
    }

    jouer(joueur,position) {

        let placement = null;
        let index = this.joueurs.indexOf(joueur);
        //verifie que c'est bien au tour du joueur de jouer
        //ce cas devrait jamais se produire, mais vos mieux vérifier en cas de trucage
        if(joueur === this.tour) {
            //ce cas devrait jamais se produire, mais vos mieux vérifier en cas de trucage
            if(position >= 0 && position <= 6) {

                //on parcours le plateau du bas vers le haut pour trouver la place libre
                for(let a = this.plateau.length-1; a >= 0; a--) {

                    let ligne = this.plateau[a][position];

                    //-1 signifie que la place est libre
                    if(ligne === -1) {
                        //on remplace la place -1 par le numéro d'index du joueur
                        this.plateau[a][position] = index;
                        placement = a;
                        break;
                    }
                }
            }

            //cas si aucun placement libre trouvé (ce cas devrait jamais arriver vu que coté client c'est bloqué)
            //mais bon en cas de trucage vos mieux faire une vérif côté serveur également
            if(placement !== null) {
                this.nbTours++;
                this.send(MessageManager.addJetonsJeuMessageComposer, {index:index,position:position,placement:placement});//annonce le placement du jetons à tous

                //fin de partie car match nul
                if(this.nbTours === 42) {
                    this.send(MessageManager.alertMessageComposer, {message:"La partie est terminée ! Il s'agit d'un match nul ! Une nouvelle partie va se lancer automatiquement dans 10 secondes."});
                    this.relance();
                    //sinon on check si la partie est gagnée selon les règles du puissance 4
                } else if(this.checkWin(position,placement,index)) {
                    this.send(MessageManager.alertMessageComposer, {message:"La partie est terminée ! C'est le joueur " + this.tour.pseudo + " qui remporte la partie. Une nouvelle partie va se lancer automatiquement dans 10 secondes."});
                    this.relance();
                } else {
                    this.tourSuivant();
                }
            }
        }
    }

    relance() {
        this.start = false;
        this.send(MessageManager.endPartieMessageComposer, {});
        this.init();

        //D'ici 10 sec une nouvelle partie se lancer !
        let self = this;
        setTimeout(function () {
            self.send(MessageManager.jointSalonMessageComposer, {});
            self.lancer(false);
        }, 10000);
    }

    //Methode pour vérifier si le joueur à gagner une partie
    //cette méthode comporte plusieurs plusieurs type de position à vérifier (les 8 positions autour du pion)
    check(type,placement,position,index) {

        let nb = 0;
        while(placement >= 0 && placement <= 5 && position >= 0 && position <= 6 && this.plateau[placement][position] === index) {

            switch (type) {
                case 1:
                    position++;
                    break;
                case 2:
                    position--;
                    break;
                case 3:
                    placement++;
                    break;
                case 4:
                    placement--;
                    break;
                case 5:
                    placement--;
                    position--;
                    break;
                case 6:
                    placement++;
                    position++;
                    break;
                case 7:
                    placement--;
                    position++;
                    break;
                case 8:
                    placement++;
                    position--;
                    break;
            }

            nb++;
        }

        return nb;
    }

    checkWin(position,placement,index) {
        let result = false;

       //verification des 8 cas possibles
        for(let i = 1; i <= 7; i = i+2) {

            let check = this.check(i, placement,position,index) + this.check((i+1), placement,position,index);

           // console.log("check " + i + " et " + (i+1) + " result: " + check);

            if(check >= 5) {
                result = true;
                break;
            }
        }

        return result;
    }

    //cette méthode permet de choisir le joueur suivant à partir de son index
    tourSuivant() {

        let index =  this.joueurs.indexOf(this.tour);
        if(index === 0) {
            index = 1;
        } else {
            index = 0;
        }

        this.tour = this.joueurs[index];
        this.tour.send(MessageManager.playJeuMessageComposer, {});
    }

    removeJoueur(joueur) {

        //si le joueur est présent dans la liste des joueurs du salon on le retire
        if(this.joueurs.includes(joueur)) {
            this.joueurs.splice(this.joueurs.indexOf(joueur),1);
        }

        //on retire l'objet salon
        joueur.salon = null;
        joueur.send(MessageManager.quitSalonMessageComposer, {});

        //Si il y'a plus aucun joueur dans le salon on le supprime
        if(this.nbJoueurs() < 1) {
            this.deletePartie();
        } else {
            //cas ou il reste un joueur dans le salon alors on le remet le salon à 0
            if(this.start) {
                this.send(MessageManager.alertMessageComposer, {message:"Le joueur " + joueur.pseudo + " vient de quitter la partie. Celle-ci est annulée."});
                this.send(MessageManager.jointSalonMessageComposer, {});
                this.start = false;
            }

            this.send(MessageManager.updateJoueurMessageComposer, {joueurs:this.lesJoueurs()});

            //on recharge le plateau
            this.init();
        }
    }

    //supprime l'objet Partie
    deletePartie() {
        if(Jeu.entity.parties.hasOwnProperty(this.id)) {
            delete Jeu.entity.parties[this.id];
        }
    }

    send(id, msg) {

        for (let i = 0; i < this.joueurs.length; i++) {
            this.joueurs[i].send(id, msg);
        }
    }

    lesJoueurs() {
        let lesJoueurs = [];

        for (let i = 0; i < this.joueurs.length; i++) {
            let joueur = this.joueurs[i];
            lesJoueurs.push({name:joueur.pseudo,jetons:21});
        }

        return lesJoueurs;
    }
}