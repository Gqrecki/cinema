<?php

session_start();
$db = new mysqli('localhost','root','','kino');

$select = "SELECT DISTINCT day from film";
$result = mysqli_query($db, $select);

$arr = array();
$row = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}

echo json_encode($arr)

?>