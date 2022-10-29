<?php 

function ConnectionToDB () {
    $servername="lcalhost";
    $username="root";
    $password="";
    $dbname="eMarket";

$conn=new mysqli($servername,$username,$password,$dbname);
$conn->set_charset("utf8");

if(!$conn){
    die("Connection Failed: " .mysqli_connect_error() );
}
}

































?>