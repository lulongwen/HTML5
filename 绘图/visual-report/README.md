# visual-report HTML5 可视化数据报告，图表类组件开发
- HTML5 移动端数据可视化报告

### H5 专题页类型
1. 活动运营
2. 品牌宣传
3. 产品介绍
4. 总结报告

```
	工作毕竟是做产品的，不是练习技术的
	所以没必要写一套自己的jquery，直接用jquery就行
	如果是为了学习高级技巧，jquery源码必看，更要会面向对象编程；

	我们不是要去追寻某一种技术的实现，而是要去寻找某一种合适的技术来解决实际需求
	
	组件
		图文组件、图标组件
		柱状图，垂直柱状图，散点图 - HTML+CSS
		折线图， 雷达图，饼图，环图 - Canvas
		
	 开发角色缩写：
	 	PM  Product Manager 产品经理
		MRD Market Requirements Document
		UI  User Interface 界面视觉设计
		UE  User Experience 用户体验设计
		PM  Poject Manager 技术经理
		
		RD Research Developer 
		FE FrontEnd  Engineer
		BE BackEnd 后端
		QA Quality Assessment 测试
		OP Operate 运维
```

### 1 开发流程
- 2016年12月5日 first，2017年3月9日 again
- 提升效率（知道什么时间找谁做什么事情）
	+ 项目开发文档
		1. 可行性确认
		2. 技术选型
		3. 开发/线上环境规划
		4. 技术开发方案设计
		5. 团队协作方式
		6. 需求实现
			+ 经验：产品经理《需求文档》的功能，不可能100%实现
- 每个流程要做什么
	1. 开发前
		+ 视觉设计稿 - 交互设计稿 - 需求文档
		+ 产品功能设计
		+ 视觉/交互设计
	2. 开发中
		+ 技术规划（技术开发方案设计）
			1. 页面DOM操作
				- 技术选型：jquery，轻量级的JS类库
				- 强大的选择器
				- 出色的DOM封装
				- 可靠的事件处理机制
			2. 页面切换功能
				+ 技术选型：fullpage.js
				+ jquery插件，API简单，易用，跨浏览器

		+ 前端开发
			1. 设计稿标注 & 切图 - markman √
			    + MarkMan 标注- psdUI图标注
			    +  手机端UI设计元素，尺寸一般都为偶数
			    + 标注其实是一个思考的过程
			    + 如果元素有透明背景，这需要保存 png24格式
			    + 切图
			    + 2016年12月8日21:54:27

			2. 编写静态页
				+ 验证fullpage页面切换功能，事件，实现入场，出场动画
			3. 开发测试
				1. 基本图文类
					+ H5 componentBase，实现出场，入场动画提取
				2. 内容组织类
					+ 实现内容页面与组件的组织功能，方便任意添加page，component
				3. 开发图表组件
					+ bar、polyline、radar、pie、ring
				4. loading 功能开发,功能整合，实现设计稿

		+ 后端开发
		
	3. 开发后
		+ 测试
			+ 对网页代码进行功能/性能测试
		+ 上线
			+ 代码部署到服务器上并对外发布


- 各个环节容易出现的问题
- 问题定责
	+ 防止被黑，问责


### 2 技术实现
1. 技术规划，选型
2. 设计易扩展的开发方案
3. 开发各种图表组件


---
03 项目JS开发

