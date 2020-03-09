import {IncomingManager} from "./IncomingManager";
import {Jeu} from "../../game/Jeu";
import {MessageManager} from "../MessageManager";

export class JointSalonMessageEvent extends IncomingManager {

    message(joueur, msg) {

        //uniquement un joueur authentifié peut rejoindre un salon
        if(msg.hasOwnProperty("id") && joueur.pseudo !== null) {

            //Si la partie existe
            if(Jeu.entity.parties.hasOwnProperty(msg["salon_id"])) {

                let partie = Jeu.entity.parties[msg["salon_id"]];

                if(partie.maxJoueurs > partie.nbJoueurs()) {
                    partie.addJoueur(joueur);
                } else {
                    joueur.send(MessageManager.alertMessageComposer, {message:"Désolé ce salon est complet"});
                    joueur.send(MessageManager.listSalonMessageComposer, {salons:Jeu.entity.listSalon()});
                }

            } else {
                joueur.send(MessageManager.alertMessageComposer, {message:"Désolé ce salon n'est plus disponible"});
                joueur.send(MessageManager.listSalonMessageComposer, {salons:Jeu.entity.listSalon()});
            }
        }
    }
}