<?php

require_once("Model.php");

$table_name = $_GET["table"];

if($table_name == strtolower("livre")) {
  $data = array("titreLivre" => $_GET["titreLivre"]);
}
if($table_name == strtolower("emprunt")) {
  $data = array("idAdherent" => $_GET["idAdherent"],
        "idLivre" => $_GET["idLivre"]);
}
if($table_name == strtolower("adherent")) {
  $data = array("nomAdherent" => $_GET["nomAdherent"]);
}

$res = Model::save($data, $table_name);

echo json_encode($res);

?>
