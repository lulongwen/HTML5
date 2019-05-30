# HTML5 语义化标签

## 构建页面语义化的标签
```
	header, footer, nav, section, article, figure, figcaption,
	aside, hgroup, details

	section
		用来划分网页的, 表示页面中的一个内容区块
		比如章节, 页眉, 页脚或 页面的其他部分

	article
		完整独立内容块
		article元素就是专门为 摘要设计的, 比如一篇文章

	aside
		表示article标签内容之外的,
		与 article标签内容相关的辅助信息,
		aside元素应该被用于无关内容,
		用在主要内容相关的引用, 侧边栏, 广告等

	nav
		页面中导航链接的部分

	header
		一个内容区块或 整个页面的头部部分
	
	footer
		整个页面或页面区块的尾部

	hgroup
		一个内容区块的标题进行组合

	figure
		figure元素经常用于图片
		表示一段独立的流内容
		一般表示文档主体流内容中的一个独立单元

	figcaption
		一个图例的说明
		figure元素的一个标题或者说是其相关解释
		使用figcaption时，它最好是 figure块的第一个或者最后一个元素

	mark
		黄色高亮显示

	progress
		进度条

	time
		<time></time>用来表现时间或日期

	wbr
		<p>一行放不下则在这换行<wbr/> 能放下则一行显示</p>


	HTML5语义化标签在IE8及以下浏览器不支持，需要引入 shiv.js
	<!--[if lt IE 9]><script type="text/javascript" src="html5shiv.min.js"></script><![endif]--> 


	canvas

	audio

	video



块级元素
	支持所有样式
	独占一行
	默认宽度撑满父级


行内元素：
  span, a, em, strong, i
  不支持个别样式 width,height,margin
  在一行显示
  宽度由内容撑开
  换行解析

```


## 标识文本的
```
	time, mark, wbr
	small, hr, srong, b, i, em

```


## html5 新属性
* 默认都是表单的属性

```
	placeholder 输入框提示内容
	autocomplete  表单验证
	autofocus   输入框获取焦点

```



### SEO标签
- H1 ~ H6
- strong
- em
- <img alt=""> img alt属性


### HTML5 语义化标签
- b 字体加粗
- i 斜体
- u 下划线
- s 删除线
- big 大字体
- marquee 字体移动

- pre 格式化


- iframe 框架


- <body oncontextmenu="return false">


## HTML元素参考资料
1. http://blog.csdn.net/qq_33936481/article/details/79306580#t1