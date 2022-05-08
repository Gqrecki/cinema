<?php

session_start();
$db = new mysqli('localhost','root','','kino');
$userid = $_POST['userid'];
$filmid = $_POST['filmid'];

$select2 = "SELECT nr from sala WHERE filmid='$filmid'";
$result2 = mysqli_query($db, $select2);

$select1 = "SELECT nr from sala WHERE userid='$userid' and filmid='$filmid'";
$result1 = mysqli_query($db, $select1);

$arr2 = array();
$row2 = 0;
while ($row2 = mysqli_fetch_assoc($result2)) {
    $arr2[] = $row2;
}

$arr1 = array();
$row1 = 0;
while ($row1 = mysqli_fetch_assoc($result1)) {
    $arr1[] = $row1;
}

$arr = array();
$arr[] = $arr2;
$arr[] = $arr1;

echo json_encode($arr);

?>