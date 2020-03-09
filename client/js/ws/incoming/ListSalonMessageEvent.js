import {IncomingManager} from "./IncomingManager.js";
import {Boostrap} from "../../game/Boostrap";
import {Global} from "../../global";
import {MessageManager} from "../MessageManager";

export class ListSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {

        if(msg.hasOwnProperty("salons")) {

            let salons = msg["salons"];
            let listSalonDiv = document.getElementById("listSalon");
            listSalonDiv.innerText = "";
            let row = null;

            for(let i = 0; i < salons.length; i++) {

                let salon = salons[i];

                if(i % 4 === 0) {
                    row = Boostrap.createRowHtml();
                    listSalonDiv.append(row);
                }

                let html = Boostrap.createSalonModelHtml(salon["name"],salon["ownerName"],salon["nbJoueurs"],salon["maxJoueurs"]);
                html.addEventListener("click", function () {
                    //paquet rejoins salon
                    Global.joueur.send(MessageManager.jointSalonMessageComposer, {salon_id:salon["id"]});
                });

                row.append(html);
            }
        }
    }
}