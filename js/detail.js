window.onload = function() {
	FastClick.attach(document.body);
	var did = $.getUrl('categorytype');
	var contentid = $.getUrl("contentid");
	var html = "";
	//类别
	var index;
	var data;
	var scene = 0;
	var desc = "";
	var imgUrl = "";
	//新人指引
	var isNew = window.jsObj.checkIsNew();
	alert(isNew);
	if(isNew == 0) {
		$(".modaltwo").hide();
	} else {
		$(".modaltwo").show();

		$(document).on("touchmove", function() {
			$(".modaltwo").hide();

		});
		$(document).on("click", function() {
			$(".modaltwo").hide();
		});
	}
	if(did == "1") {
		index = 1;
		data = {
			"contentid": contentid
		};
		requestMenthodGet("getContentDetail", data).done(function(data) {
			$("title").text(data.data.title);
			$(".header p").text(data.data.title);
			wordnum(10, ".header p");
			shareType(data);
			$(".content_detail").html(write(data));
			$(".detailcontent img").each(function() {
				var width = $(this).attr("width");
				var height = $(this).attr("height");
				$(this).css({
					"width": "100%",
					"height": (height / 100) + "%"
				});
			})
			if(data.data.isHign == "1") {
				$(".detailcontent").html("<p class='sharecontent'>内容分享到朋友圈可见,且分享至朋友圈方可获得收益</p>");
				$(".recommedtitle").hide();
				$(".recommand").hide();
			} else {
				$(".recommedtitle").show();
				$(".recommand").show();
				dropload();
			}
			//点击展开全文           
			var unfoldField = document.querySelector(".allwrite");
			var wrapH = document.querySelector(".content_detail").offsetHeight;
			var wrap = document.querySelector(".content_detail");
			var contentH = document.querySelector(".detailcontent").offsetHeight;
			// 如果实际高度大于我们设置的默认高度就把超出的部分隐藏。
			setTimeout(function() {
				if(contentH > wrapH) { //当内容中有图片时，立即获取无法获取到实际高度，而window.onload又太慢了，故用定时器延迟
					unfoldField.style.display = "block";
				}
				unfoldField.onclick = function() {
					this.parentNode.removeChild(this);
					wrap.style.maxHeight = "100%";
				}
			}, 100)
		})
	} else if(did == "2") {
		index = 2;
		data = {
			"contentid": contentid
		};
		requestMenthodGet("getContentDetail", data).done(function(data) {
			$("title").text(data.data.title);
			$(".header p").text(data.data.title);
			wordnum(10, ".header p");
			shareType(data);
			$(".content_detail").html(video(data));
			$("video").unbind("click");
			if(data.data.isHign == "1") {
				$(".detailcontent").html("<p class='sharecontent'>内容分享到朋友圈可见,且分享至朋友圈方可获得收益</p>");
				$(".recommedtitle").hide();
				$(".recommand").hide();
			} else {
				$(".recommedtitle").show();
				$(".recommand").show();
				dropload();
			}
		})
	}
	$(".makemoney").click(function(){
		window.location.href="esoterica.html";
	})
	//分享
	function shareType(data) {
		var shared = {
			"uuid": uid,
			"contentid": contentid
		}
		var url = "";
		$(".sharetype li").click(function() {
			//获取分享链接
			scene = $(this).index();
			desc = data.data.title_small;
			var title = $(".detailtitle h3").text();
			imgUrl = data.data.imgUrl;
			requestMenthodPost("getShareUrl", shared).done(function(e) {
				if(scene == 0) {
					url = e.data.shareurl_nocircle;
				} else {
					url = e.data.shareurl_circle;
				}
				window.jsObj.shareContent(title, desc, url, scene, imgUrl);
			})

			//			var url=window.location.href;		

		})
	}
	//阅读数量,标题和浏览量
	// 重置

	// dropload
	function dropload() {
		$('.recommand').dropload({
			scrollArea: window,
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
				domNoData: '<div class="dropload-noData">没有更多了^_^</div>'
			},
			loadDownFn: function(me) {
				// 拼接HTML
				var result = '';
				var dat = {
					"categorytype": did
				};
				requestMenthodPost("getShowContentRecommendList", dat).done(function(e) {
					var contentlist = e.data;
					var arrLen = contentlist.length;
					if(arrLen > 0) {
						$.each(contentlist, function(i) {
							result += '<li><a href="detail.html?categorytype=' + did + '&contentid=' + contentlist[i].contentid + '">' +
								'<div class="title"><div><h3>' + contentlist[i].title + '</h3></div><div class="detail">' +
								'<p class="money"><span></span>' + contentlist[i].money_scan + '</p>' +
								'<p class="browse"><span></span>' + contentlist[i].num_scan + '</p></div></div>' +
								'<div class="titleimg" style="background:url(' + contentlist[i].icon_small + ')no-repeat;background-size:cover">' +
								'<span></span></div></a></li>';
							//数据加载完;

							if(arrLen >= (i - 1)) {
								// 锁定
								me.lock();
								// 无数据
								me.noData();
								setTimeout(function() {
									$(".dropload-down").slideUp("slow").fadeOut(3000);
								}, 1000)
								//	                      	break;
							}
						})
						// 如果没有数据
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();
						setTimeout(function() {
							$(".dropload-down").slideUp("slow").fadeOut(3000);
						}, 1000)
					}
					// 插入数据到页面，放到最后面
					$('.recommand ul').append(result);
					wordnum(20, ".title h3");
					// 每次数据插入，必须重置
					me.resetload();
				});
			}
		});
	}
	//文章加载
	function write(data) {
		html += '<div class="detailtitle"><h3>' + data.data.title + '</h3></div>' +
			'<div class="detailtime"><p>发布时间 : <span>' + getlocalTime(data.data.ttime) + '</p>' +
			'<p>阅读量 : ' + data.data.num_scan + '</p></div>' +
			'<div class="banner"></div>' +
			'<div class="detailcontent">' + data.data.content +
			'</div><div class="allwrite"><div class="linear"></div>' +
			'<p>点击展开全文<span class="alldown"></span></p></div>';
		return html;
	}
	//视频加载

	function video(data) {
		html += '<div class="video"><iframe frameborder="0" scrolling="no" style="width:100%;height:100%;" id="iframe1" src="' + data.data.content + '" data-src="' + data.data.content + '">' +
			'</iframe></div><div class="vbanner"></div>' +
			'<div class="google"></div><div class="detailtitle"><h3>' + data.data.title + '</h3></div>' +
			'<div class="detailtime"><p>发布时间 : <span>' + getlocalTime(data.data.ttime) + '</span></p>' +
			'<p>阅读量 : ' + data.data.num_scan + '</p></div>';
		return html;
	}
	dropup();
}