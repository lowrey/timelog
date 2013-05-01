<?php
    error_reporting(0);
    include "config.php";

    $notes = $_GET['notes'];

    $times = get_times();
    $result = false;
    $new_time = array('id' => new_id($times), 'time' => time() , 'notes' => $notes);
    $times[] = $new_time;
    $result = set_times($times);

    if($result)
    {
        exit(json_encode(array('success' => true, 
                               'msg' => 'New time added', 
                               'record' => $new_time)));
    }

    echo json_encode(array(
        'success' => false, 
        'msg'     => 'there is a problem, please check ', 
        'validationError' => $validationError
    ));
    ?>
