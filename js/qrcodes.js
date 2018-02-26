window.onload=function(){
	$(".qrcode img").attr("src","http://res.ph292.cn/tt/toutiaozhuan.jpg");
	$(".submit").click(function(){
		var imgUrl="http://res.ph292.cn/tt/toutiaozhuan.jpg";
		window.jsObj.shareImg(imgUrl);

	})
}
