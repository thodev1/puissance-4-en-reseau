import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";

export class AuthentificationPseudoErreurMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("error")) {

            let modal = document.getElementById("authentificationModal");
            Boostrap.removeAlert(modal);
            let alert;

            if(msg["error"] === 1) {
                 alert = Boostrap.alert("danger", "Ton pseudo doit comporter au moins 1 caractère et au maximum 20 caractères.");
            } else {
                 alert = Boostrap.alert("danger", "Ce pseudo est déjà utilisé, merci d'en saisir un autre.");
            }

            modal.prepend(alert);
        }
    }
}