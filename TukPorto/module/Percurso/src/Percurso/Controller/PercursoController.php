<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/Percurso for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Percurso\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Percurso\Model\Percurso;
use Percurso\Form\PercursoForm; 

class PercursoController extends AbstractActionController
{
    protected $percursoTable;
    
    public function indexAction()
    {
        return new ViewModel(array(
            'Percursos' => $this->getPercursoTable()->fetchAll(),
        ));
    }
    
    public function addAction()
    {
        $form = new PercursoForm();
        $form->get('submit')->setValue('Add');
    
        $request = $this->getRequest();
        if ($request->isPost()) {
            $percurso = new Percurso();
            $form->setInputFilter($percurso->getInputFilter());
            $form->setData($request->getPost());
    
            if ($form->isValid()) {
                $percurso->exchangeArray($form->getData());
                $this->getAlbumTable()->saveAlbum($percurso);
    
                // Redirect to list of albums
                return $this->redirect()->toRoute('percurso');
            }
        }
        return array('form' => $form);
    }
    
    public function editAction()
    {
        $id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('percurso', array(
                'action' => 'index'
            ));
        }
        // Get the Album with the specified id. An exception is thrown
        // if it cannot be found, in which case go to the index page.
        try {
            $percurso = $this->getPercursoTable()->getPercurso($id);
        }
        catch (\Exception $ex) {
            return $this->redirect()->toRoute('percurso', array(
                'action' => 'index'
            ));
        }
        $form = new PercursoForm();
        $form->bind($percurso);
        $form->get('submit')->setAttribute('value', 'Edit');
        $request = $this->getRequest();
        if ($request->isPost()) {
            $form->setInputFilter($percurso->getInputFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $this->getPercursoTable()->savePercurso($percurso);
                // Redirect to list of albums
                return $this->redirect()->toRoute('percurso');
            }
        }
        return array(
            'id' => $id,
            'form' => $form,
        );
    }
    
    
    public function deleteAction()
    {
        $id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('percurso');
        }
        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');
            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $this->getPercursoTable()->deletePercurso($id);
            }
            // Redirect to list of albums
            return $this->redirect()->toRoute('percurso');
        }
        return array(
            'id' => $id,
            'percurso' => $this->getPercursoTable()->getPercurso($id)
        );
    }
    
    public function getPercursoTable() {
        if (!$this->percursoTable) {
            $sm = $this->getServiceLocator();
            $this->percursoTable = $sm->get('Percurso\Model\PercursoTable');
        }
        return $this->percursoTable;
    }
    
    
    
}
