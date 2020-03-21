class LivreEmprunte {
  constructor(idLivre, titreLivre) {
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
  }

  afficherListe() {
    let li = document.createElement("li");
    li.id = this.idLivre;
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    document.getElementById("listeLivresEmpruntes").appendChild(li);
  }

  static afficherListeComplete() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/requeteLivresEmpruntes.php", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      let livreArray = JSON.parse(xhr.responseText);
      for (var livre in livreArray) {
        let a = new LivreEmprunte(livreArray[livre].idLivre, livreArray[livre].titreLivre);
        a.afficherListe();
      }
    });
  }
  preter(Adherent) {
    // TO DO
  }
}
