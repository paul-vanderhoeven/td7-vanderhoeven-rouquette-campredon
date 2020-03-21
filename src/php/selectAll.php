<?php

require_once("Model.php");

$table_name = $_GET["table"];

$res = Model::selectAll($table_name);

echo json_encode($res);

?>
