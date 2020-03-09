import {IncomingManager} from "./IncomingManager.js";

export class UpdateJoueurMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("joueurs")) {

            document.getElementById("page_accueil").style.display = "none";
            document.getElementById("page_jeu").style.display = "";

            //Cas si il y a que un joueur en ligne
            if(msg["joueurs"][1] === undefined) {

                msg["joueurs"][1] = [];

                msg["joueurs"][1]["name"] = "En attente d'un joueur...";
                msg["joueurs"][1]["jetons"] = 21;
            }

            let joueur1 = document.getElementById("jeu_joueur1");

            joueur1.children[0].innerText = msg["joueurs"][0]["name"];
            joueur1.children[1].innerText =  msg["joueurs"][0]["jetons"] + " jeton" + (msg["joueurs"][0]["jetons"] > 1 ? "s" : "") + " restant" + (msg["joueurs"][0]["jetons"] > 1 ? "s" : "");

            let joueur2 = document.getElementById("jeu_joueur2");

            joueur2.children[0].innerText = msg["joueurs"][1]["name"];
            joueur2.children[1].innerText = msg["joueurs"][1]["jetons"] + " jeton" + (msg["joueurs"][1]["jetons"] > 1 ? "s" : "") + " restant" + (msg["joueurs"][1]["jetons"] > 1 ? "s" : "");
        }
    }
}