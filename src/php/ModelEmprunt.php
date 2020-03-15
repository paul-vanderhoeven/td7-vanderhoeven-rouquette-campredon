<?php

require_once('Model.php');

class ModelEmprunt extends Model {

  public static function getLivreDispo() {

      $sql = "select idLivre, titreLivre from livre left join emprunt USING(idLivre)";

      try{
        $req_prep = Model::$pdo->prepare($sql);


        $req_prep->execute();

        $tab_obj = $req_prep->fetchAll();
        return $tab_obj;
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

  public static function getNombreEmprunt($idAdherent) {
    $sql = "SELECT COUNT(idLivre) AS nbEmprunt FROM emprunt where idAdherent = :idAdherent";

    try{
      $req_prep = Model::$pdo->prepare($sql);

      $req_prep->bindParam(":idAdherent", $idAdherent);

      $req_prep->execute();

      $req_prep->setFetchMode(PDO::FETCH_OBJ);
	    $tab_obj = $req_prep->fetchAll();

      return $tab_obj;
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
}
