
## Application Cache 离线缓存
- 什么是离线缓存 offline application
    + Application Cache可以让web应用在离线的情况下继续使用
    + 通过 manifest文件指明需要缓存的资源
    ```
    浏览器 -> 访问离线应用 -> *.appcache -> 检测 server上的manifest文件 -> 有更新，全部更新 appcache
                                          1. 有更新，把manifest里指定的文件全部重新拉取更新 appcache
                                          2. 无更新，返回 cache中的资源
    ```

- Application Cache的优势：
    + 完全离线
    + 资源被缓存，加载更快
    + 降低 server负载，减轻服务器压力

    ```
    1. 在HTML页面中引用 manifest文件
        <html manifest="offline.appcache" lang="zh-cmn-hans">

    2. 在服务器添加
        mime-type text/cache-manifest

    3. 创建 .manifest文件，说明那些文件要缓存


    4. 更新 manifest
        如果有修改资源文件，必须通过 修改manifest文件来刷新被缓存的文件列表
        有更新，把manifest里指定的文件全部重新拉取
    ```

- Application Cache的应用场景
    1. 单地址页面
    2. 对实时数据要求不高，即资源很长时间不会改变，比如jquery，bootstrap.css
    3. 离线 webAPP

- 检测是否在线
    navigator && navigator.onLine
        true 就是在线
        false离线

- manifest的缺点：
    1. 含有 manifest属性的当前请求页面无论如何都会被缓存
    2. 更新需要建立在 manifest文件的更新，（每次更新都需要修改 .appcache的版本号）
        - .appcache 文件有变化才更新
    3. 文件更新后是需要页面再次刷新的，刷新2次才能获取新资源
        - 更新是全局性的更新，无法单独更新某个文件（无法单点更新）
        - 一次必须更新Manifest中所有的文件
    4. 对于链接的参数变化是敏感的，任何一个参数的修改都会被重新缓存（重复缓存含参数的页面）
        - manifest url带参数会被缓存多次
        - 例如：index.html 和 index.html?id=1 和 index.html#3会被认为是不同的页面，会被分别缓存，导致重复缓存


### 离线的 WebAPp
- 离线的 WebAPP框架 = HTML5 +CSS3 + Javascript6