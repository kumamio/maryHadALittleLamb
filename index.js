(function () {

    let yardCanvas = document.getElementById("yard");
    let ctx = yardCanvas.getContext("2d");

	class Yard  {
		constructor(){
			this.eaten = [];
			this.x = 0;
			this.y = 0;
			this.target = [0, 0];
		}
		drawLamb () {
	    	ctx.fillStyle = '#fff';
	    	ctx.fillRect(50 * this.x, 50 * this.y, 50, 50);
	    	this.eaten.push([this.x, this.y]);
		}
		drawGrass () {
	    	ctx.fillStyle = '#014200';
	    	for (let i = 0; i < 10; i ++ ) {
	    		for (let j = 0; j < 10; j ++ ) {
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
	   	drawFresh () {
	   		this.drawGrass();
	   		this.drawLamb();
	   	}
	   	init () {
	        ctx.moveTo(0, 0);
	        ctx.beginPath();
			this.drawGrass();
	        ctx.fillRect(0, 0, 50 * (this.x + 1), 50 * (this.y + 1));
	      	this.addEventKeyboard();
	      	this.addEventMouse();
			this.drawLamb();
	      	ctx.closePath();
		}
		moveRight () {
			this.x < 9 ? this.x = this.x + 1 : this.x = 9;
		}
		moveLeft () {
			this.x > 0 ? this.x = this.x - 1 : this.x = 0;
		}
		moveUp () {
			this.y > 0 ? this.y = this.y - 1 : this.y = 0;
		}
		moveDown () {
			this.y < 9 ? this.y = this.y + 1 : this.y = 9;
		}
		addEventKeyboard () {

			window.addEventListener( "keydown", e => {
				switch (e.keyCode) {
					case 39 : 
						this.moveRight(this);
						break;
					case 37 : 
						this.moveLeft(this);
						break;
					case 40 : 
						this.moveDown(this);
						break;
					case 38 : 
						this.moveUp(this);
						break;
				}
				ctx.clearRect(0,0,500,500);
				this.drawFresh();
				// debugger;
				console.log(this.eaten.join(" "))
			})
		}
		addEventMouse () {

			yardCanvas.addEventListener( "mousedown", e => {
				let target = [ parseInt(e.clientX / 50), parseInt(e.clientY / 50) ];
	    		let horizon = target[0] - this.target[0];
	    		let vertical = target[1] - this.target[1];

	    		if (!(horizon == 0 && vertical == 0)) {

					ctx.clearRect(0,0,500,500);

		    		for ( let i = 0; i < Math.abs(horizon) ; i ++ ) {
		    			if (horizon<0) {
		    				this.moveLeft(this);
		    			}
		    			if (horizon>0) {
		    				this.moveRight(this);
		    			};
						this.drawFresh();
		    		};

		    		for ( let i = 0; i < Math.abs(vertical) ; i ++ ) {
		    			if (vertical<0) {
		    				this.moveUp(this);
		    			}
		    			if (vertical>0) {
		    				this.moveDown(this);
		    			};
						this.drawFresh();
		    		};

		    		this.target[0] = target[0];
		    		this.target[1] = target[1];

	    		}
			})
		}
	}

	let yard = new Yard();

	yard.init();

})()