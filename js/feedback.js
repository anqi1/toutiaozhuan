window.onload = function() {
	//tabs选项
	var index = 0,
		html = "";
	var type = 1;

	feedback();
	$(".tabs li").bind("click", function() {
		index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		if(index == 0) {
			html = "";
			html = '<h3>请选择您的反馈类型（必选）</h3><ul class="type">' +
				'<li class="active"><a href="">提问</a></li>' +
				'<li><a href="">建议</a></li>' +
				'<li><a href="">商务合作</a></li></ul>' +
				'<div class="advice" id="advice">' +
				'<textarea name="" id="" cols="30" rows="5" placeholder="请详情描述您的问题或宝贵意见(空格也是一个字符)" maxlength="500" autofocus class="textarea"></textarea>' +
				'<p>(<span class="count">0</span>/200)</p>' +
				'<div class="submit">提交</div></div>';
			$(".content").html(html);
		} else {
			html = "";
			requestMenthodGet("findfeedBack/" + uid).done(function(e) {
				for(var i in e.data) {
					html += '<div class="answer"><div class="msg">' +
						'<span>留言:</span><p>'+e.data[i].opinion+'</p></div>' +
						'<p class="time">'+getlocalTime(e.data[i].ttime)+'</p>' +
						'<div class="replybox" ><div class="reply msg"><span>回复:</span>' +
						'<p>' + e.data[i].reply + '</p></div>' +
						'<p class="time">'+getlocalTime(e.data[i].replyTime)+'</p></div></div>';
				};
				$(".content").html(html);
				$(".reply p").each(function() {
					if($(this).text().replace(/(^\s*)|(\s*$)/g, "") == "null") {
						$(this).text("暂无留言");
						$(this).parents(".replybox").find("p.time").hide();
					}
				})
			})

		}
		feedback();

	})
	$(".tabs li").eq(0).bind("click").addClass("active");
	$(".repact-a").hide();
	//意见反馈
	function feedback() {

		//type选择
		$("ul.type").on("click", "li", function(e) {
			e.preventDefault();
			var indextype = $(this).index();
			type = indextype + 1;
			$(this).addClass("active").siblings().removeClass("active");

		});
		$('.submit').click(function() {
			if($("textarea").val() == "") {
				$(".repact-a").text("意见不能为空");
				$(".repact-a").show().delay(3000).fadeOut();
				return false;
			}
			var opinion = $("textarea").val();
			//提交提问
			var dat = {
				"uuid": uid,
				"type": type,
				"opinion": opinion
			};
			requestMenthodPost("addFeedback", dat).done(function(e) {

				if(e.msg == "操作成功") {
					$(".repact-a").text(e.msg);
					$(".repact-a").show().delay(3000).fadeOut();
					setTimeout(function() {
						location.reload();
					}, 1000)
				} else {
					$(".repact-a").text(e.msg);
					$(".repact-a").show().delay(3000).fadeOut();
				}

			})
		})
		//限制字符
		var maxlength = 200; //初始化最大字数
		$("textarea").keyup(function() {
			var l = $(this).val().length;
			var ml = maxlength - l;
			if(parseInt($(".advice .count").text()) < 0 || l > maxlength) {
				$(".advice .count").text(0); //强制字数
				var val = $(this).val().substring(0, 200); /*截取指定的字符串，左闭右开*/
				$(this).val(val);
			} else {

				$(".advice .count").text(ml); //还可以输入多少个
				//字数超出
			}
		});

	}

	dropup();
}