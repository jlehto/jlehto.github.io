
var mymap;
var lyrOSM;

var pos = [60.405373, 25.1028415];

$(document).ready(function(){
	mymap = L.map('map', {center:pos, zoom:30});
	lyrOSM = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
	mymap.addLayer(lyrOSM);
});
  

/*
navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});

*/  