import {ConnectionMessageEvent} from "./incoming/ConnectionMessageEvent";
import {Global} from "../global";

export class MessageManager {

    constructor() {
        this.incoming = {};
        this.loadIncoming();
        this.loadOutgoing();
    }

    loadIncoming() {
        this.connectionMessageEvent = 1;
        this.incoming[this.connectionMessageEvent] = new ConnectionMessageEvent();
    }

    loadOutgoing() {
        MessageManager.connectionMessageComposer = 1;
    }

    receiveIncoming(msg) {
        msg = JSON.parse(msg);

        let id = msg["id"];
        if(id !== null) {

            if(this.incoming.hasOwnProperty(id)) {
                let incoming = this.incoming[id];
                incoming.message(Global.joueur, msg);
            } else {
                console.log("oups le paquet incoming " + id + " n'existe pas");
            }
        }
    }
}