<?php
return array(
        'db' => array(
        'driver' => 'Pdo',
        'dsn' => 'mysql:dbname=tukportodb;host=localhost;port=85',
        'driver_options' => array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'Zend\Db\Adapter\Adapter' => 'Zend\Db\Adapter\AdapterServiceFactory',
        ),
    ),
    'static_salt' => 'aFGQ475SDsdfsaf2342', // was moved from module.config.php here to allow all modules to use it
);
