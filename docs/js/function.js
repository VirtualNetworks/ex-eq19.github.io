$(function () {
	//$().UItoTop({ easingType: 'easeOutQuart' });
	if ($('html').hasClass('desktop')) {
		$.srSmoothscroll({
			step: 150,
			speed: 800
		});
	}
// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
		ua = navigator.userAgent,

		gestureStart = function () {
			viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
		},

		scaleFix = function () {
			if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
				viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
				document.addEventListener("gesturestart", gestureStart, false);
			}
		};

	scaleFix();
	// Menu Android
	if (window.orientation != undefined) {
		var regM = /ipod|ipad|iphone/gi,
			result = ua.match(regM)
		if (!result) {
			$('.sf-menu li').each(function () {
				if ($(">ul", this)[0]) {
					$(">a", this).toggle(
						function () {
							return false;
						},
						function () {
							window.location.href = $(this).attr("href");
						}
					);
				}
			})
		}
	}
});

$(window).load(function () {
	if ($('html').hasClass('desktop')) {
		$('#stuck_container').TMStickUp({
		})
	}
});

// jQuery document.ready will be executed just after html dom tree has been parsed out.
// So it is far more earlier executed than window onload.
$(document).ready(function () {
	var owl = $('#owl');
	var owl2 = $('#owl_2');
	var camera = $('#camera');
	var isotope = $('.isotope');

	$('img').unveil();
	$('.top-menu').stickUp();
	$('a.colorbox').colorbox({
		rel: function(){
			return $(this).data('group');
		}
	});
	// to stick navbar on top and hash
	var top_menu_height = $('.top-menu').height();
	$('html,body').scrollspy({target: '#templatemo-nav-bar', offset: top_menu_height + 10});

	// do scroll and clear the hash anytime someone arrives with a hash tag
	// https://stackoverflow.com/a/50688363/4058484
	if( typeof(location.hash) !== 'undefined' && location.hash.length ) 
	{
		var location_hash = location.hash.split('?')[0];
		history.replaceState(null, null, location.pathname);
		scrollTo(location_hash);
	}

	// set links which point outside
	$('.external-link').unbind('click');
	$(document.links).filter(function() {
		return this.hostname != window.location.hostname;
	}).attr('target', '_blank'); 

	// scroll to top
	$('#btn-back-to-top').click(function(e)
	{
		e.preventDefault();
		scrollTo('#templatemo-top');
	});

	// scroll to specific id when click on link
	$('.internal-link, .carousel-inner a').click(function(e)
	{
		e.preventDefault(); 
		var linkId = $(this).attr('href');
		scrollTo(linkId);
		return false;
	});

	// scroll to specific id when click on menu
	$('.top-menu .navbar-nav a').click(function(e)
	{
		e.preventDefault(); 
		var linkId = $(this).attr('href');
		scrollTo(linkId);
		if($('.navbar-toggle').is(":visible") == true)
		{
			$('.navbar-collapse').collapse('toggle');
		}
		$(this).blur();
		return false;
	});

	$(".templatemo-project-gallery").simplyScroll();
	$('.templatemo-gallery-category a').click(function(e)
	{
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

	if(camera.length > 0){
		camera.camera(
			{
				autoAdvance: false,
				height: '31.25%',
				minHeight: '200px',
				pagination: false,
				thumbnails: false,
				playPause: false,
				hover: false,
				loader: 'none',
				navigation: true,
				navigationHover: false,
				mobileNavHover: false,
				fx: 'simpleFade'
			}
		);
	}

	if(owl.length > 0){
		owl.owlCarousel(
			{
				navigation: true,
				autoPlay: true,
				slideSpeed: 300,
				stopOnHover: true,
				pagination: false,
				paginationSpeed: 400,
				singleItem: true,
				mouseDrag: false,
				navigationText: ["", ""]
			}
		);
	}

	if(owl2.length > 0){
		owl2.owlCarousel(
			{
				navigation: true,
				autoPlay: true,
				slideSpeed: 300,
				stopOnHover: true,
				pagination: false,
				paginationSpeed: 400,
				singleItem: true,
				mouseDrag: false,
				navigationText: ["", ""]
			}
		);
	}

	if(isotope.length > 0){
		isotope.isotope({
			itemSelector: '.element-item',
			layoutMode: 'fitRows'
		});

		$('#filters').on( 'click', 'a', function() {
			var filterValue = $( this ).attr('data-filter');
			console.log(filterValue);

			if(filterValue == '*'){
				isotope.isotope({ filter: filterValue });
			}else{
				isotope.isotope({ filter: '.'+filterValue });
			}
			return false;
		});
	}

	$("#copyright-year").text((new Date).getFullYear());
	Flatdoc.run({fetcher: Flatdoc.github('eq19/wikibox')});

});

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

function set(name, value) {
  return localStorage.setItem(name, value);
}

function get(name) {
  return localStorage.getItem(name) || false;
}

function debug() {
  console.debug.apply(console, arguments);
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

$(window).bind("hashchange", () =>
  initialize(location.hash || location.pathname)
);

$(document).on("scroll", function () {
  let start = $(this).scrollTop() + 5;
  let items = [];

  $(".markdown-body")
	.find("h1,h2,h3,h4,h5,h6")
	.each(function () {
	  items.push({
		offset: $(this).offset().top,
		id: this.id,
		level: parseInt(this.tagName.slice(1)),
	  });
	});
  for (let i = 0; i < items.length; i++) {
	if (start > items[i].offset) {
	  if (i < items.length - 1) {
		if (start < items[i + 1].offset) {
		  if (items[i].level == 1) {
			initialize(location.pathname);
		  } else {
			initialize("#" + items[i].id);
		  }
		}
	  } else {
		initialize("#" + items[i].id);
	  }
	}
  }
});

$("#toggle").click(function () {
  $(".sidebar-wrap,.content-wrap,.addons-wrap").toggleClass("shift");
});
$(".status").click(function () {
  $(".addons").toggleClass("d-none");
});

if (location.pathname == `${ui.baseurl}/search.html`) {
  $.ajax(`${ui.baseurl}/data.json`)
	.done(search)
	.fail((xhr, message) => debug(message));
}

toc();
initialize(location.pathname);
initialize(location.hash);
restore();
highlight();

/* nested ul */
$(".toc ul")
  .siblings("a")
  .each(function () {
	let link = $(this);
	let expand = $('<i class="fa fa-plus-square-o"></i>');

	expand.on("click", function (e) {
	  e.stopPropagation();
	  toggleCurrent(link);
	  return false;
	});
	link.prepend(expand);
  });

$(".markdown-body :header").append(function () {
  return `<a href="#${this.id}" class="anchor"><i class="octicon-link fa fa-link text-blue"></i></a>`;
});

$("div.highlighter-rouge").each(function () {
  const match = $(this)
	.attr("class")
	.match(/language-(\w+)/);
  if (match) {
	$(this).attr("data-lang", match[1]);
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`${ui.baseurl}/sw.caches.js`);
} else {
  debug("Service Worker not supported!");
}

// init scrollTo 
function scrollTo(selectors)
{
	if(!$(selectors).length) return;
	var selector_top = $(selectors).offset().top - top_menu_height;
	$('html,body').animate({scrollTop: selector_top }, 'slow');
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

/* Orientation tablet fix
 ========================================================*/
var currentYear = (new Date).getFullYear();

var ua = navigator.userAgent.toLocaleLowerCase(),
	regV = /ipod|ipad|iphone/gi,
	result = ua.match(regV),
	userScale = "";
if (!result) {
	userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">')

