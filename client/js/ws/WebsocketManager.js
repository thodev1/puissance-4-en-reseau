import {MessageManager} from "./MessageManager";
import {Global} from "../global";
import {Joueur} from "../game/Joueur";

export class WebsocketManager {

    constructor() {
        this.load();
        this.message = new MessageManager();
    }

    load()  {
        let self = this;

        let ws = new WebSocket("ws://localhost:8100");

        ws.onopen = function (event) {
            Global.joueur = new Joueur(ws);

            ws.onmessage = function (msg) {
                self.message.receiveIncoming(msg.data);
            };

            console.log("WS ok!");
        };
    }
}