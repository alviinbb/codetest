<?php

session_start();

require_once("PortalConfig.php");
require_once("include/api.php");
require_once('include/mcrypter/OpenSSLCryptoClass.php');
require_once('.env.php');

$API = new API();
$API->END_POINT = $API_ENDPOINT;

$mcrypter = new OpenSSLCryptoClass($app_key, sha1('my-iv-key'));

function encode($input){
	return base64_encode(base64_encode($input));
}

function decode($input){
	return base64_decode(base64_decode($input));
}

function validateSession($session_id){
	if(isset($_SESSION['customer_sessionid'])){
		return $session_id === $_SESSION['customer_sessionid'];
	}
	
	return false;
}

function createSelectList_util($list, $id='', $ignore_keys=null){
	foreach((array)$list AS $key => $val){
		if($ignore_keys) $key=$val;
		$selected = ($id == $key) ? " selected" : "";
		$out .= "<option value=\"".$key."\"".$selected.">".$val."</option>";
	}
	return $out;
}

?>
