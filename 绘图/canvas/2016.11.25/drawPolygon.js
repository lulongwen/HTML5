var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

var Polygon = function(props) {
	if(!props.sides || props.sides < 3){
		return false;
	}
    this.x = 0;
    this.y = 0;
    this.R = 0;
    this.sides = 3;
    this.startAngle = 0;
    this.sc = '#000000';
    this.fc = '#ffffff';
    this.filled = false;

    for(var prop in props){
    	if(this.hasOwnProperty(prop) || this[prop] !== undefined){
    		this[prop] = props[prop];
    	}
    }

    return this;
}

Polygon.prototype = {
    constructor: Polygon,
    getPoints: function() {
        var p = [],
            angle = this.startAngle || 0;
        for (var i = 0; i < this.sides; i++) {
            p.push(new Point(this.x + Math.cos(angle + Math.PI/2) * this.R, this.y - Math.sin(angle + Math.PI/2) * this.R));
            angle += Math.PI * 2 / this.sides;
        }
        return p;
    },
    createPath: function(cxt) {
        var p = this.getPoints();
        //console.log(p);
        cxt.beginPath();
        for (var i = 0; i < p.length; i++) {
            cxt.lineTo(p[i].x, p[i].y);
        }
        cxt.closePath();

    },
    stroke: function(cxt) {
        cxt.save();
        this.createPath(cxt);
        cxt.strokeStyle = this.sc;
        cxt.stroke();
        cxt.restore();
    },
    fill: function(cxt) {
        cxt.save();
        this.createPath(cxt);
        cxt.fillStyle = this.fc;
        cxt.fill();
        cxt.restore();
        return this;
    },
    move: function(x, y) {
        this.x = x;
        this.y = y;
    }
}
