import {IncomingManager} from "./IncomingManager";

export class JoueSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("position") && joueur.salon !== null) {
            let position = msg["position"];
            joueur.salon.jouer(joueur,position);
        }
    }
}