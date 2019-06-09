<?php
/**
 * Returns the list of users
 */
require 'database.php';

$cart = [];
$sql = "SELECT cartid, products.productid, productname, stock, price, discount, productimg FROM cart,products where
cart.productid = products.productid";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cart[$i]['cartid']    = $row['cartid'];
    $cart[$i]['productid'] = $row['productid'];
    $cart[$i]['productname'] = $row['productname'];
    $cart[$i]['stock'] = $row['stock'];
    $cart[$i]['price'] = $row['price'];
    $cart[$i]['discount'] = $row['discount'];
    $cart[$i]['productimg'] = base64_encode($row['productimg']);
    $i++;
  }
 
  echo json_encode($cart);
}
else
{
  http_response_code(404);
}
?>
