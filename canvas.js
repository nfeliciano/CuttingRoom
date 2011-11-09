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
	var colorPurple = "#cb3594";
	var colorGreen = "#659b41";
	var colorYellow = "#ffcf33";
	var colorBrown = "#986928";
	var curColor = colorPurple;
	var clickColor = new Array();
	var clickSize = new Array();
	var curSize = "normal";
	var img_curtain = new Image();
	img_curtain.src = "curtain.png";
	
	leftCellWidth = document.getElementById('cellx').getAttribute('width');
	topCellHeight = document.getElementById('celly').getAttribute('height');
	alert(topCellHeight);
	context = document.getElementById('canvas').getContext("2d");
	canvas = document.getElementById('canvas');
	canvas.addEventListener("mousedown", mousedwn, false);
	canvas.addEventListener("mousemove", mousemov, false);
	canvas.addEventListener("mouseup", mousup, false);
	
	function drawInitialFrame()
	{
		context.drawImage(img_curtain, 0, 0);
	}

	function mousedwn(e)
	{
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint = true;
		addClick(e.pageX - this.offsetLeft - leftCellWidth, e.pageY - this.offsetTop - topCellHeight);
		redraw();
	}
	
	function mousemov(e)
	{
		if(paint){
		addClick(e.pageX - this.offsetLeft - leftCellWidth, e.pageY - this.offsetTop - topCellHeight, true);
		redraw();
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
		context.rect(50, 50, 510, 370);
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
		context.drawImage(img_curtain, 0, 0);
	}
	
	// JavaScript Document
