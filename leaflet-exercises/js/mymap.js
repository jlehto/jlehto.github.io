
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
	
	$("#lat").append(document.createTextNode(pos.lat.toFixed(2)));
	$("#long").append(document.createTextNode(pos.lng.toFixed(2)));

}  


