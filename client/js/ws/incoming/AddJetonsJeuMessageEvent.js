import {IncomingManager} from "./IncomingManager";
import {Global} from "../../global";

export class AddJetonsJeuMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(Global.partie.in_salon) {
            let index = msg["index"];
            let position = msg["position"];
            let placement = msg["placement"];
            Global.partie.placeJetons(index,position,placement);
        }
    }
}