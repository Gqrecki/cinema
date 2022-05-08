<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$userid = $_POST['userid'];
$filmid = $_POST['filmid'];
$nr = $_POST['nr'];

$select = "INSERT INTO sala (userid, filmid, nr) VALUES ($userid, $filmid, $nr)";
$result = mysqli_query($db, $select);

echo json_encode($result);

?>