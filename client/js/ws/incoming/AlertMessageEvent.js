import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";

export class AlertMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("message")) {
            Boostrap.createAlert(msg["message"]);
        }
    }
}