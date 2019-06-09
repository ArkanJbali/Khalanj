<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	echo trim($request->firstname).",".trim($request->username).",".sizeof($request->password);

  // Validate.
  if(trim($request->firstname) === '' || trim($request->username) === '')
 {
 	return http_response_code(400);
  }

  // Sanitize.


  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $phone = mysqli_real_escape_string($con, trim($request->phone));
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));


  // Create.
  $sql = "INSERT INTO `users`(`id`,`firstname`,`lastname`,`email`,`phone`,`username`,`password`,`token`) VALUES
  (null,'{$firstname}','{$lastname}','{$email}','{$phone}','{$username}','{$password}','fake-jwt-token')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(204);
	
    $user = [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'email' => $email,
      'phone' => $phone,
      'username' => $username,
      'password' => $password,
       'token' => 'fake-jwt-token',
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