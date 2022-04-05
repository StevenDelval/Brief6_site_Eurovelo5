var map = L.map('map').setView([50.62925,3.057256], 8);
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 18,
    tileSize: 512,
    zoomOffset:-1,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var marker = L.marker([50.9652183, 1.8630816]).addTo(map);
let url = "gpx_eurovelo5.xml" ;
var gpx = url; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {async: true,
    polyline_options: {
    color: '#E5B9B5',
    weight: 7,
    lineCap: 'round'
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);


//#E5B9B5