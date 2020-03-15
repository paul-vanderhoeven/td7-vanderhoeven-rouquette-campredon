class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
  }

  ajouterListe() {
    let li = document.createElement("li");
    li.innerHTML = this.nomAdherent;
    document.getElementById("listeAdherents").appendChild(li);
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
