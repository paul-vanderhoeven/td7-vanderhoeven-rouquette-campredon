<?php

require_once('Model.php');

class ModelEmprunt extends Model {

  public static function getLivreDispo() {

      $sql = "select idLivre, titreLivre from livre where idLivre not IN (select idLivre FROM emprunt)";

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

  public static function getLivreEmprunte() {

      $sql = "select l.idLivre, titreLivre, idAdherent from emprunt e join livre l on e.idLivre=l.idLivre";

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

  public static function deleteEmprunteur($idAdherent, $idLivre) {
    $sql = "DELETE FROM emprunt WHERE idAdherent = :idAdherent AND idLivre = :idLivre";

    try{
      $req_prep = Model::$pdo->prepare($sql);

      $req_prep->bindParam(":idAdherent", $idAdherent);
      $req_prep->bindParam(":idLivre", $idLivre);

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
}
