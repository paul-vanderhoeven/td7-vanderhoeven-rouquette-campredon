class Livre {

  constructor(idLivre, titreLivre) {
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
    this.emprunteur = null;
  }

  afficherListe(id) {
    let li = document.createElement("li");
    li.id = this.idLivre;
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    document.getElementById(id).appendChild(li);
  }

  static afficherListeLivresDispos() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/requeteLivresDispos.php", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      let livreArray = JSON.parse(xhr.responseText);
      for (var livre in livreArray) {
        let a = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
        a.afficherListe("listeLivresDisponibles");
      }
    });
  }

  static afficherListeLivresEmpruntes() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/requeteLivresEmpruntes.php", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      let livreArray = JSON.parse(xhr.responseText);
      for (var livre in livreArray) {
        let a = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
        a.afficherListe("listeLivresEmpruntes");
      }
    });
  }

  setEmprunteur(a) {
    this.emprunteur = a;
  }

  sauvegarder() {
    // TO DO
  }

  preter(Adherent) {
    // TO DO
  }
}
