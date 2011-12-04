	// test
	///////////////////
	// canvas.py
	//////////////////
	
	var initClear = false;
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
	var img_paint_button = new Image();
	img_paint_button.src = "D_assets/paint-button.png";
	var img_pictures_button = new Image();
	img_pictures_button.src = "D_assets/pictures-button.png";
	var img_video_button = new Image();
	img_video_button.src = "D_assets/video-button.png";
	var img_sound_button = new Image();
	img_sound_button.src = "D_assets/sound-button.png";
	var img_pallette_buttons = new Image();
	img_pallette_buttons.src = "paint-pallette.png";
	var img_canvas = new Image();
	img_canvas.src = "canvas.jpg";
	
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
	canvas.width = canvas.width;
	
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

		currentFrameNum = toFrame;
		clickX = new Array();
		clickY = new Array();
		clickColor = new Array();
		clickSize = new Array();
		clickDrag = new Array();
		loadImage();
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
					//alert("frame " + frameNum + " is being used");	//CHANGETHIS
					drawFrameIndicator( frameNum, colorRed, 5);
				}
			}
		}
		ajax.send();
			
	}
	
	var c = 0;
	function timedCount()
	{
		if (c == 0)
		 	clearReelFrame(6);
		else
			clearReelFrame(c-1);
		drawFrameIndicator(c, colorRed, 5);
		if (c < 7) 
			c=c+1;
		else
		 	c = 0;
		t=setTimeout("timedCount()",1000);
	}

	function doTimer()
	{
		if (!timer_is_on)
		{
	  		timer_is_on=1;
	  		timedCount();
		}
	}
	
	function drawReelFrame(num)
	{
		var random = Math.floor(Math.random()*100);
		
		var imgFrame = new Image();
		imgFrame.src = "imgs/" + projectName + "Frame" + num + ".png?" + random;
		imgFrame.onload = function() {
			context.drawImage(imgFrame, 297, 72, 630, 366, 32, 9 + 93*num, 138, 81);
		};
	}
	
	function clearReelFrame(num)
	{		
		context.clearRect(20, 3 + 93*num, 164, 93);
	}
	
	function drawInitialFrame()
	{
		clearCanvas();
		
		// draw the frames in the reel
		drawReelFrame(0);
		drawReelFrame(1);
		drawReelFrame(2);
		drawReelFrame(3);
		drawReelFrame(4);
		drawReelFrame(5);
		drawReelFrame(6);
		
		switchFrames("Frame0");
		doTimer();
	}
	
	function drawButtons()
	{
		context.drawImage(img_paint_button, 937, 105);	
		context.drawImage(img_pictures_button, 937, 175);
		context.drawImage(img_video_button, 937, 245);
		context.drawImage(img_sound_button, 937, 315);
		context.drawImage(img_pallette_buttons, 246, 90);
	}
	
	function drawFrameIndicator(frameNum, color, width)
	{
		context.strokeStyle = color;
		context.lineWidth = width;
		context.linejoin = "miter";
		
		context.beginPath();
		
			context.moveTo(30, 7 + 93*frameNum);
			context.lineTo(30, 90 + 93*frameNum);
			context.lineTo(172, 90 + 93*frameNum);
			context.lineTo(172, 7 + 93*frameNum);
			context.lineTo(30, 7 + 93*frameNum);
		
		context.closePath();
		context.stroke();
		
		context.lineJoin = "round";
		context.lineWidth = 5;
	}
	
	function drawMainCanvasImage()
	{
		var random = Math.floor(Math.random()*100);
		
		var img = new Image();
		var name = "imgs/" + projectName + frameName + ".png?" + random;
		img.src = name;
		
		img.onload = function() {
			context.drawImage(img, 297, 72, 630, 366, 297, 72, 630, 366);
		};
	}
	
	function clearCanvas()
	{
		canvas.width = canvas.width; // Clears the canvas
		context.drawImage(img_canvas, 298, 72);
		drawButtons();
	}
	
	function loadImage() {
		// draw most recent save of canvas
		drawMainCanvasImage();
		
		// draw the frames in the reel
		drawReelFrame(currentFrameNum);
		
		// draw strokes not yet saved
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
		context.drawImage(img_canvas, 298, 72);
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
			draw();
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
			draw();
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
			draw();
		}
	}
	
	function mousemov(e)
	{
		var mouseX = e.pageX - this.offsetLeft - leftCellWidth;
		var mouseY = e.pageY - this.offsetTop - topCellHeight -15;
		{
			if(paint){
			addClick(mouseX, mouseY, true);
			draw();
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
		
	function draw()
	{
		
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
	}
	
	// JavaScript Document
