import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";

export class AddSalonErreurMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("error")) {

            let modal = document.getElementById("addSalonModal");
            Boostrap.removeAlert(modal);
            let alert;

            if(msg["error"] === 1) {
                alert = Boostrap.alert("danger", "Le nom de ton salon doit comporter au moins 1 caractère et au maximum 20 caractères.");
            } else {
                alert = Boostrap.alert("danger", "Ce nom de salon est déjà utilisé, merci d'en saisir un autre.");
            }

            modal.prepend(alert);
        }
    }
}