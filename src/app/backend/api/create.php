<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  // if(trim($request->firstname) === '' || trim($request->username) === '')
  // {
  //   return http_response_code(400);
  // }

  // Sanitize.

  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));


  // Create.
  $sql = "INSERT INTO `users`(`id`,`firstname`,`lastname`,`username`,`password`) VALUES
  (null,'{$firstname}','{$lastname}','{$username}','{$password}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user = [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'username' => $username,
      'password' => $password,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}
?>
