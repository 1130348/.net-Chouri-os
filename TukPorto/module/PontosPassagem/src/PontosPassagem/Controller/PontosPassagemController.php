<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/PontosPassagem for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace PontosPassagem\Controller;

use Zend\Http\Client;
use Zend\Http\Request;
use Zend\Mvc\Controller\AbstractActionController;

class PontosPassagemController extends AbstractActionController
{
    public function indexAction()
    {
        return array();
    }

    public function PontosPassagemAction()
    {
        $client = new Client('http:localhost:46346/api/POIs');
        $client->setMethod(Request::METHOD_GET);
        $response = $client->send();
        $body=$response->getBody();
        $musicas=Json::decode($body, true);
        return new ViewModel(array(
                    'arr' => $pontospassagem,
         ));
    }
    
}
