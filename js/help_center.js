/**
 * Created by pc-20170326 on 2017/8/24.
 */
$(function() {
    $(".question").on("click","li",function(){
		var Oli=$(this).children("div.content");
		var down=$(this).find("div.down");
		if(Oli.css("display")=="none"){
			Oli.show();
			down.css({"transform":"rotate(180deg)"});
		}else{
			Oli.hide();
			down.css({"transform":"rotate(0deg)"});
		}

	})
	dropup();
})