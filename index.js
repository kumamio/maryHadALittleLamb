(function () {
	"use strict"

    var yardCanvas = document.getElementById("yard");
    var ctx = yardCanvas.getContext("2d");

    debugger;
	var Yard = function (){
		this.eaten = [[0,0]];
		this.point = { x : 0, y : 0}
	}

	Yard.prototype.drawLamb = function(){
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 50*(this.point.x+1), 50*(this.point.y+1));
	}

	Yard.prototype.init = function(){
        ctx.moveTo(0,0);
        ctx.beginPath();
		this.drawLamb();
      	ctx.closePath();
	}
	Yard.prototype.addEventKeyboard = function(){

	}

	var yard = new Yard();
	yard.init();

})()