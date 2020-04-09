import {AuthentificationPseudoOkMessageEvent} from "./incoming/AuthentificationPseudoOkMessageEvent";
import {AuthentificationPseudoErreurMessageEvent} from "./incoming/AuthentificationPseudoErreurMessageEvent";
import {Global} from "../global";
import {AddSalonOkMessageEvent} from "./incoming/AddSalonOkMessageEvent";
import {AddSalonErreurMessageEvent} from "./incoming/AddSalonErreurMessageEvent";
import {ListSalonMessageEvent} from "./incoming/ListSalonMessageEvent";
import {JointSalonMessageEvent} from "./incoming/JointSalonMessageEvent";
import {AlertMessageEvent} from "./incoming/AlertMessageEvent";
import {UpdateJoueurMessageEvent} from "./incoming/UpdateJoueurMessageEvent";
import {QuitSalonMessageEvent} from "./incoming/QuitSalonMessageEvent";
import {PlayJeuMessageEvent} from "./incoming/PlayJeuMessageEvent";
import {AddJetonsJeuMessageEvent} from "./incoming/AddJetonsJeuMessageEvent";
import {EndPartieMessageEvent} from "./incoming/EndPartieMessageEvent";

export class MessageManager {

    constructor() {
        this.incoming = {};
        this.loadIncoming();
        this.loadOutgoing();
    }

    loadIncoming() {
        this.incoming[1] = new AuthentificationPseudoOkMessageEvent();
        this.incoming[2] = new AuthentificationPseudoErreurMessageEvent();
        this.incoming[3] = new AddSalonOkMessageEvent();
        this.incoming[4] = new AddSalonErreurMessageEvent();
        this.incoming[5] = new ListSalonMessageEvent();
        this.incoming[6] = new JointSalonMessageEvent();
        this.incoming[7] = new AlertMessageEvent();
        this.incoming[8] = new UpdateJoueurMessageEvent();
        this.incoming[9] = new QuitSalonMessageEvent();
        this.incoming[10] = new PlayJeuMessageEvent();
        this.incoming[11] = new AddJetonsJeuMessageEvent();
        this.incoming[12] = new EndPartieMessageEvent();
    }

    loadOutgoing() {
        MessageManager.authentificationPseudoMessageComposer = 1;
        MessageManager.addSalonMessageComposer = 2;
        MessageManager.jointSalonMessageComposer = 3;
        MessageManager.quitSalonMessageComposer = 4;
        MessageManager.joueSalonMessageComposer = 5;
    }

    receiveIncoming(msg) {
        msg = JSON.parse(msg);

        let id = msg["id"];
        if(id !== null) {

            if(this.incoming.hasOwnProperty(id)) {
                let incoming = this.incoming[id];
                incoming.message(Global.joueur, msg);
                console.log("reçu paquet [" + id + "]");

            } else {
                console.log("oups le paquet incoming " + id + " n'existe pas");
            }
        }
    }
}