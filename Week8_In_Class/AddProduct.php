<?php
error_reporting (E_ALL);
ini_set('display_errors', 'On');

#To allow different origin (domain) access
header("Access-Control-Allow-Origin: *"); //Allow any origin
header("Access-Control-ALlow_Methods: GET, POST, OPTIONS"); //Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); //Allow specific headers

#Start a SQLite connection
$db = new PDO('sqlite:database/store.db');
// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

#API via POST method
#product: id, cat_id, name, price
$id = $_GET['id'];
$cat_id = $_GET['cat_id'];
$name = $_GET['name'];
$price = $_GET['price'];

$sql = "insert into product(id, cat_id, name, price) values($id, $cat_id, '$name', $price)";
echo $sql;
$count = $db->exec($sql);

#Server response
header("Content-type: text/plain");
echo "$count";