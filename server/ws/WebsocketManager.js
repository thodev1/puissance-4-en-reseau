import WebSocket from 'ws';
import {MessageManager} from "./MessageManager";
import {Joueur} from "../game/Joueur";
import {Utils} from "../Utils";

export class WebsocketManager {

    constructor() {
        this.wss = new WebSocket.Server({ port: 8100 });
        this.message = new MessageManager();

        //liste des joueurs connecté au WS
        this.joueurs = {};

        //nb joueur
        //Object.keys(WebsocketManager.ws.joueurs).length

        //liste des parties ouvertes
        this.parties = {};

       // Joueur.nb = 0;
        this.init();
    }

   /*Lance la connexion websocket*/
    init() {

        let self = this;

        this.wss.on('connection', function connection(ws) {

            ws.id = Utils.getUniqueID();

            self.joueurs[ws.id] = new Joueur(ws);
          //  self.joueurs[ws.id].test();

            console.log("connexion du client n°" + ws.id);

            ws.on('close', function() {

                if(self.joueurs.hasOwnProperty(ws.id)) {
                    console.log("déconnexion du client n°" + ws.id);
                    delete self.joueurs[ws.id];
                }
            });

            ws.on('message', function incoming(message) {

                if(self.joueurs.hasOwnProperty(ws.id)) {
                    self.message.receiveIncoming(self.joueurs[ws.id], message);
                }
            });
        });
    }
}

//node --es-module-specifier-resolution=node global.js