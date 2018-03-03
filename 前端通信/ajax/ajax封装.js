(function(win){
    win.ajax = function(opt){
        var defults = {
            type:"get",
            data:"",
            async:true
        }
        opt = extend(defults,opt || {});

        try{
            var xhr = new XMLHttpRequest();
        }catch (e){
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
		
		if( opt.type == "get" && opt.data ){
			opt.url += "?"+opt.data;
		}
		
        xhr.open(opt.type,opt.url,opt.async);

        if( opt.type == "get" ){
            xhr.send();
        }else{
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send( opt.data );
        }

        xhr.onreadystatechange = function(){
            if( xhr.readyState == 4 ){
                if( xhr.status == 200 ){
                    opt.success && opt.success(xhr.responseText);
                }else{
					throw new Error('出错了,Err：' + xhr.status);
                }
            }
        }
    }
    function extend(obj1,obj2){
        for(var i in obj2){
            obj1[i] = obj2[i];
        }
        return obj1;
    }
})(window);