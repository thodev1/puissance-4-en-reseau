import {WebsocketManager} from "../ws/WebsocketManager";

export class Jeu {

    constructor() {
        //liste des joueurs connecté au WS
        this.joueurs = {};

        //nb joueur
        //Object.keys(WebsocketManager.ws.joueurs).length

        //liste des parties ouvertes
        this.parties = {};
    }

    existPseudo(pseudo) {

        let result = false;

        for (let key in this.joueurs) {

            if(this.joueurs.hasOwnProperty(key)) {

                if(pseudo === this.joueurs[key].pseudo) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    existPartie(nom) {

        let result = false;

        for (let key in this.parties) {

            if(this.parties.hasOwnProperty(key)) {

                if(nom === this.parties[key].nom) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    //méthode quand un joueur se déconnecte du websocket
    deleteJoueur(joueur) {

        if(this.joueurs.hasOwnProperty(joueur.id)) {

            joueur.remove = true;

            //si le joueur qui se déconnecte est présent dans un salon
            if(joueur.salon !== null) {
                joueur.salon.removeJoueur(joueur);
            }

            delete this.joueurs[joueur.id];
        }
    }

    listSalon() {
        let salons = [];

        for (let key in this.parties) {

            if(this.parties.hasOwnProperty(key)) {
                let salon = this.parties[key];
                salons.push({id:salon.id,name:salon.nom,nbJoueurs:salon.nbJoueurs(),maxJoueurs:salon.maxJoueurs,ownerName:salon.ownerName});
            }
        }

        return salons;
    }
}