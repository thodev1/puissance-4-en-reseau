import {WebsocketManager} from "./ws/WebsocketManager";

export class Global {

    constructor() {
        this.init();
    }

    init() {
        Global.joueur = null;
        Global.ws = new WebsocketManager();
    }
}