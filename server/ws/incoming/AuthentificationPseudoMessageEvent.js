import {IncomingManager} from "./IncomingManager.js";
import {WebsocketManager} from "../WebsocketManager";
import {MessageManager} from "../MessageManager";
import {Jeu} from "../../game/Jeu";

export class AuthentificationPseudoMessageEvent extends IncomingManager {

    message(joueur, msg) {

        //on charge un pseudo seulement si le joueur en a pas encore
        if(msg.hasOwnProperty("pseudo") && joueur.pseudo === null) {

            let pseudo = msg["pseudo"].trim();

            if(pseudo.length <= 20 && pseudo.length > 0) {

                //si le pseudo saisi existe pas déjà
                if(!Jeu.entity.existPseudo(pseudo)) {

                    joueur.pseudo = pseudo;
                    joueur.send(MessageManager.authentificationPseudoOkMessageComposer, {pseudo:pseudo});
                    joueur.send(MessageManager.listSalonMessageComposer, {salons:Jeu.entity.listSalon()});

                } else {
                    joueur.send(MessageManager.authentificationPseudoErreurMessageComposer, {error:2});
                }

            } else {
                joueur.send(MessageManager.authentificationPseudoErreurMessageComposer, {error:1});
            }
        }
    }
}