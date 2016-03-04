$(document).ready(function() {
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		var parent_height = $("header").height();
		
		if (scroll > (parent_height - 20)) {
			$("nav ul").addClass("scrolled");
		} else {
			$("nav ul").removeClass("scrolled");
		}
		
	});
});