$(function(){
	//导航样式
	var _top = $(document).scrollTop();
	if(_top > 0){
		$("header").addClass("header_scroll");
		$("body").css("padding-top","80px");
	}else{
		$("header").removeClass("header_scroll");
		$("body").css("padding-top","130px");
	}
	$(window).scroll(function(){
		var toTop =	$(document).scrollTop();
		if(toTop > 0){
			$("header").addClass("header_scroll");
			$("body").stop().animate({paddingTop:"80px"},200);
		}else{
			$("header").removeClass("header_scroll");
			$("body").stop().animate({paddingTop:"130px"},200);
		}
	});
	//导航搜索
	$(".search_icon").click(function(){
		$(".search_li").addClass("search_on");
		$(".search_box").animate({width:"300px"},300);
		$(this).hide();
		$(".nav>li:lt(9)").animate({opacity:"0"},300);
	});
	$(".search_cha").click(function(){
		$(".search_li").delay(1000).removeClass("search_on");
		$(".search_box").animate({width:"28px"},300).parent("search_li").removeClass('search_on');
		$(".search_icon").show();
		$(".nav>li:lt(9)").animate({opacity:"1"},300);
	})
	//子导航定位
	$(".dropdown>a").click(function(){
		var _width = ($(this).siblings(".dropdown-menu").width())/2*-1;
		$(this).siblings(".dropdown-menu").css({"left":"50%","margin-left":_width});
	});
	
	//首页产品滚动
	$('#pro_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 5,
		navigationText: ["<",">"]
	});
	$('#about_pro_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 4,
		navigationText: ["<",">"]
	});
	
	//新闻滚动
	$('#news_scroll,#kc_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 3,
		navigationText: ["<",">"]
	});
	
	//产品详情页效果
	$(".cs_title li:eq(0)").addClass("on");
	$(".cs_content:eq(0)").show();
	$(".cs_title li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var _index = $(this).index();
		$(".cs_content").eq(_index).fadeIn(300).siblings(".cs_content").hide();
	});
	
	
	
	
	
	
	
	
	
     
});
