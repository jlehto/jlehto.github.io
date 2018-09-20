
var myMap;
var layer;

$(document).ready(function(){
	locateBtn.addEventListener("click", locate);
	loadMap([60.16, 24.93]); //hgin keskusta
});
  
function loadMap(pos) {
	myMap = L.map('map', {center:pos, zoom:15});
	layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
	myMap.addLayer(layer);
	//console.log(typeof(pos[1]))
	$("#lat").append(document.createTextNode(pos[0]));
	$("#long").append(document.createTextNode(pos[1]));

}  

function locate() {
	navigator.geolocation.getCurrentPosition(position => {
		lat = position.coords.latitude;
		lng = position.coords.longitude;
		console.log(lat,lng);
		pos = [lat.toFixed(2),lng.toFixed(2)];
		
		myMap.off();
		myMap.remove();
	    loadMap(pos);
	},error);

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	}
}