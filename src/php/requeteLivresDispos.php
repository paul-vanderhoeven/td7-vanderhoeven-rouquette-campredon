<?php

require_once("ModelEmprunt.php");

$res = ModelEmprunt::getLivreDispo();

echo json_encode($res);

?>
