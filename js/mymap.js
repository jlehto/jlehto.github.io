
var myMap;
var lyrOSM;

$(document).ready(function(){
	locateBtn.addEventListener("click", locate);
	loadMap([60.1699, 24.9384]); //hgin keskusta
});
  
function loadMap(pos) {
	myMap = L.map('map', {center:pos, zoom:15});
	lyrOSM = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
	myMap.addLayer(lyrOSM);
}  

function locate() {
	//console.log("Locate");
	navigator.geolocation.getCurrentPosition(position => {
		pos = [position.coords.latitude, position.coords.longitude];
		myMap.off();
		myMap.remove();
	    loadMap(pos);
	},error);

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	}
}