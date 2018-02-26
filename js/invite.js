window.onload = function() {
	//截取url关键字
	(function($) {
		$.getUrl = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;
		}
	})(jQuery);
	var uid = $.getUrl('userid');
	//头像
	var wait = 120;

	//点击立即注册
	$("#yzm").click(function() {
		var phone = $("#phone").val();
		var that = $(this);
		var reg = /^1[345678]\d{9}$/;
		//发送验证码	
		var numphone = {
			"phone": phone
		};
		//手机号码验证
		if(phone.length == 0) {
			alert("手机不能为空");
			return false;
		};
		if(phone.length !== 0 && reg.test(phone) == false) {
			alert("请输入正确的手机号码!");
			return false;
		};
		//判断
		requestMenthodPost("sendmsg", numphone).done(function(data) {
			if(data.flag == "0") {
				time(that);
			} else {
				alert(data.msg)
			}
		})

	})
	//绑定手机号码	 
	$(".submits").click(function() {
		var code = $("#code").val();
		var phone = $("#phone").val();
		//手机号码验证
		if(phone.length == 0) {
			alert("请输入手机号码");
			return false;
		};
		if(code.length == 0) {
			alert("请输入验证码");
			return false;
		};
		$("#phone").attr("disabled", true);
		
		var all = {
			"userid": uid,
			"phone": phone,
			"msgcode": code
		};
		requestMenthodPost("tempRegist", all).done(function(data) {
			if(data.flag == "0") {
				$(".modal").show();
				$(".submits").click(function() {
					alert("已经注册,请下载APP")
				})
			} else {
				alert(data.msg);
				location.reload();
			}
		})
	})
	$(".modal .chas").click(function() {
		$(".modal").hide();
	})
	//下载app
	$("a.flexs").click(function(e) {
		e.preventDefault();
		requestMenthodPost("getDownurls", null).done(function(data) {
			window.location.href = data.data;
		})
	})
	//封装限制用户恶意发送短信方法
	function time(o) {
		if(wait == 0) {
			o.remove("disabled");
			o.text("获取验证码");
			wait = 120;
		} else {
			o.attr("disabled", "disabled");
			o.text(wait + "秒后重新获取");
			wait--;
			setTimeout(function() {
				time(o)
			}, 1000)
		}
	}

}