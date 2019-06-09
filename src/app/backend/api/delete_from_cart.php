<?php

require 'database.php';

// Extract, validate and sanitize the id.
$cartid = ($_GET['cartid'] !== null && (int)$_GET['cartid'] > 0)? mysqli_real_escape_string($con, (int)$_GET['cartid']) : false;
//$cartid = mysqli_real_escape_string($con, (int)$_GET['cartid']);
echo $_GET['cartid'];
if(!$cartid)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `cart` WHERE `cartid` ='{$cartid}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
