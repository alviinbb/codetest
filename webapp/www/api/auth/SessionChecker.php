<?php

Class SessionChecker{

    public function __construct(){
        //session_start();
    }

    public function getSessionId(){
        session_start();

        // Check if session ID exists

        if(SessionChecker::validateSessionData($_SESSION['customer_sessionid'])){
            echo json_encode(array(
                'success'       =>  true,
                'session_data'  =>  $_SESSION
            ));
            exit();
        }
        else{
            echo json_encode(array(
                'success'       =>  false,
                'session_data'  =>  null
            ));
            exit();
        }
    }

    public function validateSessionData($data){
        return (isset($data) && trim($data) != "");
    }

}

$req = SessionChecker::getSessionId();


?>