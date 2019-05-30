/* scatter 散点图
	散点图组件依赖 componentBase

*/
var ComponentScatter = function(name, cfg){
	var component = new ComponentBase(name, cfg);
	var base = cfg.data[0][1];
		//console.log(base)
	// 输出每个 Point
	$.each(cfg.data, function(i, elem){
		var point = $('<div class="point point-'+i+'" />');
		
		
		// 
		var name = $('<div class="point-name">'+elem[0]+'</div>');
		var rate = $('<div class="point-rate">'+(elem[1]*100)+'%</div>');
			// point.text(elem[0]+  elem[1]);
		name.append(rate).appendTo(point);
		
		// 计算百分比是为了设置 圆的宽高
		var percent = (elem[1] / base * 100).toFixed(0) + '%';
			// console.log(percent)
		point.width(percent).height(percent);
		
		// 设置颜色
		if(elem[2]){
			point.css('backgroundColor',elem[2])
		}
		
		// 设置定位
		if( elem[3] !== undefined && elem[4] !== undefined){
			point.css({
				left: elem[3],
				top: elem[4] 
			});
		}
		component.append(point)
	});
	
	return component;
};