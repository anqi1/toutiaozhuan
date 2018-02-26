$(function(){
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
	};
	wordnum(20,".title h3");
});
