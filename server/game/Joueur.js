import {MessageManager} from "../ws/MessageManager";
import {WebsocketManager} from "../ws/WebsocketManager";


export class Joueur {

    constructor(ws) {
        this.ws = ws;
        this.id = this.ws.id;
        this.pseudo = null;
    }

    test() {

        for (let key in WebsocketManager.ws.joueurs) {

            if(WebsocketManager.ws.joueurs.hasOwnProperty(key)) {
                WebsocketManager.ws.joueurs[key].send(MessageManager.connectionMessageComposer, {msg:"hello"});
            }
        }
    }

    send(id, msg) {
        msg["id"] = id;
        let json = JSON.stringify(msg);
        this.ws.send(json);
    }
}