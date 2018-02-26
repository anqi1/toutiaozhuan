window.onload = function() {
	var dat = getCookie("dat");
	var da = {
		"uuid": uid
	};
	var index=0;
	requestMenthodGet("../js/banner.json",null).done(function(e) {
		var radio=$(".radiobax");
		var str="";
		var H=$(".radio").height();
		for(var i=0;i<e.data.length;i++){
			str+='<p><span class="bo"></span>'+e.data[i].title+'</p>';
		}
		radio.html(str);
		setInterval(function(){
			index++;
			if(index>=e.data.length){
				index=0;
			};
			radio.animate({marginTop:"-"+index*H+"px"});
		},1000)
	})
	//获取数据
	requestMenthodPost("getUserInfo", da).done(function(e) {
	requestMenthodPost("getMoreConfig", da).done(function(data) {
//		console.log(data);
		var html = "";
		$.each(data.data, function(v, k) {
			html += '<li status=' + k.status + ' class="active"><div class="headerimg"><div class="himg">' +
				'<img src="'+e.data.usericon+'" alt="" /></div>' +
				'<div class="hdbx"></div></div><div class="bbox"><div class="reward">' +
				'<h3>' + k.money + '元</h3>' +
				'<h2>收徒' + k.numTudi + '人</h2></div></div><div class="circle">' +
				'<p>' + k.stmconfigid + '</p></div><div class="heng"></div><div class="shu"></div></li>';
		})
		$(".appbox ul").html(html);
		//页面显示
		$(".appbox ul li").each(function() {
			var index = $(this).index() + 1;
			var status = $(this).attr("status");
			var Re = /^[3,4,9]*$/;
			if(index % 3 == 0) {
				$(this).find(".heng").remove();
			};
			if(!Re.test(index)) {
				$(this).find(".shu").remove();
			};
			//状态
			if(status == 1) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}

		});
		//判断头像添加
		$(".appbox ul li.active").each(function(){
			var intindex=$(this).index()+1;
			$(".appbox ul li.active:last").find(".headerimg").css({
				"display": "block"
			});
		})
		//横和竖添加 
		$(".appbox ul li:last-child").children(".heng").remove();
		$(".appbox ul li:last-child").children(".shu").remove();
		//li点击
		$(".appbox ul li").click(function() {
			var that = $(this);
			var ins = $(this).index() + 1;
			var lis = {
				"uuid": uid,
				"stmconfigid": ins
			};
			requestMenthodPost("receiveReward", lis).done(function(data) {
				console.log(data);
				if(data.flag == "0") {
					that.addClass("active");
				} else {
					$(".repact-a").text(data.msg);
					$(".repact-a").show().delay(3000).fadeOut();
				}

			})
		})
	})
	})
	//跳转到徒弟列表页面
	$(".tudi").click(function() {
		window.location = "tudi.html";
	})
	//隐藏模态框
	$(".huodong").click(function() {
		$(".modal").show();
	})
	$(".chas").click(function() {
		$(".modal").hide();
	})
	//分享收徒
	$(".onclick").click(function() {
		window.location = "../beMakeMoney.html";
	})
	dropup();
	//轮播图

	
};