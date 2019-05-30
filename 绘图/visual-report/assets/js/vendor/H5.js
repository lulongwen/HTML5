
// 内容管理对象
var H5 = function(){
	'use strict';
	this.id = ('h5_'+Math.random().toFixed(6)).replace('.', '_');
	this.elem = $('<div class="h5" id="'+this.id+'">').hide();
	
	this.page =[];
	$('body').prepend(this.elem);
	
	var self = this;
	/* 2.1 新增一个页面
	name  组件的名称， 会加入到className中
	text  页面的默认文本
	return this  this就是H5 对象
		- 可以重复使用H5对象支持的方法
	*/ 
	this.addPage = function(name, text){
		//  addPage 就是每个 section
		var page = $('<div class="h5-page section" />');
		if(name !== undefined){
			page.addClass('h5-page-' +name);
		}
		if(text !== undefined){
			page.text(text);
		}
		
		this.elem.append(page);
		
		// 把当前创建好的页面添加到 this.page
		this.page.push(page);
		return this;
	};
	
	
	// 2.2 新增一个组件，组件就是每个section里面的内容
	this.addComponent = function(name, cfg){
		var cfg = cfg || {};
		/* type 是必要的属性
			如果 cfg没传参的话，或者 cfg里没有type的参数， type默认就是 base
		*/
		cfg = $.extend({
			type: 'base'
		}, cfg);
		 
		var component; // 定义 一个变量，存储组件元素
		// 拿到这个页面
		var page = this.page.slice(-1)[0];
		//console.log(page)
		
		switch(cfg.type){
			case 'base':
				component = new ComponentBase(name, cfg);
				break;
			
			default:
		};
		component = new ComponentBase(name, cfg);
		
		page.append(component);
		return this;
		
	};
	
	
	// 2.3 H5 对象初始化呈现 - 什么时候展现页面 ==  链式调用-所有的页面加载完成后显示
	this.loader = function(){
		// 谁调用函数，this就指向谁 console.log(this)
		this.elem.fullpage({
			sectionsColor: ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388'],
			onLeave: function(index, nextIndex, direction){
				// this 实例化的H5对象
				$(this).find('.component').trigger('onLeave')
			},
			afterLoad: function(anchorLink, index){
				$(this).find('.component').trigger('onLoad');
			}
		});
		
		// 页面首次载入，要主动触发
		this.page[0].find('.component').trigger('onLoad');
		
		this.elem.show();
	};

};






















