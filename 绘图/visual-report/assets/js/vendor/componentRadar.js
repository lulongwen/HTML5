/* radar 雷达图
	柱状图组件依赖 componentBase
	- 这项目中，所有的图表组件都是基于 componentBase 类来实现的
	
	 var H5ComponentRadar = function(name, cfg){
	 	var component = new componentBase(name, cfg);
			return component;
	 }
	 
	 雷达图思路：
	 - 2个canva标签，一个背景层，一个数据层
	 1. 先给正方向绘制一个圆，然后把这个圆分成5份或6份
	 2. 然后连线成一个多边形

*/
var ComponentRadar = function(name, cfg){
	'use strict';
	var component = new ComponentBase(name, cfg);
	
// 绘制网格 -背景层
	var width = cfg.width/2;
	var height = cfg.height/2;
	
	// 加入一个画布，绘制 网格线背景
	var cvs = document.createElement('canvas'); // 原生JS，创建一个canvas标签
	var ctx = cvs.getContext('2d'); // 获取canvas 绘图环境
		cvs.width = ctx.width = width; //  画布的宽，高
		cvs.height = ctx.height =height;
		$(cvs).appendTo( component ); // 把 canvas 追加到 component 中
	
	// 1 绘制圆，绘制圆的中心
	var r =width/2;
	ctx.beginPath();
	ctx.arc(r, r, 5, 0, 2*Math.PI);
	ctx.stroke();
	
	// 1.2 绘制大圆
	ctx.beginPath();
	ctx.arc(r, r, r,0, 2*Math.PI);
	ctx.stroke();
	
	var len = cfg.data.length;
	/* 计算一个圆周上的点坐标-计算多边形的顶点坐标
		已知： 圆心坐标 a, b, 半径 r, 角度 deg
				
		//  每个角度的弧度      *     多少个边  *  第几个
		rad = (2 *Math.PI / 360) * （360/len） * i;  // 求弧度 radius
		x = a + Math.sin(rad) * r;
		y = b + Math.cos(rad) * r;
	*/
	
	/* 绘制网格背景，分面绘制，分成10份
	   for(var piece = 10; piece>0; piece--){  }
	
		绘制单个多边形
		ctx.beginPath();
		for(var i=0;i<len;i++){
			var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
			var x = r + Math.sin(rad) * r;
			var y = r + Math.cos(rad) * r;

			//ctx.arc(x, y, 3, 0, 2*Math.PI);
			ctx.lineTo(x, y)
		}
		ctx.closePath();
		ctx.fillStyle= "#f06";
		ctx.fill();
		ctx.stroke();
	*/  
	// 绘制10 份多边形，改变半径就行
	var color = false;
	for(var piece = 10; piece>0; piece--){ 
		ctx.beginPath(); // 开始绘制一个新的路径
		for(var i=0;i<len;i++){
			var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
			var x = r + Math.sin(rad) * r *(piece/10);
			var y = r + Math.cos(rad) * r *(piece/10);
			//ctx.arc(x, y, 3, 0, 2*Math.PI);
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.fillStyle=(color = !color)?"#9cdee7": '#eee';
		ctx.fill();
	}
	
	// 绘制伞骨图
	for(var i=0;i<len;i++){
		var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		//ctx.arc(x, y, 3, 0, 2*Math.PI);
		ctx.moveTo(r, r);
		ctx.lineTo(x, y);
		
		// 绘制伞骨时，输出文字
		var text =$('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('transition', 'all .5s '+ (i*100)+'ms');
			// console.log('all .5s '+ (i*100)+'ms')
		
		// 如果当前坐标，大于半径的话
			if(x > r){  //如果x轴的 位置在右边，x >半径，就是在右边
				text.css('left', x);
			}else{
				//console.log(x, width, width-x)
				text.css('right', width-x+ 5)
			}
		
			if(y > height/2){ //如果y轴 大于 高度的一半，就是在下面了
				text.css('top', y);
			}else{
				text.css('bottom', height-y+ 5);
			}
			
		//  如果有第三个值就是自定义的颜色值
		if(cfg.data[i][2]){
			text.css('color', cfg.data[i][2]);
		}
		component.append(text);
	}
	ctx.strokeStyle= "#90cdd5";
	ctx.stroke();	
	
	
	
// 数据层开发，新增一个画布
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
		cvs.width = width;
		cvs.height = height;
	component.append( cvs );
	
	// 绘制雷达图数据的动画
	var drawData = function(num){	
		// 动画前要清空画布
		ctx.clearRect(0, 0, width, height); 
		
		// 画线
		ctx.strokeStyle= "#f60";
		for(var i=0;i<len;i++){
			var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
			var percent = cfg.data[i][1] * num;
							// 数据 * num，  0.1 ~ 1 
			var x = r + Math.sin(rad) * r * percent;
			var y = r + Math.cos(rad) * r * percent;
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.stroke();
		
		
		// 画坐标点
		ctx.fillStyle = "#f60";
		for(var i=0;i<len;i++){
			var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
			var percent = cfg.data[i][1] * num;
			var x = r + Math.sin(rad) * r * percent;
			var y = r + Math.cos(rad) * r * percent;
			
			ctx.beginPath();
			ctx.arc(x, y, 3, 0, 2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	};
	
	
	// 雷达图生长动画
	component.on('onLoad', function(){
		var s = 0;
		var self = this;
		for(var i=0; i<100;i++){
			var timer = setTimeout(function(){
				s += .01;
				if(s >= 1){
					clearTimeout(timer);
					// 载入完成后，显示文字
					$(self).find('.text').css('opacity', 1);
				}
				drawData(s);
			}, i*10);
		};
	});
	
	//雷达图退场动画
	component.on('onLeave', function(){
		var s=1;
		var self = this;
		for(var i=0; i<100;i++){
			var timer = setTimeout(function(){
				s -= .01;
				if(s <=1){
					clearTimeout(timer);
					$(self).find('.text').css('opacity', 0);
				}
				drawData(s);
			}, i*10);
		}
		
	});
	
	return component;
};

















