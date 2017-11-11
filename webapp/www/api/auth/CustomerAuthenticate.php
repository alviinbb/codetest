<?php
/**
* Customer Authentication API
* User validation Module
*
* @return array
*
*/

include("../../include.php");

// Set Response Header to JSON
header('Content-type:application/json;charset=utf-8');

// Disallow incoming request methods except POST (Returns HTTP Code 401)
if($_SERVER['REQUEST_METHOD'] !== "POST"){
	http_response_code(401);
	die();
}
else{
	// Get Post Data (Workaround on AngularJS problem on POST data.)
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$username = $request->username;
	$password = $request->pw;

	$is_ajax = isset($request->src) && trim($request->src) === '_ngAjax';

	$params = array(
		'user_name' 	=> 	"$username",
		'user_password'	=>	"$password"
	);

	$returnArr = array();
	

	$returnArr[] = array(
		encode('userId')	=> encode(1),
		encode('sessionId')	=> encode(1),
		encode('userName')	=> encode('Tester One'),
		encode('is_admin')	=> encode(1),
	);

	
	echo json_encode(array(
		'success'	=>	true,
		'data'		=>	$returnArr
	));
	die();
}
?>