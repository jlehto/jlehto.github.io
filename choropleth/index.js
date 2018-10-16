var map;
var tileUrl;
var tileOptions = {};

$(document).ready(() => {
	if (typeof apikey === 'undefined') {
		console.log("No mapbox access token provided. Using OSM as base")
		tileUrl = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
	} else {
		tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + apikey;
		tileOptions =  {id: 'mapbox.light'}
	}
	init();
	
});

const init = () => {
	
	map = L.map('map').setView([60.40, 25.07], 9);

	L.tileLayer(tileUrl,tileOptions).addTo(map);
	let geojson = L.geoJson(uusimaaData).addTo(map);
}