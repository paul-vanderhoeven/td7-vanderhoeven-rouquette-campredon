class Livre {
  constructor(idLivre, titreLivre) {
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
  }

  afficherListe() {
    let li = document.createElement("li");
    li.id = this.idLivre;
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    document.getElementById("listeLivresDisponibles").appendChild(li);
  }

  preter(Adherent) {
    // TO DO
  }
}
