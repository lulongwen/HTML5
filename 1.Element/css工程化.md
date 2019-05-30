
前端工程师，现就职于富途网络，负责前端方向技术演进、架构、工程化、组件化等事宜。 非常重视前端基础，相信基础是一切技术体系的基石。
对web前端领域的技术和方向比较关注，喜欢研究前沿技术。有丰富的前端开发经验和团队合作经验。 曾负责GruntJS、LessCSS等中文社区翻译和维护，参与翻译书籍《SVG精髓（第二版）》



HTML常见元素和理解
	HTML版本
		HTML4，XHTML， HTML5
		HTML元素分类，默认样式和定制化

	HTML 元素的分类和特性
	HTML默认样式和定制化
	HTML元素嵌套关系，HTML嵌套关系是怎么确定的，那些元素不可以嵌套

HTML5新增内容
	表单增强
	日期，事件，搜索框
	表单验证
	placeholder 自动聚焦


CSS 代码维护和架构
CSS 全解析
	CSS选择器全解析
		分类，特性，权重，性能
		非布局样式属性，
		CSS hack， checkbox
	CSS常见属性逐一讲解
	CSS选择器权重是如何计算的，写代码要注意什么

CSS 布局，特效，动画
	布局样式属性
		display, position, z-index, flex, float，以及他们之间的关系和组合使用
	特性
		box-shadow, border-radius, backgournd, clip-path
		重点理解多背景，多投影的应用和3D效果实战

	动画特效
	CSS逐帧动画性能如何
	多背景多投影特性
	3D特效
	过渡动画和关键帧动画
	动画细节和原理的深入解析
		补间动画，关键帧动画，逐帧动画，以及动画的作用，提示，引起注意，提升体验，
		transition动画，
		关键帧动画，和逐帧动画
		高级动画控制技巧，
			起止，循环，easing, 事件

CSS布局实战
	浮动布局的优缺点，国内用的多吗
	布局属性和组合解析
	常见的布局方案
	三栏布局案例
		三栏布局的案例
		float, absolute, margin, table-cell, flex
	大网站布局方案、



框架集成和CSS 工程化
	预处理其作用和原理
	less / sass代码实践
		CSS预处理
		less sass
		预处理的特性，嵌套，变量，mixin，extend，循环， 模块化等

	bootstrap原理和用法，响应式布局，定制开发
	css工程化实践
		postCSS 基于postCSS工程化的体系， autoprefixer  cssnext
		css模块化方案 css modules
		webpack中css文件的组织和打包

	JS框架中的CSS集成实践
		三大框架中的 css

	如何解决CSS模块化过程中的选择器相互干扰问题








radio 单选框多个 name相同，代表是一组的

form 可以批量获取表单，没加 form的表单元素不能 serialize 序列化

attribute 和 property的区别

<input type="text" value=2>

$input.value 2
$input.value = 3;

$input.value 2
$input.getAttribute('value') 2
$input.setAttribute('value', 300);
$input.getAttribute('value') 2