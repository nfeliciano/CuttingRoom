<?php
$con = mysql_connect("localhost","instinct_noel","cuttingRoom");
//instinct_noel, cuttingRoom
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

if ($updateOrCheck=="4") {
//lock or unlock frame
	$thisFrame = $_GET['lastFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	while($row = mysql_fetch_array($result)) {
		$isThisLocked = $row['locked'];
		if($isThisLocked=="0") {
			mysql_query("UPDATE framesUsed SET locked = '1' WHERE frame = '".$thisFrame."'");
		} else {
			mysql_query("UPDATE framesUsed SET locked = '0' WHERE frame = '".$thisFrame."'");
		}
	}
}

if ($updateOrCheck=="5") {
//check if frame is locked
	$thisFrame = $_GET['lastFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	while($row = mysql_fetch_array($result)) {
		echo $row['locked'];
	}
}

if ($updateOrCheck=="6") {
//update the frame description
	$thisFrame = $_GET['lastFrame'];
	$frameDescription = $_GET['toFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	while($row = mysql_fetch_array($result)) {
		mysql_query("UPDATE framesUsed SET description='".$frameDescription."' WHERE frame='".$thisFrame."'");
	}
}

if ($updateOrCheck=="7") {
//get frame description
	$thisFrame = $_GET['lastFrame'];
	$result = mysql_query("SELECT * FROM framesUsed WHERE frame='".$thisFrame."'");
	while($row = mysql_fetch_array($result)) {
		echo $row['description'];
	}
}

mysql_close($con);
?>