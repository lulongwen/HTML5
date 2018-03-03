## Head 标签
1 meta 标签
- meta标签的http-equiv属性语法格式是：<br> 
`＜meta http-equiv="参数" content="参数变量值"＞ ；其中http-equiv属性主要有以下几种参数：`

1-1. 强制页面在当前窗口以独立页面显示，防止别人在框架里调用你的页面 <br>
` ＜meta http-equiv="Window-target" content="_top"＞ ``__`

1-2. 设定网页的到期时间。一旦网页过期，必须到服务器上重新传输（必须使用GMT的时间格式）
```
＜meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT"＞

＜meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Wednesday, 20-Jun-2007 22:33:00 GMT； path=/"＞  
```

1-3. 禁止浏览器从本地机的缓存中调阅页面内容（访问者将无法脱机浏览）
` ＜meta http-equiv="Pragma" content="no-cache"＞ `

1-4. 清除缓存
` <meta http-equiv="cache-control" content="no-cache"> `


10 ### rel 属性
- rel="canonical"
	+ 规范网页是一组内容高度相似的网页的首选版本
	+ 解决网站url不一样但是网页内容高度相似，造成重复收录而引起的降权或不收录问题；
	+ href连接的是：规范的，希望搜索引擎收录的那个页面
	+ 把这个link标签放在 <head>里面
```
<link rel="canonical" href="网页权威链接"/>
<link rel="canonical" href="http://www.lulongwen.com"/>

<base> 标签为页面上的所有链接规定默认地址或默认目标，请把 <base> 标签排在 head 元素中第一个元素的位置，这样 head 中其他元素就可以利用 <base> 元素中的信息了

<head>
<base href="http://www.w3school.com.cn/i/" />
</head>


HTML5的form如何关闭自动完成功能？
除了audio和video，HTML5还有哪些媒体标签？
HTML5有哪些新的页面元素？
HTML5去除了哪些页面元素？
HTML5中有哪些不同的新的表单元素类型？
什么是SVG（Scalable Vector Graphics，可缩放矢量图形）？HTML5中Canvas是什么？
Canvas和SVG图形的区别是什么？
HTML5标准提供了哪些新的API？
什么是Web Workers？为什么我们需要它们？
HTML5存储类型有什么区别？
HTML5中的本地存储概念是什么？
什么是事务存储？我们如何创建一个事务存储？
什么是WebSQL？
HTML5中的应用缓存是什么？HTML5中我们如何实现应用缓存？我们如何刷新浏览器的应用缓存？HTML5应用程序缓存和浏览器缓存有什么区别？
页面可见性（Page Visibility）API可以有哪些用途？
```



