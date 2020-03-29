import {IncomingManager} from "./IncomingManager.js";
import {Partie} from "../../game/Partie";
import {Global} from "../../global";

export class JointSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {
       Global.partie.joinPartie();
       Global.partie.create(21, 21);
    }
}