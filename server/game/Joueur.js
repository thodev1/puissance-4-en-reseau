export class Joueur {

    constructor(ws) {
        this.ws = ws;
        this.id = this.ws.id;
        this.pseudo = null;
        this.salon = null;
        this.remove = false;
    }

    send(id, msg) {

        //si le joueur n'est pas en train d'être supprimé alors on peut continuer à lui envoyer des msg
        if(!this.remove) {
            msg["id"] = id;
            let json = JSON.stringify(msg);
            this.ws.send(json);
        }
    }
}