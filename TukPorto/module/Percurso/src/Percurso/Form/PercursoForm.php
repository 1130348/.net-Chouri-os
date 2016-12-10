<?php
namespace Percurso\Form;
use Zend\Form\Form;

class PercursoForm extends Form {
    public function __construct($name = null) {
        // we want to ignore the name passed
        parent::__construct('percurso');
        
        $this->add(array(
            'name' => 'id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'descricao',
            'type' => 'Text',
            'options' => array(
                'label' => 'Descricao',
            ),
        ));
        $this->add(array(
            'name' => 'data',
            'type' => 'Date',
            'options' => array(
                'label' => 'Date',
            ),
        ));
        $this->add(array(
            'name' => 'submit',
            'type' => 'Submit',
            'attributes' => array(
                'value' => 'Go',
                'id' => 'submitbutton',
            ),
        ));
    }
}