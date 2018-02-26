window.onload = function() {
	$("#tasks").click(function(e) {
		e.preventDefault();
		$(".repact-a").show().delay(3000).fadeOut();
	});
	$(".img").click(function() {
		$("#usermsg").show();
	})
	$(".setting").click(function() {
		window.location = "set.html";
	})
	$(".cha").click(function() {
		$(".modal").hide();
	})
	//请求数据
	var data = {
		"uuid": uid
	};
	//提现模态框
	modal();

	//跳转红包的逻辑
	var ins = window.jsObj.checkIsNew();

	if(ins != 0) {
		$("#reds").hide();
		$("#red").show();
		/*
		 点击红包,开包旋转三圈后,改变背景图片,之后进行数据加载随机红包 
		 * */
		$(".kai").click(function() {
			$(this).attr("class", "active kai");
			setTimeout(function() {
				$(".kai").hide();
				$(".modal2-boxing").css({
					"background": "url(../img/invite/img_14.png)no-repeat",
					"background-size": "cover"
				});
				$(".lin>p").text("恭喜发财，大吉大利");
				$(".ling h3").text(ins);
				$(".doit").show();
				load();
			}, 1500);
		});
		var isNew = getCookie("isNew");

		if(isNew == "null") {
			isNew = 0;
		} else {
			isNew = parseInt(isNew);
		}
	} else {
		$("#reds").show();
		$("#red").hide();
		var modalcount = getCookie("modalcount");
		if(modalcount == "null") {
			modalcount = 0;
			$("#reds").show();
		} else {
			modalcount = parseInt(modalcount);
			$("#reds").show();
		};

		if(modalcount > 2) {
			$("#reds").hide();

		} else {
			modalcount++;
			setCookie("modalcount", modalcount, 1);
		}
		//		setCookie("isNew",0,1);
	}
	if($("#reds").is(":hidden") && $("#red").is(":hidden")) {
		load()
	};
	$(".false").click(function() {
		$("#reds").hide();
		//个人中心数据加载
		load()
	})
	$(".lings").click(function() {
		window.location.href = "tpl/banner/banner.html";
	})
	//上啦刷新
	dropup();
	//数据加载
	function load() {
		requestMenthodPost("getUserInfo", data).done(function(data) {
			$(".head img").attr("src", data.data.usericon); //用户头像
			$(".name").text(data.data.username); //用户昵称
			$(".money h2").text(data.data.balance); //账户余额
			$(".commonincome li:first-child h4").text(data.data.income_today); //今日收益
			$(".commonincome li:nth-child(2) h4").text(data.data.income_total); //总收益
			$(".commonincome li:last-child h4").text(data.data.shoutu_total); //徒弟收益
			if(data.data.username == null) {
				data.data.username = "";
			};
			if(data.data.wxname == null) {
				data.data.wxname = "未绑定";
			};
			if(data.data.master == null) {
				data.data.master = "无";
			};
			if(data.data.phone == null) {
				data.data.phone = "未绑定";
			};
			var loca = window.location + "/taskplatform/wxlogin/1/1/?uuid=" + uid;
			var html = "";
			html = '<li><p>昵称 : <span class="">' + data.data.username + '</span></p></li>' +
				'<li><p>手机 : <span class="">' + data.data.phone + '</span></p></li><li>' +
				'<p>微信 : <span class="red">' + data.data.wxname + '</span></p></li>' +
				'<li><p>师傅 : <span class="">' + data.data.master + '</span></p></li>';
			$(".modalul").html(html);
			var balance = data.data.balance;
			var dat = data.data;
			sessionStorage.setItem("balance", balance);
			setCookie("dat", data.data, 1);
		})
	}
	//判断提现框出现
	$("#withdraws").click(function() {
		requestMenthodGet("selectHasBind/" + uid).done(function(data) {
			if(data.data.phone == 1) {
				$("#modal").find(".cha").remove();
				$("#modal").show();
				$("#yzm").click(function() {
					var phone = $("#phone").val();
					var that = $(this);
					//发送验证码	
					var numphone = {
						"phone": phone
					};
					//判断
					//手机号码验证
					if(phone.length == 0) {
						$("p.error").css("color", "red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
						return false;
					};
					if(phone.length !== 0 && reg.test(phone) == false) {
						$("p.error").css("color", "red").text("请输入正确的手机号码!").fadeIn(500).delay(1500).fadeOut(500);

						return false;
					};
					requestMenthodPost("sendmsg", numphone).done(function(data) {
						if(data.flag == "0") {
							time(that);
						} else {
							$("p.error").css("color", "red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
						}
					})
				});
				//绑定手机号码	 
					$(".submit").click(function() {
						var phone = $("#phone").val();
						//手机号码验证
						if(phone.length == 0) {
							$("p.error").css("color", "red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
							return false;
						};
						var code = $("#code").val();
						var all = {
							"uuid": uid,
							"phone": phone,
							"msgcode": code
						};
						requestMenthodPost("bindUserphone", all).done(function(data) {
							if(data.flag == "0") {
								$("p.error").css("color", "green").text("恭喜您绑定成功!").fadeIn(2000).delay(1500).fadeOut(2000);
								setTimeout(function() {
									window.location.href="tpl/withdraw.html";
								}, 3000)
							} else {
								$("p.error").css("color", "red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
							}
						})
					})
			}else{
				window.location.href="tpl/withdraw.html";
			}
		})

	})
}