<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->firstname) === '' || trim($request->username) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->id);
  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $phone = mysqli_real_escape_string($con, trim($request->phone));
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));

  // Update.
  $sql = "UPDATE `users` SET `firstname`='$firstname',`lastname`='$lastname',`email`='$email',`phone`='$phone',`username`='$username',`password`='$password'
   WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}
