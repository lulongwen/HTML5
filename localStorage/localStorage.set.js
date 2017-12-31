


	// 设置 localStorage 过期时间
	function setStorage(key, val){
		var currentTime = new Date().getTime();
		return localStorage.setItem(key, JSON.stringify({data:val, time: currentTime}) )
	}


	function getStorage(key,expires){
		var data = JSON.parse( localStorage.getItem(key) );
		var nowTime = ( new Date().getTime() - data.time) > expires;
		if(nowTime){
			return 'expires';
		}
		else{
			return data.data;
		}
	}