<?php
require 'database.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

// $pid = mysqli_real_escape_string($con, trim($request -> pid));
 $pid = mysqli_real_escape_string($con, trim($postdata));
$products = [];
$sql = "SELECT `productid`,`productname`,`categoryname`,`price`,`discount`,`stock` FROM shop,products where shop.categoryid = products.category and products.productid = '{$pid}' ";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$i]['productid']    = $row['productid'];
    $products[$i]['productname']    = $row['productname'];
    $products[$i]['categoryname'] = $row['categoryname'];
    $products[$i]['price'] = $row['price'];
    $products[$i]['discount'] = $row['discount'];
    $products[$i]['stock'] = $row['stock'];
   // $products[$i]['sssss'] = base64_encode($row['productimg'],PDO::PARAM_LOB);
    $i++;
  }
 
  echo json_encode($products);
}
else
{
  http_response_code(404);
}
}
?>

