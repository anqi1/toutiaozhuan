window.onload=function(){
	var index=0,
		page=0,
		size=4;
	var pageStart = 0,pageEnd = 0;
	//加载列表
	dropload();
	//提现
	var da={
		"uuid":uid
	};
	
	//获取信息
	requestMenthodPost("getUserInfo",da).done(function(e){
		//我的余额
		$(".yue").text(e.data.balance);
		//累计提现
		if(e.data.totalTakeout==null){
			$("#tixian").text("0.00");
		}else{
			$("#tixian").text(e.data.totalTakeout);
		}
		var yue=Number($(".yue").text());
		$(".withdraw").click(function(e){
			e.preventDefault();
			if(yue==0){
				$(".repact-a").show().fadeIn().delay(1000).fadeOut();
			}else{
				var url="canel/weixin.html";
				ifwithdraw(url);
			}
		})
	})
	//提现模态框
	modal();
	

	function dropload(){
   $(".detailList").dropload({
		scrollArea : window,
        loadDownFn : function(me){
        	page++;
        	var html="";
			var data={
				"uuid":uid,
				"p":page,
				"number":size
			};
		requestMenthodPost("getTakeoutDetail",data).done(function(e){	
				var arrLen = e.data.length;
            	 	pageEnd = size * page;
                 	pageStart = pageEnd - size;  
                 	var k=e.data;
             	if(arrLen<=0&&pageStart==0){
             		$(".detailList").hide();
                	$(".withdrawempty").show();
             	};
            	if(arrLen >0){	
            		$(".withdrawempty").hide();
            		 $(".detailList").show();
							for(j=0;j<arrLen;j++){
								html+='<tr><td>¥'+k[j].money+'</td>'+
					        		'<td>'+getlocalTime(k[j].time_apply)+'</td>'+
					        		'<td>'+k[j].status+'</td></tr>';
				        		//数据加载完;
						if(size>arrLen){
		            		 // 锁定
		                    me.lock();
		                    // 无数据
		                    me.noData();
		                    
		                  	break;
			            }
					}
        		}else{
    			 	// 锁定
                    me.lock();
                    // 无数据
                    me.noData();
        		}
        		
	        	// 为了测试，延迟1秒加载
		        
		            // 插入数据到页面，放到最后面
		            $('.detailList tbody').append(html);
		             setTimeout(function() {
						$(".dropload-down").slideUp("slow").fadeOut(3000);
					}, 1000)
		      		$(".sum p").each(function(){
		      			if($(this).text().replace(/(^\s*)|(\s*$)/g, "")=="null"){
		      				$(this).text("");
		      			}
		      		});		      		
		            // 每次数据插入，必须重置
		            me.resetload();
		       
			})
			
		}
	})//dropload
	}
	dropup();
}
