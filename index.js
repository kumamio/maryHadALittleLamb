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
		return function(){
        	ctx.fillStyle = '#fff';
        	ctx.fillRect(50*(this.point.x), 50*(this.point.y), 50*(this.point.x+1), 50*(this.point.y+1));
        }
	}

	Yard.prototype.init = function(){
        ctx.moveTo(0,0);
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 50 * (this.point.x+1), 50*(this.point.y+1));
      	this.addEventKeyboard();
		this.drawLamb();
      	ctx.closePath();
	}
	Yard.prototype.addEventKeyboard = function(){
		var _this = this;
		window.addEventListener( "keydown", function(e) {
			debugger;
			switch (e.keyCode) {
				case 39 : 
					if ( _this.point.x <=9 ) {
						_this.point.x = _this.point.x + 1 ; 
					}else {
						_this.point.x = 9;
					}
					break;
				case 37 : 
					if ( _this.point.x > 0 ) {
						_this.point.x = _this.point.x - 1 ; 
					}else {
						_this.point.x = 0;
					}
					break;
			}
			ctx.clearRect(0,0,500,500);
			_this.drawLamb();
		})
	}

	var yard = new Yard();
	yard.init();

})()