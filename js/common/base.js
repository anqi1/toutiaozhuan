//$(function(){
	function list(index){
		$.get("js/index.json").done(function(data){	
			var str;
			str="";	
			
			var ss="";
			if(index==1){
				$.each(data.listtwo.list, function(v,k) {				
					 str+=`<li><a href="">${k}</a></li>`;				
				});
				$.each(data.code,function(i,val){
					ss+=write(val);
					$(".recommand ul").html(ss);
				})
				$(".titleimg").append("<span class='replay'></span>")
			}else{
				$.each(data.listone.list, function(v,k) {				
					 str+=`<li><a href="">${k}</a></li>`;				
				});
				$.each(data.video,function(i,val){
					ss+=write(val);
					$(".recommand ul").html(ss);
				})
				
				$("recommand ul").html(ss);
				$(".replay").remove();
			}
			$(".tabItem2 ul").html(str);	
		})
	};
	//推荐加载
	function write(val){	
	 var html="";
	 html+=`<li>
				<a href="detail.html?id=${val.id}">
					<div class="title">
						<div>
							<h3>${val.title}</h3>
						<h3>比吃药强多了！</h3>
						</div>					
						<div class="detail">
							<p class="money"><span></span>${val.money}</p>
							<p class="browse"><span></span>${val.browse}</p>
						</div>
					</div>
					<div class="titleimg">

					</div>
				</a>
			</li>`;
		return html;	
	}

