
var map;
var mapLayer;
var popUp;
var ctlSidebar;
var sidebarButton;
var geoSearch;
var provider;
var ctlSearch;

//const hkiCoords = {lat:60.16, lng:24.93};
const minLng = 22;
const maxLng = 30;
const minLat = 60;
const maxLat = 70;

var onLocation = false;

$(document).ready(() => {
	
	geoSearch = window.GeoSearch;
	
  	provider = new geoSearch.OpenStreetMapProvider();

	$('#locateBtn').text("Näytä oma sijainti");

	$("#locateBtn").click(() => {
    	if(!onLocation) {
   	 		map.locate();
   	 		$('#locateBtn').text("Satunnainen kohde"); 
   	 		onLocation = true;
    	}
    	else {
    		loadMap(getRandomPosition()); 
   	 		$('#locateBtn').text("Näytä taas oma sijainti");
   	 		onLocation = false;
    	}
    	sidebarButton.state('showSidebar')
		ctlSidebar.toggle();  
	});

	ctlSidebar = L.control.sidebar('sidebar', {
    		position: 'left'
	});
	
	sidebarButton = L.easyButton({
	    states: [{
	            stateName: 'showSidebar',        
	            icon:      'glyphicon-menu-right',              
	            title:     'Näytä sivupalkki',      
	            onClick: (btn) => {       
	       			ctlSidebar.toggle();     
	                btn.state('hideSidebar');  
	            }
	        }, {
	            stateName: 'hideSidebar',        
	            icon:      'glyphicon-menu-left',              
	            title:     'Piilota sivupalkki',      
	            onClick: (btn) => {       
	       			ctlSidebar.toggle();     
	                btn.state('showSidebar');  
	           }
	    	}]
	});

	loadMap(getRandomPosition());

	map.on('locationfound', ev => {
		pos = ev.latlng;
		console.log(pos);
	    loadMap(pos, "<h3>Olet täällä</h3>");
	});

	map.on('locationerror', ev => {
		console.log(ev);
		alert("Paikannus ei onnistunut");
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

const loadMap = (pos,popupContent=null) => {
	if (map) {
		map.removeControl(ctlSearch);
		map.off().remove();
	}
		
	map = L.map('map', {
		center:pos, 
		zoom:13, 
		dragging:false,  
		zoomsliderControl: true,
        zoomControl: false,
     });
	
	map.addControl(ctlSidebar);
	sidebarButton.addTo(map);
	
	ctlSearch = new geoSearch.GeoSearchControl({
  		provider: provider,           
  		style: 'bar',                 
	}).addTo(map);

	mapLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
	
	map.spin(true);
	setTimeout(() => {
	    map.addLayer(mapLayer);    
	    map.spin(false);
	    
	    L.circleMarker(pos).addTo(map);
	    L.control.scale({imperial:false}).addTo(map);
	    L.control.polylineMeasure().addTo(map);
	    if (popupContent) {
	    	makePopUp(pos,popupContent)
	    }	
	}, 3000);
}  

const makePopUp = (coords,content) => {
	popup = L.popup()
		.setLatLng(coords)
		.setContent(content)
		.openOn(map);
}