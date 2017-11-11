<?php 

// Get App Env
$env = getenv('_env');

// Set Error Reporting
switch($env){
    case 'DEV'  :
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        // error_reporting(E_ALL);
        error_reporting(E_PARSE | E_ERROR | E_NOTICE);
        break;
    
    case 'PRE'  :
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_PARSE | E_ERROR | E_NOTICE);
        break;

    case 'PRO'  :
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ERROR);
        break;

    default     :
        break;
}

?>