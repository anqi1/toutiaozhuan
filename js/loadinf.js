window.onload=function(){
	$(".button").click(function(e){
		e.preventDefault();

			window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mafeng.toutiaozhuan";
	})
	var index=0;
	requestMenthodGet("../js/load.json",null).done(function(e) {
		var radio=$(".radiobax");
		var str="";
		var H=$(".radio").height();
		for(var i=0;i<e.data.length;i++){
			str+='<p><span class="bo"></span>'+e.data[i].title+'</p>';
		}
		radio.html(str);
		setInterval(function(){
			index++;
			if(index>=e.data.length){
				index=0;
			};
			radio.animate({marginTop:"-"+index*H+"px"});
		},1500)
	})
}
