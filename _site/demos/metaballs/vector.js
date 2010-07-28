var Vector = function(x,y){
	if((x instanceof Vector) && (arguments.length == 1)){
		// copy constructor
		this.x = parseFloat(x.x);
		this.y = parseFloat(x.y);
	}else if((x instanceof Object) && (arguments.length == 1)){

		// from json representation
		this.x = parseFloat(x.x);
		this.y = parseFloat(x.y);
	}else{

		// assume it's a float
		this.x = x ? parseFloat(x) : 0;
		this.y = y ? parseFloat(y) : 0;
	}
	
	this.subtract = function(v){
		return new Vector(this.x - v.x, this.y - v.y);
	}
	
	this.ease = function(amount){
		var x = this.x,
			y = this.y;
			
		if(x<0){
			x += amount;
		}
		if(x>0){
			x -= amount;
		}
		if(y<0){
			y += amount;
		}
		if(y>0){
			y -= amount;
		}
		
		return new Vector(x,y);
	}
	
	this.rationalize = function(){
		return new Vector(Math.floor(this.x), Math.floor(this.y));
	}
	
	this.nonZero = function(){
		return (this.x!=0) || (this.y != 0);
	}
	
	this.getProperties = function(){
	  return {x:parseFloat(this.x.toFixed(3)), y:parseFloat(this.y.toFixed(3))};
	}
	
	this.toJSON = function(){
		return {x:parseFloat(this.x.toFixed(3)), y:parseFloat(this.y.toFixed(3))};
	}
	
	this.add = function(v){
		return new Vector(this.x + v.x, this.y + v.y);
	}
	
	this.normalize = function(){
		var length = this.length();
		return new Vector(this.x / length, this.y / length);
	}
	
	this.length = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}
	
	this.multiply = function(i){
		return new Vector(this.x * i, this.y * i);
	}
	
	this.toString = function(){
		return "Vector(" + [this.x, this.y].join(", ") + ")";
	}
	
	this.inverse = function(){
		return new Vector(-this.x, -this.y);
	}
	
	this.distanceTo = function(v){
		return this.subtract(v).length();
	}
	
	this.rotate = function(theta){
		return new Vector(
			this.x * Math.cos(theta) - this.y * Math.sin(theta),
			this.x * Math.sin(theta) + this.y * Math.cos(theta)
		);
	}
}