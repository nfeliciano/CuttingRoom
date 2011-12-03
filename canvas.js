	// test
	///////////////////
	// canvas.py
	//////////////////
	
	var leftCellWidth;
	var topCellHeight;
	var canvas;
	var context;
	var padding = 25;
	var lineWidth = 8;
	var colorRed = "#f23021";
	var colorPurple = "#9330b0";
	var colorGreen = "#5ba63e";
	var colorYellow = "#f6e91e";
	var colorBlue = "#3c55af";
	var colorOrange = "#ffa400";
	var curColor = colorPurple;
	var clickColor = new Array();
	var clickSize = new Array();
	var curSize = "normal";
	var img_curtain = new Image();
	img_curtain.src = "curtain.png";
	var img_paint_button = new Image();
	img_paint_button.src = "paint-button.png";
	var img_pictures_button = new Image();
	img_pictures_button.src = "pictures-button.png";
	var img_video_button = new Image();
	img_video_button.src = "video-button.png";
	var img_sound_button = new Image();
	img_sound_button.src = "sound-button.png";
	var img_pallette_buttons = new Image();
	img_pallette_buttons.src = "paint-pallette.png";
	
	var projectName = "theGreatEscape";
	var frameName = "Frame0";
	var fileName = projectName + frameName;
	var currentFrameNum = 0;
	
	leftCellWidth = 0; //document.getElementById('cellx').getAttribute('width');
	topCellHeight = document.getElementById('celly').getAttribute('height');
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	canvas.addEventListener("mousedown", mousedwn, false);
	canvas.addEventListener("mousemove", mousemov, false);
	canvas.addEventListener("mouseup", mousup, false);
	
	window.onbeforeunload = exitPage;
	
	function exitPage() {
		var ajax = new XMLHttpRequest();
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 1 + '&lastFrame=' + currentFrameNum + '&toFrame=8', true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
			
			}
		}
		ajax.send();
	}
	
	function switchFrames(frName) 
	{
		var toFrame;
		if (frName == "Frame0") toFrame = 0;
		if (frName == "Frame1") toFrame = 1;
		if (frName == "Frame2") toFrame = 2;
		if (frName == "Frame3") toFrame = 3;
		if (frName == "Frame4") toFrame = 4;
		if (frName == "Frame5") toFrame = 5;
		if (frName == "Frame6") toFrame = 6;
		var ajax = new XMLHttpRequest();
		//0 for update, 1 for check
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 1 + '&lastFrame=' + currentFrameNum + '&toFrame=' + toFrame, true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				//alert("switched to frame " + toFrame);
			}
		}
		ajax.send();
		frameName = frName;
		fileName = projectName + frameName;
		erase();
		loadImage();
		currentFrameNum = toFrame;
	}
	
	function checkWhichFramesAreUsed()
	{
		checkIfFrameIsBeingUsed(0);
		checkIfFrameIsBeingUsed(1);
		checkIfFrameIsBeingUsed(2);
		checkIfFrameIsBeingUsed(3);
		checkIfFrameIsBeingUsed(4);
		checkIfFrameIsBeingUsed(5);
		checkIfFrameIsBeingUsed(6);
	}
	
	function checkIfFrameIsBeingUsed(frameNum)
	{
		var ajax = new XMLHttpRequest();
		//0 for update, 1 for check
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 0 + '&lastFrame=' + frameNum + '&toFrame=8', true);
		var isBeingUsed = 0;
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				//1 if is being used, 0 if not
				isBeingUsed = ajax.responseText;
				if (isBeingUsed == 1) {
					//this is where you might change the canvas color instead of alert
					alert("frame " + frameNum + " is being used");	//CHANGETHIS
				}
			}
		}
		ajax.send();
			
	}
	
	function drawReelFrames()
	{
		var random = Math.floor(Math.random()*100);
		
		var imgFrame0 = new Image();
		imgFrame0.src = "imgs/" + projectName + "Frame0.png?" + random;
		imgFrame0.onload = function() {
			context.drawImage(imgFrame0, 29, 7, 144, 86);
		};
		var imgFrame1 = new Image();
		imgFrame1.src = "imgs/" + projectName + "Frame1.png?" + random;
		imgFrame1.onload = function() {
			context.drawImage(imgFrame1, 29, 99, 144, 86);
		};
		var imgFrame2 = new Image();
		imgFrame2.src = "imgs/" + projectName + "Frame2.png?" + random;
		imgFrame2.onload = function() {
			context.drawImage(imgFrame2, 29, 193, 144, 86);
		};
		var imgFrame3 = new Image();
		imgFrame3.src = "imgs/" + projectName + "Frame3.png?" + random;
		imgFrame3.onload = function() {
			context.drawImage(imgFrame3, 29, 286, 144, 86);
		};
		var imgFrame4 = new Image();
		imgFrame4.src = "imgs/" + projectName + "Frame4.png?" + random;
		imgFrame4.onload = function() {
			context.drawImage(imgFrame4, 29, 379, 144, 86);
		};
		var imgFrame5 = new Image();
		imgFrame5.src = "imgs/" + projectName + "Frame5.png?" + random;
		imgFrame5.onload = function() {
			context.drawImage(imgFrame5, 29, 471, 144, 86);
		};
		var imgFrame6 = new Image();
		imgFrame6.src = "imgs/" + projectName + "Frame6.png?" + random;
		imgFrame6.onload = function() {
			context.drawImage(imgFrame6, 29, 565, 144, 86);
		};
	}
	
	function drawInitialFrame()
	{
		//context.drawImage(img_curtain, 0, 0);
		context.drawImage(img_paint_button, 937, 90);	
		context.drawImage(img_pictures_button, 937, 160);
		context.drawImage(img_video_button, 937, 230);
		context.drawImage(img_sound_button, 937, 300);
		context.drawImage(img_pallette_buttons, 246, 90);
		
		// draw the frames in the reel
		drawReelFrames();
		
		var img = new Image();
		var name = "imgs/" + projectName + frameName + ".png";
		img.src = name;
		
		img.onload = function() {
			context.drawImage(img, 0, 0);
		};
		switchFrames("Frame0");
	}
	
	function loadImage() {
		//erase();
		var random = Math.floor(Math.random()*100);
		
		// draw the frames in the reel
		drawReelFrames();
		
		var img = new Image();
		var name = "imgs/" + projectName + frameName + ".png?" + random;
		img.src = name;
		
		img.onload = function() {
			context.drawImage(img, 0, 0);
		};
		context.strokeStyle = "#df4b26";
		context.lineJoin = "round";
		context.lineWidth = 5;
		
		context.save();
		context.beginPath();
		context.rect(85, 72, 628, 365);
		context.clip();
					
		for(var i=0; i < clickX.length; i++)
		{		
			context.beginPath();
			if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
			}else{
			context.moveTo(clickX[i]-1, clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.strokeStyle = clickColor[i];
			context.lineWidth = clickSize[i];
			context.stroke();
		}
		context.restore();
	}
	
	function erase() {
		clickX = new Array();
		clickY = new Array();
		clickColor = new Array();
		clickSize = new Array();
		clickDrag = new Array();
		canvas.width = canvas.width; // Clears the canvas
		context.drawImage(img_paint_button, 937, 90);
		context.drawImage(img_pictures_button, 937, 160);
		context.drawImage(img_video_button, 937, 230);
		context.drawImage(img_sound_button, 937, 300);
		context.drawImage(img_pallette_buttons, 246, 90);
	}
	
	function saveToServer()
	{
		
		<!-- grab our drawing data from our myCanvas --> 
		var myDrawing = document.getElementById("canvas");
		<!-- start our datastring --> 
		var drawingString = myDrawing.toDataURL("image/png");
		var postData = "canvasData="+drawingString;	  
		var ajax = new XMLHttpRequest();
		<!-- specify our php processing page --> 
		ajax.open("POST",'saveImage.php?filename=' + fileName,true);
		<!-- set the mime type so the image goes through as base64 --> 
		ajax.setRequestHeader('Content-Type', 'canvas/upload');
		ajax.onreadystatechange=function()
		{
			<!-- once the image data has been sent call a simple alert --> 
			if (ajax.readyState == 4)
			{ alert("image saved"); }
		}
		ajax.send(postData);
	} 
	
	function touchStart(event)
	{
		event.preventDefault();
		var mouseX = event.touches[0].pageX - leftCellWidth - 4;
		var mouseY = event.touches[0].pageY - topCellHeight -20;
		// frames
		if (mouseX > 20 && mouseX < 185 && mouseY > 0 && mouseY < 94)
		{
			switchFrames("Frame0");	
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 94 && mouseY < 187)
		{
			switchFrames("Frame1");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 189 && mouseY < 283)
		{
			switchFrames("Frame2");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 283 && mouseY < 374)
		{
			switchFrames("Frame3");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 374 && mouseY < 467)
		{
			switchFrames("Frame4");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 467 && mouseY < 560)
		{
			switchFrames("Frame5");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 560 && mouseY < 652)
		{
			switchFrames("Frame6");
		}
		
		// paint pallette
		if (mouseX > 246 && mouseX < 292 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 338 && mouseY < 385)
		{
			curColor = colorRed;	
		}
		else
		{
			paint = true;
			addClick(mouseX, mouseY);
			redraw();
		}
	}
	function touchMove(event)
	{
		event.preventDefault();
		var mouseX = event.touches[0].pageX - leftCellWidth - 4;
		var mouseY = event.touches[0].pageY - topCellHeight -20;
		{
			if(paint){
			addClick(mouseX, mouseY, true);
			redraw();
			}
		}
	}
    function touchEnd(event)
	{
		event.preventDefault();
		paint = false;
	}
    function touchCancel(event)
	{
		event.preventDefault();
		paint = false;
	}

	function mousedwn(e)
	{
		var mouseX = e.pageX - this.offsetLeft - leftCellWidth;
		var mouseY = e.pageY - this.offsetTop - topCellHeight -15;
		// frames
		if (mouseX > 20 && mouseX < 185 && mouseY > 0 && mouseY < 94)
		{
			switchFrames("Frame0");	
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 94 && mouseY < 189)
		{
			switchFrames("Frame1");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 189 && mouseY < 283)
		{
			switchFrames("Frame2");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 283 && mouseY < 374)
		{
			switchFrames("Frame3");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 374 && mouseY < 467)
		{
			switchFrames("Frame4");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 467 && mouseY < 560)
		{
			switchFrames("Frame5");
		}
		else if (mouseX > 20 && mouseX < 185 && mouseY > 560 && mouseY < 652)
		{
			switchFrames("Frame6");
		}
		
		// paint pallette
		if (mouseX > 246 && mouseX < 292 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		if (mouseX > 246 && mouseX < 292 && mouseY > 338 && mouseY < 385)
		{
			curColor = colorRed;	
		}
		else
		{
			paint = true;
			addClick(mouseX, mouseY);
			redraw();
		}
	}
	
	function mousemov(e)
	{
		var mouseX = e.pageX - this.offsetLeft - leftCellWidth;
		var mouseY = e.pageY - this.offsetTop - topCellHeight -15;
		{
			if(paint){
			addClick(mouseX, mouseY, true);
			redraw();
			}
		}
	}
	
	function mousup(e)
	{
		paint = false;
	}
	
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;
	
	function addClick(x, y, dragging)
	{
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
		clickColor.push(curColor);
		clickSize.push(curSize);
	}
		
	function redraw()
	{
		//canvas.width = canvas.width; // Clears the canvas
		
		context.strokeStyle = "#df4b26";
		context.lineJoin = "round";
		context.lineWidth = 5;
		
		context.save();
		context.beginPath();
		context.rect(297, 72, 628, 365);
		context.clip();
					
		for(var i=clickX.length-1; i < clickX.length; i++)
		{		
			context.beginPath();
			if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
			}else{
			context.moveTo(clickX[i]-1, clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.strokeStyle = clickColor[i];
			context.lineWidth = clickSize[i];
			context.stroke();
		}
		context.restore();
		//context.drawImage(img_curtain, 0, 0);
		//context.drawImage(img_paint_button, 725, 90);
		//context.drawImage(img_pictures_button, 725, 160);
		//context.drawImage(img_video_button, 725, 230);
		//context.drawImage(img_sound_button, 725, 300);
		//context.drawImage(img_pallette_buttons, 34, 90);
	}
	
	// JavaScript Document
