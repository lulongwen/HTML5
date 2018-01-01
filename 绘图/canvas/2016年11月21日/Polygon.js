
var Polygon = function(props){
	this.X = 0;
	this.Y = 0;
	this.R = 0;
	this.sides = 3;
	this.startAngle = 0;
	this.sc = '#000000';
	this.fc = 'rgba(255,255,255,0)';

	for(var p in props){
		if(this.hasOwnProperty(p) || this[p] !== undefined){
			this[p] = props[p];
		}
	}
	return this;
}

Polygon.prototype.points = function() {
	var p = [];
	var angle = this.startAngle || 0;
	for(var i=0; i<this.sides; i++){
		p.push([
			this.X + Math.sin(angle)*this.R,
			this.Y - Math.cos(angle)*this.R
		]);
		angle += Math.PI * 2 / this.sides;
	}
	return p;
};

Polygon.prototype.createPath = function(cxt) {
	var p = this.points();
	cxt.beginPath();
	p.forEach((item,i)=>{
		cxt.lineTo(item[0],item[1]);
	});
	cxt.closePath();
	return this;
};

Polygon.prototype.stroke = function(cxt) {
	cxt.save();
	cxt.storkeStyle = this.sc;
	this.createPath(cxt);
	cxt.stroke();
	cxt.restore();
	return this;
};

Polygon.prototype.fill = function(cxt) {
	cxt.save();
	cxt.fillStyle = this.fc;
	this.createPath(cxt);
	cxt.fill();
	cxt.restore();
	return this;
};






















