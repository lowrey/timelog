<?php
    $JSON_FILE = "./times.json";

    function get_times()
    {
        global $JSON_FILE;
        $json = file_get_contents($JSON_FILE);
        $jarray = json_decode($json,true);
        //var_dump($json);
        return $jarray["times"];
    }

    function new_id($times)
    {
        if(empty($times))
            return 1;
        return ++end($times)["id"];
    }

    function set_times($times)
    {
        global $JSON_FILE;
        $jarray = array();
        $jarray["times"] = $times;
        file_put_contents($JSON_FILE, json_encode($jarray, JSON_PRETTY_PRINT));
        return true;
    }

    function get_by_value($value, $times)
    {
        foreach ($times as $key => $val) 
        {
            $name_key = array_search($value, $val);
            if($name_key !== false)
                return $key;
        }
        return false;
    }
?>
