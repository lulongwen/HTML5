
# HTML5 表单
- 新的 form属性
- 新的 input属性
---



## form 新的属性
- autocomplete="on/off" 是否自动填充
    + 适用于 form 及 input

- novalidate="true/false"
  + 提交表单时验证 form & input
  ```
  <form action="inde.php" novalidate="true"></form>
  ```
---



## input 新属性
- autofocus 获得焦点, type="hidden"不能获取焦点
- placeholder 提示信息
  + text, search, url, telephone, email 以及 password
  + select没效果
  ```
  ```

- form 属性规定输入域所属的一个或多个表单
    + 适用于所有 input标签，form属性必须引用所属表单的 id
    ```HTML
    <form action="index.php" method="post" id="myform">
        <input type="text" name="username">
        <button type="submit"></button>
    </form>
    <input type="text" name="vip" form="myform">
    ```
- 表单属性重写 form override attributes，允许重写 form元素的某些属性值
    + formaction - 重写表单的 action 属性
    + formenctype - 重写表单的 enctype 属性
    + formmethod - 重写表单的 method 属性
    + formnovalidate - 重写表单的 novalidate 属性
    + formtarget - 重写表单的 target 属性
    + 表单重写属性适用于 submit 和 image类型的 <input>标签
    + 这些属性对于创建不同的提交按钮很有帮助
    ```HTML
    <form action="index.php" method="post" id="myform">
            <input type="text" name="username">
            <button type="submit">提交</button> <br>

            <input type="submit" formaction="list.php" value="提交列表">
            <input type="submit" formnovalidate="true" value="验证提交">
        </form>
    ```

- width & height 属性规定 image类型的 input高度和宽度
  + 只适用于 image类型的 input标签，值是：像素和百分比
    ```
    <input type="image" src="img_submit.gif" width="200" height="200" />
    ```

- multiple 多选，适用于 type="email" & type="file"
  ```
  <input type="file" name="img" multiple="multiple">
  ```

- pattern 正则表达式
  + 适用于 text, search, url, telephone, email 以及 password
  ```
  <input type="text" name="code" pattern="[A-z]{3}" >
  ```
- required 必填项

  ```HTML

  <input type="text" name="user_name" autofocus placeholder="用户名">
  ```

  ```HTML
  date 选择年月日
    - month 选择年月
    - week 选择年，周
    - time 选择时间，小时和分钟
    - datetime UTC时间，选择年月日
    = datetime-local 本地时间，选择年月日
  color
  range
  email
  url
  number
  search

  自动校验输入的是不是 email
  <input type="email" name="user_email">

  自动将提交数据变为 url
  <input type="url" name="user_url">
  ```

## min, max, step 属性
- min, max, step 属性用于包含数字或日期的 input 类型约束
  ```
  输入数字
      - max，输入域的最大值，number类型
      - min，最小值，number类型
      - setp，步进值，number类型
        step 属性为输入域规定合法的数字间隔（如果 step="3"，则合法的数是 -3,0,3,6 等）
      - value，初始值，number类型
  <input type="number" name="number" min="1" max="20">

  选择一个范围
  <input type="range" name="step" min="1" max="10">

  选择颜色，rgb方式
  <input type="color" name="user_color">
  ```


## output 自动提交结算结果
  ```
  <input type="number" name="numa" required> +
  <input type="number" name="numb" required> =
  <output type="number" name="result" onforminput="value=numa.valueAsNumber+numb.valueAsNumber"></output>
  ```


## datalist 自动实现下拉选择输入
- list 规定输入域的datalist， datalist是输入域的选项列表
- list 属性适用于以下类型的 <input> 标签
    + text, search, url, telephone, email, date pickers, number, range 以及 color
  ```
  <input list="cars" type="text">
  <datalist id="cars">
    <option value="BMW">
    <option value="Ford">
    <option value="Volov">
  </datalist>
  ```


## keygen 加密传输数据
- keytype 属性，rsa也可以是其它的加密方式
  ```
  <input type="text name="username">
  <keygen name="security">
  <input type="submit>
  ```


## 客户端校验
- checkValidity() 函数
- setCustomValidity() 函数
  ```
  <input type="text" name="user" required>
  <input type="text" name="user" onchange="this.checkValidity();">
  ```


## progress 进度条
  ```
  <progress value="26" max="100"></progress>
  ```

## meter 为了显示进度
  ```HTML
  属性      值
  form     number
  high     number
  low      number
  max      number
  min      number
  optimum  number
  value    number
  <meter value="2" min="0" max="10"> 2 out of 10 </meter> <br>
  <meter value=".6"> 60% </meter>
  ```