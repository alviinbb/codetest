<?php
//API end point
$API_ENDPOINT = '172.17.0.3';

//The character set to be used as character encoding for all soap requests
$default_charset = 'UTF-8';//'ISO-8859-1';

// Application Key
// Hashing algorithm
$algo = "sha256";

// Un-hashed API key
$key = "key";

// Set App key
$app_key = hash($algo, $key);

// Application Environment
// Default = DEV (development)
// OPTIONS ARE: 
// $environment = 'PRE' (Pre-Production)
// $environment = 'PRO' (Production)
$environment = 'DEV';

error_reporting(0);
@ini_set('display_errors', 0);
?>
