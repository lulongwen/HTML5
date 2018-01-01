
    H5
    https://zhaomenghuan.github.io/2016/08/16/JavaScript%E8%BF%9B%E9%98%B6%E5%AD%A6%E4%B9%A0%EF%BC%88%E4%B8%89%EF%BC%89%E2%80%94%E5%9F%BA%E4%BA%8Ehtml5%20File%20API%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C/
    http://www.cnblogs.com/zichi/p/html5-file-api.html

    IE 滤镜
    https://segmentfault.com/a/1190000002433305
    http://blog.csdn.net/lsd123/article/details/3638329


## file 上传方法
- HTML5 file API
    + Blob Binary Large Object，代表了一段二进制数据，file对象继承 Blob对象，其他操作二进制数据的API(比如file对象)都是在Blob对象基础上的，继承了 Blob的属性和方法
    ```
        生成 Blob 对象有两种方法：一种是使用 Blob 构造函数，另一种是对现有的 Blob 对象使用 slice 方法切出一部分。
        - Blob 构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必需的。

            var a = ["hello", "world"];
            var myBlob = new Blob(a, { "type" : "text/xml" });
            console.log(myBlob);
        
        - Blob 对象的 slice 方法，将二进制数据按照字节分块，返回一个新的 Blob 对象。
            var a = ["hello", "world"];
            var myBlob = new Blob(a, { "type" : "text/xml" });
            var newBlob = myBlob.slice(0, 5);
            console.log(newBlob);

        - Blob 对象有两个只读属性：
            size：二进制数据的大小，单位为字节。（文件上传时可以在前端判断文件大小是否合适）
            type：二进制数据的 MIME 类型，全部为小写，如果类型未知，则该值为空字符串。（文件上传时可以在前端判断文件类型是否合适）
    ```

- 表单数据提交
- flash上传
- 隐藏iframe上传



EcmaScript 5 引入了 blob对象，允许直接操作二进制数据，在blob基础上，又新增相关API用来操作文件
```
<input type="file" name="file" multiple accept="image/*">
    - multiple 多文件上传
    - accept="image/*" 不限制图像格式
    - accept="image/jpeg, image/png, image/gif"
    - accept 属性只能与 <input type="file"> 配合使用，规定了能够通过文件上传的类型
    - 避免使用 accept属性，应该在服务器端验证文件上传
```

### file API
```
<form name="form">
    <button class="btn">选择文件</button>
    <!-- 如果 file没有设置 multiple 属性，那么用户只能选择一个文件，设置了就可以选择多个文件 -->
    <input type="file" name="photo" id="file" style="display:none" multiple>
    <div class="view"></div>
</form>


<script>
    var form = document.form; // form表单
    var photo = form.photo; // input[type=file]
    var view = form.querySelector('.view');
    var btn = form.querySelector('.btn');
        btn.onclick =function(ev){
           ev.preventDefault(); // 阻止默认事件
           return photo.click();
        };

    var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

    form.onchange = function(ev){
        var ev = ev || window.event;
            ev.preventDefault();
        // var files = ev.target.files;
        var files = this.photo.files;
            if(!files.length)return; // 如果 length为0

        // 要用循环获取上传的每一张图片，并把图片依次展现出来
        for(var i=0; len= files.length, i<len; i++){
            var item = files[i];
                if( !rFilter.test(item.type) ){ // 如果不是图片
                    return alert("必须选择图片!");
                }

            /* 每次循环都需要实例化一个 new FileReader() 对象
                FileReader 对象采用异步方式读取文件
            */
            var reader = new FileReader();

            // 读取为 base64
            reader.readAsDataURL(item); // 返回一个基于 Base64编码的URL

                // reader的其他方法
                reader.readerAsBinaryString(item); // 返回二进制字符串，每个字节包含一个 0 到 255 之间的整数，已废弃

                reader.readAsText(item[, utf-8]); // 返回文本,第二个参数可以指定字符编码

                reader.readAsArrayBuffer(item); // ArrayBuffter 对象

                reader.abort(); // 终止文件上传

            // FileReader 回调函数
            reader.onabort = function(){ // 读取终止或 调用 reader.abort() 方法触发

            };
            reader.onerror = function(){ // 文件读取出错

            };
            
            // 开始读取
            reader.onloadstart = function(ev){
                console.log(ev)
            };

            // 触发的读取进度，大文件显示明显
            reader.onprogress = function(ev){
                console.log(ev)
                var status = Math.round( ev.loaded / ev.total * 100 ) +'%';
            };
            reader.onload = function(ev){ //  读取成功后触发
                var url = this.result;
                    // var url = ev.target.result;
                    // var url = reader.result;

                    /*  name：文件名，只读。
                        size：文件大小，单位为字节，只读。
                        type：文件的 MIME 类型，如果分辨不出类型，则为空字符串，只读。
                        lastModified：文件的最后修改时间，格式为时间戳。
                        lastModifiedDate：文件的最后修改时间，格式为 Date 对象实例。
                    */
            };
        }
        
    };
</script>
    

    


```

