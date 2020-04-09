import {IncomingManager} from "./IncomingManager";
import {Global} from "../../global";

export class EndPartieMessageEvent extends IncomingManager {

    message(joueur, msg) {
        Global.partie.refuseJouer();
    }
}