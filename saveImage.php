<?php
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
// Get the data like you would with traditional post
$rawImage=$GLOBALS['HTTP_RAW_POST_DATA'];

// Remove the headers  
$removeHeaders=substr($rawImage, strpos($rawImage, ",")+1);

// decode it from base 64 and into image data only
$decode=base64_decode($removeHeaders);

$filename = $_GET['filename'];
$filesave = $filename . ".png";
// save to your server
$fopen = fopen( "imgs/$filesave", 'w' ) or die('fopen failed');
fwrite( $fopen, $decode) or die('fwrite failed');
fclose( $fopen );
}
?>