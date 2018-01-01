
# HTML5 API的总结：
- 跨域通信postMessage

- XMLHttpRequests通过响应头Access-Control-Allow-Origin跨域

- FileReader/FileWrite

- Geolocation，GPS定位

- getUserMedia/Stream

- JSON.stringify() and JSON.parse()

- Web Worker多线程

- localStorage

- Socket

- QuerySelector，Css3选择器

- RequestAnimationFrame，原生动画timer回调

- HashChange Event

- Touch Event

- 性能检测，performance.timing

- 横屏、竖屏API，orientationchange
- HTML5 API更好的完成性能上的提升
- 已废弃的API
    + ** Web SQL, 推荐 IndexedDB **
    + ** Application Cache, 推荐 Service Workers **
    + 从Firefox44起，当使用 AppCache 来提供离线页面支持时，会提示一个警告消息，来建议开发者使用 Service workers 来实现离线页面

- HTML5存储的优势：
    1. 存储空间大
    2. 接口丰富
    3. 数据相对安全
    4. 关系型
    5. 减少HTTP请求，省流量，减轻服务器压力

## 本地存储
    1. localStorage
    2. sessionStorage

## indexed DB


## 会话存储

## Cookie

## HTML5 图形
    1. Canvas
    2. SVG
    3. webGL

## 动画
- requestAnimationFrame

## 图片
- base64

    HTML5 桌面通知
    地理位置
    websocket

移动端总结
响应式
面向对象
跨域
promise
js异步


- 文件API
    postMessage 跨域通信
    // * 允许所有访问，
    // 仅这些域名可以访问
    header('Access-Control-Allow-Origin: www.baidu.com, www.jd.com');


    + webWorkers
   将 workerde onmessage 属性设置为一个特定的事件处理函数
    - 必须是同域文件
   也可以使用 addEventListener();

    var mywork = new Worker('task.js');
    mywork.onmessage = function(0Event){
        console.log('called back by the worker');
    }

- 文件系统

    // 编辑内容
    <div contenteditable="true"> </div>


- 三个核心方法
    1. openDatabase 使用现有或新的数据库
    2. transaction 事务的提交或回滚
    3. executeSql 执行真实的 SQL查询


## webSQL 关系数据库，通过 SQL语句访问

## indexDB database 索引数据库
- indexDB 是什么？
    + 一种能在浏览器中持久存储结构化数据的数据库
    + 并且为web应用提供了丰富的查询能力
    + IE10+







## 网页性能监控
    ```
    // 页面加载速度
    window.performance
    window.performance.timing
    ```



## 移动端性能优化
- 减少或避免 repaint 页面重绘，reflow 页面回流
    + 修改字体颜色或大小就是重绘，触发浏览器repaint
    + DOM元素改变，如改变 margin ，padding就是页面回流
    + 减少对 DOM的操作
        * 使用 document.querySelector('.box');
        * 把DOM元素从文档流中拿出来，进行操作
    + 使用 CSS3 transform 代替 DOM操作

- 尽量缓存所有可以缓存的数据

- 不要给非 static定位元素增加 CSS3动画
    + 不要给 absolute & fixed 增加CSS3动画

- 适当的使用硬件加速，什么情况下触发硬件加速？
    + canvas 触发硬件加速
    + 元素 transform: translate3d(0, 0, 0)

- CSS3 icon用在一些规则图形上
- 使用 base64 格式的图片制作 icon
    background:url( data:image/png;base64,{img_data});
    base64格式图片的优势：
        减少请求，利于页面直接加载
    base64缺点：
        没有缓存，维护不方便
    base64格式图片生成



    touch 事件

    var body = document.querySelector('body');

    // 按下
    body.addEventListener('touchstart', ()=>{
        console.log('start')
    });

    // 移动
    body.addEventListener('touchmove', ()=>{
        console.log('move');
    });

    // 抬起
    body.addEventListener('touchend', ()=>{
        console.log('end');
    });

    // mousedown  mouseup  click  mousemove











