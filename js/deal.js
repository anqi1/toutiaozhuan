window.onload=function() {
	var index = 0;
	var dat = {
		"uuid": uid
	};
	var url = "getContentIncome";
	$(".swiper-container li").bind("click", function(e) {
		e.preventDefault();
		$("#detail").children().remove();
		index = $(this).index();
		page = 0;
		pageStart = 0;
		pageEnd = 0;
		droploads();
		$(this).children().addClass("active").parent().siblings().children().removeClass("active");
	})
	//加载列表
	droploads()
	dropup();
	function droploads() {
		if(index == 0) {
			url = "getContentIncome";
		} else {
			url = "getShoutu";
		};
		var html = "";
		requestMenthodPost(url, dat).done(function(e) {
			var arrLen = e.data.length;
				if(arrLen <= 0) {
					$(".emptylist").show();
					$(".recommand").hide();
				} else {
					$(".emptylist").hide();
					$(".recommand").show();
					for(var i = 0; i < arrLen; i++) {
						var k = e.data[i];
						var date = String(k.date);
						var year = date.substring(0, 4);
						var day = date.substring(date.length - 2);
						var mouth = date.substring(4, 6);
						if(index == 0) {
							html += '<li><a href="detail.html?categorytype=' + k.categorytype + '&contentid=' + k.contentid + '">' +
								'<div class="titleimg" style="background:url(' + k.icon_small + ')no-repeat;background-size:cover"></div>' +
								'<div class="title"><div><h3 class="type">' + k.title + '</h3></div>' +
								'<div class="details"><p>' + year + '-' + mouth + '-' + day + '</p>' +
								'<h6>收益: <span class="red">' + k.income + '</span></h6></div></div></a></li>';
						} else {
							html += '<li><a>' +
								'<div class="titleimg" style="background:url(' + k.usericon + ')no-repeat;background-size:cover">' +
								'</div><div class="title"><div><h3 class="type">' + k.username + '</h3></div>' +
								'<div class="details"><p>'  + year + '-' + mouth + '-' + day + '</p>' +
								'<h6>收益: <span class="red">' + k.income + '</span></h6></div></div></a></li>';
						}
						

					}

				};
			$('.recommand ul').append(html);
			wordnum(20, ".recommand ul .type");
		})
	}
	
};