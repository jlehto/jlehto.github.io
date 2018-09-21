
var map;
var mapLayer;

$(document).ready(function(){
	locateBtn.addEventListener("click", locate);
	loadMap([60.16, 24.93]); //hgin keskusta
});
  
function loadMap(pos) {
	map = L.map('map', {center:pos, zoom:15, dragging:false});
	mapLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
		
	map.spin(true);
	setTimeout(() => {

	    map.addLayer(mapLayer);    
	    map.spin(false);
	    L.circleMarker(pos).addTo(map);
	}, 3000);
	
	$("#lat").append(document.createTextNode(pos[0]));
	$("#long").append(document.createTextNode(pos[1]));

}  


function locate() {
	navigator.geolocation.getCurrentPosition(position => {
		lat = position.coords.latitude;
		lng = position.coords.longitude;
		console.log(lat,lng);
		pos = [lat.toFixed(2),lng.toFixed(2)];
		
		map.off();
		map.remove();
	    loadMap(pos);
	},error);

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	}
}