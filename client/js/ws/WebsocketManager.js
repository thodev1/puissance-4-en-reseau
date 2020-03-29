import {MessageManager} from "./MessageManager";
import {Global} from "../global";
import {Joueur} from "../game/Joueur";
import {Boostrap} from "../game/Boostrap";
import {Partie} from "../game/Partie";

export class WebsocketManager {

    constructor() {
        this.load();
        this.message = new MessageManager();
    }

    load()  {
        let self = this;

        function restartWS() {
            self.load();


            document.getElementById("AlertModalButton").removeEventListener("click", restartWS);
        }

        try {
            let ws = new WebSocket("ws://localhost:8100");

            ws.onerror= function(msg){
                Boostrap.createAlert("Désolés, nous n'arrivons pas à te connecter au serveur");
                document.getElementById("AlertModalButton").addEventListener("click", restartWS);
            };

            ws.onopen = function (event) {
                Global.joueur = new Joueur(ws);
                Global.partie = new Partie();

                //on affiche l'alerte d'authentification
                $('#ConnexionModal').modal('show');

                ws.onmessage = function (msg) {
                    self.message.receiveIncoming(msg.data);
                };

                ws.onclose = function (msg) {
                    Boostrap.createAlert("Désolés, tu viens d'être déconnecté du serveur");
                    Partie.quitPartie();

                    function restartWS() {
                        self.load();
                        document.getElementById("AlertModalButton").removeEventListener("click", restartWS);
                    }

                    document.getElementById("AlertModalButton").addEventListener("click", restartWS);
                };
            };

        } catch(e) {
            Boostrap.createAlert("Désolés, nous n'arrivons pas à te connecter au serveur");
            document.getElementById("AlertModalButton").addEventListener("click", restartWS);
        }
    }
}