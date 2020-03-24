class Livre {

  constructor(idLivre, titreLivre, emprunteur) {
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
    this.idAdherent = emprunteur;
  }

  afficherListe(id) {
    let li = document.createElement("li");
    li.id = this.idLivre;
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    document.getElementById(id).appendChild(li);
  }

  sauvegarder() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=livre&titreLivre=" + this.titreLivre, true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      alert("Votre livre a été sauvegardé !");
      location.reload();
    })
  }

  sauvegarderEmprunt(adherent) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=emprunt&idLivre=" + this.idLivre + "&idAdherent=" + adherent.idAdherent, true);
    xhr.send(null);

    this.idAdherent = adherent.idAdherent;

    xhr.addEventListener("load", function() {
      alert("Le livre a été emprunté !");
      location.reload();
    })
  }

  removeEmprunt() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/deleteEmprunteur.php?idAdherent=" + this.idAdherent + "&idLivre=" + this.idLivre + ";", true);
    xhr.send(null);

    this.idAdherent = null;

    xhr.addEventListener("load", function() {
      alert("Le livre a été rendu !");
      location.reload();
    })
  }
}
