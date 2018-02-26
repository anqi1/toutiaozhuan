window.onload=function(){
//	alert("111");
	//二维码生成
//	var url=window.location.host;
	var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 200,//设置宽高
            height : 200
       });
       requestMenthodGet("getShoutuUrls",null).done(function(data){
       	var url=data.data;
			qrcode.makeCode("http://"+url+"/tpl/invite2.html?userid="+uid);
		})
//    qrcode.makeCode("http://"+url+"/tpl/invite2.html?userid="+uid);  
      //随机数产生
    function GetRandomNum(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}    
	var num=GetRandomNum(10,99);
	$(".chou h3").text(num+"元");
	//HTML生成本地图片
	 $("#saveImageBtn").on("click", function () {    
	 	$(".share p").hide();
	 	$(".submit").hide();
	 	$(".shared").show();
       	$(".sharetype").show();
//     	var index=0;
       	$(".sharetype li").click(function(){
       		var index=$(this).index();
       		$(".sharetype").hide();
       		
       		setTimeout(function(){
       			window.jsObj.shareImgData(index);
       		},1000)
       		
       	})
 
    });
}
