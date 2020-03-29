import {Boostrap} from "./Boostrap";

export class Partie {

    constructor() {
        this.jetonsj = [];
        this.jetonsr = [];

        this.joueur1 = document.getElementById("jeu_joueur1");
        this.joueur2 = document.getElementById("jeu_joueur2");
    }

    create(nb_jj, nb_jr) {

        let listjj = document.getElementById("list_jj");
        let listjr = document.getElementById("list_jr");

        listjj.innerText = "";
        listjr.innerText = "";

        let col = null;

        for(let i = 0; i < nb_jj; i++) {

            if(i % 7 === 0) {
                col = Boostrap.createCol("2");
                listjj.append(col);
            }

            let jetonsJ = Boostrap.createJetons("jetonJ");

            col.prepend(jetonsJ);

            this.jetonsj.push(jetonsJ);
        }

        let col2 = null;

        for(let i = 0; i < nb_jr; i++) {

            if(i % 7 === 0) {
                col2 = Boostrap.createCol("2");
                listjr.append(col2);
            }

            let jetonsR = Boostrap.createJetons("jetonR");
            col2.append(jetonsR);

            this.jetonsr.push(jetonsR);
        }
    }

   removeJeton(joueurType) {
        let joueurRef = this.getRefForJoueurType(joueurType);
        delete joueurRef[0];

        joueurRef[0].children[1].innerText =  joueurRef[1].length + " jeton" + (joueurRef[1].length > 1 ? "s" : "") + " restant" + (joueurRef[1].length > 1 ? "s" : "");
   }

    getRefForJoueurType(joueurType) {

        let result = null;
        let result1 = null;

        if(joueurType === "1") {
            result = this.joueur1;
            result1 = this.jetonsj;
        } else {
            result = this.joueur2;
            result1 = this.jetonsr;
        }

        return [result,result1];
    }

    quitPartie() {
        document.getElementById("page_accueil").style.display = "";
        document.getElementById("page_jeu").style.display = "none";
    }

     joinPartie() {
        document.getElementById("page_accueil").style.display = "none";
        document.getElementById("page_jeu").style.display = "";
    }
}