<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$userid = $_POST['userid'];
$filmid = $_POST['filmid'];

$select = "DELETE from sala WHERE filmid='$filmid' and userid='$userid'";
$result = mysqli_query($db, $select);

echo json_encode("ok");

?>