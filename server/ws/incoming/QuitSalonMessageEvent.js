import {IncomingManager} from "./IncomingManager";
import {MessageManager} from "../MessageManager";
import {Jeu} from "../../game/Jeu";
export class QuitSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(joueur.pseudo !== null && joueur.salon !== null) {
            joueur.salon.removeJoueur(joueur);
            joueur.send(MessageManager.listSalonMessageComposer, {salons:Jeu.entity.listSalon()});
        }
    }
}