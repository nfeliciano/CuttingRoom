<?php
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("cr_db", $con);

$projectNum = $_GET['project'];
$frameNum = $_GET['frame'];
$author = $_GET['author'];
$comment = $_GET['comment'];

$sql="INSERT INTO chat_db (project, frame, author, text)
VALUES
('$projectNum', '$frameNum', '$author', '$comment')";

if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";

mysql_close($con)
?>