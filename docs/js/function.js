jQuery(function($)
{
	// jQuery document.ready will be executed just after html dom tree has been parsed out.
	// So it is far more earlier executed than window onload.
	$(document).ready(function()
	{
		// set links which point outside
		$('.external-link').unbind('click');
		$(document.links).filter(function() {
			return this.hostname != window.location.hostname;
		}).attr('target', '_blank'); 

		// automatically generate unique DOM ids using jQuery-ui
		// https://stackoverflow.com/a/20061124/4058484
		window.uniqueId = function(){
			return 'myid-' + myIdcounter++;
		}

	});

	// Window.onload event will be executed only when all page resources
	// ( images, audio, video etc ) has been downloaded in the page.
	$(window).on('load', function()
	{
		// unbind external link
		$('.external-link').unbind('click');

		// assign unique id
		// https://api.jqueryui.com/uniqueId/
		$('.theme').each(function (i, e) {
			var id = uniqueId();
			var name = uniqueId();
			$(e).attr('name', name).attr('id', id);
		});

		// draw diagram
		$.getScript($('#js')[0].href, function() {
			$('.theme').val('hand');
			draw.getJSON();
		});
	});
});

// set params 
var myIdcounter = 0;
var top_menu_height = 0;

// get params 
var params, regex = /[?&]([^=#]+)=([^&#]*)/g, url = window.location.href, params = {}, match;
while(match = regex.exec(url)) {params[match[1]] = match[2];}

// set editor
var editor = ace.edit("editor");
editor.setOptions({fontSize: "10pt"});
editor.getSession().setMode("/ace/mode/asciidoc");
editor.getSession().on('change', _.debounce(function() {draw.diagram();}, 100));
