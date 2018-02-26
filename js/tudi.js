window.onload=function(){

	var page=0;
	var size=15;
	 var result = '';
	dropload();
	  function dropload(){
	 $('.content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var data={
            	"uuid":uid,
            	"p":page,
            	"number":size
            };
           requestMenthodPost("getTudiList",data).done(function(e){
           	var arrLen=e.data.length;
           		console.log(arrLen);
            	if(arrLen > 0){
                	for(var i=0; i<arrLen; i++){
                		
	                    result += '<tr><td>'+e.data[i].date+'</td><td>'+e.data[i].addnum+'</td><td>'+e.data[i].addvaluenum+'</td>'+
							'<td>'+e.data[i].awardmoney+'</td></tr>';
						//数据加载完;
						if(size>arrLen){
	                		 // 锁定
	                        me.lock();
	                        // 无数据
	                        $(".dropload-down").hide();
	                        me.noData();
//	                      break;
	                	}
                	}
            	// 如果没有数据
                }else{
                	 // 锁定
                    me.lock();
                    // 无数据
                    me.noData();
                }
                  // 为了测试，延迟1秒加载
//                  setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('.tableitem tbody').append(result);
                        
              
                        // 每次数据插入，必须重置
                        me.resetload();
                     
//                  },1000);
                     	
            });	

            
         }
    });
 }  
 
 
 //昵称合集
$(".tableitem thead th:nth-child(2)").click(function(){
	$(".modal").show();
	requestMenthodPost("getTudinames/"+uid,null).done(function(e){
		var str="";
		for(var i in e.data){
			str+='<li><span>'+e.data[i]+'</span></li>';
		}
		$(".inside ul").html(str);
	})
})
 
 //模态框隐藏
 $(".chas").click(function(){
 	$(".modal").hide();
 })
 dropup();
}
