<?php
/**
 * Returns the list of users
 */
require 'database.php';

$c = [];
$sql = "SELECT count(*) FROM cart";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $c[$i]['c']    = $row['count(*)'];
    $i++;
  }
 
  echo json_encode($c);
}
else
{
  http_response_code(404);
}
?>
