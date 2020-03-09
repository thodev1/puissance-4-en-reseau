import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";

export class AuthentificationPseudoOkMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("pseudo")) {
            joueur.pseudo = msg["pseudo"];

            //permet de fermer la fenetre
            Boostrap.closeAlert("ConnexionModal");
        }
    }
}