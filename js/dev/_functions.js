/*=====UNCOMMENT ANY OF THIS FUNCTIONS TO USE THEM INTO MAIN.JS====*/

	//Align element in the middle of the screen
$.fn.alignCenter = function() {
	 var marginTop = Math.max(40, parseInt($(window).height()/2 - $(this).height()/2)) + 'px';
	 var marginLeft = Math.max(40, parseInt($(window).width()/2 - $(this).width()/2)) + 'px';
	 //return updated element
	 return $(this).css({'marign-top':marginTop,'margin-left':marginLeft});
	};

	//Align element in the middle of the parent
$.fn.alignParentCenter = function() {
	var $this = $(this);
	var marginTop = parseInt($this.parent().height()/2 - $this.height()/2) + 'px';
	var marginLeft = parseInt($this.parent().width()/2 - $this.width()/2) + 'px';
	//return updated element
	return $this.css({'margin-top':marginTop,'margin-left':marginLeft});
};

/**
 * Get background color of elemet.
 */

// $.fn.getHexBackgroundColor = function () {
// 	var rgb = $(this).css('background-color');
// 	if (!rgb) {
// 			return '#FFFFFF'; //default color
// 	}
// 	var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

// 	function hex(x) {
// 			return ("0" + parseInt(x).toString(16)).slice(-2);
// 	}

// 	if (hex_rgb) {
// 			return "#" + hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3]);
// 	} else {
// 			return rgb; //ie8 returns background-color in hex format then it will make                 compatible, you can improve it checking if format is in hexadecimal
// 	}
// }

/**
 * Exemple of usage for bgc changing.
 */
// $.each($("#rebus > .container .guess i"), function (i, el) {
// 	var $this = $(this);
// 	setTimeout(function () {
// 		var oldBGColor = $this.parent().getHexBackgroundColor();
// 		var newBGColor = oldBGColor.replace(/[^,]+(?=\))/, '1');
// 		$this.parent().css({backgroundColor: newBGColor});
// 	}, 500 + ( i * 250 ));
// 	setTimeout(function () {
// 		$this.animate({opacity: 1}, 200);
// 	}, 500 + ( i * 240 ));
// });

/**
 * Automaticaly add * for label that contains *:required. 
 */
// function label_required() {
//  $('*:required').parent('label').append('*');
// }


/**
 * Fade button + scroll to top on click.
 */
// function window_scrool() {
//  $(window).scroll(function () {
//      if ($(this).scrollTop() != 0) {
//          $('#bttop').fadeIn();
//      } else {
//          $('#bttop').fadeOut();
//      }
//  });
//  $('#bttop').click(function () {
//      $('body,html').animate({scrollTop: 0}, 800);
//  });
// }


/**
 * Google map
 */
// function googlemap(lat,lang,zoom) {
// 	var mapCanvas = document.getElementById('map');
// 	 var latlng = new google.maps.LatLng(lat, lang);
// 	 var settings = {
// 	 zoom: zoom,
// 	 center: latlng,
// 	 mapTypeControl: true,
// 	 mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
// 	 navigationControl: true,
// 	 navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
// 	 mapTypeId: google.maps.MapTypeId.ROADMAP
// 	 };
// 	 var map = new google.maps.Map(mapCanvas, settings);
// }

