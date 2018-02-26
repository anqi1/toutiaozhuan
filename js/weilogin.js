window.onload=function(){
	var openid=$.getUrl('openid');
	var isbind=$.getUrl("isbind");
	var html="";

	if(isbind==1){
		html="<p class='success'><span class='red'>该微信已绑定成功</span>，请勿重复绑定，返回头条赚app申请提现即可</p>";
//		$(".content").html("");
		$(".content").html(html);
		
	}else{
		html='<ul><li><input type="text" placeholder="输入手机号码" id="phone"/></li>'+
	    		'<li><input type="text" placeholder="输入验证码" id="code"/><div class="code" id="yzm">获取验证码</div></li>'+
	    		'<li><p class="error"></p><div class="submit">提交绑定</div></li></ul>';
	    	$(".content").html(html);
		$("#yzm").click(function(){
			var phone=$("#phone").val();
			var that=$(this);
			//发送验证码	
			var numphone={
				"phone":phone
			};
		
			//判断
			//手机号码验证
		    if(phone.length==0){
		        $("p.error").css("color","red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
		        return false;                   
		    };
		    if(phone.length!==0 && reg.test(phone)==false){
		        $("p.error").css("color","red").text("请输入正确的手机号码!").fadeIn(500).delay(1500).fadeOut(500);
		        return false;                
		    };
			requestMenthodPost("sendmsg",numphone).done(function(data){
				if(data.flag=="0"){
					time(that); 
		        }else{
		            $("p.error").css("color","red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
				}
			})
			//绑定手机号码	 
			$(".submit").click(function(){
				var code=$("#code").val();
				var all={
					"openid":openid,
					"phone":phone,
					"msgcode":code
				};
				requestMenthodPost("bidwxphoneopneid",all).done(function(data){
					if(data.flag=="0"){
						$(".content").html("");
						$(".content").html("<p class='success'><span class='red'>该微信已绑定成功</span>，请勿重复绑定，返回头条赚app申请提现即可</p>");
						
			        }else{
			            $("p.error").css("color","red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
					}
				})
			})
		})
	}
}
