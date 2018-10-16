var map;
var tileUrl;
var tileOptions = {};
var geoJson;
var ctlInfo;

$(document).ready(() => {
	if (typeof apikey === 'undefined') {
		console.log("No mapbox access token provided. Using OSM as base")
		tileUrl = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
	} else {
		tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + apikey;
		tileOptions =  {id: 'mapbox.light'}
	}
	init();
	
});

const init = () => {
	
	map = L.map('map').setView([60.40, 25.07], 8);

	L.tileLayer(tileUrl,tileOptions).addTo(map);
	geojson = L.geoJson(uusimaaData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	info = L.control();

	//info.options = {position: 'bottomright'};

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); 
	    this.update();
	    return this._div;
	};

	info.update = function (props) {
    	this._div.innerHTML = (props ?
        '<h3><b>' + props.name + ' : <br/>' + props.population + '</b></h3>' 
        : '<h4>Vie kursori kunnan kohdalle nähdäksesi väestömäärän</h4>');
	};

	info.addTo(map);

}

const style = feature => ({
        fillColor: getColor(feature.properties.population),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.5
})

const colors = [
				'#e5f5e0',
				'#c7e9c0',
				'#a1d99b',
				'#74c476',
				'#41ab5d',
				'#238b45',
				'#006d2c',
				'#00441b'];

const getColor = p =>
	p > 500000 ? colors[7] :
	p > 100000 ? colors[6] :
	p > 50000  ? colors[5] :
	p > 40000  ? colors[4] :
	p > 30000  ? colors[3] :
	p > 20000  ? colors[2] :
	p > 5000   ? colors[1] :
				colors[0];

const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
}				

const highlightFeature = ev => {
    let layer = ev.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

const resetHighlight = ev => {
	geojson.resetStyle(ev.target);
	info.update();
}

