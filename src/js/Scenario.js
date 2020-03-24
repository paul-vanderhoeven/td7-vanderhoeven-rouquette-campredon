let livres = [];
let livresDispos = [];
let livresEmpruntees = [];
let adherents = [];

setupLivres();
setupLivresDispos();
setupAdherent();

function setupLivres() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/selectAll.php?table=livre", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    setupListeLivresCallback(xhr);
  });
}

function setupLivresDispos() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresDispos.php", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    setupLivresDisposCallback(xhr, "listeLivresDisponibles", livresDispos);
  });
}

function setupLivresEmprunt() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresEmpruntes.php", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    setupLivresEmpruntCallback(xhr, "listeLivresEmpruntes", livresEmpruntees);

    for (var adherent in adherents) {
      adherents[adherent].ajouterListe();
    }
  });
}

function setupAdherent() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/selectAll.php?table=adherent", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      setupAdherentCallback(xhr);
      setupLivresEmprunt();
    });
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

function setupListeLivresCallback(xhr) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
    livres.push(l);
  }
}

function setupLivresDisposCallback(xhr, id, liste) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
    liste.push(l);
    l.afficherListe(id);
  }
}

function setupLivresEmpruntCallback(xhr, id, liste) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre, livreArray[livre].idAdherent);

    let emprunteur = adherents.find(adherents=>adherents.idAdherent==l.idAdherent);
    emprunteur.ajouterLivre(l);

    liste.push(l);
    l.afficherListe(id);
  }
}

function setupAdherentCallback(xhr) {
  let adherentArray = JSON.parse(xhr.responseText);
  for (var adherent in adherentArray) {
    let a = new Adherent(adherentArray[adherent].idAdherent, adherentArray[adherent].nomAdherent);
    adherents.push(a);
  }
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

function ajouterLivre(titre) {
  let l = new Livre(null, titre);
  l.sauvegarder();
}

function ajouterAdherent(nom) {
  let a = new Adherent(null, nom);
  a.sauvegarder();
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

document.getElementById("ajouterAdherent").addEventListener("click", function() {
  ajouterAdherent(document.getElementById("nomAdherent").value);
  document.getElementById("nomAdherent").value = "";
});

document.getElementById("ajouterLivre").addEventListener("click", function() {
  ajouterLivre(document.getElementById("titreLivre").value);
  document.getElementById("titreLivre").value = "";
});

document.getElementById("dispos").addEventListener("click", function(event) {
  let idLivre = event.target.id;
  let l = livresDispos.find(livresDispos=>livresDispos.idLivre==idLivre);

  let idAdherent = prompt("Pret du livre: " + l.titreLivre + "\n Pour numéro emprunteur", undefined);

  let adherent = adherents.find(adherents=>adherents.idAdherent==idAdherent);

  if(adherent != undefined) {
    l.sauvegarderEmprunt(adherent);
  } else {
    alert("Cet emprunteur n'existe pas");
  }
});

document.getElementById("empr").addEventListener("click", function(event) {
  let idLivre = event.target.id;
  let l = livresEmpruntees.find(livresEmpruntees=>livresEmpruntees.idLivre==idLivre);

  let emprunteur = adherents.find(adherents=>adherents.idAdherent==l.idAdherent);

  console.log(emprunteur);
  var c = confirm("Le livre a été emprunté par " + emprunteur.nomAdherent + "\n Retour de ce livre ?");

  if(c) {
    l.removeEmprunt();
  }
});

document.getElementById("adh").addEventListener("click", function(event) {
  let idAdherent = event.target.id;

  let adherent = adherents.find(adherents=>adherents.idAdherent==idAdherent);
  if(adherent.livreEmprunte.length != 0) {
    let livres = "\n";
    for (var livre in adherent.livreEmprunte) {
      livres += "\n - " + adherent.livreEmprunte[livre].titreLivre;
    }
    alert(adherent.nomAdherent + " a " + adherent.livreEmprunte.length + " emprunt:" + livres);
  }
});
