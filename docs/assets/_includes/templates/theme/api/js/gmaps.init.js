$(function () {

    map();

});

/* map */

function map() {

    var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    map = new GMaps({
	el: '#map',
	lat: -6.8969724,
	lng: 107.5918826,
	zoomControl: true,
	zoomControlOpt: {
	    style: 'SMALL',
	    position: 'TOP_LEFT'
	},
	panControl: false,
	streetViewControl: false,
	mapTypeControl: false,
	overviewMapControl: false,
	scrollwheel: false,
	draggable: false,
	styles: styles
    });

    var image = 'img/marker.png';

    map.addMarker({
	lat: -6.8969724,
	lng: 107.5918826,
	icon: image,
	 title: 'Chetabahana',
	    infoWindow: {
	    content: '<p><a href="https://chetabahana.business.site/" target="_blank"><strong>Chetabahana</strong></a><br>Jl. Dr. Djunjunan No.82<br>Sukabungah, Sukajadi<br>Kota Bandung 40181<br><a href="https://www.google.com/search?q=Chetabahana&ludocid=839742103873687720" target="_blank">Lihat di Penelusuran..</a></p>'
	    }
    });
}