
//Smooth scroll chrome

!function(a){a(document).ready(function(){function q(){if(document.URL.indexOf("google.com/reader/view")>-1&&(g=!0),i)for(var a=i.split(/[,\n] ?/),b=a.length;b--;)if(document.URL.indexOf(a[b])>-1){D("mousewheel",v),g=!0;break}}function r(){if(document.body){var a=document.body,b=document.documentElement,c=window.innerHeight,d=a.scrollHeight;if(o=document.compatMode.indexOf("CSS")>=0?b:a,n=a,q(),l=!0,top!=self)j=!0;else if(d>c&&(a.offsetHeight<=c||b.offsetHeight<=c)&&(o.style.height="auto",o.offsetHeight<=c)){var e=document.createElement("div");e.style.clear="both",a.appendChild(e)}if(document.URL.indexOf("mail.google.com")>-1){var f=document.createElement("style");f.innerHTML=".iu { visibility: hidden }",(document.getElementsByTagName("head")[0]||b).appendChild(f)}m||(a.style.backgroundAttachment="scroll"),g&&D("keydown",w)}}function u(c,e,f,g){if(g||(g=1e3),F(e,f),s.push({x:e,y:f,lastX:0>e?.99:-.99,lastY:0>f?.99:-.99,start:+new Date}),!t){var h=function(){for(var i=+new Date,j=0,k=0,l=0;l<s.length;l++){var m=s[l],n=i-m.start,o=n>=b,p=o?1:n/b;d&&(p=H(p));var q=m.x*p-m.lastX>>0,r=m.y*p-m.lastY>>0;j+=q,k+=r,m.lastX+=q,m.lastY+=r,o&&(s.splice(l,1),l--)}if(e){var u=c.scrollLeft;c.scrollLeft+=j,j&&c.scrollLeft===u&&(e=0)}if(f){var v=c.scrollTop;c.scrollTop+=k,k&&c.scrollTop===v&&(f=0)}e||f||(s=[]),s.length?setTimeout(h,g/a+1):t=!1};setTimeout(h,0),t=!0}}function v(a){l||r();var b=a.target,d=B(b);if(!d||a.defaultPrevented||E(n,"embed")||E(b,"embed")&&/\.pdf/i.test(b.src))return!0;var e=a.wheelDeltaX||0,f=a.wheelDeltaY||0;e||f||(f=a.wheelDelta||0),Math.abs(e)>1.2&&(e*=c/120),Math.abs(f)>1.2&&(f*=c/120),u(d,-e,-f),a.preventDefault()}function w(a){var b=a.target,c=a.ctrlKey||a.altKey||a.metaKey;if(/input|textarea|embed/i.test(b.nodeName)||b.isContentEditable||a.defaultPrevented||c)return!0;if(E(b,"button")&&a.keyCode===p.spacebar)return!0;var d,e=0,f=0,g=B(n),i=g.clientHeight;switch(g==document.body&&(i=window.innerHeight),a.keyCode){case p.up:f=-h;break;case p.down:f=h;break;case p.spacebar:d=a.shiftKey?1:-1,f=.9*-d*i;break;case p.pageup:f=.9*-i;break;case p.pagedown:f=.9*i;break;case p.home:f=-g.scrollTop;break;case p.end:var j=g.scrollHeight-g.scrollTop-i;f=j>0?j+10:0;break;case p.left:e=-h;break;case p.right:e=h;break;default:return!0}u(g,e,f),a.preventDefault()}function x(a){n=a.target}function A(a,b){for(var c=a.length;c--;)y[z(a[c])]=b;return b}function B(a){var b=[],c=o.scrollHeight;do{var d=y[z(a)];if(d)return A(b,d);if(b.push(a),c===a.scrollHeight){if(!j||o.clientHeight+10<c)return A(b,document.body)}else if(a.clientHeight+10<a.scrollHeight&&(overflow=getComputedStyle(a,"").getPropertyValue("overflow"),"scroll"===overflow||"auto"===overflow))return A(b,a)}while(a=a.parentNode)}function C(a,b,c){window.addEventListener(a,b,c||!1)}function D(a,b,c){window.removeEventListener(a,b,c||!1)}function E(a,b){return a.nodeName.toLowerCase()===b.toLowerCase()}function F(a,b){a=a>0?1:-1,b=b>0?1:-1,(k.x!==a||k.y!==b)&&(k.x=a,k.y=b,s=[])}function G(a){var b,c,d;return a*=e,1>a?b=a-(1-Math.exp(-a)):(c=Math.exp(-1),a-=1,d=1-Math.exp(-a),b=c+d*(1-c)),b*f}function H(a){return a>=1?1:0>=a?0:(1==f&&(f/=G(1)),G(a))}var n,o,a=150,b=600,c=150,d=!0,e=5,f=1,g=!1,h=50,i="",j=!1,k={x:0,y:0},l=!1,m=!0,p={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},s=[],t=!1,y={};setInterval(function(){y={}},1e4);var z=function(){var a=0;return function(b){return b.uniqueID||(b.uniqueID=a++)}}();/chrome/.test(navigator.userAgent.toLowerCase())&&(C("mousedown",x),C("mousewheel",v),C("keydown",w),C("load",r))})}(jQuery);// JavaScript Document// JavaScript Document

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
			$('.menu_dl dd>a').on('touchstart', MENU1);
		} else {
			$('#navToggle').on('click', MENU);
			$('.mask').on('click', MENU);
			$('.cha').on('click', MENU);
			$('.menu_dl dd>a').on('click', MENU1);
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
		function MENU1() {
			$mask.fadeToggle(300);
			$('html,body').toggleClass('show');
			$('#navToggle').toggleClass('show');
			$('#mobileMenu').toggleClass('show');
			return true;
		}
	}
	mobileMenu();
	
	$(".menu li.menu_li>a").on("touchstart",function(){
		if($(this).siblings("dl").is(":visible")){
			window.location.href= $(this).attr("data"); 
		}
		$(this).parents("li").find("dl").slideToggle(300);
		$(this).parents("li").toggleClass("on");
		
	});
	$("#navToggle").click(function(){
		$("html,body").animate({scrolltop:"0px"},0);
	});
	

})

$(function(){
	//导航
	var _length = $(".nav>li").length;
	$(".nav").children("li").each(function(index){
		if($(this).hasClass("current")){
			var li_index =$(this).index();
			var _right = (_length-li_index-1)*126+20;
			$(".nav>i").stop().animate({"width":"82px","right":_right},300);
		}
	});
	$(".nav>li").mouseover(function(){
		var _index = $(this).index();
		var _right = (_length-_index-1)*126+20;
		$(".nav>i").stop().animate({"width":"82px","right":_right},300);
	});
	$(".nav").mouseout(function(){
		$(this).children("li").each(function(index){
			if($(this).hasClass("current")){
				var li_index =$(this).index();
				var _right = (_length-li_index-1)*126+20;
				$(".nav>i").stop().animate({"width":"82px","right":_right},300);
			}
		});
	});
	//子导航
	$(".nav>li").hover(function(){
		$(this).find(".sub_box").stop().fadeIn(300);
	},function(){
		$(this).find(".sub_box").stop().fadeOut(300);
	});
	//导航搜索
	$(".search_icon").click(function(){
		$(".sou").stop().fadeToggle(300);
		$(".top_anniu").stop().fadeToggle(300);
	});
	$(".sou span").click(function(){
		$(".sou").stop().fadeOut(300);
		$(".top_anniu").stop().fadeIn(300);
	});
	//产品分类滚动
	$('#pro_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 3,
		itemsDesktop:[1199,2],
		itemsDesktopSmall:[979,2],
		itemsTablet:[768,2],
		itemsMobile:[499,1],
		navigationText: ["<",">"]
	});
	//关于我们滚动条
	$('.brief_content').jscrollbar({
		width:10,
		color:'#eeeeee',
		opacity:1,
		keyMoveAmount:50
	});
	//公司历程滚动
	$('#mil_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 6,
		navigationText: ["<",">"]
	});
	//荣誉证书滚动
	$('#cer_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 3,
		itemsDesktop:[1199,3],
		itemsDesktopSmall:[979,3],
		itemsTablet:[768,2],
		itemsMobile:[499,1],
		navigationText: ["<",">"]
	});
	//手机产品分类
	$(".left_title .menu").click(function(){
		$(".left_ul").stop().slideToggle(500);
	});
	//放大镜滚动
	$('#pro_small').owlCarousel({
		navigation: false,
		autoPlay: true,
		items: 3,
		itemsDesktop:[1199,3],
		itemsDesktopSmall:[979,3],
		itemsTablet:[768,3],
		itemsMobile:[479,3]
	});
	//推荐产品滚动
	$('#tj_scroll').owlCarousel({
		navigation: true,
		autoPlay: true,
		items: 4,
		itemsDesktop:[1199,3],
		navigationText: ["<",">"]
	});
	
	
	
});

