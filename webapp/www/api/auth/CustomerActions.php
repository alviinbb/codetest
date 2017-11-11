<?php

/**
* Customer Actions API
* Uses: Forgot password, Logout 
*
* @return array
*
*/

include("../../include.php");

// Set Response Header to JSON
header('Content-type:application/json;charset=utf-8');

$data = file_get_contents("php://input");
$request = json_decode($data);

$is_ajax = isset($request->src) && trim($request->src) === '_ngAjax';

if(isset($request->param) && $request->param == 'forgot_password')
{
	global $client;

	$email = $request->emailId;
	$params = array('email' => "$email");
	$result = $client->call('send_mail_for_password', $params);

	if($is_ajax){
		$resultArr = (explode("@@@",$result));
		echo json_encode(array(
			'success'	=>	$resultArr[0],
			'msg'		=>	strip_tags($resultArr[1])
		));
		die();
	}
}

if(isset($request->logout) && $request->logout == true)
{
	if( count($_SESSION) == 0 ){
		echo json_encode(array(
			'success'	=>	true,
			'action'	=>	"logout"
		));
	}
	else{
		$customerid = $_SESSION['customer_id'];
		$sessionid = $_SESSION['customer_sessionid'];
	
		$params = Array(Array('id' => "$customerid", 'sessionid'=>"$sessionid", 'flag'=>"logout"));
			$result = $client->call('update_login_details', $params);
	
		unset($_SESSION['customer_id']);
		unset($_SESSION['customer_name']);
		unset($_SESSION['last_login']);
		unset($_SESSION['support_start_date']);
		unset($_SESSION['support_end_date']);
		unset($_SESSION['customer_sessionid']);
		session_destroy();
		
		if($is_ajax){
			echo json_encode(array(
				'success'	=>	true,
				'action'	=>	$request->user_action
			));
			die();
		}
	}
}
?>
