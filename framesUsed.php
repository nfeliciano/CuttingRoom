<?php
$con = mysql_connect("localhost","root","root");
//instinct_noel, cuttingRoom
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("cr_db", $con);

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
	
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$fromFrame."'");
	$fromFrameSavedCounter;
	while($row = mysql_fetch_array($result)) {
		if ($fromFrame > "6") { break; }
		$fromFrameSavedCounter = $row['used'];
		$fromFrameSavedCounter--;
	}
	
	mysql_query("UPDATE framesUsed SET used = '".$fromFrameSavedCounter."' WHERE frame = '".$fromFrame."'");
	
	if ($toFrame <= "6") { 
		$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$toFrame."'");
		$toFrameSavedCounter;
		while($row = mysql_fetch_array($result)) {
			$toFrameSavedCounter = $row['used'];
			$toFrameSavedCounter++;
		}
		mysql_query("UPDATE framesUsed SET used = '".$toFrameSavedCounter."' WHERE frame = '".$toFrame."'"); 
	}
}

if ($updateOrCheck=="2") {
//check for newest version
	$thisFrame = $_GET['lastFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	while($row = mysql_fetch_array($result)) {
		echo $row['newestVersion'];
	}
}

if ($updateOrCheck=="3") {
//update newest version
	$thisFrame = $_GET['lastFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	$newestVersion;
	while($row = mysql_fetch_array($result)) {
		$newestVersion = $row['newestVersion'];
		$newestVersion++;
	}
	mysql_query("UPDATE framesUsed SET newestVersion = '".$newestVersion."' WHERE frame = '".$thisFrame."'");
}

mysql_close($con);
?>