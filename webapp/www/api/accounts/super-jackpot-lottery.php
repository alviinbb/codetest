<?php

/**
* Contracts API
* Returns contracts data.
*
* @return array
*
*/

include('../../include.php');

// Set Response Header to JSON
header('Content-type:application/json;charset=utf-8');

if(isset($_GET['_t'])){
	
	$returnArr = array();
	
	$games = $API->get_games('Super Jackpot Lottery');
	$types = $games->game_types;
	
	foreach($types as $type){
		
	$returnArr[] = array(
		'name'                    =>  $type->name,
		'description'          =>  $type->description,
		'price'		        =>	$type->game_offers[0]->price->currency .' '. $type->game_offers[0]->price->amount,
		'range'		        =>	$type->game_offers[0]->min_games .' - '. $type->game_offers[0]->max_games
	);
	}
	$ctr++;
	$s1_grand_total+=$rw['s1total'];
	$s2_grand_total+=$rw['s2total'];
	

	echo json_encode(array(
	'success'           =>  true,
	'data'              =>  $returnArr,
	's1_grand_total'    =>  $s1_grand_total,
	's2_grand_total'    =>  $s2_grand_total
	));
     
}

?>