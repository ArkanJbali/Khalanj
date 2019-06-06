<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));
  $sql = "SELECT username, password FROM users where username = '{$username}' and password '{$password}' ";
  if($result = mysqli_query($con,$sql))
{
    http_response_code(204);
  }else {
    http_response_code(404);
  }
  }
  ?>
