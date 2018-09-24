
var map;
var mapLayer;
var popUp;

//const hkiCoords = {lat:60.16, lng:24.93};
const minLng = 22;
const maxLng = 30;
const minLat = 60;
const maxLat = 70;

$(document).ready(() => {
	
	$('#locateBtn').click(() => {
		map.locate();
	});

	loadMap(getRandomPosition()); 
	
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

const getRandomPosition = () => {
	rndLng = Math.random() * (maxLng - minLng) + minLng;
	rndLat = Math.random() * (maxLat - minLat) + minLat;
	return {lat:rndLat, lng:rndLng};
}

const loadMap = pos => {
	map = L.map('map', {
		center:pos, 
		zoom:13, 
		dragging:false,  
		zoomsliderControl: true,
         zoomControl: false,
     });
	mapLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
		
	map.spin(true);
	setTimeout(() => {
	    map.addLayer(mapLayer);    
	    map.spin(false);
	    L.circleMarker(pos).addTo(map);
	    L.control.scale({imperial:false}).addTo(map);
	}, 3000);
}  

const makePopUp = (coords,content) => {
	return L.popup()
		.setLatLng(coords)
		.setContent(content)
		.openOn(map);
}