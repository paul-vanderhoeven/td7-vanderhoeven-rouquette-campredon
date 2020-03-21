class LivreDisponible {

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

  static afficherListeComplete() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/requeteLivresDispos.php", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      let livreArray = JSON.parse(xhr.responseText);
      for (var livre in livreArray) {
        let a = new LivreDisponible(livreArray[livre].idLivre, livreArray[livre].titreLivre);
        a.afficherListe();
      }
    });
  }

  /*setMaxId() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/getMaxId.php?table=livre", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      let max = JSON.parse(xhr.responseText)["max"];
      LivreDisponible.maxId = max;
    });
  }*/


  sauvegarder() {
    // TO DO
  }

  preter(Adherent) {
    // TO DO
  }
}
