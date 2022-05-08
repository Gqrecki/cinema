<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$login = $_POST['login'];
$password = md5($_POST['password']);
$numer = $_POST['numer'];

$select = "SELECT * from user WHERE login='$login'";
$result = mysqli_query($db, $select);

$arr = array();
$row = 0;
while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}

if (count($arr) > 0) {
    echo json_encode("error");
}else{
    $query = "INSERT INTO user (login, password, numer)
        VALUES ('$login', '$password', '$numer')";

    $res = $db->query($query);
    if ($res) {
        echo json_encode($res);
    }
}

?>


