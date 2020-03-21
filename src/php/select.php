<?php

require_once("Model.php");

$primary_value = $_GET["id"];
$table_name = $_GET["table"];
$primary_key = $_GET["primary"];

$res = Model::select($primary_value, $primary_key, $table_name);

echo json_encode($res);

?>
