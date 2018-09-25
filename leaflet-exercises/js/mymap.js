
var map;
var mapLayer;
var popUp;
var ctlSidebar;
var sidebarButton;

//const hkiCoords = {lat:60.16, lng:24.93};
const minLng = 22;
const maxLng = 30;
const minLat = 60;
const maxLat = 70;

var locateMe = true;

$(document).ready(() => {
	
	$('#locateBtn').text('Missäs Leo on?');

	$("#locateBtn").click(() => {
    	if(locateMe) {
   	 		map.locate();
   	 		$('#locateBtn').text("Jonnekin muualle"); 
   	 		locateMe = false; 
    	}
    	else {
    		loadMap(getRandomPosition()); 
   	 		$('#locateBtn').text("Missäs Leo on?");
   	 		locateMe = true;
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
	            //title:     '',      
	            onClick: (btn) => {       
	       			ctlSidebar.toggle();     
	                btn.state('hideSidebar');  
	            }
	        }, {
	            stateName: 'hideSidebar',        
	            icon:      'glyphicon-menu-left',              
	            //title:     '',      
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
	    loadMap(pos, "<h3>Leo Lehto</h3>");
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

const loadMap = (pos,popupContent=null) => {
	if (map)
		map.off().remove();
		
	map = L.map('map', {
		center:pos, 
		zoom:13, 
		dragging:false,  
		zoomsliderControl: true,
        zoomControl: false,
     });
	map.addControl(ctlSidebar);
	sidebarButton.addTo(map);
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