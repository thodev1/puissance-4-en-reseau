export class Boostrap {

    static alert(type,msg) {
        //<div class="alert alert-danger" role="alert">Une alerte avec <a href="#" class="alert-link">un lien</a>.</div>
        let div = document.createElement("div");
        div.classList.add("alert");
        div.classList.add("alert-" + type);
        div.innerHTML = msg;

        return div;
    }

    static removeAlert(parent) {

        for(let a = 0; a < parent.children.length; a++) {

            if(parent.children[a].classList.contains("alert")) {
                parent.children[a].remove();
            }
        }
    }

    static createSalonModelHtml(name,owner,nb,max) {

        // <div class="col-3">
        //                     <div class="card partie">
        //                         <div class="card-body">
        //                             <h3 class="card-title text-center ml-n1">Partie de David Gemell</h3>
        //                         </div>
        //                         <p class="nbjoueur text-right mr-3">1/2</p>
        //                     </div>
        //                 </div>

        let p = document.createElement("p");
        p.classList.add("nbjoueur","text-right","mr-3");
        p.innerText = nb + " / " + max;

        let spanOwner = document.createElement("p");
        spanOwner.innerText = "Partie de " + owner;

        let spanName = document.createElement("p");
        spanName.innerText = name;

        let title = document.createElement("h3");
        title.classList.add("card-title","text-center","ml-n1");
        title.append(spanOwner);
        title.append(spanName);

        let divBody = document.createElement("div");
        divBody.classList.add("card-body");
        divBody.append(title);

        let divPartie = document.createElement("div");
        divPartie.classList.add("card", "partie");
        divPartie.append(divBody);
        divPartie.append(p);

        let div = document.createElement("div");
        div.classList.add("col-3");
        div.append(divPartie);

        return div;
    }

    static createRowHtml() {
        //<div class="row mb-4">

        let div = document.createElement("div");
        div.classList.add("row", "mb-4");

        return div;
    }

    static closeAlert(id) {
        $('#' + id).modal('hide');
    }

    static createAlert(msg) {
        document.getElementById("AlertModalBody").innerText = msg;
        $('#AlertModal').modal('show');
    }
}