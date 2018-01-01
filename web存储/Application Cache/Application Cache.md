
## Application Cache 离线缓存
1. 什么是离线缓存 offline application
    + ** W3C 已废弃，推荐使用 Service Workers **
    + Application Cache可以让web应用在离线的情况下继续使用
    + 通过 manifest文件指明需要缓存的资源
    + 文件名可以随便命名，规范为 *.appcache & *.manifest
    + Application Cache 必须在服务器环境下操作，容量限制是 5M
    + appcache 工作流程
    ```
    浏览器 -> 访问离线应用 -> *.appcache -> 检测 server上的manifest文件 -> 有更新，全部更新 appcache
                                          1. 有更新，把manifest里指定的文件全部重新拉取更新 appcache
                                          2. 无更新，返回 cache中的资源
    检测是否在线
    navigator && navigator.onLine
    true 就是在线
    false离线
    ```

2. Application Cache的优势：
    + 用户可以完全离线浏览
    + 资源缓存到本地，加载更快，减少用户等待
    + 降低 server负载，减轻服务器压力
    + Application Cache的应用场景
        1. 单地址页面
        2. 对实时数据要求不高，即资源很长时间不会改变，比如jquery，bootstrap.css
        3. 离线的 WebAPP框架 = HTML5 +CSS3 + Javascript6

    ```
    2.1 在HTML页面中引用 manifest文件
        <html manifest="offline.appcache" lang="zh-cmn-hans">

    2.2 在服务器找到 mime.types，添加
        text/cache-manifest appcache
        // text/cache-manifest manifest
        如果没有权限，可以server root 下的 .htacss 文件下添加以上代码

    2.3 创建 .manifest文件，说明那些文件要缓存

    2.4 更新 manifest
        如果有修改资源文件，必须通过 修改manifest文件的版本号来刷新被缓存的文件列表
        有更新，把manifest里指定的文件全部重新拉取

    - PHP 文件头
    `<?php header('content-type: text/cache-manifest'); ?>`
    ```


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
    5. 清除浏览器缓存，不会清除 appcache
        - chrome://appcache-internals 清除 appcache
---


## *.appcache 文件规范

```
CACHE MANIFEST

# #号是注释的意思，更新 HTML文件需要更新版本号，比如 version 1.2
#version 1.0


# CACHE 需要缓存的文件，写缓存资源的文件列表
# 需要缓存的文件，可以写绝对路径和相对路径
# 相对路径是相对于 .offline.appcache文件
CACHE:
    appcache.html
    ../assets/bootstrap.css
    ../assets/jquery.min.js
    ../assets/bootstrap.min.js


# NETWORK，可选，需要联网的资源，不走缓存，直接读取服务器的文件
# 每次重新拉取的文件，* 代表所有
# 可以写文件夹的名字
NETWORK:
    *


# 如果某个资源访问失败，就用某个资源替换，中间要有空格
# 比如：替换的图片有很多张，一定要换行
# 每行两个文件，第一个是访问源，第二个是替换文件*.html /offline.html
# pc.jpg default.jpg
# pad.png default.jpg
FALLBACK:
    /offline.html

    ../assets/snow.jpg ../assets/default.jpg
    ../assets/gift.jpg ../assets/default.jpg
```
---


## manifest Event
- JS中提供了一个全局的 applicationCache对象，有属性和方法来操作 applicationCache

    ```
    // 方法
    window.applicationCache.status // 状态
        0 未缓存
        1 空闲状态
        2 检查中
        3 下载中
        4 更新准备中
        5 过期状态
    .update() // 更新缓存下载
    .abort() // 取消正在下载的缓存
    .swapCache() // 切换为本地最新的缓存


    // Event
    checking 检测缓存是否需要更新的时候触发
    noupdate 检测以后，发现没有更新的缓存文件信息的时候触发
    downloading 检测有更新的时候触发
    progress 更新缓存的时候触发

    cached 更新缓存完毕的时候触发
    updateready 所有缓存已经就绪的时候触发
    obsolete  manifest的请求出现404或者410错误，应用程序缓存被取消的时候触发
    error 更新出错的时候触发

    applicationCache.addEventListener('cached', function(){
        console.log('cached')
        location.reload();
    }, false)
    ```





















