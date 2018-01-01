
# Service Workers
- [Service Workers参考资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)


### 开启 Service Workers
1. Firefox Nightly: 访问 about:config
    - 并设置 dom.serviceWorkers.enabled 的值为 true; 重启浏览器；

2. Chrome Canary: 访问 chrome://flags
    - 并开启 experimental-web-platform-features; 重启浏览器 (注意：有些特性在Chrome中没有默认开放支持)；

3. Opera: 访问 opera://flags
    - 并开启 ServiceWorker 的支持; 重启浏览器。

4. 另外，你需要通过 HTTPS 来访问你的页面 — 出于安全原因，Service Workers 要求必须在 HTTPS 下才能运行。
    - Github 是个用来测试的好地方，因为它就支持HTTPS。为了便于本地开发，localhost 也被浏览器认为是安全源。