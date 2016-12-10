<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/Turista for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Turista\Controller;

use Zend\Db\Adapter\Adapter as DbAdapter;
use Zend\Authentication\Adapter\DbTable\CredentialTreatmentAdapter as
AuthAdapter;
use Turista\Form\LoginForm;
use Zend\Mvc\Controller\AbstractActionController;

class TuristaController extends AbstractActionController
{
    public function indexAction()
    {
            $request = $this->getRequest();
            if (!$request->isPost()) {
                $form = new LoginForm();
                $form->get('submit')->setValue('Login');
                return array('form' => $form);
            }
            else {
                $name=$request->getPost('username');
                $pass=$request->getPost('password');
                $dbAdapter = new DbAdapter([
                    'driver' => 'Pdo',
                    'dsn' => 'mysql:dbname=tukportodb;host=localhost;port=85',
                                'username' => 'tukporto',
                                'password' => 'tukporto',
                ]);
                $authAdapter = new AuthAdapter($dbAdapter);
                
                
                $authAdapter
                    ->setTableName('turistas')
                    ->setIdentityColumn('nome')
                    ->setCredentialColumn('passw');
               
                
                $authAdapter
                    ->setIdentity($name)
                    ->setCredential($pass);
               
                
                $result = $authAdapter->authenticate();
                if ($result->isValid()) {
                    return $this->redirect()->toRoute('turista');
                } else {
                    return $this->redirect()->toRoute('turista', array(
                                    'controller' => 'Turista',
                                    'action' => 'login'));
                }
            }
    }

}
