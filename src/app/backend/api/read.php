<?php
/**
 * Returns the list of users
 */
require 'database.php';

$users = [];
$sql = "SELECT id, firstname, lastname,email, phone, username, password FROM users";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$i]['id']    = $row['id'];
    $users[$i]['firstname'] = $row['firstname'];
    $users[$i]['lastname'] = $row['lastname'];
    $users[$i]['email'] = $row['email'];
    $users[$i]['phone'] = $row['phone'];
    $users[$i]['username'] = $row['username'];
    $users[$i]['password'] = $row['password'];
    $i++;
  }
 
  echo json_encode($users);
}
else
{
  http_response_code(404);
}
?>
