import {Boostrap} from "./Boostrap";
import {Global} from "../global";
import {MessageManager} from "../ws/MessageManager";

export class Partie {

    constructor() {
        this.joueur1 = document.getElementById("jeu_joueur1");
        this.joueur2 = document.getElementById("jeu_joueur2");
        this.indicateurs = document.querySelector(".indicateurs");
    }

    init() {
        let self = this;
        this.indicateursDom = [];

        this.indicateurs.innerText = "";
        for(let a = 0; a < 7; a++) {

            let indicateur = Boostrap.createIndicateur(a);
            indicateur.addEventListener("click", function() {
                self.joue(a);
            });

            this.indicateursDom.push(indicateur);
            this.indicateurs.append(indicateur);
        }

        this.plateauDom = document.createElement("div");
        this.indicateurs.append( this.plateauDom);

        let imgPlateau = document.createElement("img");
        imgPlateau.src= "images/plateau.png";
        imgPlateau.alt = "plateau de jeu";
        imgPlateau.classList.add("plateau","ml-n4");
        this.plateauDom.append(imgPlateau);

        this.jetonsj = [];
        this.jetonsr = [];

        this.tour = false;
        this.plateauPlaces = [6,6,6,6,6,6,6];
    }

    create(nb_jj, nb_jr) {
        this.init();

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

        this.updateNbJetons(0);
        this.updateNbJetons(1);
    }

    placeJetons(index,position,placement) {
        const pos = "a" + position + placement;
        if(index === 0){
            this.plateauDom.insertAdjacentHTML("afterbegin", '<div class="'+ pos +' mt-n5">\n' +
                '                        <img class="jeton jc1" src="images/jetonJ.png"  alt="un jeton">\n' +
                '                    </div>');
        } else{
            this.plateauDom.insertAdjacentHTML("afterbegin", '<div class="'+ pos +' mt-n5">\n' +
                '                        <img class="jeton jc1" src="images/jetonR.png"  alt="un jeton">\n' +
                '                    </div>');
        }

        this.plateauPlaces[position] = this.plateauPlaces[position]-1;
        this.removeJeton(index);
    }

    joue(position) {
        if(this.in_salon && this.tour && this.plateauPlaces[position] > 0) {
            Global.joueur.send(MessageManager.joueSalonMessageComposer, {position:position});
            this.refuseJouer();
        }
    }

   removeJeton(joueurType) {
        let joueurRef = this.getRefForJoueurType(joueurType);

        let unJetons = joueurRef[1][joueurRef[1].length-1];
        unJetons.remove();//supprime un jeton du plateau
       joueurRef[1].splice(joueurRef[1].length-1,1);//supprime un jeton du tableau des jetons du plateau

       //affiche nb de jetons restant au joueur
       this.updateNbJetons(joueurType);
   }

   updateNbJetons(joueurType) {
       let joueurRef = this.getRefForJoueurType(joueurType);
       joueurRef[0].children[1].innerText =  joueurRef[1].length + " jeton" + (joueurRef[1].length > 1 ? "s" : "") + " restant" + (joueurRef[1].length > 1 ? "s" : "");
   }

    getRefForJoueurType(joueurType) {

        let result = null;
        let result1 = null;

        if(joueurType === 0) {
            result = this.joueur1;
            result1 = this.jetonsj;
        } else {
            result = this.joueur2;
            result1 = this.jetonsr;
        }

        return [result,result1];
    }

    quitPartie() {
        this.in_salon = false;
        document.getElementById("page_accueil").style.display = "";
        document.getElementById("page_jeu").style.display = "none";
    }

     joinPartie() {
         this.in_salon = true;
        document.getElementById("page_accueil").style.display = "none";
        document.getElementById("page_jeu").style.display = "";
    }

    autoriseJouer() {
        //activer effet pour joueur
        for(let a = 0; a < this.indicateursDom.length; a++) {

            if(this.plateauPlaces[a] > 0) {
                this.indicateursDom[a].style.visibility = "";
            }
        }
        this.tour = true;
    }

    refuseJouer() {
        //retire effet pour joueur
        for(let a = 0; a < this.indicateursDom.length; a++) {
            this.indicateursDom[a].style.visibility = "hidden";
        }

        this.tour = false;
    }
}