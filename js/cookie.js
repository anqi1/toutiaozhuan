
var uid="e07e28b3e071fd7a50a71274e60e5621";
var urlsl=document.referrer;

function requestMenthodGet(url,data){
    var deferred = $.Deferred();
    var LOGINBASEAPI="/taskplatform/";
        $.ajax({
            type: "get",
            url: LOGINBASEAPI+url,
            data: data,
            contentType: "application/json",
            dataType: "json",
            async: true,
            success: function(json) {
                deferred.resolve(covertJson(json));
            },
            error: function(textStatus,data) {
        


            }
    });
    return deferred.promise();
}



function requestLoginMenthodGet(url,data){
    var deferred = $.Deferred();
    var LOGINBASEAPI="/taskplatform/";
    $.ajax({
        type: "get",
        url: LOGINBASEAPI+url,
        data: data,
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function(json) {
            deferred.resolve(covertJson(json));
        }

    });
    return deferred.promise();
}

function requestMenthodPost(url,data){
    var deferred = $.Deferred();
    var LOGINBASEAPI="/taskplatform/";

        $.ajax({
            type: "post",
            url: LOGINBASEAPI+url,
            data: jsonToStr(data),
            contentType: "application/json",
            dataType: "json",
            timeout:1000,
            async: true,
            success: function(json) {
                deferred.resolve(covertJson(json));
            },
            error: function(textStatus,data) {
            

                if (textStatus.status==401){
                    window.location.href='index.html'
                }else {
                    if (!isBlank(textStatus.responseJSON)){
                        alert(textStatus.responseJSON.msg);
                    }

                    deferred.reject(data);
                }
            }
        });


    return deferred.promise();
}


function refersh() {
  
}

function requestMenthodPostProxy(url,data){
    var deferred = $.Deferred();
    $.ajax({
        type: "post",
        url: url,
        data: jsonToStr(data),
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function(json) {
            deferred.resolve(covertJson(json));
        },
        error: function(textStatus,data) {
            console.log(textStatus);
            if (textStatus.status==401){
                window.location.href='index.html'
            }else {
                if (!isBlank(textStatus.responseJSON)){
                    alert(textStatus.responseJSON.msg);
                }

                deferred.reject(data);
            }
        }
    });

    return deferred.promise();
}


function contime(){
    if (!isBlank(istime)){
        clearInterval(istime);
    }
    setInterval(function(){
        time=time+5;
    },5000);
}

function covertJson(str) {
    try {
     str=JSON.parse(str);
    } catch (e) {
        return str;
    }
    return str;
}

function back() {

    window.history.go(-1);
}

/*把字符串转换成json*/
function jsonToStr(json)
{
    try {
        json=JSON.stringify(json);
    } catch (e) {
        return json;
    }
    return json;
}




function isBlank(str){
    if(str == null || typeof str == "undefined" ||
        str == "" || $.trim(str) == ""){
        return true;
    }
    return false;
}
function covertDate(time){
    var date;
        if (isBlank(time)){
            date=new Date();
        }else {
            date = new Date(time);
        }

        datevalues =
(date.getMonth()+1)+'/'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    return  datevalues;
}

function covertstatndDate(time){
    var date;
    if (isBlank(time)){
        date=new Date();
    }else {
        date = new Date(time);
    }

    datevalues = maketwo(date.getFullYear())+'/'+maketwo(date.getMonth()+1)+'/'+maketwo(date.getDate())+' '+maketwo(date.getHours())+":"+maketwo(date.getMinutes())+":"+maketwo(date.getSeconds());
    return  datevalues;
}
function maketwo(value){
    if (value.toString().length<2){
        return '0'+value;
    }
    return value;
}


function covertDateyear(time){
    var date;
    if (isBlank(time)){
        date=new Date();
    }else {
        date = new Date(time);
    }

    datevalues = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' '+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    return  datevalues;
}
/*判断是否为整数或者小数*/
function getZ(n){
    return /^\d+(\.\d+)?$/.test(n+"");
}



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]).trim(); return null; //返回参数值
}

function  refresh(){
    window.location.reload();
}



function getUrlParmasJson(){
    var search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

function requestMethodGetSync(url,data){
    var deferred = $.Deferred();
    var LOGINBASEAPI="/serplatform/";
    $.ajax({
        type: "get",
        url: LOGINBASEAPI+url,
        data: data,
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(json) {
            deferred.resolve(covertJson(json));
        },
        error: function(textStatus,data) {
            if (textStatus.status==401){
                window.location.href='login.html'
            }else {
                if (!isBlank(textStatus.responseJSON)){
                    alert(textStatus.responseJSON.msg);
                }
            }

        }
    });
    return deferred.promise();
}

function bulidParam(url,obj){
    var recursiveEncoded = $.param( obj );
    return url+"?"+recursiveEncoded;
}

function loadData() {
    var aa = covertJson(localStorage.getItem("key"));
    var datas;
    if(isBlank(aa)){
        window.location.href = "../login.html"
    }
    localStorage.setItem("phone",aa.phone);
    requestMethodGetSync('sys/ageninfo/'+aa.agentid+"/",null).done(function (data) {

        if(data.code=='0300'){
            $("#modal").show();
            $("#persion-info").hide();
        }else{

            $("#modal").hide();

        }
        datas = data.data;
        $("#indexAgentid").text(data.data.agentid);
        $("#indexRestCardnum").text(data.data.gmAgentAccount.cardnum);

    })
    return datas;
}



//图片
	function reImg(elements){  
		var img =$(elements);
		img.attr("src","/serplatform/getcode?"+Math.random());  
	} 
//电话号码正则
var reg=/^1[345678]\d{9}$/;
//密码正则
var pattern=/^[a-zA-Z0-9_-]{6,16}$/;

(function($) {
    $.getUrl = function(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return null;
	}
})(jQuery);
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
//时间戳装换
 function getlocalTime(ns){
 	return new Date(parseInt(ns)*1000).toLocaleDateString().replace(/\//g,"-");
 }

//touch事件 
 $(document).on("touchstart", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable")) $target.data("isMoved", 0);
});
$(document).on("touchmove", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable")) $target.data("isMoved", 1);
});
$(document).on("touchend", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable") && $target.data("isMoved") == 0) $target.trigger("tap");
});
////保留两位小数
//功能：将浮点数四舍五入，取小数点后2位
function toDecimal(x) {
     var f = parseFloat(x); 
      if (isNaN(f)) { 
        return false; 
      } 
      var f = Math.round(x*100)/100; 
      var s = f.toString(); 
      var rs = s.indexOf('.'); 
      if (rs < 0) { 
        rs = s.length; 
        s += '.'; 
      } 
      while (s.length <= rs + 2) { 
        s += '0'; 
      } 
      return s; 
}
//存取cookie

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
var dat=JSON.stringify(value);
document.cookie=c_name+ "=" +escape(dat)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//读取cookie

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
}
//
//删除cookie
 function delCookie(name) {                   //删除一个cookie  
            var exp = new Date();  
            exp.setTime(exp.getTime() - 1);  
            var cval=getCookie(name);  
            if(cval!=null)  
            document.cookie= name + "="+cval+";expires="+exp.toUTCString();  
        }
//模态框

function modal(){
	var modal="";
	modal='<div class="modalbox">'+
		'<span class="cha"></span>'+
		'<div class="shuru">'+
			'<p class="error">温馨提示：账号<span class="red">提现</span>需绑定手机号确认</p>'+
			'<div>'+
				'<input type="text" id="phone" class="inputs" placeholder="请输入你的手机"/>'+
			'</div>'+
			'<div>'+
				'<input type="text" id="code" class="inputs" placeholder="请输入验证码"/><button class="yzm" id="yzm">获取验证码 </button>'+
			'</div>'+
			'<div class="submit">确认绑定</div>'+
		'</div>'+
	'</div>';
	$("#modal").html(modal);
}
var wait=120;
//封装限制用户恶意发送短信方法

    function time(o) {
        if (wait == 0) {
            o.remove("disabled");
            o.text("获取验证码");
            location.reload();
            wait =120;
        } else {
            o.attr("disabled", "disabled");
            o.text(wait + "秒后重新获取");
            wait--;
            setTimeout(function() {
                time(o);
            }, 1000)
        }       
    }
function ifwithdraw(urllocation){
	requestMenthodGet("selectHasBind/"+uid).done(function(data){
		//没有电话号码并且没有得到openid
//		alert(data.data.phone+"openid"+data.data.openid)
		if(data.data.phone==1){
			$("#modal").find(".cha").remove();
			$("#modal").show(); 	
			$("#yzm").click(function(){
				var phone=$("#phone").val();
				var that=$(this);
				//发送验证码	
				var numphone={
					"phone":phone
				};
				//判断
				//手机号码验证
			    if(phone.length==0){
			        $("p.error").css("color","red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
			        return false;                   
			    };
			    if(phone.length!==0 && reg.test(phone)==false){
			        $("p.error").css("color","red").text("请输入正确的手机号码!").fadeIn(500).delay(1500).fadeOut(500);
	
			        return false;                
			    };
				requestMenthodPost("sendmsg",numphone).done(function(data){
					if(data.flag=="0"){
						time(that); 
			        }else{
			            $("p.error").css("color","red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
					}
				})
				//绑定手机号码	 
				
				$(".submit").click(function(){
					//手机号码验证
				    if(phone.length==0){
				        $("p.error").css("color","red").text("手机号不能为空!").fadeIn(500).delay(1500).fadeOut(500);
				        return false;                   
				    };
				    if(phone.length!==0 && reg.test(phone)==false){
				        $("p.error").css("color","red").text("请输入正确的手机号码!").fadeIn(500).delay(1500).fadeOut(500);
						        return false;                
				    };
					var code=$("#code").val();
					var all={
						"uuid":uid,
						"phone":phone,
						"msgcode":code
					};
					requestMenthodPost("bindUserphone",all).done(function(data){
						if(data.flag=="0"){
							$("p.error").css("color","green").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
							setTimeout(function(){
								location.reload();
							},1000)
				        }else{
				            $("p.error").css("color","red").text(data.msg).fadeIn(500).delay(1500).fadeOut(500);
						}
					})
				})
			})
			//电话号码有,没有openid
		}else if(data.data.openid==1){
			if($("title").text()=="我的余额"){
				window.location="qrcode.html";
			}else{
				$("#modal").hide();
			}
		}else if(data.data.phone==0&&data.data.openid==0){
			if($("title").text()=="个人中心"){
				$("#modal").hide();
			}else{
				window.location=urllocation;
			}
		}
	})
}

	
    //
    function delHtmlTag(str){
		return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
	}
    function GetChinese(strValue) {  
    if(strValue!= null && strValue!= ""){  
        var reg = /[\u4e00-\u9fa5]/g;   
        return strValue.match(reg).join("");  
    }  
    else  
        return "";  
}  

function noData(){
	var meno=me.noData();
	meno.show().delay(3000).fadeOut();
}
//上拉刷新
//上拉刷新
function dropup(){
	$("body").dropload({
		scrollArea : window,
		domUp:{
			  domClass : 'dropload-up',
			  domRefresh : '<p class="dropload-refresh">↓下拉可以刷新</p>',
			  domUpdate : '<p class="dropload-update">↑松开立即刷新</p>',
			  domLoad : '<p class="dropload-load"><span class="loading"></span>加载中...</p>'
		},
		loadUpFn : function(me){  
	        //下拉刷新需要调用的函数  
//	        alert("下拉刷新需要调用的函数"); 
				location.reload();
	        //重置下拉刷新  
	        me.resetload();      
		}
		
	})
}
//返回上一页

