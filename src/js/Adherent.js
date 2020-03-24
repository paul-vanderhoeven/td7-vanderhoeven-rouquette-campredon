class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
    this.livreEmprunte = [];

  }

  ajouterLivre(livre){
    this.livreEmprunte.push(livre);
  }

  enleverLivre(livre){
    this.livreEmprunte.remove(livre);
  }

//   ajouterListe() {
//     let li = document.createElement("li");
//     li.id = this.idAdherent;
//     li.innerHTML = this.idAdherent + " - " + this.nomAdherent;
//     document.getElementById("listeAdherents").appendChild(li);
//   }

//   static afficherListeComplete() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "php/selectAll.php?table=adherent", true);
//     xhr.send(null);

//     xhr.addEventListener("load", function() {
//       let adherentArray = JSON.parse(xhr.responseText);
//       for (var adherent in adherentArray) {
//         let a = new Adherent(adherentArray[adherent].idAdherent, adherentArray[adherent].nomAdherent);
//         a.ajouterListe();
//       }
//     });
//   }

//   sauvegarder() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "php/save.php?table=adherent&nomAdherent=" + this.nomAdherent, true);
//     xhr.send(null);
//   }


//   details(event) {
//     if(event.target.className === 'adh'){
//       let idAdherent = event.target.id;

//       let xhr = new XMLHttpRequest();
//       xhr.open("GET", "php/requeteEmprunt.php?idAdherent=" + idAdherent, true);
//       xhr.send(null);

//       let nomAdh = requeteAjaxNom(idAdherent);

//       alert(nomAdh);


//     }
//   }

//   emprunter(idLivre) {
//     // TO DO
//   }

//   supprimerEmprunt(idLivre) {
//     // TO DO
//   }
}

// function requeteAjaxNom(id){
//   let url = "php/select.php?id=" + id + "&table=adherent&primary=idAdherent";
//   let requete = new XMLHttpRequest();
//   requete.open("GET",url,true);
//   requete.addEventListener("load",function(){
//     callbackNom(requete);
//   });
//   requete.send(null);
// }

// function callbackNom(requete){
//   let xhr = JSON.parse(requete.responseText);
//   return xhr.nomAdherent;
// }
