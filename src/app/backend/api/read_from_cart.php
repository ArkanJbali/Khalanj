<?php
/**
 * Returns the list of users
 */
require 'database.php';

$cart = [];
$sql = "SELECT cartid, productid, quantity FROM cart";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cart[$i]['cartid']    = $row['cartid'];
    $cart[$i]['productid'] = $row['productid'];
    $cart[$i]['quantity'] = $row['quantity'];
    $i++;
  }
 
  echo json_encode($cart);
}
else
{
  http_response_code(404);
}
?>
