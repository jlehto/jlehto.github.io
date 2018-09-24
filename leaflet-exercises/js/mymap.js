
var map;
var mapLayer;

$(document).ready(function(){
	locateBtn.addEventListener("click", locate);
	loadMap({lat:60.16, lng:24.93}); //hgin keskusta

	map.on('locationfound', ev => {
		pos = ev.latlng;
		console.log(pos);
		map.off();
		map.remove();
	    loadMap(pos);
	});

	map.on('locationerror', ev => {
		console.log(ev);
		alert("Could not find location");
	});


	map.on('mousemove', ev => {
		$("#lat").html(ev.latlng.lat.toFixed(3));
		$("#long").html(ev.latlng.lng.toFixed(3));
	});


});

const locate = () => map.locate();

const loadMap = pos => {
	map = L.map('map', {center:pos, zoom:15, dragging:false});
	mapLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
		
	map.spin(true);
	setTimeout(() => {
	    map.addLayer(mapLayer);    
	    map.spin(false);
	    L.circleMarker(pos).addTo(map);
	}, 3000);
}  


