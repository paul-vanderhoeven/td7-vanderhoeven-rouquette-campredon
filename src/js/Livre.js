class Livre {
  constructor(idLivre, titreLivre) {
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
  }

  afficherListe() {
    let li = document.createElement("li");
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    document.getElementById("listeLivresDisponibles").appendChild(li);
  }

  preter(Adherent) {
    // TO DO
  }
}

let l = new Livre(26, "a");
l.afficherListe();