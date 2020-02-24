import {ConnectionMessageEvent} from "./incoming/ConnectionMessageEvent.js";

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
       // MessageManager.connectionMessageComposer = 1;
        MessageManager.connectionOkMessageComposer = 2;
        MessageManager.connectionErreurMessageComposer = 3;
    }

    receiveIncoming(joueur, msg) {
        msg = JSON.parse(msg);

        let id = msg["id"];
        if(id !== null) {

            if(this.incoming.hasOwnProperty(id)) {
                let incoming = this.incoming[id];
                incoming.message(joueur, msg);
            } else {
                console.log("oups le paquet " + id + " existe pas");
            }
        }
    }
}