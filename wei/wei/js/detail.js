$(function(){
	$(".detailcontent img").each(function(){
		var width=$(this).attr("width");
		var height=$(this).attr("height");
		$(this).css({"width":"100%","height":(height/100)+"%"});
	})
	var title=$(".detailtitle h3").text();
	$("title").text(title);
	//封装限制字符串
	function wordnum(num,elements){
	    $(elements).each(function(){
	        var maxwidth=num;
	        if($(this).text().length>maxwidth){
	            $(this).text($(this).text().substring(0,maxwidth));
	            $(this).html($(this).html()+"....");
	        }
	    });
	}
	wordnum(20,".btitle li a");
	wordnum(20,".title h3");
	var unfoldField = document.querySelector(".allwrite");
	var wrapH = document.querySelector(".content").offsetHeight;
	var wrap = document.querySelector(".content");
	var contentH = document.querySelector(".detailcontent").offsetHeight;
	// 如果实际高度大于我们设置的默认高度就把超出的部分隐藏。
	setTimeout(function() {
		if(contentH > wrapH) { //当内容中有图片时，立即获取无法获取到实际高度，而window.onload又太慢了，故用定时器延迟
			unfoldField.style.display = "block";
		}
		unfoldField.onclick = function() {
			this.parentNode.removeChild(this);
			wrap.style.maxHeight = "100%";
		}
	}, 100);
});
