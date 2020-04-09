import {Global} from "../global";
import {MessageManager} from "../ws/MessageManager";

export class Evenements {

    constructor() {
        this.loadAuthentification();
        this.loadAddSalon();
        this.loadquitSalon();
        this.loadJoueSalon();
    }

    //Event pour authentification
    loadAuthentification() {

        document.getElementById("authentificationButton").addEventListener("click", function(e) {

            if(Global.isConnect()) {
                let input = document.getElementById("authentificationPseudo");
                let pseudo = input.value;

                Global.joueur.send(MessageManager.authentificationPseudoMessageComposer, {pseudo:pseudo});

                input.value = "";
            }

            e.preventDefault();
        });

        document.getElementById("ConnexionModal").addEventListener("click", function(e) {
           e.stopImmediatePropagation();
        });
    }

    //Event pour créer un salon
    loadAddSalon() {
        document.getElementById("addSalonButton").addEventListener("click", function(e) {

            if(Global.isAuthentifie()) {
                let input = document.getElementById("addSalonNom");
                let nom = input.value;
                Global.joueur.send(MessageManager.addSalonMessageComposer, {nom:nom});

                input.value = "";
            }

            e.preventDefault();
        });
    }

    //Event pour quitter un salon
    loadquitSalon() {
        document.getElementById("quitPartie").addEventListener("click", function(e) {

            if(Global.isAuthentifie()) {
                Global.joueur.send(MessageManager.quitSalonMessageComposer, {});
            }

            e.preventDefault();
        });
    }

    //Event pour jouer un jeton
    loadJoueSalon() {
        document.getElementById("jouePartie").addEventListener("click", function(e) {

           Global.partie.joue(5);
            e.preventDefault();
        });
    }
}