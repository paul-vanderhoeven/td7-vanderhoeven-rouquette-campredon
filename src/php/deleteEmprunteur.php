<?php

require_once("ModelEmprunt.php");

$res = ModelEmprunt::deleteEmprunteur($_GET["idAdherent"], $_GET["idLivre"]);

echo json_encode($res);

?>
