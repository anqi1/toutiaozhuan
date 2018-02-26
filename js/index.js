window.onload = function() {
	var isClick = false;
	// 页数
	var page = 0;
	// 每页展示5个
	var size = 15;
	//类别
	var index = getCookie("index");
	//子类别
	var son = getCookie("son");
	if(index == "") {
		index = 1;
	} else {
		index = parseInt(index);
	};
	if(son == "") {
		son = 0;
	} else {
		son = parseInt(son);
	};
	var pageStart = 0,
		pageEnd = 0;

	$(".bannerlist li").eq(index - 1).addClass("active").siblings().removeClass("active");
	//文章和视频点击
	$(".bannerlist li").bind("click", function() {
		isClick = true;
		// 页数
		page = 0;
		// 每页展示5个
		size = 5;
		//子类别
		son = 0;
		pageStart = 0;
		pageEnd = 0;
		index = $(this).index() + 1;
		$(".dropload-down").remove();
		$(".recommand ul").children().remove();
		// 重置 
		lists();
		dropload();
		$(this).addClass("active").siblings().removeClass("active");
	})

	lists();
	dropload();
	//新人指引
	var isNew = window.jsObj.checkIsNew();
	alert(isNew);
//	alert(isNew);	
	if(isNew == 0 ) {
		$(".modaltwo").hide();
	}else{
	
		$(".modaltwo").show();
		$(document).on("touchmove",function(){
			$(".modaltwo").hide();
			
		})
		$(document).on("click",function(){
			$(".modaltwo").hide();
		});
		setCookie("isNew", isNew, 1);
	}
	//新人学堂
	$("#newtlent").click(function(e) {
		e.preventDefault();
		window.location = "newTalent.html";
	})
	//广告图
	$(".bannerimg").click(function() {
		window.location.href = "../tpl/banner/banner.html"
	})
	dropup();

	//子节点选中请求 数据		
	function lists() {

		var dat = {
			"categorytype": index,
			"categoryid": son,
			"p": page,
			"number": size
		};
		requestMenthodPost("getContentList", dat).done(function(e) {
			var str = "";
			var categorylist = e.data.categorylist;
			//加载子节点
			$.each(categorylist, function(v, k) {
				str += "<li son='" + k.categoryid + "'>" + k.categoryname + "</li>";
			});
			$(".tabItem2 ul").html(str);
			$(".tabItem2 li").each(function() {
				var son2 = $(this).attr("son");
				if(son == son2) {
					$(this).addClass("active").siblings().removeClass("active");
				}
			})
			$(".tabItem2 li").bind("click", function(e) {
				page = 0;
				pageStart = 0;
				pageEnd = 0;
				size = 5;
				e.preventDefault();
				son = Number($(this).attr("son"));
				$(this).addClass("active").siblings().removeClass("active");
				$(".dropload-down").remove();
				$(".recommand ul").children().remove();
				setCookie("index", index, 1);
				setCookie("son", son, 1);
				dropload();
			})
			if(isClick == true) {
				$(".tabItem2 li").eq(0).addClass("active").siblings().removeClass("active");
			};
		})
	}

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
				page++;
				// 拼接HTML
				var result = '';
				var data = {
					"categorytype": index,
					"categoryid": son,
					"p": page,
					"number": size
				};
				requestMenthodPost("getContentList", data).done(function(e) {
					categorylist = e.data.categorylist;
					var contentlist = e.data.contentlist;
					var arrLen = contentlist.length;
					pageEnd = size * page;
					pageStart = pageEnd - size;
					if(arrLen > 0) {
						for(var i = 0; i < arrLen; i++) {
							result += '<li>' +
								'<a href="detail.html?categorytype=' + index + '&contentid=' + contentlist[i].contentid + '">' +
								'<div class="title">' +
								'<div>' +
								'<h3>' + contentlist[i].title + '</h3></div><div class="detail">' +
								'<p class="money"><span></span>' + contentlist[i].money_scan + '</p>' +
								'<p class="browse"><span></span>' + contentlist[i].num_scan + '</p></div></div>' +
								'<div class="titleimg" style="background:url(' + contentlist[i].icon_small + ')no-repeat;background-size:100% 100%">' +
								'<span></span></div></a></li>';
							//数据加载完;
							if(size > arrLen) {
								// 锁定
								me.lock();
								// 无数据
								me.noData();
								setTimeout(function() {
									$(".dropload-down").slideUp("slow").fadeOut(3000);
								}, 1000)
								me.resetload();

							}
						}
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();

					}
					// 插入数据到页面，放到最后面
					$('.recommand ul').append(result);

					//是否添加replay的图标
					$(".titleimg span").each(function() {
						if(index == 2) {
							$(this).addClass("replay");
						} else {
							$(this).removeClass("replay")
						}
					})
					wordnum(20, ".recommand .title h3")
					// 每次数据插入，必须重置
					me.resetload();

				})

			}

		});
	}
};