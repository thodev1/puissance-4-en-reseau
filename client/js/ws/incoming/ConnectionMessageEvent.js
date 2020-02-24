import {IncomingManager} from "./IncomingManager.js";

export class ConnectionMessageEvent extends IncomingManager {

    message(joueur, msg) {

        console.log("msg reçu:" + msg["msg"]);

    }
}