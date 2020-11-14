<?php 


//$database = 'db733459717';
//$user_name = 'dbo733459717';




  #database details
  $db = new mysqli('db733459717.db.1and1.com', 'dbo733459717', 'Hercle970', 'db733459717_music');

  # check our connection to the database and return error if broken
  if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
  }

  $sql = "SELECT * FROM d3data";

  # check our query will actually run
  if(!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
  }


  while($row = mysqli_fetch_assoc($result))
      $resultArray[] = $row;

#  print json_encode($test);

  // headers for not caching the results
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 2050 05:00:00 GMT');

  // headers to tell that result is JSON
  header('Content-type: application/json');

  echo json_encode($resultArray,JSON_NUMERIC_CHECK);

  $db->close();

?>

