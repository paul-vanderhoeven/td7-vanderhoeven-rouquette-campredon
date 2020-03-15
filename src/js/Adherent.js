class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
  }

  ajouterListe() {
    let li = document.createElement("li");
    li.id = this.idAdherent;
    li.innerHTML = this.idAdherent + " - " + this.nomAdherent;
    document.getElementById("listeAdherents").appendChild(li);
  }

  sauvegarder() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=adherent&nomAdherent=" + this.nomAdherent, true);
    xhr.send(null);
  }


  details(event) {
    if(event.target.className === 'adh'){
      let idAdherent = event.target.id;

      let xhr = new XMLHttpRequest();
      xhr.open("GET", "php/requeteEmprunt.php?idAdherent=" + idAdherent, true);
      xhr.send(null);

      let nomAdh = requeteAjaxNom(idAdherent);

      alert(nomAdh);


    }
  }

  emprunter(idLivre) {
    // TO DO
  }

  supprimerEmprunt(idLivre) {
    // TO DO
  }
}

let a = new Adherent(null, "Polo");
a.sauvegarder();

function requeteAjaxNom(id){
  let url = "php/select.php?id=" + id + "&table=adherent&primary=idAdherent";
  let requete = new XMLHttpRequest();
  requete.open("GET",url,true);
  requete.addEventListener("load",function(){
    callbackNom(requete);
  });
  requete.send(null);
}

function callbackNom(requete){
  let xhr = JSON.parse(requete.responseText);
  return xhr.nomAdherent;
}