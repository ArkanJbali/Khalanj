<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->email) === '' || trim($request->address) === '')
 {
 	return http_response_code(400);
  }

  // Sanitize.


  $email = mysqli_real_escape_string($con, trim($request->email));
  $address = mysqli_real_escape_string($con, trim($request->address));
  $address2 = mysqli_real_escape_string($con, trim($request->address2));
  $city = mysqli_real_escape_string($con, trim($request->city));
  $state = mysqli_real_escape_string($con, trim($request->state));
  $zip = mysqli_real_escape_string($con, trim($request->zip));
  $card = mysqli_real_escape_string($con, trim($request->card));
  $cardno = mysqli_real_escape_string($con, trim($request->cardno));
  $zipcode = mysqli_real_escape_string($con, trim($request->zipcode));
  $mm = mysqli_real_escape_string($con, trim($request->mm));
  $yy = mysqli_real_escape_string($con, trim($request->yy));
  $securitycode = mysqli_real_escape_string($con, trim($request->securitycode));
  $status = mysqli_real_escape_string($con, trim($request->status));
  $cost = mysqli_real_escape_string($con, trim($request->cost));


  // Create.
  $sql = "INSERT INTO `checkout`(`email`,`address`,`address2`,`city`,`state`,`zip`,`card`,`cardno`,`zipcode`
  ,`mm`,`yy`,`securitycode`,`status`,`cost`) VALUES
  ('{$email}','{$address}','{$address2}','{$city}','{$state}','{$zip}','{$card}','{$cardno}','{$zipcode}','{$mm}'
  ,'{$yy}','{$securitycode}','{$status}','{$cost}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(204);
	
    $checkout = [
        'email' => $email,
      'address' => $address,
      'address2' => $address2,
      'city' => $city,
      'state' => $state,
      'zip' => $zip,
      'card' => $card,
      'cardno' => $cardno,
      'zipcode' => $zipcode,
      'mm' => $mm,
      'yy' => $yy,
      'securitycode' => $securitycode,
      'status' => $status,
      'cost' => $cost
    ];
  echo json_encode($checkout);

  }
  else
  {
    http_response_code(422);
  }

}
?>