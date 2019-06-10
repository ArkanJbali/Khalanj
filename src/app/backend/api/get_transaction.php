<?php
/**
 * Returns the list of users
 */
require 'database.php';

$trans = [];
$sql = "SELECT email, card, cost, status FROM checkout";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $trans[$i]['email']    = $row['email'];
    $trans[$i]['card'] = $row['card'];
    $trans[$i]['cost'] = $row['cost'];
    $trans[$i]['status'] = $row['status'];
    $i++;
  }
 
  echo json_encode($trans);
}
else
{
  http_response_code(404);
}
?>
