class Adherent {

  constructor(idAdherent, nomAdherent) {
    this.idAdherent = idAdherent;
    this.nomAdherent = nomAdherent;
    this.livreEmprunte = [];

  }

  ajouterLivre(livre){
    this.livreEmprunte.push(livre);
  }

  enleverLivre(livre){
    this.livreEmprunte.remove(livre);
  }

  ajouterListe() {
    let li = document.createElement("li");
    li.id = this.idAdherent;
    li.innerHTML = this.idAdherent + " - " + this.nomAdherent;
    document.getElementById("listeAdherents").appendChild(li);

    if(this.livreEmprunte.length != 0) {
      li.innerHTML += " (" + this.livreEmprunte.length + " livres empruntés)";
    }
  }

  sauvegarder() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/save.php?table=adherent&nomAdherent=" + this.nomAdherent, true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      alert("L'adhérent a bien été ajouté !");
      location.reload();
    });
  }
}
