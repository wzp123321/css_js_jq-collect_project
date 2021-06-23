
//手机右侧伸缩导航
$(function(){
	function mobileMenu() {
		var RWD = navigator.userAgent,
				winWidth = $(window).width(),
				anoWidth = 0,
				nowstatus = 0, // 0 = mobile / 1 = desktop
				nowIndex,
				body = $("html, body");
		var $mask = $('<div class="mask"></div>').hide();
		$('footer').after($mask);

		if (RWD.match(/iPhone|iPad|iPod|Android|BlackBerry/i)) {
			$('#navToggle').on('touchstart', MENU);
			$('.mask').on('touchstart', MENU);
			$('.cha').on('touchstart', MENU);
		} else {
			$('#navToggle').on('click', MENU);
			$('.mask').on('click', MENU);
			$('.cha').on('click', MENU);
		}

		$(window).resize(function () {
			$mask.hide();
			$('#navToggle').removeClass('show');
			$('html,body').removeClass('show');
			$('#mobileMenu').removeClass('show');
		})

		function MENU() {
			$mask.fadeToggle(300);
			$('html,body').toggleClass('show');
			$('#navToggle').toggleClass('show');
			$('#mobileMenu').toggleClass('show');
			return false;
		}
	}
	mobileMenu();
	
	$(".menu li>a").on("touchstart",function(){
		$(this).parents("li").find("dl").slideToggle(300);
		$(this).parents("li").toggleClass("on");
	})
})

$(function(){
	//子导航栏下拉
	$(".nav>li").hover(function(){
		$(this).find("dl").stop().slideDown(300);
	},function(){
		$(this).find("dl").stop().slideUp(300);
	});
	
	//左侧导航
	$(".mobile-menu #navToggle").click(function(){
		$(".prolist-ul").stop().slideToggle(300);
	});
	
	//产品内页点击放大
	$(".pro-scroll .bd ul li").click(function(){
		var _src = $(this).find("img").attr("src");
		$(".big-img img").attr("src",_src);
	});
});

