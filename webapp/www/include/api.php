<?php
/*
 #version
 #Author
 #Date created
 #Date last modified
*/

class API{

	public  $API_KEY;
	public  $END_POINT;

	function curl_post($request,$post_data,$http_method='POST'){

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL,$this->END_POINT.$request);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $http_method);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		
		));
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);          
		$output=curl_exec($ch);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		return array($httpcode,$output);
	}
	
	function curl_get($request){}
		
	function get_games($game_category){
		
		$post_data =json_encode(array("key"=>$API_KEY));
		$games = $this->curl_post($END_POINT,$post_data);
		
		foreach(json_decode($games[1])->result as $game){
			
			if ($game->name == $game_category) return $game;
			
		}
	}
	
}
