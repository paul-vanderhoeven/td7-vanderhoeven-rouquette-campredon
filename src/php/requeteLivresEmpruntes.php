<?php

require_once("ModelEmprunt.php");

$res = ModelEmprunt::getLivreEmprunte();

echo json_encode($res);

?>
