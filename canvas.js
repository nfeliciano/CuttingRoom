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
	
	leftCellWidth = document.getElementById('cellx').getAttribute('width');
	topCellHeight = document.getElementById('celly').getAttribute('height');
	context = document.getElementById('canvas').getContext("2d");
	canvas = document.getElementById('canvas');
	canvas.addEventListener("mousedown", mousedwn, false);
	canvas.addEventListener("mousemove", mousemov, false);
	canvas.addEventListener("mouseup", mousup, false);
	
	function drawInitialFrame()
	{
		//context.drawImage(img_curtain, 0, 0);
		context.drawImage(img_paint_button, 725, 90);	
		context.drawImage(img_pictures_button, 725, 160);
		context.drawImage(img_video_button, 725, 230);
		context.drawImage(img_sound_button, 725, 300);
		context.drawImage(img_pallette_buttons, 34, 90);

	}
	
	function touchStart(event)
	{
		event.preventDefault();
		var mouseX = event.touches[0].pageX - 12 - leftCellWidth+20;
		var mouseY = event.touches[0].pageY - 0 - topCellHeight -45;
		if (mouseX > 34 && mouseX < 80 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 338 && mouseY < 385)
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
		var mouseX = event.touches[0].pageX - 12 - leftCellWidth+20;
		var mouseY = event.touches[0].pageY - 0 - topCellHeight -45;
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
		var mouseX = e.pageX - this.offsetLeft - leftCellWidth+20;
		var mouseY = e.pageY - this.offsetTop - topCellHeight -7;
		if (mouseX > 34 && mouseX < 80 && mouseY > 90 && mouseY < 150)
		{
			curColor = colorPurple;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 150 && mouseY < 197)
		{
			curColor = colorBlue;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 197 && mouseY < 244)
		{
			curColor = colorGreen;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 244 && mouseY < 291)
		{
			curColor = colorYellow;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 291 && mouseY < 338)
		{
			curColor = colorOrange;	
		}
		if (mouseX > 34 && mouseX < 80 && mouseY > 338 && mouseY < 385)
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
		var mouseX = e.pageX - this.offsetLeft - leftCellWidth+20;
		var mouseY = e.pageY - this.offsetTop - topCellHeight -7;
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
		canvas.width = canvas.width; // Clears the canvas
		
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
		//context.drawImage(img_curtain, 0, 0);
		context.drawImage(img_paint_button, 725, 90);
		context.drawImage(img_pictures_button, 725, 160);
		context.drawImage(img_video_button, 725, 230);
		context.drawImage(img_sound_button, 725, 300);
		context.drawImage(img_pallette_buttons, 34, 90);
	}
	
	// JavaScript Document
