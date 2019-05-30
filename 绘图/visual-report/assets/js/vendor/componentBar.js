/* bar 柱状图
	柱状图组件依赖 componentBase
	- 这项目中，所有的图表组件都是基于 componentBase 类来实现的
	
	 var H5ComponentBar = function(name, cfg){
	 	var component = new componentBase(name, cfg);
			return component;
	 }

*/
var ComponentBar = function(name, cfg){
	var component = new ComponentBase(name, cfg);
	
	$.each(cfg.data, function(i, elem){
		//console.log(elem)
		var line = $('<div class="line" />');
			var name = $('<div class="name" />');
			var process = $('<div class="process" />');
			var percent = $('<div class="percent" />');
		
		/*宽度不可能超过 100%
		所有的数据 * 100 + % 就是 进度条的宽度
			- line 的宽度是 100%， 所以项目的百分比都是相对于 line的宽度来的
		*/
		var width = elem[1] * 100 +'%';
		
		// 如果数组有第三项，第三项就是颜色
		if(elem[2]){
			var color = elem[2];
		}
	
			name.text( elem[0]);
			process.width(width);
			process.html('<div class="bg" style="background-color:'+color+'"/>');
			percent.text(width);
		
		//  把内容添加到 line
		line.append( name ).append( process ).append( percent );
		
		// 把line 添加到 component
		line.appendTo(component)
	});
	
	return component;
};