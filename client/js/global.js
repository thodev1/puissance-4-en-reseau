import {WebsocketManager} from "./ws/WebsocketManager";
import {Evenements} from "./game/Evenements";

export class Global {

    constructor() {
        this.init();
    }

    init() {
        Global.joueur = null;
        Global.ws = new WebsocketManager();

        //Permet de charger les événements du projet
        new Evenements();
    }

    static isConnect () {
        return Global.joueur !== null;
    }

    static isAuthentifie () {
        return Global.isConnect() && Global.joueur.pseudo !== null;
    }
}