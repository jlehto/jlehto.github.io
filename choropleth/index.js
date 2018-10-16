var map;

$(document).ready(() => {
	//$("#map").html("<pre>Ready!</pre>");
	init();
	
});

const init = () => {
	let tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + apikey;
	let tileOptions =  {id: 'mapbox.light'}
	
	map = L.map('map').setView([60.40, 25.07], 8);

	L.tileLayer(tileUrl,tileOptions).addTo(map);

}