function debug() {
  console.debug.apply(console, arguments);
}

function set(name, value) {
  return localStorage.setItem(name, value);
}

function get(name) {
  return localStorage.getItem(name) || false;
}

// scroll animation 
function scrollTo(selectors)
{

    if(!$(selectors).size()) return;
    var selector_top = $(selectors).offset().top - top_menu_height;
    $('html,body').animate({ scrollTop: selector_top }, 'slow');

}

function toc() {
  $(".toctree li.current")
	.append('<ul class="content-toc"></ul>')
	.html(function () {
	  let level = parseInt(this.dataset.level);
	  let temp = 0;
	  let stack = [$(this).find(".content-toc")];

	  $(".markdown-body")
		.find("h2,h3,h4,h5,h6")
		.each(function () {
		  let anchor = $("<a/>")
			.addClass("d-flex flex-items-baseline")
			.text($(this).text())
			.attr("href", `#${this.id}`);
		  let tagLevel = parseInt(this.tagName.slice(1)) - 1;

		  if (tagLevel > temp) {
			let parent = stack[0].children("li:last")[0];
			if (parent) {
			  stack.unshift($("<ul/>").appendTo(parent));
			}
		  } else {
			stack.splice(
			  0,
			  Math.min(temp - tagLevel, Math.max(stack.length - 1, 0))
			);
		  }
		  temp = tagLevel;

		  $("<li/>")
			.addClass(`toc level-${level + tagLevel}`)
			.append(anchor)
			.appendTo(stack[0]);
		});
	  if (!stack[0].html()) {
		stack[0].remove();
	  }
	});
}

// filtering json object
function filterBy(data, filters = {}) {
    // Set up the specific defaults that will show everything:
    const defaults = {
        category: null,
        yearFrom: 1895,
        yearTo: 2100,
        gender: null
    }

    // Merge any filters with the defaults
    filters = Object.assign({}, defaults, filters);

    // Filter based on that filters object:
    return data.filter(laur => {
        return (laur.yearFrom >= filters.yearFrom) &&
           (laur.yearTo <= filters.yearTo);
  });
}

function search(data) {
  let text = new URL(location.href).searchParams.get("q");
  let lang = new URL(location.href).searchParams.get("lang") || ui.lang;

  $("input[name='q']").val(text);

  let results = [];
  let regexp = new RegExp();
  try {
	regexp = new RegExp(text, "im");
  } catch (e) {
	$(".search-results .content").empty();
	$(".search-results .summary").html(ui.i18n.search_results_not_found);
	$(".search-results h2").html(ui.i18n.search_results);
	return debug(e.message);
  }

  function slice(content, min, max) {
	return content
	  .slice(min, max)
	  .replace(regexp, (match) => `<span class="bg-yellow">${match}</span>`);
  }
  for (page of data) {
	let [title, content] = [null, null];
	try {
	  if (page.title) {
		title = page.title.match(regexp);
	  } else {
		if (page.url == "/") {
		  page.title = ui.title;
		} else {
		  page.title = page.url;
		}
	  }
	} catch (e) {
	  debug(e.message);
	}
	try {
	  if (page.content) {
		page.content = $("<div/>").html(page.content).text();
		content = page.content.match(regexp);
	  }
	} catch (e) {
	  debug(e.message);
	}
	if (title || content) {
	  let result = [
		`<a href="${ui.baseurl}${page.url}?highlight=${text}">${page.title}</a>`,
	  ];
	  if (content) {
		let [min, max] = [content.index - 100, content.index + 100];
		let [prefix, suffix] = ["...", "..."];

		if (min < 0) {
		  prefix = "";
		  min = 0;
		}
		if (max > page.content.length) {
		  suffix = "";
		  max = page.content.length;
		}
		result.push(
		  `<p class="text-gray">${prefix}${slice(
			page.content,
			min,
			max
		  )}${suffix}</p>`
		);
	  }
	  results.push(`<li class="border-top py-4">${result.join("")}</li>`);
	}
  }
  if (results.length > 0 && text.length > 0) {
	$(".search-results .content").html(results.join(""));
	$(".search-results .summary").html(
	  ui.i18n.search_results_found.replace("#", results.length)
	);
  } else {
	$(".search-results .content").empty();
	$(".search-results .summary").html(ui.i18n.search_results_not_found);
  }
  $(".search-results h2").html(ui.i18n.search_results);
}

function initialize(name) {
  let link = $(".toctree").find(`[href="${decodeURI(name)}"]`);

  if (link.length > 0) {
	$(".toctree .current").removeClass("current");
	link.addClass("current");
	link.closest(".level-1").parent().addClass("current");
	for (let i = 1; i <= 11; i++) {
	  link.closest(`.level-${i}`).addClass("current");
	}
  }
}

function toggleCurrent(link) {
  let closest = link.closest("li");
  closest.siblings("li.current").removeClass("current");
  closest.siblings().find("li.current").removeClass("current");
  closest.find("> ul li.current").removeClass("current");
  closest.toggleClass("current");
}

function restore() {
  let scroll = get("scroll");
  let scrollTime = get("scrollTime");
  let scrollHost = get("scrollHost");

  if (scroll && scrollTime && scrollHost) {
	if (scrollHost == location.host && Date.now() - scrollTime < 6e5) {
	  $(".sidebar").scrollTop(scroll);
	}
  }
  $(".sidebar").scroll(function () {
	set("scroll", this.scrollTop);
	set("scrollTime", Date.now());
	set("scrollHost", location.host);
  });
}

function highlight() {
  let text = new URL(location.href).searchParams.get("highlight");

  if (text) {
	$(".markdown-body")
	  .find("*")
	  .each(function () {
		try {
		  if (this.outerHTML.match(new RegExp(text, "im"))) {
			$(this).addClass("search-result");
			$(this).parentsUntil(".markdown-body").removeClass("search-result");
		  }
		} catch (e) {
		  debug(e.message);
		}
	  });
	// last node
	$(".search-result").each(function () {
	  $(this).html(function (i, html) {
		return html.replace(text, `<span class="bg-yellow">${text}</span>`);
	  });
	});
	$(".search input").val(text);
  }
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

		// gallery light box setup
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

		// draw diagram
		$.getScript($('#js')[0].href, function() {
			$('.theme').val('hand').change(function() {draw.change();});
			//https://stackoverflow.com/a/73466462/4058484
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

toc();
restore();
highlight();
initialize(location.hash);
initialize(location.pathname);

/* Orientation tablet fix
 ========================================================*/
var myIdcounter = top_menu_height = 0;
var currentYear = (new Date).getFullYear();
var ua = navigator.userAgent.toLocaleLowerCase(),
	regV = /ipod|ipad|iphone/gi,
	result = ua.match(regV),
	userScale = "";
if (!result) {
	userScale = ",user-scalable=0"
}

var params, regex = /[?&]([^=#]+)=([^&#]*)/g, url = window.location.href, params = {}, match;
while(match = regex.exec(url)) {params[match[1]] = match[2];}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">')
