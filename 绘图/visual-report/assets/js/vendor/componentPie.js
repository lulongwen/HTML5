/* Pie 饼图
	柱状图组件依赖 componentBase
	- 这项目中，所有的图表组件都是基于 componentBase 类来实现的
	
	 var H5ComponentPie = function(name, cfg){
	 	var component = new componentBase(name, cfg);
			return component;
	 }
	 
饼图开发思路：
	1. 有 三层，三个 canvas
		- 灰色的 背景层，在绘制一个数据层，再绘制一个 遮罩层用作动画效果


*/
var ComponentPie = function(name, cfg){
	'use strict';
	var component = new ComponentBase(name, cfg);
	var width = cfg.width/2;
	var height = cfg.height/2;
	var r = width/2;
	
	// 加入一个画布，绘制 网格线背景
	var cvs = document.createElement('canvas'); // 原生JS，创建一个canvas标签
	var ctx = cvs.getContext('2d'); // 获取canvas 绘图环境
		cvs.width  = width; //  画布的宽，高
		cvs.height = height;
		$(cvs).css('zIndex', 1).appendTo( component ); // 把 canvas 追加到 component 中
	
	// 1 绘制背景层
	ctx.beginPath();
	ctx.fillStyle="#eee";
	ctx.arc(r, r, r, 0, 2*Math.PI);
	ctx.fill();
	
	// 2 绘制 数据层
	var cvs = document.createElement('canvas'); // 原生JS，创建一个canvas标签
	var ctx = cvs.getContext('2d'); // 获取canvas 绘图环境
		cvs.width  = width; //  画布的宽，高
		cvs.height = height;
		$(cvs).css('zIndex', 2).appendTo( component ); // 把 canvas 追加到 component 中
	var colors =['#f60', '#ff0', '#09f', '#f90', '#90f', '#60f', '#06f']; // 备用颜色
 	var len = cfg.data.length;
	/*角度设置
		开始角度 start = 1.5 *Math.PI; // 设置开始角度在 12点钟方向
		结束角度 end = 0; 结束角度
		当前角度 cur = Math.PI * 2; 100%的圆结束的角度 2*PI = 360
	*/
	var start = 1.5 *Math.PI; // 设置开始角度在 12点钟方向
	var end = 0;
	var cur = Math.PI *2; // 360度 
	
	/* 绘制单个圆
	ctx.beginPath();
	ctx.fillStyle="#f00";
	ctx.moveTo(r,r);
	ctx.arc(r, r, r, start, end);
	ctx.fill();
	*/
	for(var i=0;i<len;i++){
		var item = cfg.data[i];
		//  如果没有颜色，就截取数组最后一个值
		var color = item[2] || ( item[2] = colors.pop() );
		
		// 结束角度已经改变
		end = start + cur * item[1];
		console.log(end)
		ctx.beginPath();
		ctx.fillStyle= color;
		ctx.moveTo(r,r);
		ctx.arc(r, r, r, start, end);
		ctx.fill();
		start = end;
		
		// 给所有饼图添加文本
		var text = $('<div class="text">');
			text.text(item[0]);
		var percent = $('<div class="per">');
			percent.text(item[1]*100 +'%').appendTo(text);
		
		var x = r + Math.sin(.5*Math.PI - start) * r;
		var y = r + Math.cos(.5*Math.PI - start) * r;  // r = height/2
		text.css('left', x);
		text.css('top',y);
		
		component.append(text);
		
	}
	
	
	// 3 加入一个蒙版层
	var cvs = document.createElement('canvas'); // 原生JS，创建一个canvas标签
	var ctx = cvs.getContext('2d'); // 获取canvas 绘图环境
		cvs.width  = width; //  画布的宽，高
		cvs.height = height;
		$(cvs).css('zIndex', 3).appendTo( component ); // 把 canvas 追加到 component 中
	
	var draw = function(num){
		ctx.clearRect(0, 0, width, height);
		
		// 1 绘制背景层
		ctx.beginPath();
		ctx.moveTo(r, r);
		ctx.lineWidth = 1;
		// 在一个圆环之上，开始角度是多少，结束角度也要 加多少
		ctx.arc(r, r, r, start, start+ 2*Math.PI *num, true);
		ctx.fillStyle="#eee";
		ctx.fill();
		ctx.strokeStyle = "#eee";
		ctx.stroke();
	};
	//draw(.5);
	
	
	
	
	// 饼图 生长动画
	component.on('onLoad', function(){
		var s = 0;
		var self = this;
		for(var i=0; i<100;i++){
			var timer = setTimeout(function(){
				s += .01;
				if(s >= 1){
					clearTimeout(timer);
					// 载入完成后，显示文字
					//$(self).find('.text').css('opacity', 1);
				}
				draw(s);
			}, i*10);
		};
	});
	
	// 饼图退场动画
	component.on('onLeave', function(){
		var s=1;
		var self = this;
		for(var i=0; i<100;i++){
			var timer = setTimeout(function(){
				s -= .01;
				if(s <=1){
					clearTimeout(timer); 
					//$(self).find('.text').css('opacity', 0);
				}
				draw(s);
			}, i*10);
		}
		
	});
	
	return component;
};

















