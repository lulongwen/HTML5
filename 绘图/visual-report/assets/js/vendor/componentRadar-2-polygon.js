/* radar 雷达图
	柱状图组件依赖 componentBase
	- 这项目中，所有的图表组件都是基于 componentBase 类来实现的
	
	 var H5ComponentRadar = function(name, cfg){
	 	var component = new componentBase(name, cfg);
			return component;
	 }
	 
	 雷达图思路：
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
	ctx.beginPath();
	for(var i=0;i<len;i++){
		var rad = (2 *Math.PI / 360) * (360/len) * i;  // 求弧度 radius
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
	
		ctx.arc(x, y, 3, 0, 2*Math.PI);
		ctx.lineTo(x, y)
	}
	ctx.closePath();
	ctx.stroke();
	
	// 绘制雷达图数据的动画
	var drawData = function(num){
		
	};

	
	// 雷达图生长动画
	component.on('onLoad', function(){
		
	});
	
	
	//雷达图退场动画
	component.on('onLeave', function(){
		
		
	});
	
	return component;
};

















