
var Mirana = {};	
(function(){
	Mirana.isSupportsVideo = function(){
		var doc = document;
		return  doc.getElementsByTagName("video")[0].canPlayType || !!doc.createElement('video').canPlayType;
	};
	Mirana.Video = function(element){
		(function(element){
			var Y = YAHOO,
				U = YAHOO.util,
				D = U.Dom,
				E = U.Event,
				L = Y.lang,
				doc = document,
				win = window,
				MiranaVideo = {} ; /*米莱娜 取名之月之女祭司*/

			 /* Mirana 工具包*/
			 MiranaVideo.util = {
				//检测是否支持html5 Video
				isSupportsVideo : function(){
					return  doc.getElementsByTagName("video")[0].canPlayType || !!doc.createElement('video').canPlayType;
				},
				//格式化 时间
				formatTime:function(seconds){
					minutes = Math.floor(Math.round(seconds) / 60);
					minutes = (minutes >= 10) ? minutes : "0" + minutes;
					seconds = Math.floor(seconds % 60);
					seconds = (seconds >= 10) ? seconds : "0" + seconds;
					return minutes + ":" + seconds;
				},
				getRelativePosition:function(x,relativeElement){
					 return Math.max(0, Math.min(1, (x - D.getX(relativeElement)) / relativeElement.offsetWidth));
				}
				
			 }

			 /*异常流*/
			 MiranaVideo.Error = {

				MEDIA_ERR_ABORTED : "媒体资源获取异常",

				MEDIA_ERR_NETWORK : "网络错误",
				
				MEDIA_ERR_DECODE : "媒体解码错误",

				MEDIA_ERR_SRC_NOT_SUPPORTED : "视频格式不被支持"
			 }
			 
			 /*加载状态*/
			 MiranaVideo.networkState = {
				
				NETWORK_EMPTY : "尚未初始化",
				
				NETWORK_IDLE : "加载完成，网络空闲",

				NETWORK_LOADING : "视频加载中",
				
				NETWORK_NO_SOURCE : "加载失败"
			 
			 }
			
			 /*Mirana main code */
			 L.augmentObject(MiranaVideo,{
				//初始化
				init:function(element){
					 var that = this;
					 this.video = element;
					 this.box = element.parentNode;
					 this.buildPoster();
					 this.buildButton();
					 this.buildController();
					 this.bind();
					 this.setVolume(localStorage.volume || 0.85);		
					 this.watchBuffer = setInterval(function(){
						that.updateBufferedTotal();
					}, 500);
				},
				//默认图片
				buildPoster:function(){
					var poster;
					// <video ... poster="xxx.png">
					if (this.video.getAttribute("poster")) {
						  poster = this.poster = doc.createElement("img");
						  this.video.parentNode.appendChild(poster);
						  poster.src = this.video.getAttribute("poster");
						  D.addClass(poster,"miranavideo-poster");
						  D.setStyle(poster,"display","block");
					}else {
						 this.poster = false;
					}
					
					this.positionPoster();
				},
				//图片位置
				positionPoster:function(){
					 var poster = this.poster;
					 if (poster == false || D.getStyle(poster,"display") == 'none') return;
					 D.setStyle(poster,"width",this.video.offsetWidth + "px");
					 D.setStyle(poster,"height",this.video.offsetHeight + "px");
					 D.setStyle(poster,"left","0px");
					 D.setStyle(poster,"top","0px");
				},
				showPoster:function(){
					 if (!this.poster) return;
					 D.setStyle(this.poster,"display","block");
				},
				//隐藏图片
				hidePoster:function(){
					 if (!this.poster) return;
					 D.setStyle(this.poster,"display","none");
				},
				//构建 Diy Video Control
				buildController:function(){
					var ul = doc.createElement("UL"),
					html = '<li class="miranavideo-play-control miranavideo-play">'+
						 '<span></span>'+
					   ' </li>'+
						'<li class="miranavideo-progress-control">'+
						  '<ul>'+
							'<li class="miranavideo-progress-holder">'+
							  '<span class="miranavideo-load-progress"></span><span class="miranavideo-play-progress"></span>'+
							'</li>'+
							'<li class="miranavideo-progress-time">'+
							  '<span class="miranavideo-current-time-display">00:00</span><span> / </span><span class="miranavideo-duration-display">00:00</span>'+
							'</li>'+
						 ' </ul>'+
						'</li>'+
						'<li class="miranavideo-volume-control">'+
						  '<ul>'+
						   ' <li></li><li></li><li></li><li></li><li></li><li></li>'+
						  '</ul>'+
						'</li>'+
						'<li class="miranavideo-fullscreen-control">'+
						  '<ul>'+
							'<li></li><li></li><li></li><li></li>'+
						 ' </ul>'+
						'</li>';
					 D.addClass(ul,'miranavideo-controls');
					 ul.innerHTML = html;
					 this.box.appendChild(ul);

					 //控制条
					 this.controls = ul;
					 //播放按钮
					 this.playControl = D.getElementsByClassName("miranavideo-play-control","li",ul)[0];


					 //进度控制器
					 this.progressControl = D.getElementsByClassName("miranavideo-progress-control","li",ul)[0];
					 //进度条
					 this.progressHolder = D.getElementsByClassName("miranavideo-progress-holder","li",ul)[0];
					 //已经播放的进度
					 this.playProgress = D.getElementsByClassName("miranavideo-play-progress","span",ul)[0];

					 //总时间显示
					 this.durationDisplay = D.getElementsByClassName("miranavideo-duration-display","span",ul)[0];
					 //当前时间显示
					 this.currentTimeDisplay = D.getElementsByClassName("miranavideo-current-time-display","span",ul)[0];

					 //音量控制器
					 this.volumeControl = D.getElementsByClassName("miranavideo-volume-control","li",ul)[0];
					 //音量显示器
					 this.volumeDisplay = this.volumeControl.children[0];

					 //全屏
					 this.fullscreenControl =  D.getElementsByClassName("miranavideo-fullscreen-control","li",ul)[0];

					 //加载条
					 this.loadProgress = D.getElementsByClassName("miranavideo-load-progress","span",ul)[0];

					 D.setStyle(this.controls,"display","block");
					 this.positionController();
				},
				//定位
				positionController:function(){
					var controls = this.controls;
					if(D.getStyle(controls,"display") == "none") return;
					//D.setStyle(controls,"top",(this.video.offsetHeight - controls.offsetHeight) + "px");
					D.setStyle(controls,"bottom","0px");
					D.setStyle(controls,"left","0px");
					D.setStyle(controls,"width",this.video.offsetWidth + "px");

					//定位后，重置大小
					this.sizeProgressBar();
				},
				//设置进度条的大小
				sizeProgressBar:function(){
					D.setStyle(this.progressControl,"width",(this.controls.offsetWidth - 130) + "px");
					D.setStyle(this.progressHolder,"width",(this.progressControl.offsetWidth - 85) + "px");
					this.updatePlayProgress();
				},
				//更新进度
				updatePlayProgress:function(){
					if(D.getStyle(this.controls,"display") == "none") return;
					//进度 = (当前之前 / 总时间) * 宽度- 2 (边框)
					D.setStyle(this.playProgress,"width",((this.video.currentTime / this.video.duration) * (this.progressHolder.offsetWidth - 2)) + "px");
					this.updateTimeDisplay();
					if(!this.video.paused){
						this.setLoading();
					}
				},
				//设置播放进度
				setPlayProgress:function(newProgress){
					this.video.currentTime = newProgress * this.video.duration;
					this.playProgress.style.width = newProgress * (this.progressHolder.offsetWidth - 2)  + "px";
					this.updateTimeDisplay();
				},
				//更新时间
				updateTimeDisplay:function(){
					this.currentTimeDisplay.innerHTML = this.util.formatTime(this.video.currentTime);
					if (this.video.duration) this.durationDisplay.innerHTML = this.util.formatTime(this.video.duration);
				},
				trackPlayProgress:function(){
					var that = this;
					this.playProgressInterval = setInterval(function(){
						that.updatePlayProgress();
					}, 33);
				},
				stopTrackingPlayProgress:function(){
					 clearInterval(this.playProgressInterval);
				},
				//音量显示
				updateVolumeDisplay:function(){
					var volNum = Math.floor(this.video.volume * 6.5);
					for(var i=0; i<6; i++) {
					  if (i < volNum) {
						 D.setStyle(this.volumeDisplay.children[i],"borderColor","#fff");
					  } else {
						 D.setStyle(this.volumeDisplay.children[i],"borderColor","#555");
					  }
					}
				},
				setVolume:function(newVol){
					this.video.volume = parseFloat(newVol);
					localStorage.volume = this.video.volume;
				},
				setPlayProgressWithEvent:function(e){
					pageX = E.getPageX(e);
					var newProgress = this.util.getRelativePosition(pageX, this.progressHolder);
					this.setPlayProgress(newProgress);
				},
				setVolumeWithEvent:function(e){
					 pageX = E.getPageX(e);
					 var newVol = this.util.getRelativePosition(pageX, this.volumeControl);
					 this.setVolume(newVol);
				},
				fullscreenOn:function(){
					this.videoIsFullScreen = true;
					this.docOrigOverflow = doc.documentElement.style.overflow;
					doc.documentElement.style.overflow = 'hidden';
					this.box.className = "miranavideo-js-box miranavideo-fullscreen";
					this.positionController();
					this.positionPoster();
				},
				fullscreenOff: function(){
					this.videoIsFullScreen = false;
					doc.documentElement.style.overflow = this.docOrigOverflow;
					this.box.className = "miranavideo-js-box";
					this.positionController();
					this.positionPoster();
				 },
				buildButton:function(){
					this.playButton = doc.createElement("IMG"); 
					this.box.appendChild(this.playButton);
					D.addClass(this.playButton,"miranavideo-js-button");
					this.positionButton();
				},
				positionButton:function(){
					 var playButton = this.playButton;
					 if (playButton == false || D.getStyle(playButton,"display") == 'none') return;
					 D.setStyle(playButton,"width",this.video.offsetWidth + "px");
					 D.setStyle(playButton,"height",this.video.offsetHeight + "px");
					 D.setStyle(playButton,"left","0px");
					 D.setStyle(playButton,"top","0px");
				},
				hideButton:function(){
					if (!this.playButton) return;
					D.setStyle(this.playButton,"display","none");
				},
				showButton:function(){
					if (!this.playButton) return;
					D.setStyle(this.playButton,"display","block");
				},
				updateLoadProgress:function(decimal){
					if(D.getStyle(this.controls,"display") == "none") return;
					D.setStyle(this.loadProgress,"width",(decimal * (this.progressHolder.offsetWidth - 2)) + "px");
				},
				updateBufferedTotal:function(){
					if (this.video.buffered && this.video.buffered.length >= 1) {
					  if (this.video.buffered.end(0) == this.video.duration) {
						this.updateLoadProgress(1);
						clearInterval(this.watchBuffer);
					  }
					} else {
					  clearInterval(this.watchBuffer);
					}
				},
				buildMsgBox:function(){
					this.msgBox = doc.createElement("div");
					this.box.appendChild(this.msgBox);
					D.addClass(this.msgBox,"miranavideo-js-msg");
				},
				showMsg:function(log){
					if (!this.msgBox) return;
					D.setStyle(this.msgBox,"display","block");
					var msgText = "Error";
					if(log){
						switch(log){
							case 1:
								msgText = MiranaVideo.Error.MEDIA_ERR_ABORTED;
								break;
							case 2:
								msgText = MiranaVideo.Error.MEDIA_ERR_NETWORK;
								break;
							case 3:
								msgText = MiranaVideo.Error.MEDIA_ERR_DECODE;
								break;
							case 4:
								msgText = MiranaVideo.Error.MEDIA_ERR_SRC_NOT_SUPPORTED;
								break;
							default:
								break;
						}
						this.msgBox.innerHTML = msgText;
					}
					this.positionMsg();
				},
				hideMsg:function(){
					if (!this.msgBox) return;
					D.setStyle(this.msgBox,"display","none");
				},
				positionMsg:function(){
					var msgBox = this.msgBox;
					 if (msgBox == false || D.getStyle(msgBox,"display") == 'none') return;
					 D.setStyle(msgBox,"width",this.video.offsetWidth + "px");
					 D.setStyle(msgBox,"height",this.video.offsetHeight + "px");
					 D.setStyle(msgBox,"lineHeight",this.video.offsetHeight + "px");
					 D.setStyle(msgBox,"left","0px");
					 D.setStyle(msgBox,"top","0px");
				},
				buildLoading:function(){
					this.loadImg = doc.createElement("IMG");
					this.box.appendChild(this.loadImg);
					D.addClass(this.loadImg,"miranavideo-js-loadding");
					D.setStyle(this.loadImg,"display","none");
				},
				showLoadImg:function(){
					if (!this.loadImg) return;
					D.setStyle(this.loadImg,"display","block");
				},
				hideLoadImg:function(){
					if (!this.loadImg) return;
					D.setStyle(this.loadImg,"display","none");
				},
				setLoading:function(){
					if(this.video.readyState < 3){
						if(!this.loadImg){
							this.buildLoading();
						}
						this.showLoadImg();
					}else{
						this.hideLoadImg();
					}
				}
			 });


			 /*MiranaVideo事件*/
			 L.augmentObject(MiranaVideo,{
				//播放开关
				onPlayControlClick:function(){
					if(this.video.error && this.video.error.code){
						this.hideButton();
						this.showMsg(this.video.error.code);
						return ;
					}
					if (this.video.paused) {
					  this.video.play();
					} else {
					  this.video.pause();
					}
				},
				onPlay: function(){
					var that = this;
					this.playControl.className = "miranavideo-play-control miranavideo-pause";
					this.hidePoster();
					this.hideButton();
					this.trackPlayProgress();
				},
				onPause: function(){
					this.playControl.className = "miranavideo-play-control miranavideo-play";
					this.stopTrackingPlayProgress();
				},
				onEnded:function(){
					this.onPause();
					this.video.pause();
					this.showButton();
					this.hideLoadImg();
				},
				onVolumeChange:function(){
					this.updateVolumeDisplay();
				},
				onError:function(log){
					if(!this.msgBox){
						this.buildMsgBox();
					}
				},
				onProgressHolderMouseDown:function(e){
					this.stopTrackingPlayProgress();

					if (this.video.paused) {
						 this.videoWasPlaying = false;
					} else {
					   this.videoWasPlaying = true;
					   this.video.pause();
					}

					this.setPlayProgressWithEvent(e);

					if (this.videoWasPlaying) {
						this.video.play();
						this.trackPlayProgress();
					}
				},
				onVolumeControlMouseDown:function(e){
					this.setVolumeWithEvent(e);
				},
				onFullscreenControlClick:function(e){
					if (!this.videoIsFullScreen) {
					  this.fullscreenOn();
					} else {
					  this.fullscreenOff();
					}
				},
				onProgress:function(e){
					if(e.total > 0) {
					  this.updateLoadProgress(e.loaded / e.total);
					}
					if(!this.video.paused){
						this.setLoading();
					}
				}
			 
			 })
			 
			 /*事件绑定*/
			 L.augmentObject(MiranaVideo,{
				bind:function(){
					var that = this;
					E.on(this.playControl,"click",function(){
						that.onPlayControlClick();
					});
					E.on(this.playButton,"click",function(){
						that.onPlayControlClick();
					});
					E.on(this.video,"play",function(){
						that.onPlay();
					});
					E.on(this.video,"pause",function(){
						that.onPause();
					});
					E.on(this.video,"ended",function(){
						that.onEnded();
						that.showPoster();
					});
					E.on(this.video,"error",function(){
						that.onError(that.video.error.code);
					});
					E.on(this.video,"progress",function(e){
						that.onProgress(e);
					});
					E.on(this.video,"volumechange",function(){
						that.onVolumeChange();
					});
					E.on(this.progressHolder,"mousedown",function(e){
						that.onProgressHolderMouseDown(e);
					});
					E.on(this.volumeControl,"mousedown",function(e){
						that.onVolumeControlMouseDown(e);
					});
					E.on(this.fullscreenControl,"click",function(e){
						that.onFullscreenControlClick();
					});
					E.on(this.box,"mouseover",function(){
						D.setStyle(that.controls,"display","block");
					});
					E.on(this.box,"mouseout",function(){
						D.setStyle(that.controls,"display","none");
					});
				}
			 });
			 MiranaVideo.init(element);
		})(element);
	}
})();


