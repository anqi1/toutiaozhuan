window.onload = function() {

	var jsonStr = ["新用户首次收徒非会员用户加入", "新用户首次转发视频观看后获得奖励", "新用户首次分享文章阅读后获得奖励"];
	var dailStr = ["每日首次转发视频观看后获得奖励", "每日首次分享文章阅读后获得奖励"];
	wordnum(10, ".modallist .container p");
	$(".modal").click(function() {
		$(".modal").hide();
	})
	var data = {
		"uuid": uid
	};
	//类别
	var index = 1;
	var urls = window.location.host;
	//数据请求
	requestMenthodPost("getDayTask", data).done(function(e) {
		var str = "";
		var html = "";
		var daytasklist = e.data.daytasklist;
		var newtasklist = e.data.newtasklist;
		$(".dailytask .complete li").each(function(i) {
			$(this).find(".openshare").children("p").html(daytasklist[i].rewardmoney + "<span class='money'></span>")
			$(this).attr("status", daytasklist[i].status);
		})
		$(".newTalent .complete li").each(function(i) {
			$(this).find(".openshare").children("p").html(newtasklist[i].rewardmoney + "<span class='money'></span>")
			$(this).attr("status", newtasklist[i].status);
		})
		//判断是否完成
		$("li").each(function() {
			if($(this).attr("status") == 1) {
				$(this).addClass("active");
				$(this).children(".share").unbind("click");
			} else {
				$(this).removeClass("active");
				$(this).children(".share").bind("click", function() {
					var text = $(this).parents("li").find("p.taskname").text();
					//不同点击得到不同的内容
					if(text == "分享视频") {
						index = 2;
						$(".modaltitle").html("<span class='iconfont icon-huo'></span>推荐视频");

						$(".dropload-down").remove();
						$(".modallist ul").children().remove();
						dropload();
						$(".modal").show();
					} else if(text == "分享文章") {
						index = 1;
						$(".modaltitle").html("<span class='iconfont icon-huo'></span>推荐文章");
						$(".dropload-down").remove();
						$(".modallist ul").children().remove();
						dropload();
						$(".modal").show();
					} else if(text == "收徒") {
						window.location = "beMakeMoney.html";
					}

				});
			}
		})
		//折叠区
		$(".complete li").click(function() {
			var that = $(this);
			that.toggleClass("add");
			if(that.hasClass("add")) {
				that.children(".share").show();
				that.find("span.iconfont.icon-down-trangle").css({
					"opacity": "0"
				})
			}
			that.children(".balace").click(function() {
				that.children(".share").hide();
				that.find("span.iconfont.icon-down-trangle").css({
					"opacity": "1"
				})
			})
		})
	})
	//推荐文章
	// 重置
	// dropload
	function dropload() {

		// 拼接HTML
		var result = '';
		var dat = {
			"categorytype": index
		};
		requestMenthodPost("getContentRecommendList", dat).done(function(e) {
			var contentlist = e.data;
			var arrLen = e.data.length;

			for(var i = 0; i < arrLen; i++) {
				result += '<li><a href="http://' + urls + '/tpl/detail.html?categorytype=' + index + '&contentid=' + contentlist[i].contentid + '">' +
					'<div class="image" style="background:url(' + contentlist[i].icon_small + ')no-repeat;background-size:cover"></div>' +
					'<div class="container"><p>' + contentlist[i].title + '</p></div>' +
					'<div class="readshare"><span class="red">' + contentlist[i].num_scan + '阅读</span>'
				'<div class="sreader">分享赚钱</div></div></a></li>';
			}

			// 插入数据到页面，放到最后面
			$('.modallist ul').append(result);
			wordnum(30, ".container p");

		});

	}
}