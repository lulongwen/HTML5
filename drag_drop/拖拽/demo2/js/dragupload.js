var $ = function(id){return document.getElementById(id);};

window.onload = function()
{
	var content = $("content");
	var uploadbox = $("uploadbox");
	var filelist = $("filelist");
	
	uploadbox.ondragover = function(e)
	{
		e.preventDefault();
		this.innerHTML = "释放鼠标，立即上传！";
		this.style.background = "#eee";
		return false;
	};
	
	uploadbox.ondragleave = function()
	{
		this.innerHTML = "将文件拖拽至此区域，即可上传！";
		this.style.background = "#fff";
		return false;
	};
	
	uploadbox.ondrop = function(e)
	{
		e.preventDefault();
		var len = e.dataTransfer.files.length;
		len > 9 && (content.style.width = "608px", content.style.overflow = "auto");
		for(var i = 0; i < len; i++)
		{
			(
				function(f)
				{
					if(f.type.match(/image*/))
					{
						var reader = new FileReader();
						reader.onload = function(e)
						{
							uploadbox.style.display = "none";
							var fd = new FormData();
							var li = document.createElement("li");
							var img = document.createElement("img");
							img.src = e.target.result;
							var progress = document.createElement("span");
							progress.className = "progress";
							var percentage = document.createElement("span");
							percentage.className = "percentage";
							percentage.innerHTML = "0%";
							li.appendChild(img);
							li.appendChild(progress);
							li.appendChild(percentage);
							filelist.appendChild(li);
							fd.append("files", f);
							upload(fd, li, progress, percentage);
						};
						reader.readAsDataURL(f);
					}
					else
					{
						alert("带上穿的文件列表中含有非图片文件，因此跳过");
					}
				}
			)(e.dataTransfer.files[i]);
		}
		return false;
	};
	
	var upload = function(f, li, progress, percentage)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "up.php", true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'multipart/form-data;');
		//HTML5新增的API，存储了上传过程中的信息
		xhr.upload.onprogress = function(e)
		{
			var percent = 0;
			if(e.lengthComputable)
			{
				percent = 100 * e.loaded / e.total;
				progress.style.height = percent + "px";
				percentage.innerHTML = percent + "%";
				percent >= 100 && (li.className = "done");
			}
		};
		xhr.send(f);
	};
};