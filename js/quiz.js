window.onload=function(){
	var page=0,
	size=15,
	index=1,
	son=15;

	dropload();
	dropup();
	function dropload() {
		$('.recommand').dropload({
			scrollArea: window,
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
				domNoData: '<div class="dropload-noData">没有更多了^_^</div>'
			},
			loadDownFn: function(me) {
				page++;
				// 拼接HTML
				var result = '';
				var data = {
					"categorytype": index,
					"categoryid": son,
					"p": page,
					"number": size
				};
				requestMenthodPost("getContentList", data).done(function(e) {
					var categorylist = e.data.categorylist;
					var contentlist = e.data.contentlist;
					
					var arrLen = contentlist.length;
					
					pageEnd = size * page;
					pageStart = pageEnd - size;
					if(arrLen > 0) {
						for(var i = 0; i < arrLen; i++) {
							result += '<li>' +
								'<a href="detail.html?categorytype=' + index + '&contentid=' + contentlist[i].contentid + '">' +
								'<div class="title">' +
								'<div>' +
								'<h3>' + contentlist[i].title + '</h3></div><div class="detail">' +
								'<p class="money"><span></span>' + contentlist[i].money_scan + '</p>' +
								'<p class="browse"><span></span>' + contentlist[i].num_scan + '</p></div></div>' +
								'<div class="titleimg" style="background:url(' + contentlist[i].icon_small + ')no-repeat;background-size:100% 100%">' +
								'<span></span></div></a></li>';
							//数据加载完;
							if(size > arrLen) {
								// 锁定
								me.lock();
								// 无数据
								me.noData();
								setTimeout(function() {
									$(".dropload-down").slideUp("slow").fadeOut(3000);
								}, 1000)
								me.resetload();

							}
						}
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();

					}
					// 插入数据到页面，放到最后面
					$('.recommand ul').append(result);
					wordnum(20, ".recommand .title h3")
					// 每次数据插入，必须重置
					me.resetload();

				})

			}

		});
	}
}
