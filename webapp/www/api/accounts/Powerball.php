<?php

/**
* API
* Returns List of Powerball games.
*
* @return array
*
*/

include("../../include.php");

// Set Response Header to JSON
header('Content-type:application/json;charset=utf-8');

if(isset($_GET['_t'])){

	$games = $API->get_games('Powerball');
	$types = $games->game_types;

	foreach($types as $type){
		
		$returnArr[] = array(
			'name'        =>  $type->name,
			'description'        =>  substr($type->description,0,50),
			'price'		        =>	$type->game_offers[0]->price->currency .' '. $type->game_offers[0]->price->amount,
			'range'		        =>	$type->game_offers[0]->min_games .' - '. $type->game_offers[0]->max_games
		);
		$ctr++;
	}
	echo json_encode($returnArr);
     
}

?>
