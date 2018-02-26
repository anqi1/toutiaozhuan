
$(function(){
	var data={
		"uuid":uid
	};
	//数据加载
	requestMenthodPost("getTakeoutMoney",data).done(function(e){
		var html="";
		for(var i=0;i<e.data.length;i++){
			var k=e.data[i]
//		html+=`<li status=${k.isonce} takeoutconfigid="${k.takeoutconfigid}">
//					${k.money}元
//					<div class="new">
//						<span></span>
//						<p>新人专享</p>
//					</div>
//				</li>`;
		};
//		$(".sum ul").append(html);
		
		//点击事件发生
		$(".sum li").click(function(){
//			isfirst();
			$(this).addClass("active").siblings().removeClass("active");
			
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
				if(e.data=="操作成功"){
					
				}else{
					$(".repact-a").text(e.msg);
					$(".repact-a").show().fadeIn().delay(1000).fadeOut();
				}
			})
		})
		//判断
		function isfirst(){
			$(".sum li").each(function(){
				if($(this).attr("status")==1){
					$(this).addClass("active")
				};
				if($(this).attr("status")==1&&$(this).attr("class")=="active"){
					$(this).addClass("first");
				};
			})
		}
	})
})
