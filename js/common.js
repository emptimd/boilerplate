$.fn.alignCenter=function(){var a=Math.max(40,parseInt($(window).height()/2-$(this).height()/2))+"px",b=Math.max(40,parseInt($(window).width()/2-$(this).width()/2))+"px";return $(this).css({"marign-top":a,"margin-left":b})},$.fn.alignParentCenter=function(){var a=$(this),b=parseInt(a.parent().height()/2-a.height()/2)+"px",c=parseInt(a.parent().width()/2-a.width()/2)+"px";return a.css({"margin-top":b,"margin-left":c})},jQuery(function(){console.log("test"),console.warn("test"),console.error("test")});