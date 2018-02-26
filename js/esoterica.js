window.onload=function(){
	$(".tableitem ul li").click(function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".content div.table").eq(index).show().siblings().hide();
	})
	$(".content .details table tr:even").children("td").css({"background":"#FFF7F7"});
}
