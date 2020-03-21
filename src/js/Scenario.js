function loadAdherent() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/selectAll.php?table=adherent", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    let adherentArray = JSON.parse(xhr.responseText);
    for (var adherent in adherentArray) {
      let a = new Adherent(adherentArray[adherent].idAdherent, adherentArray[adherent].nomAdherent);
      a.ajouterListe();
    }
  });
}


function loadLivresDispos() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresDispos.php?", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    let livreArray = JSON.parse(xhr.responseText);
    for (var livre in livreArray) {
      console.log(livreArray[livre]);
      let a = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
      a.afficherListe();
    }
  });
}

loadAdherent();
loadLivresDispos();
