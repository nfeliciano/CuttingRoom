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
	var colorBlack = "#000000";
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
	var img_playButton = new Image();
	img_playButton.src = "Play_button.png";
	var img_lockButton = new Image();
	img_lockButton.src = "Sm_lock.png";
	var drawing = false;
	var play = false;
	var lockedFrame = "none";
	
	var projectName = "theGreatEscape";
	var frameName = "Frame0";
	var fileName = projectName + frameName;
	var currentFrameNum = 8;
	var newestVersionFrame0 = findFrameNewestVersion(0);
	var newestVersionFrame1 = findFrameNewestVersion(1);
	var newestVersionFrame2 = findFrameNewestVersion(2);
	var newestVersionFrame3 = findFrameNewestVersion(3);
	var newestVersionFrame4 = findFrameNewestVersion(4);
	var newestVersionFrame5 = findFrameNewestVersion(5);
	var newestVersionFrame6 = findFrameNewestVersion(6);
	
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
		if (checkIfFrameIsLocked(currentFrameNum) == '1') {
			alert("Unlock frame before leaving!");
			return;
		}
		loadChat();
		var toFrame;
		if (frName == "Frame0") toFrame = 0;
		if (frName == "Frame1") toFrame = 1;
		if (frName == "Frame2") toFrame = 2;
		if (frName == "Frame3") toFrame = 3;
		if (frName == "Frame4") toFrame = 4;
		if (frName == "Frame5") toFrame = 5;
		if (frName == "Frame6") toFrame = 6;
		drawFrameIndicator( currentFrameNum, colorBlack, 5);
		drawFrameIndicator( toFrame, colorRed, 5);
		if (checkIfFrameIsLocked(toFrame) == '1') {
			drawFrameIndicator( toFrame, colorPurple, 5);
		}
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
		loadDescription();
		clickX = new Array();
		clickY = new Array();
		clickColor = new Array();
		clickSize = new Array();
		clickDrag = new Array();
		loadImage();
	}
	
	function checkWhichFramesAreUsed()
	{
		/*var blah = findFrameNewestVersion(currentFrameNum);
		alert("this frame has been saved " + blah + " times");*/
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
		//0 for update, 1 for check, 2 for checkSave, 3 for addSave
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 0 + '&lastFrame=' + frameNum + '&toFrame=8', true);
		var isBeingUsed = 0;
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				//1 if is being used, 0 if not
				isBeingUsed = ajax.responseText;
				if (isBeingUsed >= 1) {
					//this is where you might change the canvas color instead of alert
					//alert("frame " + frameNum + " is being used");	//CHANGETHIS
					if (checkIfFrameIsLocked(frameNum) == '1') {
						drawFrameIndicator( frameNum, colorPurple, 5);
					} else {
						drawFrameIndicator( frameNum, colorRed, 5);
					}
				} else {
					drawFrameIndicator( frameNum, colorBlack, 5);
				}
			}
		}
		ajax.send();
			
	}
	
	var timer_is_on = 0;
	var c = 0;
	function timedCount()
	{
		/*if (c == 0)
		 	clearReelFrame(6);
		else
			clearReelFrame(c-1);
		drawFrameIndicator(c, colorRed, 5);*/
		
		// NOEL: The above is temporary code that moves the frame indicator and wipes the last frame each cycle.
		//       Commented out below is something like what we want, I think.
		
		loadChat();
		if (play == true)
		{
			if (c < 7) 
			{
				
				var random = Math.floor(Math.random()*100);
		
				var img = new Image();
				var name = "imgs/" + projectName + "Frame" + c + ".png?" + random;
				img.src = name;
		
				img.onload = function() {
					context.drawImage(img, 297, 72, 630, 366, 297, 72, 630, 366);
					t=setTimeout("timedCount()",2001);
				};
				c=c+1;
			}
			else
			{
			 	c = 0;
				play = false;
				var img = new Image();
				var name = "imgs/" + projectName + frameName + ".png?" + random;
				img.src = name;
		
				img.onload = function() {
					context.drawImage(img, 297, 72, 630, 366, 297, 72, 630, 366);
					t=setTimeout("timedCount()",1001);
				};
			}
			
		}
		else
		{
			if (!drawing)
			{
				checkIfFrameIsBeingUsed(c); // < --- This draws the frame used indicator.
				var frameVer;
				if (c == 0) frameVer = newestVersionFrame0;
				else if (c == 1) frameVer = newestVersionFrame1;
				else if (c == 2) frameVer = newestVersionFrame2;
				else if (c == 3) frameVer = newestVersionFrame3;
				else if (c == 4) frameVer = newestVersionFrame4;
				else if (c == 5) frameVer = newestVersionFrame5;
				else if (c == 6) frameVer = newestVersionFrame6;
				if (findFrameNewestVersion(c) != frameVer) {
					drawReelFrame(c);
					frameVer = findFrameNewestVersion(c);
					if (c == 0) newestVersionFrame0 = frameVer;
					else if (c == 1) newestVersionFrame1 = frameVer;
					else if (c == 2) newestVersionFrame2 = frameVer;
					else if (c == 3) newestVersionFrame3 = frameVer;
					else if (c == 4) newestVersionFrame4 = frameVer;
					else if (c == 5) newestVersionFrame5 = frameVer;
					else if (c == 6) newestVersionFrame6 = frameVer;
				}
				
				if (c < 7) 
					c=c+1;
				else
				 	c = 0;
			}
			t=setTimeout("timedCount()",1001);
		}
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
		drawFrameIndicator( 0, colorBlack, 5);
		drawFrameIndicator( 1, colorBlack, 5);
		drawFrameIndicator( 2, colorBlack, 5);
		drawFrameIndicator( 3, colorBlack, 5);
		drawFrameIndicator( 4, colorBlack, 5);
		drawFrameIndicator( 5, colorBlack, 5);
		drawFrameIndicator( 6, colorBlack, 5);
		if (checkIfFrameIsLocked(0) == '1') {
			drawFrameIndicator( 0, colorPurple, 5);
		} else if (checkIfFrameIsLocked(1) == '1') {
			drawFrameIndicator( 1, colorPurple, 5);
		} else if (checkIfFrameIsLocked(2) == '1') {
			drawFrameIndicator( 2, colorPurple, 5);
		} else if (checkIfFrameIsLocked(3) == '1') {
			drawFrameIndicator( 3, colorPurple, 5);
		} else if (checkIfFrameIsLocked(4) == '1') {
			drawFrameIndicator( 4, colorPurple, 5);
		} else if (checkIfFrameIsLocked(5) == '1') {
			drawFrameIndicator( 5, colorPurple, 5);
		} else if (checkIfFrameIsLocked(6) == '1') {
			drawFrameIndicator( 6, colorPurple, 5);
		} else if (checkIfFrameIsLocked(7) == '1') {
			drawFrameIndicator( 7, colorPurple, 5);
		}
		
		// draw the frames in the reel
		drawReelFrame(0);
		drawReelFrame(1);
		drawReelFrame(2);
		drawReelFrame(3);
		drawReelFrame(4);
		drawReelFrame(5);
		drawReelFrame(6);
		
		loadChat();
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
		context.drawImage(img_playButton, 213, 7);
		context.drawImage(img_lockButton, 262, 394);
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
	
	function MainCanvasImage()
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
		var random = Math.floor(Math.random()*100);
		
		var img = new Image();
		var name = "imgs/" + projectName + frameName + ".png?" + random;
		img.src = name;
		
		img.onload = function() {
			context.drawImage(img, 297, 72, 630, 366, 297, 72, 630, 366);
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
		};
		
		
	}
	
	function erase() {
		clickX = new Array();
		clickY = new Array();
		clickColor = new Array();
		clickSize = new Array();
		clickDrag = new Array();
		context.drawImage(img_canvas, 298, 72);
	}
	
	function findFrameNewestVersion(frNum)
	{
		var theNewestVersion;
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'framesUsed.php?updateOrCheck=' + 2 + '&lastFrame=' + frNum + '&toFrame=8', false);
		ajax.onreadystatechange=function()
		{
			if (ajax.readyState == 4) {
				theNewestVersion = ajax.responseText;
			}
		}
		ajax.send();
		return theNewestVersion;
	}
	
	function addToNewestVersion()
	{
		var ajax = new XMLHttpRequest();
		ajax.open("POST",'framesUsed.php?updateOrCheck=' + 3 + '&lastFrame=' + currentFrameNum + '&toFrame=8', true);
		ajax.onreadystatechange=function()
		{
			if (ajax.readyState == 4) {
			
			}
		}
		ajax.send();
	}
	
	function saveToServer()
	{
		<!-- grab our drawing data from our myCanvas --> 
		var myDrawing = document.getElementById("canvas");
		<!-- start our datastring --> 
		var drawingString = myDrawing.toDataURL("image/png");
		var postData = "canvasData="+drawingString;	
		loadChat();
		addToNewestVersion();
		if (currentFrameNum == 0) { newestVersionFrame0++; }
		if (currentFrameNum == 1) { newestVersionFrame1++; }
		if (currentFrameNum == 2) { newestVersionFrame2++; }
		if (currentFrameNum == 3) { newestVersionFrame3++; }
		if (currentFrameNum == 4) { newestVersionFrame4++; }
		if (currentFrameNum == 5) { newestVersionFrame5++; }
		if (currentFrameNum == 6) { newestVersionFrame6++; }
		var ajax = new XMLHttpRequest();
		<!-- specify our php processing page --> 
		ajax.open("POST",'saveImage.php?filename=' + fileName,true);
		<!-- set the mime type so the image goes through as base64 --> 
		ajax.setRequestHeader('Content-Type', 'canvas/upload');
		ajax.onreadystatechange=function()
		{
			<!-- once the image data has been sent call a simple alert --> 
			if (ajax.readyState == 4)
			{ alert("image saved");
			drawReelFrame(currentFrameNum);
			drawFrameIndicator( currentFrameNum, colorRed, 5);}
			if (checkIfFrameIsLocked(currentFrameNum) == '1') {
				drawFrameIndicator( currentFrameNum, colorPurple, 5);
			}
		}
		ajax.send(postData);
	} 
	
	function touchStart(event)
	{
		drawing = true;
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
		
		// paint
		if (mouseX > 246 && mouseX < 950 && mouseY > 50 && mouseY < 440 && lockedFrame == currentFrameNum)
		{
			alert("Frame Locked!");
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 338 && mouseY < 385)
		{
			curColor = colorRed;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 395 && mouseY < 440)
		{
			lockFrame();
		}
		else if (mouseX > 213 && mouseX < 253 && mouseY > 7 && mouseY < 47)
		{
			//alert("play");
			play = true;
			c = 0;
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
		drawing = false;
	}
    function touchCancel(event)
	{
		event.preventDefault();
		paint = false;
		drawing = false;
	}

	function mousedwn(e)
	{
		drawing = true;
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
		
		// paint
		if (mouseX > 246 && mouseX < 950 && mouseY > 50 && mouseY < 440 && lockedFrame == currentFrameNum)
		{
			alert("Frame Locked!");
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 338 && mouseY < 385)
		{
			curColor = colorRed;	
		}
		else if (mouseX > 246 && mouseX < 292 && mouseY > 395 && mouseY < 440)
		{
			lockFrame();
		}
		else if (mouseX > 213 && mouseX < 253 && mouseY > 7 && mouseY < 47)
		{
			//alert("play");
			play = true;
			c = 0;
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
		drawing = false;
		paint = false;
		loadChat();	//should this be here or is it too taxing?
		loadDescription();	//better here than in timedcount
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
	
	function lockFrame() {
		var ajax = new XMLHttpRequest();
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 4 + '&lastFrame=' + currentFrameNum + '&toFrame=8', true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				if (checkIfFrameIsLocked(currentFrameNum) == '1') {
					drawFrameIndicator( currentFrameNum, colorPurple, 5);
					lockedFrame = currentFrameNum;
				} else {
					drawFrameIndicator( currentFrameNum, colorRed, 5);
					lockedFrame = "none";
				}
			}
		}
		ajax.send();
	}
	
	function checkIfFrameIsLocked(frNum) {
		var ajax = new XMLHttpRequest();
		var isFrameLocked;
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 5 + '&lastFrame=' + frNum + '&toFrame=8', false);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				isFrameLocked = ajax.responseText;
			}
		}
		ajax.send();
		return isFrameLocked;
	}
	
	function setDescription() {
		var ajax = new XMLHttpRequest();
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 6 + '&lastFrame=' + currentFrameNum + '&toFrame=' + document.frameForm.desc.value, true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				
			}
		}
		ajax.send();
	}
	
	function loadDescription() {
		var ajax = new XMLHttpRequest();
		ajax.open("POST", 'framesUsed.php?updateOrCheck=' + 7 + '&lastFrame=' + currentFrameNum + '&toFrame=8', true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				document.frameForm.desc.value=ajax.responseText;
			}
		}
		ajax.send();
	}
	
	function loadChat() {
		var ajax = new XMLHttpRequest();
		ajax.open("POST", 'chat.php?author=10101&comment=NULL', true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				document.getElementById("chatMessages").innerHTML=ajax.responseText;
			}
		}
		ajax.send();
	}
	
	function submitChat() {
		var ajax = new XMLHttpRequest();
		var auth = document.chatForm.person.value;
		var comm = document.chatForm.comment.value;
		ajax.open("POST", 'chat.php?author=' + auth + '&comment=' + comm, true);
		ajax.onreadystatechange=function() {
			if (ajax.readyState == 4) {
				loadChat();
			}
		}
		ajax.send();
	}
	
	// JavaScript Document
