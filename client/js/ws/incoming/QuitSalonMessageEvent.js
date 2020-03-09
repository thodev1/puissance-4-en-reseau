import {IncomingManager} from "./IncomingManager";
import {Partie} from "../../game/Partie";

export class QuitSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {
        Partie.quitPartie();
    }
}