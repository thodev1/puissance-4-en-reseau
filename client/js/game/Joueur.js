import {MessageManager} from "../ws/MessageManager";

export class Joueur {

    constructor(ws) {
        this.ws = ws;
        this.pseudo = null;
        this.salon = false; //si joueur est dans un salon
    }

    send(id, msg) {
        msg["id"] = id;
        let json = JSON.stringify(msg);
        this.ws.send(json);
    }
}