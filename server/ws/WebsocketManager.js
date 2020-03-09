import WebSocket from 'ws';
import {MessageManager} from "./MessageManager";
import {Joueur} from "../game/Joueur";
import {Utils} from "../Utils";
import {Jeu} from "../game/Jeu";

export class WebsocketManager {

    constructor() {
        this.wss = new WebSocket.Server({ port: 8100 });
        this.message = new MessageManager();
        this.init();
    }

   /*Lance la connexion websocket*/
    init() {

        let self = this;

        this.wss.on('connection', function connection(ws) {

            ws.id = Utils.getUniqueID();

            Jeu.entity.joueurs[ws.id] = new Joueur(ws);

            console.log("connexion du client n°" + ws.id);

            ws.on('close', function() {

                if(Jeu.entity.joueurs.hasOwnProperty(ws.id)) {
                    console.log("déconnexion du client n°" + ws.id);
                    Jeu.entity.deleteJoueur(Jeu.entity.joueurs[ws.id]);
                }
            });

            ws.on('message', function incoming(message) {

                if(Jeu.entity.joueurs.hasOwnProperty(ws.id)) {
                    self.message.receiveIncoming(Jeu.entity.joueurs[ws.id], message);
                }
            });
        });
    }
}

//node --es-module-specifier-resolution=node global.js