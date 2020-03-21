<?php

require_once("ModelEmprunt.php");

$res="";

if(isset($_GET["idAdherent"])) {
  $res = ModelEmprunt::getNombreEmprunt($_GET["idAdherent"]);
}
echo json_encode($res);

?>
