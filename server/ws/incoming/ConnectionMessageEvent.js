import {IncomingManager} from "./IncomingManager.js";
import {WebsocketManager} from "../WebsocketManager";
import {MessageManager} from "../MessageManager";

export class ConnectionMessageEvent extends IncomingManager {

    message(joueur, msg) {


        if(msg.hasOwnProperty("pseudo")) {

            let pseudo = msg["pseudo"].trim();

            if(pseudo.length <= 20 && pseudo.length > 0) {

                joueur.pseudo = pseudo;
                joueur.send(MessageManager.connectionOkMessageComposer, {});

            } else {
                joueur.send(MessageManager.connectionErreurMessageComposer, {});
            }
        }
    }
}