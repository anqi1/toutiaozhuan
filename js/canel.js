//$(function(){
//	var  token=localStorage.getItem('loginToken');
//	$.ajax({
//		type:"get",
//		url:"/fan/sys/personal/personalInfo",
//		beforeSend:function(xhr){
//	            xhr.setRequestHeader("token",token);
//	    },
//	    success:function(data){
//	    	$(".top h1").text(data.data.balance);
//	    	//是否实名
//	    	$(".chanel li").click(function(){
//	    		var index=$(this).index();
//	    		if(data.data.realname=undefined){
//	    			$(".modal").show();
//	    			$(".confirm").click(function(){
//	    				window.setTimeout(function(){
//		                    window.location="../../realName.html";
//		                },1000);
//	    			})
//	    		}else{
//	    			if(index==0){
//	    				$(this).children("a").attr("href","../canel/bank.html");
//	    			}else{
//	    				$(this).children("a").attr("href","../canel/weixin.html");
//	    			}
//	    		}
//	    		
//	    	})
//	    }
//	});
//
//})
