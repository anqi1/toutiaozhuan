window.onload=function(){

	var data={
		"uuid":uid
	};
	//获取信息
	requestMenthodPost("getUserInfo",data).done(function(e){
		console.log(e);
		$(".tmoney span").text(e.data.balance);
		$("#phone").text(e.data.wxname);
//		alert(e.data.wxaccountname);
	})
	//数据加载
	requestMenthodPost("getTakeoutMoney",data).done(function(e){
		var html="";
		for(var i=0;i<e.data.length;i++){
			var k=e.data[i]
		html+='<li status='+k.isonce+' takeoutconfigid="'+k.takeoutconfigid+'">'+
					'<p class="money"><span class="total">'+k.money+'</span>元</p>'+
					'<div class="new"><span></span><p>新人专享</p></div></li>';
		};
		$(".sum ul").append(html);
		
		//点击事件发生
		$(".sum li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			var money=$(this).find(".total").text();
			$("#count").text(money);
		})
		isfirst();
		//申请提现
		$(".submit").click(function(){
			var takeoutconfigid=$(".sum li.active").attr("takeoutconfigid");
			var dat={
				"uuid":uid,
				"takeoutconfigid":takeoutconfigid
			};
			requestMenthodPost("userTakeout",dat).done(function(e){
				//未处理完
				if(e.msg=="操作成功"){
					$(".repact-a").css({"width":"80%"});
					$(".repact-a").text("操作成功,因春节放假影响,春节期间提现统一于2月22日后安排打款");
					$(".repact-a").show().fadeIn(2000).delay(1500).fadeOut(2000);
					setTimeout(function(){
						window.location="../../index.html";
					},3000)
				}else if(e.msg.indexOf("文章和视频")>0){
					$(".modaldiv p").text(e.msg);
					$(".modal").show();
					$(".modaldiv a").click(function(e){
						e.preventDefault();
						window.location.href="../newTalent.html";
					});
					
				}else if(e.msg.indexOf("完成收徒")>0){
					$(".modaldiv p").text(e.msg);
					$(".modal").show();
					$(".modaldiv a").click(function(e){
						e.preventDefault();
						window.location.href="../beMakeMoney.html";
					});
				}else{
					$(".repact-a").text(e.msg);
					$(".repact-a").show().fadeIn(2000).delay(1500).fadeOut(2000);
				}
			})
		})
		$(".cha").click(function(){
			$(".modal").hide();
		})
		//判断
		function isfirst(){
			$(".sum li").each(function(){
				if($(this).attr("status")==1){
					$(this).addClass("active");
				};
				if($(this).attr("status")==1&&$(this).attr("class")=="active"){
					$(this).addClass("first");
					$("#count").text($(this).find(".total").text());
				};
			})
		}
	})
}
