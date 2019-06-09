<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  $quantity = 1;
  // Validate.
  if(trim($postdata) === '')
 {
 	return http_response_code(400);
  }

  // Sanitize.


  $productid = mysqli_real_escape_string($con, trim($postdata));


  // Create.
  $sql = "INSERT INTO `cart`(`cartid`,`productid`,`quantity`) VALUES
  (null,'{$productid}','{$quantity}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(204);
	
    $user = [
      'productid' => $productid,
      'quantity' => $quantity,
      'cartid'    => mysqli_insert_id($con)
    ];
  echo json_encode($user);

  }
  else
  {
    http_response_code(422);
  }

}
?>