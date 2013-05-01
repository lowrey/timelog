<?php  
	include "config.php";

    $times = get_times();
    echo json_encode($times); 
?>

