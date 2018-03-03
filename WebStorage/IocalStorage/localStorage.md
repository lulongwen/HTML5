[DOC]
## localStorage 本地存储
- 推荐的 本地存储
1. localStorage 的方法
2. localStorage 的事件
3. localStoragede 作用域
4. localStorage使用的注意事项
    - 推荐使用
    store.js 是一个兼容所有浏览器的 LocalStorage 包装器，
    不需要借助 Cookie 或者 Flash。
    store.js 会根据浏览器自动选择使用 localStorage、globalStorage 或者 userData 来实现本地存储功能。
5. localStorage参考资料
    - http://blog.csdn.net/cengjingcanghai123/article/details/49737007


- localStorage 是什么？
    + 存储形式： key: val
        * key的唯一性，重复会覆盖
        * 序列化为字符串的数据都可以存储到 localStorage
    + 存储的都是 字符串类型的数据
    + 不能跨域访问数据，file协议和 HTTP协议打开同一个页面的存储不能共享
        * 子域名之间不能共享本地存储，跨域用 postMessage
        ```
        http://www.langwen.com
        https://www.langwen.com 协议
        https://like.langwen.com
        langwen.com:8088 端口

        file://C:/ 协议
        ```

    + 本地存储的优势：
        * 把资源放在本地，减少 HTTP请求
        * 数据存储在本地，即数据持久化
        * 声明周期：永久有效，除非手动删除
        * 存储大小5M多
    ```
    .getItem()
    .setItem()
    .removeItem()
    .clear()
    .key()
    .length

    // localStorage 默认只能存 字符串，保存对象要转换
    window.localStorage.setItem('key', 'val');
    window.localStorage.getItem('key');

    localStorage.setItem('data', JSON.stringify({title: 'langwen'}));

    localStorage.getItem('data'); // string
    JSON.parse(localStorage.getItem('data'));
    ```

- 判断浏览器是否支持本地存储
    + 先 localStorage.setItem()，异常捕获，捕获到异常说明浏览器不支持本地存储
    + 过期策略
    + 无痕模式无法使用localStorage
    ```
    try{
        localStorage.setItem('key', 'val');
    }
    catch(ev){
        console.log('Storage failed:'+ev);
    }

    // 超出存储大小
    try{
    	localStorage.setItem(key,value);
    }catch(oException){
    	if(oException.name == 'QuotaExceededError'){
    		console.log('超出本地存储限额！');
    		//如果历史信息不重要了，可清空后再设置
    		localStorage.clear();
    		localStorage.setItem(key,value);
    	}
    ```


## localStorage Event
- 存储数据发生变化[增加，删除]，触发 storage Event
    + setItem(), clear(), removeItem() 触发 storage事件

- 事件特性：
    + 增加数据的时候是不会在当前页面触发，其他兄弟页面会触发 storage事件
    + 删除数据的时候会在当前页面触发
    + 调用相同storage，打开兄弟文件会触发
    + 在同个浏览器的其他页面：增加、删除数据都会触发
        * 事件在服务器环境下才生效
    ```
    window.addEventListener('storage', function(){

    }, false);

    ```


## sessionStorage 会话存储
- 失效时间
    + 只在本页面有效，关闭页面自动清除 sessionStorage数据，刷新页面还有数据
    + 打开新页面也没有 sessionStorage数据
    + 数据操作之后也没有事件监听


    - HTML5存储的优势：
        1. 存储空间大
        2. 接口丰富
        3. 数据相对安全
        4. 关系型
        5. 减少HTTP请求，省流量
        跨域共享客户端缓存？
        真正离线访问的 web应用？
        实现一个客户端的数据库？
        把图片存在客户端？


    - 本地存储使用场景：
        + 利用本地存储，减少网络传输
        + 弱网络下，把数据保存在本地
        + 可以存储 数组，脚本，json数据，样式，图片

    - 本地存储的使用限制：
        1. 存储跟新策略，过期控制，永久存储，除非手动删除
        2. 子域名之间不能共享存储数据
        3. 超出存储大小最后如何存储（LRU，FIFO），每个域名5M大小
        4. Server端如何获取

    - 本地存储注意事项：
        1. 使用前判断浏览器是否支持
        2. 写数据的时候，需要异常处理，避免超出容量抛错
        3. key唯一性，重复会覆盖
        4. 避免敏感信息


## 其它的本地存储
- userData
    + 64K 大小，是 XML文件
    + 只支持IE5 ~ IE9

- google Gears
    1. chrome 12.0后放弃
    2. 64SQlite
    3. 用户授权














