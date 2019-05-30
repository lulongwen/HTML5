/* polyline 折线图 - canvas实现
	柱状图组件依赖 componentBase
	- 这项目中，所有的图表组件都是基于 componentBase 类来实现的
	
	var ComponentPolyline = function(name, cfg){
		var component = new ComponentBase(name, cfg);
	
	return component;
};

*/
var ComponentPolyline = function(name, cfg){
	'use strict';
	var component = new ComponentBase(name, cfg);
	
// 背景层-网格线 Start，绘制网格线
	var width = cfg.width/2; // 350
	var height = cfg.height/2; // 350
	
	// 加入一个canvas画布
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
		cvs.width = ctx.width = width;
		cvs.height = ctx.height = height;
	component.append(cvs); // 把绘制的线条添加到 画布上
	
	// 水平网格线
	var line = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#ccc';
	
	window.ctx = ctx;
	for(var i= 0;i<= line;i++){
		var Yaxis = (height/ line) * i; // 高度/线条数量 * 当前的第几个 i
		ctx.moveTo(0, Yaxis);
		ctx.lineTo(width,Yaxis);
		
		// console.log(Yaxis, width);
	}
	
	/* 垂直网格线, 线的焦点是相交在线上的，所以有多少数据，中间（不算两边）就要有多少条线，所以  +1
	   垂直网格线：根据项目的个数去分的
	*/
	line = cfg.data.length+1;
	for(var i=0;i<= line; i++){
		var Xaxis =(width/ line) * i;
		ctx.moveTo(Xaxis, 0);
		ctx.lineTo(Xaxis, height);
		
		// 添加文字
		/*if(cfg.data[i]){
			var text = $('<div class="text">');
				text.text(cfg.data[i][0]);
			component.append(text)
		}*/
	}
	ctx.stroke();
// 背景层- 网格线 End
	
/* 绘制折线图及对应的数据和阴影
	num 参数： 0 ~ 1之间的数据，会根据这个值 绘制最终数据的对应状态
		- 把Y轴的高度分成 100份，  1就是100%，让高度从 0 到100%
		- 动画的关键是修改 y轴的高度

*/
function drawData(num){
	// 绘制折线数据
	//	var cvs = document.createElement('canvas');
	//	var ctx = cvs.getContext('2d');
	//		cvs.width = ctx.width = width;
	//		cvs.height = ctx.height = height;
	//	component.append(cvs); // 把绘制的折线添加到 画布上
	
	// 绘制折线数据
	
	//  清空画布
	//ctx.clearRect(0, 0, width, height);
		// .clearRect(x, y, width, height)
	
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#f60';
	
	//  1 绘制圆点
	var x =0,y=0;
	var col_w = width/(cfg.data.length+1);
	/*
		ctx.moveTo(10, 10);
		line = cfg.data.length+1;
		ctx.arc(10, 10, 5, 0, 2*Math.PI);
	*/
	/*.arc(x轴, y轴, 半径, 起始弧度, 结束弧度, 旋转方向)
		- x, y 起始位置
		- 弧度与角度的关系： 弧度 = 角度 *Math.PI/180;
			+ 2*Math.PI 360度
		- 旋转方向 顺时针(默认,false，逆时针,true)
	*/ 
	for( i in cfg.data){
		var item = cfg.data[i];
			//console.log(i, item);
		x = col_w * i + col_w;
		// y = height * (1-item[1]);
		y = height- (item[1]*height*num);
		ctx.moveTo(x,y);
		ctx.arc(x, y, 3, 0, 2*Math.PI);
	}
	
	// 2 连线，移动画笔到第一个数据点的位置
	// ctx.moveTo(col_w, height *(1-cfg.data[0][1]) );
	ctx.moveTo(col_w, height- (cfg.data[0][1]* height* num));
	for(i in cfg.data){
		var item = cfg.data[i];
			//console.log(i, item);
		x = col_w * i + col_w;
		// y = height * (1-item[1]);
		y = height- (item[1]* height * num);
		ctx.lineTo(x,y)
	}
	ctx.stroke();
	 
	
	// 3 线条绘制结束后，就该绘制阴影
	 ctx.lineTo(x, height);
	 ctx.lineTo(col_w, height);
	 ctx.fillStyle= 'rgba(255, 102, 0, 0.3)';
	 ctx.fill();
	
	
	// 4 数值，数值和画线是一致的，所以复制画点的代码直接修改
	for( i in cfg.data){
		var item = cfg.data[i];
			//console.log(i, item);
		x = col_w * i + col_w;
		// y = height * (1-item[1]);
		y = height - (item[1]* height *num );
		
		// 如果有颜色的话，就设置颜色
		ctx.fillStyle = item[2] ? item[2] : '#333';
		ctx.fillText( (item[1]*100 >>0)+'%', x-10, y-15);
		// .fillText('string',x,y)
		
		// 添加文字
		if(item){
			var text = $('<div class="text">');
			var text_w = width/line;
			var text_l = x - text_w/2;		
				text.text(item[0]);
				text.css({
					width: text_w,
					bottom:-20,
					left: text_l
				});
			component.append(text);
		}
	} // for 循环 End
	
}; // drawData()  End
drawData(.1);
	
	// 折线图 onLoad生长动画
	component.on('onLoad', function(){
		var num =0;
		for(var i=0; i<100; i++){
			setTimeout(function(){
				num += .01;
				drawData(num);
				// console.log(num)
			}, i*10);
		}
	});
	
	// 折线图 onLeave 离开动画
	component.on('onLeave', function(){
		var num =1;
		for(var i=0; i<100; i++){
			setTimeout(function(){
				num -= .01;
				drawData(num);
				// console.log(num)
			}, i*10);
		}
	});
	
	
	//component.append(cvs);
	return component;
};































