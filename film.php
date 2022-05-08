<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$day = $_POST['day'];

$select = "SELECT id, time, title from film WHERE day='$day'";
$result = mysqli_query($db, $select);

$arr = array();
$row = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}

echo json_encode($arr);

?>