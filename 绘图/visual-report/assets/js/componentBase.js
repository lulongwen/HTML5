/*
	 基本图文组件对象
	 programs
	 	- name 标记组件类型
		- cfg 配置参数，样式属性，设置 宽高，背景，动画样式
*/
var ComponentBase = function(name, cfg){
	"use strict";
	this.cfg = cfg || {};
	
	// 给每个 component 添加一个随机 ID
	this.id= ( 'h5_'+ Math.random().toFixed(3) ).replace('.', '_');
	
	// 把当前的组件类型，添加了样式中 进行标记, name是独立标识的，自定义的名称
	this.cls= 'unit-'+ this.cfg.type;
	this.name= 'component-'+ name;
	
	this.component = $('<div class="component '+this.cls+' '+this.name+'" id="'+this.id+'" />');
	
	// 如果 cfg有text的话，就把 component的文字设置为 cfg.text
		//  语法上如果报错，用 if(){}
	this.cfg.text && this.component.text( this.cfg.text );
	this.cfg.width && this.component.width( this.cfg.width/2 );
	this.cfg.height && this.component.height( this.cfg.height/2 );
	
	this.cfg.css && this.component.css( this.cfg.css );
	//if(this.cfg.css) {this.component.css(this.cfg.css);}
	
	// 水平垂直居中
	if(this.cfg.center === true){
		this.component.css({
			left: '50%',
			// marginLeft: (this.cfg.width/4 * -1)
			transform: 'translateX(-50%)'
			
		});
	}
	// ... 很多的自定义参数
	
	var self = this;
	this.component.on('onLoad', function(){ // onLoad
		/* console.log(self, this)
			self 是 实例化的对象
			this 是 $('.component') 元素
		*/ 
		$(this).addClass(self.cls+ '_load').removeClass(self.cls+ '_leave');
		
		// 页面载入的动画
		self.cfg.animateIn && self.component.animate(self.cfg.animateIn);
		return false;
	});
	
	
	this.component.on('onLeave', function(){ // onLeave
		$(this).addClass(self.cls+ '_leave').removeClass(self.cls+ '_load');
		
		// 页面离开的动画
		self.cfg.animateOut && self.component.animate(self.cfg.animateOut);
		return false;
	});
	
	//console.log(this.cfg);
	
	return this.component;
};






















