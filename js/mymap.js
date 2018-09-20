
var mymap;
var lyrOSM;

var pos = [60.1699, 24.9384]; //hgin keskusta

$(document).ready(function(){
	

	mymap = L.map('map', {center:pos, zoom:20});
	lyrOSM = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
	mymap.addLayer(lyrOSM);
});
  

/*

*/  