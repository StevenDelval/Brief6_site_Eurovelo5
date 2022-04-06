var map = L.map('map').setView([50.62925,3.057256], 9);

/// creation map
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
///

/* var marker = L.marker([50.9652183, 1.8630816]).addTo(map);*/

 // URL to your GPX file or the GPX itself
//  Ajout Gpx //
var gpx = "gpx/gpx_eurovelo5.gpx";

new L.GPX(gpx, {async: true,
    polyline_options: {
    color: '#E5B9B5',
    weight: 7,
    lineCap: 'round'
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
//////////////////
