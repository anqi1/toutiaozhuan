$(function () {
	//点击发送短信    
    $("#code").click(function(e){
        e.preventDefault();
        var that=this;
        var phone=$("#phone").val();
		var dat={"phone":phone};
		//判断
		//手机号码验证
        if(phone.length==0){
            $("p.error").css("color","red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
            that.setAttribute("disabled", true);
            setTimeout(function(){
            	that.removeAttribute("disabled");
            },1000)
            return false;                   
        }
        if(phone.length!==0 && reg.test(phone)==false){
            $("p.error").css("color","red").text("请输入正确的手机号码!").fadeIn(500).delay(1500).fadeOut(500);
            that.setAttribute("disabled", true);
            setTimeout(function(){
            	that.removeAttribute("disabled");
            },1000)
            return false;                
        }
        requestMenthodPostProxy("/sendMsg/1",dat).done(function(data){
        	
            if(data.code=="0000"){
               that.removeAttribute("disabled");
    			time(that); 
            }else{
                $("p.error").css("color","red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
            }
        });

    });
    //登陆
	$(".submit").click(function(){
		localStorage.setItem("uuid",200);
		window.location="index.html";
	})
//	$(".weixin").click(function(){
//		alert(window.jsObj.getUserid()); 
//	})
})
