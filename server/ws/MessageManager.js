import {AuthentificationPseudoMessageEvent} from "./incoming/AuthentificationPseudoMessageEvent";
import {AddSalonMessageEvent} from "./incoming/AddSalonMessageEvent";
import {JointSalonMessageEvent} from "./incoming/JointSalonMessageEvent";
import {QuitSalonMessageEvent} from "./incoming/QuitSalonMessageEvent";

export class MessageManager {

    constructor() {
        this.incoming = {};
        this.loadIncoming();
        this.loadOutgoing();
    }

    loadIncoming() {
        this.incoming[1] = new AuthentificationPseudoMessageEvent();
        this.incoming[2] = new AddSalonMessageEvent();
        this.incoming[3] = new JointSalonMessageEvent();
        this.incoming[4] = new QuitSalonMessageEvent();
    }

    loadOutgoing() {
        MessageManager.authentificationPseudoOkMessageComposer = 1;
        MessageManager.authentificationPseudoErreurMessageComposer = 2;
        MessageManager.addSalonOkMessageComposer = 3;
        MessageManager.addSalonErreurMessageComposer = 4;
        MessageManager.listSalonMessageComposer = 5;
        MessageManager.jointSalonMessageComposer = 6;
        MessageManager.alertMessageComposer = 7;
        MessageManager.updateJoueurMessageComposer = 8;
        MessageManager.quitSalonMessageComposer = 9;
    }

    receiveIncoming(joueur, msg) {
        msg = JSON.parse(msg);

        let id = msg["id"];
        if(id !== null) {

            if(this.incoming.hasOwnProperty(id)) {
                let incoming = this.incoming[id];
                incoming.message(joueur, msg);

                console.log("reçu paquet [" + id + "]");

            } else {
                console.log("oups le paquet " + id + " existe pas");
            }
        }
    }
}