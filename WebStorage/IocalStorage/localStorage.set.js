	
	/**
	 * [setStorage 设置 localStorage 过期时间] 
	 * @param {[type]} key [description]
	 * @param {[type]} val [description]
	 * 使用：
	 * set('title', 'langwen'); // 设置
	 * get('title', 1000*60); // 获取
	 */
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