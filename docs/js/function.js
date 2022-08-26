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

		// set links which point outside
		$('.external-link').unbind('click');
		$(document.links).filter(function() {
			return this.hostname != window.location.hostname;
		}).attr('target', '_blank'); 

		// do scroll and clear the hash anytime someone arrives with a hash tag
		// https://stackoverflow.com/a/50688363/4058484
		if( typeof(location.hash) !== 'undefined' && location.hash.length ) 
		{
			var location_hash = location.hash.split('?')[0];
			history.replaceState(null, null, location.pathname);
			scrollTo(location_hash);
		}

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

		// to stick navbar on top
			$.getScript("https://www.eq19.com/js/stickUp.min.js", function() {
				$('.templatemo-top-menu ').stickUp();
			});

		// scroll spy to auto active the nav item
		top_menu_height = $('.templatemo-top-menu').height();
		$('body').scrollspy({ target: '#templatemo-nav-bar', offset: top_menu_height + 10 });

		$.getScript($('#js')[0].href, function() {
			$('.theme').val('hand');
			$('.theme').change(function() {draw.change();});
			//https://stackoverflow.com/a/23115903/4058484
			$.getScript("https://www.eq19.com/ace/src-min/ace.js", function() {
				if (!editor) {ace.config.set("basePath", "/ace/src-min"); draw.editor();};
				$.getScript("https://www.eq19.com/underscore/underscore-min.js", function() {
					editor.getSession().on('change', _.debounce(function() {draw.diagram();}, 100));
					$.getScript("https://www.eq19.com/tensorflow/tf.min.js", function() {
						$.ajax({
							type: "GET",
							dataType: "xml",
							url: "/sitemap.xml",
							success: draw.getJSON(xml)
						});
					});
				});
			});
		});  

	});
});
