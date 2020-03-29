import {IncomingManager} from "./IncomingManager";
import {Partie} from "../../game/Partie";
import {Global} from "../../global";

export class QuitSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {
        Global.partie.quitPartie();
    }
}