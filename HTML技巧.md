# HTML技巧


## div focus 事件
```
<div
	tabindex="0"
	hidefocus="true"
	onfocus='alert("得到焦点");'
	onblur='alert("失去焦点");'
	style="border:1px solid #ccc;width:200px;height:200px;outline=0;">
    定义tab属性后，元素是默认会加上焦点虚线的，
    在IE中可以通过hidefocus="true"去除
    其他浏览器通过outline=0进行去除！
</div>
```