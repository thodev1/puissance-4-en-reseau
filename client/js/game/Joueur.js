import {MessageManager} from "../ws/MessageManager";

export class Joueur {

    constructor(ws) {
        this.ws = ws;
        this.pseudo = null;

      // this.send(MessageManager.connectionMessageComposer, {msg:"mdr lol"});
    }

    send(id, msg) {
        msg["id"] = id;
        let json = JSON.stringify(msg);
        this.ws.send(json);
    }
}