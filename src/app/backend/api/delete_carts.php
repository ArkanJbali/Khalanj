<?php

require 'database.php';



// Delete.
$sql = "DELETE FROM `cart`";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
