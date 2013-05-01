<?php

    include 'config.php';

    $time = $_GET['id'];
    $times = get_times();
    $key = get_by_value($time, $times);
    //var_dump($times);
    //var_dump($key);
    if($key !== false)
    {
        unset($times[$key]);
        //need to create array again because unset forcably includes index after unset
        $times = array_values($times);
        if (set_times($times)) 
        {
           exit(json_encode(array('success' => true)));
        }
    } 

    echo json_encode(array(
       'success' => false,
        'msg' => 'Something wrong '
    ));
?>
