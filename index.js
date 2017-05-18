(function () {
	"use strict"

    var yardCanvas = document.getElementById("yard");
    var ctx = yardCanvas.getContext("2d");

	var Yard = function (){
		this.eaten = [];
		this.x = 0;
		this.y = 0;
		this.target = [0, 0];
	}

	Yard.prototype.drawLamb = function(){
        	ctx.fillStyle = '#fff';
        	ctx.fillRect(50 * this.x, 50 * this.y, 50, 50);
        	this.eaten.push([this.x, this.y]);
	}
	Yard.prototype.drawGrass = function(){
    	ctx.fillStyle = '#014200';
    	for (var i = 0; i < 10; i ++ ) {
    		for (var j = 0; j < 10; j ++ ) {
    			if ((i + j) % 2 == 0) {
    				ctx.fillRect(50 * i, 50 * j, 50, 50);
    			};
    		}
    	};
    	ctx.fillStyle = '#04b900';
    	this.eaten.map(function(v){
    		ctx.fillRect(50 * v[0], 50 * v[1], 50, 50);
    	})
   	}
   	Yard.prototype.drawFresh = function (){
   		this.drawGrass();
   		this.drawLamb();
   	}

	Yard.prototype.init = function(){
        ctx.moveTo(0, 0);
        ctx.beginPath();
		this.drawGrass();
        ctx.fillRect(0, 0, 50 * (this.x + 1), 50 * (this.y + 1));
      	this.addEventKeyboard();
      	this.addEventMouse();
		this.drawLamb();
      	ctx.closePath();
	}

	Yard.prototype.moveRight = function (_this) {
		_this.x < 9 ? _this.x = _this.x + 1 : _this.x = 9;
	}
	Yard.prototype.moveLeft = function (_this) {
		_this.x > 0 ? _this.x = _this.x - 1 : _this.x = 0;
	}
	Yard.prototype.moveUp = function (_this) {
		_this.y > 0 ? _this.y = _this.y - 1 : _this.y = 0;
	}
	Yard.prototype.moveDown = function (_this) {
		_this.y < 9 ? _this.y = _this.y + 1 : _this.y = 9;
	}

	Yard.prototype.addEventKeyboard = function(){
		var _this = this;
		window.addEventListener( "keydown", function(e) {
			switch (e.keyCode) {
				case 39 : 
					_this.moveRight(_this);
					break;
				case 37 : 
					_this.moveLeft(_this);
					break;
				case 40 : 
					_this.moveDown(_this);
					break;
				case 38 : 
					_this.moveUp(_this);
					break;
			}
			ctx.clearRect(0,0,500,500);
			_this.drawFresh();
		})
	}

	Yard.prototype.addEventMouse = function(){
		var _this = this;
		$("canvas").addEventListener( "mousedown", function(e) {
			var target = [ parseInt(e.clientX / 50), parseInt(e.clientY / 50) ];

    		var horizon = target[0] - _this.target[0];
    		var vertical = target[1] - _this.target[1];


    		if (!(horizon == 0 && vertical == 0)) {

				ctx.clearRect(0,0,500,500);

	    		for ( var i = 0; i < Math.abs(horizon) ; i++ ) {
	    			if (horizon<0) {
	    				_this.moveLeft(_this);
	    			}
	    			if (horizon>0) {
	    				_this.moveRight(_this);
	    			};
					_this.drawFresh();
	    		};

	    		for ( var i = 0; i < Math.abs(vertical) ; i++ ) {
	    			if (vertical<0) {
	    				_this.moveUp(_this);
	    			}
	    			if (vertical>0) {
	    				_this.moveDown(_this);
	    			};
					_this.drawFresh();
	    		};

	    		_this.target[0] = target[0];
	    		_this.target[1] = target[1];

    		}
		})
	}

	var yard = new Yard();
	yard.init();

})()


