<?php
$con = mysql_connect("localhost","instinct_noel","cuttingRoom");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("instinct_cr_db", $con);

$updateOrCheck = $_GET['updateOrCheck'];
if ($updateOrCheck=="0") {
	$frame = $_GET['lastFrame'];
	$sql="SELECT * FROM framesUsed WHERE frame = '".$frame."'";
	
	$result = mysql_query($sql);
	
	while($row = mysql_fetch_array($result)) {
		echo $row['used'];
	}
}

if ($updateOrCheck=="1") {
	$fromFrame = $_GET['lastFrame'];
	$toFrame = $_GET['toFrame'];
	
	mysql_query("UPDATE framesUsed SET used = '0' WHERE frame = '".$fromFrame."'");
	
	if ($toFrame <= "6") { mysql_query("UPDATE framesUsed SET used = '1' WHERE frame = '".$toFrame."'"); }
	
}

mysql_close($con);
?>