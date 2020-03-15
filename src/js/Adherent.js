class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
  }

  ajouterListe() {
    let li = document.createElement("li");
    li.innerHTML = idAdherent + " - " + this.nomAdherent;
    document.getElementById("listeAdherents").appendChild(li);
  }

  sauvegarder() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=adherent&nomAdherent=" + this.nomAdherent, true);
    xhr.send(null);

    let xhr2 = new XMLHttpRequest();
    xhr.open("GET", "php/select.php?table=adherent&nomAdherent=" + this.nomAdherent, true)
  }

  details() {
    // Ouvre une fenetre avec la liste des emprunts
    // TO DO
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
