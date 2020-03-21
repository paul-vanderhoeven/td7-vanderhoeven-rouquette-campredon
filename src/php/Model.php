<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAll($table_name) {

		    $pdo_stmt = Model::$pdo->query("SELECT * FROM " . $table_name);
	      $pdo_stmt->setFetchMode(PDO::FETCH_OBJ);

	      $tab_obj = $pdo_stmt->fetchAll();
        return $tab_obj;
	}

	public static function select($primary_value, $primary_key, $table_name) {

		try{
	    $sql = "SELECT * from " . $table_name . " WHERE " . $primary_key . "=:value";
	    $req_prep = Model::$pdo->prepare($sql);

	    $req_prep->bindParam(":value", $primary_value);
	    $req_prep->execute();

	    $req_prep->setFetchMode(PDO::FETCH_OBJ);
	    $tab_voit = $req_prep->fetchAll();
	    // Attention, si il n'y a pas de résultats, on renvoie false
	    if (empty($tab_voit))
	        return false;
	    return $tab_voit[0];
		}
		catch(PDOException $e) {
	      if($e->getCode() == 23000) {
	          return false;
	        } else {
	          $e->getMessage();
	        }
	      die();
	    }
	}

	public static function delete($primary_value, $primary_key, $table_name) {

		$sql = "DELETE FROM " . $table_name . " WHERE " . $primary_key . "=:value";
    	$req_prep = Model::$pdo->prepare($sql);

	    $req_prep->bindParam(":value", $primary_value);
	    try{
    	$req_prep->execute();
    	}
    	catch(PDOException $e) {
	      if($e->getCode() == 23000) {
	          return false;
	        } else {
	          $e->getMessage();
	        }
	      die();
	    }
	}

	public static function update($data, $table_name, $primary_key) {
		  $str_SET = "SET ";

	    foreach ($data as $key => $value) {
	      $str_SET = $str_SET . "$key=:$key, ";
	    }
	    $str_SET = rtrim($str_SET, " ,");
	    $sql = "UPDATE $table_name $str_SET WHERE $primary_key = :$primary_key";
	    $req_prep = Model::$pdo->prepare($sql);
	    try {
	    	$req_prep->execute($data);
	    } catch(PDOException $e) {
	        if($e->getCode() == 23000) {
	            return false;
	        }
	    }
	    return true;
  }

	public static function save($data, $table_name) {

		$attributs = "";
		$valeurs = "";

		foreach ($data as $key => $value) {
			$attributs = $attributs . "$key,";
			$valeurs = $valeurs . ":$key,";
		}

		$attributs = rtrim($attributs, "\t,");
		$valeurs = rtrim($valeurs, "\t,");

		$sql = "INSERT INTO $table_name ($attributs) VALUES ($valeurs)";

		$req_prep = Model::$pdo->prepare($sql);
		try {
		$req_prep->execute($data);
		}
		catch(PDOException $e) {
	      if($e->getCode() == 23000) {
	          return false;
	        } else {
	          $e->getMessage();
	        }
	      die();
	    }

		return true;
  }

}

// on initialise la connexion $pdo
Model::init_pdo();

?>
