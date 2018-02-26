window.onload=function(){

	 $("#qrcode img").css({"width":"100%","height":"100%"});
	$(".share_1").click(function(){
		$("#qrcode").html("");
		$(".modal").show();
		 var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 200,//设置宽高
            height : 200
       });
       requestMenthodGet("getShoutuUrls",null).done(function(data){
       	var url=data.data;
			qrcode.makeCode("http://"+url+"/tpl/invite2.html?userid="+uid);
		})
  	})
	
	
	$(".share_2").click(function(){
		window.location.href="share.html";
//		var title="看新闻赚大钱,零投入秒提现!",
//			desc="随手转发就赚钱,提现秒到帐,不会玩找我教你,亲测靠谱!",
//			url="http://web.jzhws.cn/tpl/invite2.html?userid="+uid,
//			scene=0;
//			window.jsObj.inviteFriend(title,desc,url,scene);
	});
	$(".cha").click(function(){
		$(".modal").hide();
	});
	//获取信息
	var data={
		"uuid":uid
	};
	requestMenthodPost("getUserInfo",data).done(function(data){
		$(".money h2").text(data.data.shoutu_total);//徒弟收益
		$(".commonincome li:first-child h4").text("10%");//今日收益
		$(".commonincome li:last-child h4").text(data.data.tudiNums);
	})
	//
	$("table tr:odd").children("td").css({"background":"#FFF7F7"});
	dropup();
}
