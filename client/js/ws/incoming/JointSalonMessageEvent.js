import {IncomingManager} from "./IncomingManager.js";

export class JointSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {
        document.getElementById("page_accueil").style.display = "none";
        document.getElementById("page_jeu").style.display = "";
    }
}