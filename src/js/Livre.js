class Livre {

  constructor(idLivre, titreLivre, emprunteur) {    // Constructeur de la classe Livre
    this.idLivre = idLivre;
    this.titreLivre = titreLivre;
    this.idAdherent = emprunteur;
  }

  afficherListe(id) {                               // Affiche les livres dans la médiatèques disposibles comme empruntés
    let li = document.createElement("li");
    li.id = this.idLivre;
    li.innerHTML = this.idLivre + " - " + this.titreLivre;
    li.style.cursor = "grab";
    document.getElementById(id).appendChild(li);
  }

  sauvegarder() {                                   // Sauvegarde un livre qui est ajouté dans la Base de données puis recharge la page pour pouvoir l'afficher
    let xhr = new XMLHttpRequest();                 // grâce à la fonction afficherListe qui est apppelé au début du chargement de la page dans la partie livre disponibles
    xhr.open("GET", "php/save.php?table=livre&titreLivre=" + this.titreLivre, true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      alert("Votre livre a été sauvegardé !");      // affiche une popup pour indiquer que le livre a était sauvegarder dans la bdd
      location.reload();
    })
  }

  sauvegarderEmprunt(adherent) {                    // Enregistre l'emprunt qui est ajouté dans la Base de données puis recharge la page pour pouvoir l'afficher
    let xhr = new XMLHttpRequest();                 // grâce à la fonction afficherListe qui est apppelé au début du chargement de la page dans la parties emprunt
    xhr.open("GET", "php/save.php?table=emprunt&idLivre=" + this.idLivre + "&idAdherent=" + adherent.idAdherent, true);
    xhr.send(null);

    this.idAdherent = adherent.idAdherent;

    xhr.addEventListener("load", function() {
      alert("Le livre a été emprunté !");           // affiche une popup pour indiquer que le livre a était emprunté et que l'emprunt est enregistrer dans la bdd
      location.reload();
    })
  }

  removeEmprunt() {                                 // Enlève l'emprunt du livre et le rend disponible.
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/deleteEmprunteur.php?idAdherent=" + this.idAdherent + "&idLivre=" + this.idLivre + ";", true);
    xhr.send(null);

    this.idAdherent = null;

    xhr.addEventListener("load", function() {
      alert("Le livre a été rendu !");            // affiche une popup pour indiquer que le livre n'est plus emprunté et que cela a été enregistrer dans la bdd
      location.reload();
    })
  }
}
