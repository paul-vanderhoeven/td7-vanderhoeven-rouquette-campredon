// tableau de tout les livres
let livres = [];
// tableau des livres diponibles
let livresDispos = [];
// tableau des livres empruntés
let livresEmpruntees = [];
// tableau de tout les adhérents
let adherents = [];

// exécution
setupLivres();
setupLivresDispos();
setupAdherent();

// --------------------------------------------------------------------------
// ------------------------------- Fontions ---------------------------------
// --------------------------------------------------------------------------

// récupére tout les livres puis callback
function setupLivres() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/selectAll.php?table=livre", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    // callback
    setupListeLivresCallback(xhr);
  });
}

// récupére tout les livres dispos puis callback
function setupLivresDispos() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresDispos.php", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    // callback
    setupLivresDisposCallback(xhr);
  });
}

// récupére tout les livres empruntés puis callback
function setupLivresEmprunt() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/requeteLivresEmpruntes.php", true);
  xhr.send(null);

  xhr.addEventListener("load", function() {
    // callback
    setupLivresEmpruntCallback(xhr);

    for (var adherent in adherents) {
      adherents[adherent].ajouterListe();
    }
  });
}

// récupére tout les adhérents empruntés puis callback
function setupAdherent() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/selectAll.php?table=adherent", true);
    xhr.send(null);

    xhr.addEventListener("load", function() {
      // callback puis setupLivresEmprunt() car nécessite d'avoir la liste des adhérents
      setupAdherentCallback(xhr);
      setupLivresEmprunt();
    });
}

// --------------------------------------------------------------------------
// ------------------------------- Callback ---------------------------------
// --------------------------------------------------------------------------

// callback: ajoute les livres à la liste des livres
function setupListeLivresCallback(xhr) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
    livres.push(l);
  }
}

// callback: ajoute les livres dispos à la liste des livres dispos et affiche dans le HTML
function setupLivresDisposCallback(xhr) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre);
    livresDispos.push(l);
    l.afficherListe(listeLivresDisponibles);
  }
}

// callback: ajoute les livres empruntés à la liste des livres empruntés et affiche dans le HTML
function setupLivresEmpruntCallback(xhr) {
  let livreArray = JSON.parse(xhr.responseText);
  for (var livre in livreArray) {
    let l = new Livre(livreArray[livre].idLivre, livreArray[livre].titreLivre, livreArray[livre].idAdherent);

    let emprunteur = adherents.find(adherents=>adherents.idAdherent==l.idAdherent);
    emprunteur.ajouterLivre(l);

    livresEmpruntees.push(l);
    l.afficherListe(listeLivresEmpruntes);
  }
}

// callback: ajoute les adherents à la liste des adhérents et les affiche dans le HTML
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

// sauvegarder un livre
function ajouterLivre(titre) {
  let l = new Livre(null, titre);
  l.sauvegarder();
}

// sauvegarder un adhérent
function ajouterAdherent(nom) {
  let a = new Adherent(null, nom);
  a.sauvegarder();
}

// --------------------------------------------------------------------------
// -------------------------- Listener --------------------------------------
// --------------------------------------------------------------------------

// bouton ajouter adhérent
document.getElementById("ajouterAdherent").addEventListener("click", function() {
  ajouterAdherent(document.getElementById("nomAdherent").value);
  document.getElementById("nomAdherent").value = "";
});

// bouton ajouter livre
document.getElementById("ajouterLivre").addEventListener("click", function() {
  ajouterLivre(document.getElementById("titreLivre").value);
  document.getElementById("titreLivre").value = "";
});

// click sur un livre dispos
document.getElementById("dispos").addEventListener("click", function(event) {
  let idLivre = event.target.id;
  let l = livresDispos.find(livresDispos=>livresDispos.idLivre==idLivre);

  // popup avec champ de texte
  let idAdherent = prompt("Pret du livre: " + l.titreLivre + "\n Pour numéro emprunteur", undefined);

  let adherent = adherents.find(adherents=>adherents.idAdherent==idAdherent);

  if(adherent != undefined) {
    l.sauvegarderEmprunt(adherent);
  } else {
    alert("Cet emprunteur n'existe pas");
  }
});

// click sur un livre adhérent
document.getElementById("empr").addEventListener("click", function(event) {
  let idLivre = event.target.id;
  let l = livresEmpruntees.find(livresEmpruntees=>livresEmpruntees.idLivre==idLivre);

  let emprunteur = adherents.find(adherents=>adherents.idAdherent==l.idAdherent);

  // popup conrfirm
  var c = confirm("Le livre a été emprunté par " + emprunteur.nomAdherent + "\n Retour de ce livre ?");

  if(c) {
    l.removeEmprunt();
  }
});

// click sur un adhérent
document.getElementById("adh").addEventListener("click", function(event) {
  let idAdherent = event.target.id;

  let adherent = adherents.find(adherents=>adherents.idAdherent==idAdherent);
  if(adherent.livreEmprunte.length != 0) {
    let livres = "\n";
    for (var livre in adherent.livreEmprunte) {
      livres += "\n - " + adherent.livreEmprunte[livre].titreLivre;
    }
    // popup
    alert(adherent.nomAdherent + " a " + adherent.livreEmprunte.length + " emprunt:" + livres);
  }
});
