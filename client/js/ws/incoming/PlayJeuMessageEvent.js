import {IncomingManager} from "./IncomingManager";
import {Global} from "../../global";

export class PlayJeuMessageEvent extends IncomingManager {

    message(joueur, msg) {
        Global.partie.autoriseJouer();
    }
}