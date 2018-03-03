
var cookie ={
  // 设置 cookie
  set: function (key, val, time){
    time = time || 0;
    var DATE = new Date();
    // 设置时间，获取今天的时间，在今天的基础上增加多少天
    DATE.setDate(DATE.getDate()+ time);
    if(time){
      document.cookie = `${key}=${val};expires="${DATE}"`;
    }
    else{
      document.cookie = `${key}=${val}`;
    }
    return document.cookie;
  },
  // 获取 cookie
  get: function (key){
    var cookie = document.cookie;
    var arr = cookie.split('; ');
    var val = '';
  
    arr.forEach(function(elem){
      var lock = elem.split('=')[0] == key;
      if(lock){
        val = elem.split('=')[1];
      }
    });
    return val ? val : false;
  },
  // 删除 cookie，只要 cookie的时间比当前时间小，就为删除
  remove: function (key, value){
    return this.set(key, value, -1);
  }
}








