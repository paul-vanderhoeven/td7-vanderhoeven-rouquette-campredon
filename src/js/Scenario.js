let livres = []

Adherent.afficherListeComplete();
Livre.afficherListeLivresEmpruntes();

setupLivres();

funtion setupLivres() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresDispos.php", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {

  });
}

function setupLivresCallback() {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let a = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
    livres.push(a);
    a.afficherListe("listeLivresDisponibles");
  }
}
