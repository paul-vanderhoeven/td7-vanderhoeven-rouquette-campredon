class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
    // tableau des livres empruntés
    this.livreEmprunte = [];

  }

  ajouterLivre(livre){
    this.livreEmprunte.push(livre);
  }

  enleverLivre(livre){
    this.livreEmprunte.remove(livre);
  }

  // afficher l'adherent dans le HTML
  ajouterListe() {
    let li = document.createElement("li");
    li.id = this.idAdherent;
    li.innerHTML = this.idAdherent + " - " + this.nomAdherent;
    document.getElementById("listeAdherents").appendChild(li);

    // afficher le nombre de livres empruntés
    if(this.livreEmprunte.length != 0) {
      li.innerHTML += " (" + this.livreEmprunte.length + " livres empruntés)";
    }
  }

  // sauvegarder dans la base de données
  sauvegarder() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=adherent&nomAdherent=" + this.nomAdherent, true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      // popup + recharger la page
      alert("L'adhérent a bien été ajouté !");
      location.reload();
    });
  }
}
