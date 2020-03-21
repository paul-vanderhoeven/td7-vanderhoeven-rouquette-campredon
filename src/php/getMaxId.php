<?php

require_once("Model.php");

$table_name = $_GET["table"];

$res = null;
if($table_name == "adherent") {
  $res = Model::getMaxId($table_name, "idAdherent");
}
elseif($table_name == "livre") {
  $res = Model::getMaxId($table_name, "idLivre");
}

echo json_encode($res);

?>
