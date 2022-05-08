<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$login = $_POST['login'];
$password = md5($_POST['password']);

$select = "SELECT * from user WHERE login='$login' and password='$password'";
$result = mysqli_query($db, $select);

$arr = array();
$row = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}

if (count($arr) > 0) {
    $query = "SELECT id from user WHERE login='$login' and password='$password'";
    $res = mysqli_fetch_assoc(mysqli_query($db, $query));
    echo json_encode($res);
}else{
    echo json_encode("error");
}

?>