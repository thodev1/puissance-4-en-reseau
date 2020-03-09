import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";

export class AddSalonOkMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("salon_name")) {
            joueur.salon = true;

            //permet de fermer la fenetre
            Boostrap.closeAlert("SalonModal");
        }
    }
}