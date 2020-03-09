import {Jeu} from "./Jeu";
import {MessageManager} from "../ws/MessageManager";

export class Partie {

    constructor(id, nom, ownerName) {
        this.id = id;
        this.nom = nom;
        this.joueurs = {};
        this.maxJoueurs = 2;
        this.ownerName = ownerName;
    }

    nbJoueurs() {
        return Object.keys(this.joueurs).length;
    }

    addJoueur(joueur) {

        //si le joueur est déjà dans un salon le retire
        if(joueur.salon !== null) {
            joueur.salon.removeJoueur(joueur);
        }

        //on ajoute le joueur dans la liste des joueurs du salon auquel il vient d'arrivé
        //si il est déjà ici on l'ajoute pas une deuxième fois
        if(!this.joueurs.hasOwnProperty(joueur.id)) {
            this.joueurs[joueur.id] = joueur;
        }

        //on note le nouveau salon du joueur
        joueur.salon = this;

        joueur.send(MessageManager.jointSalonMessageComposer, {});
        this.send(MessageManager.updateJoueurMessageComposer, {joueurs:this.lesJoueurs()});

        //si la partie est à présente complète on lance le lancement du jeu ici
        if(this.nbJoueurs() === this.maxJoueurs) {
            //lancement du jeu
        }
    }

    removeJoueur(joueur) {

        //si le joueur est présent dans la liste des joueurs du salon on le retire
        if(this.joueurs.hasOwnProperty(joueur.id)) {
            delete this.joueurs[joueur.id];
        }

        //on retire l'objet salon
        joueur.salon = null;
        joueur.send(MessageManager.quitSalonMessageComposer, {});

        //Si il y'a plus aucun joueur dans le salon on le supprime
        if(this.nbJoueurs() < 1) {
            this.deletePartie();
        } else {
            //cas ou il reste un joueur dans le salon alors on le remet le salon à 0
            this.send(MessageManager.alertMessageComposer, {message:"Le joueur " + joueur.pseudo + " vient de quitter la partie. Celle-ci est annulée."});
            this.send(MessageManager.jointSalonMessageComposer, {});
            this.send(MessageManager.updateJoueurMessageComposer, {joueurs:this.lesJoueurs()});
        }
    }

    //supprime l'objet Partie
    deletePartie() {
        if(Jeu.entity.parties.hasOwnProperty(this.id)) {
            delete Jeu.entity.parties[this.id];
        }
    }

    send(id, msg) {
        for (let key in this.joueurs) {

            if(this.joueurs.hasOwnProperty(key)) {
                this.joueurs[key].send(id, msg);
            }
        }
    }

    lesJoueurs() {
        let lesJoueurs = [];
        for (let key in this.joueurs) {

            if(this.joueurs.hasOwnProperty(key)) {
                let joueur = this.joueurs[key];
                lesJoueurs.push({name:joueur.pseudo,jetons:21});
            }
        }

        return lesJoueurs;
    }
}