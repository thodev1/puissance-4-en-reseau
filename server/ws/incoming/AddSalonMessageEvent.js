import {IncomingManager} from "./IncomingManager";
import {Jeu} from "../../game/Jeu";
import {MessageManager} from "../MessageManager";
import {Partie} from "../../game/Partie";
import {Utils} from "../../Utils";

export class AddSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {

        //uniquement un joueur authentifié peut créer un salon
        if(msg.hasOwnProperty("nom") && joueur.pseudo !== null) {

           let nom = msg["nom"].trim();

            if(nom.length <= 20 && nom.length > 0) {

                //si le nom du salon saisi existe pas déjà
                if(!Jeu.entity.existPartie(nom)) {

                    let id = Utils.getUniqueID();

                    //créer l'objet partie
                    Jeu.entity.parties[id] = new Partie(id,nom,joueur.pseudo);

                    //ajoute le joueur créateur dans la partie
                    Jeu.entity.parties[id].addJoueur(joueur);

                    joueur.send(MessageManager.addSalonOkMessageComposer, {salon_name:nom});

                } else {
                    joueur.send(MessageManager.addSalonErreurMessageComposer, {error:2});
                }

            } else {
                joueur.send(MessageManager.addSalonErreurMessageComposer, {error:1});
            }
        }
    }
}