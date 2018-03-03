
# Cookie
- Cookie 必须在服务器下运行才能看到
- Cookie 相当于在浏览器中看得见的自定义属性
- 字字千金，因为Cookie在每个浏览器下是有大小限制的
    + Safari/WebKit貌似没有cookie限制。但是如果cookie很多，则会使header大小超过服务器的处理的限制，会导致错误发生
    + Firefox每个域名cookie限制为50个
    + Opera每个域名cookie限制为30个
    + InternetExplorer 8增加cookie限制为每个域名50个
    + IE7似乎也允许每个域名50个cookie

- Cookie的默认生命周期为关闭浏览器


## Cookie 语法
    ```
    document.cookie 能读也能写
      - 如果直接设置 value值，会覆盖上一个值
      - 设置一个 key =value, 同一个域名的 cookie只能有一个，如果key值相同，会覆盖
    ```
































