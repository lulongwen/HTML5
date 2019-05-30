var $ = function(id){return document.getElementById(id);};

window.onload = function()
{
	var uploadbox = $("uploadbox");
	
	uploadbox.ondragover = function(e)
	{
		e.preventDefault();
		this.innerHTML = "�ͷ���꣬�����ϴ���";
		this.style.background = "#eee";
		return false;
	};
	
	uploadbox.ondragleave = function()
	{
		this.innerHTML = "���ļ���ק�������򣬼����ϴ���";
		this.style.background = "#fff";
		return false;
	};
	
	uploadbox.ondrop = function(e)
	{
		e.preventDefault();
		var fd = new FormData();
		for(var i = 0, j = e.dataTransfer.files.length; i < j; i++)
		{
			fd.append("files[]", e.dataTransfer.files[i]);
		}
		upload(fd);
		return false;
	};
	
	var upload = function(f)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "up.php", true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'multipart/form-data;');
		//HTML5������API���洢���ϴ������е���Ϣ
		xhr.upload.onprogress = function(e)
		{
			var percent = 0;
			if(e.lengthComputable)
			{
				percent = 100 * e.loaded / e.total;
				uploadbox.innerHTML = percent + "%";
			}
		};
		xhr.send(f);
	};
};