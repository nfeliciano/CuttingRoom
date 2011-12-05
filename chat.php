<?php
$con = mysql_connect("localhost","instinct_noel","cuttingRoom");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("instinct_cr_db", $con);

$author = $_GET['author'];
$comment = $_GET['comment'];

if($author=="10101") {

	$result = mysql_query("SELECT * FROM chat ORDER BY id DESC LIMIT 3");
	
	echo "<table border='0' style='text-align:left;'>";
	while($row = mysql_fetch_array($result)) {
		echo "<tr>";
		echo "<td width='100'>" . $row['author'] . "</td>";
		echo "<td width='600'>" . $row['text'] . "</td>";
		echo "</tr>";
	}
	echo "</table>";
} else {
	$sql="INSERT INTO chat (author, text)
	VALUES
	('$author', '$comment')";

	if (!mysql_query($sql,$con))
  	{
	  die('Error: ' . mysql_error());
	}
}


mysql_close($con)
?>