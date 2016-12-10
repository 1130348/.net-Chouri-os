<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Percurso\Controller\Percurso' => 'Percurso\Controller\PercursoController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'percurso' => array(
                'type' => 'segment',
                'options' => array(
                    // Change this to something specific to your module
                    'route' => '/percurso[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id' => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Percurso\Controller\Percurso',
                        'action' => 'index',
                    ),
                ),
            ),
        ),
    ),      
    'view_manager' => array(
        'template_path_stack' => array(
            'Percurso' => __DIR__ . '/../view',
        ),
    ),
);
