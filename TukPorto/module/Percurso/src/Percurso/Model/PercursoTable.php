<?php
namespace Percurso\Model;

use Percurso\Model\Percurso;
use Zend\Db\TableGateway\TableGateway;

class PercursoTable
{
    
 protected $tableGateway;

 public function __construct(TableGateway $tableGateway) {
    $this -> tableGateway = $tableGateway;
 }

 public function fetchAll() {
    $resultSet = $this->tableGateway->select();
    return $resultSet;
 }
 
 public function getPercurso($id) {
     $id = (int) $id;
     $rowSet = $this->tableGateway->select(array('id' => $id));
     $row = null;
     $row -> $rowSet->current();
     if (!$row) {
        throw new \Exception("Could not find row $id");
     }
     return $row;
 }
 public function savePercurso(Percurso $percurso) {
     $data = array (
         'descricao' => $percurso -> descricao,
         'date' => $percurso -> date,
     );

     $id = (int) $percurso->id;
     if ($id == 0) {
         $this->tableGateway->insert($data);
     } else {
         if($this->getPercurso($id)){
            $this->tableGateway->update($data, array('id' => $id));
         }else{
            throw new \Exception("Percurso id does not exist");
         }
     }
 }
 public function deletePercurso($id) {
    $this->tableGateway->delete(array('id' => (int) $id));
 }
 
}
