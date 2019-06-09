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
  $users = [];
  $sql = "SELECT * FROM users where `username` = '{$username}' and `password` = '{$password}' ";
  if($result = mysqli_query($con,$sql))
  {
   $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {	
    $users[$i]['id']  = $row['id'];
    $users[$i]['firstname'] = $row['firstname'];
    $users[$i]['lastname'] = $row['lastname'];
    $users[$i]['username'] = $row['username'];
    $users[$i]['password'] = $row['password'];
	$users[$i]['token'] = $row['token'];
    $i++;
  }
  echo json_encode($users);
  }else {
    http_response_code(404);
  }
  }
  ?>
