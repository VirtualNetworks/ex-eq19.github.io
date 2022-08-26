var top_menu_height = 0;

// scroll animation 
function scrollTo(selectors)
{

    if(!$(selectors).size()) return;
    var selector_top = $(selectors).offset().top - top_menu_height;
    $('html,body').animate({ scrollTop: selector_top }, 'slow');

}

jQuery(function($) {
	$(window).load( function() {
		$('.external-link').unbind('click');
	});

	$(document).ready( function() {

		$('.external-link').unbind('click');

		// scroll spy to auto active the nav item
		top_menu_height = $('.templatemo-top-menu').height();
		$('body').scrollspy({ target: '#templatemo-nav-bar', offset: top_menu_height + 10 });

		// scroll to top
		$('#btn-back-to-top').click(function(e){
			e.preventDefault();
			scrollTo('#templatemo-top');
		});

		// scroll to specific id when click on menu
		$('.templatemo-top-menu .navbar-nav a').click(function(e){
			e.preventDefault(); 
			var linkId = $(this).attr('href');
			scrollTo(linkId);
			if($('.navbar-toggle').is(":visible") == true){
				$('.navbar-collapse').collapse('toggle');
			}
			$(this).blur();
			return false;
		});

		// to stick navbar on top
			$.getScript("https://www.eq19.com/js/stickUp.min.js", function() {
				$('.templatemo-top-menu ').stickUp();
			});

		// gallery category
		$('.templatemo-gallery-category a').click(function(e){
			e.preventDefault(); 
			$(this).parent().children('a').removeClass('active');
			$(this).addClass('active');
			var linkClass = $(this).attr('href');
			$('.gallery').each(function(){
				if($(this).is(":visible") == true){
				   $(this).hide();
				};
			});
			$(linkClass).fadeIn();  
		});

		//gallery light box setup
		$.getScript("https://www.eq19.com/colorbox/jquery.colorbox-min.js", function() {
			$('a.colorbox').colorbox({
				rel: function(){
					return $(this).data('group');
				}
			});
		});
		
	});
});
