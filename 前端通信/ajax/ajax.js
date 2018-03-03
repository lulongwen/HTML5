

	$.ajax(url)
	.done((res)=>{
		var data = (new Function('return' + res)());
	})
	.fail((error)=>{});


	$.ajax({
		method: 'post',
		url: 'index.php',
		data:{name: 'lucy', title: 'Beaty'},
		cache: false
	})
	.done( (msg)=>{
		console.log('data:'+ msg);
	});


	// 加载并执行 js文件
	$.ajax({
		method: 'get',
		url: 'test.js',
		dataType: 'script'
	});



	//
	var id= 'box';
	var request = $.ajax({
		url: 'index.php',
		method: 'post',
		data: {id: id},
		dataType: 'html'
	});

	request.done((msg)=>{
		$('#box').html(msg)
	});

	request.fail((jqXHR, textStatus)=>{
		console.log('request failed:' + textStatus)
	});



	/**
	 * 提交对象数组
	 * arr = [{}, {}, {}];
	 * 
	 * [beforeSend description]
	 * @param  {[type]} ){}    [description]
	 * @param  {[type]} success: function(data){}     [description]
	 * @param  {[type]} error:   function(error){}	} [description]
	 * @return {[type]}          [description]
	 * 
	 */
	$.ajax({
		type: 'get',
		url: '',
		data: {array: arr},
		dataType: 'json',
		timeout: 3000,
		cache: false,
		async: true,
		traditional: true, // 深度序列化
		beforeSend: function(){},
		success: function(data){},
		error: function(error){}
	});