var map = L.map('map').setView([50.62925, 3.057256], 9);
/// creation map
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// URL to your GPX file or the GPX itself
//  Ajout Gpx //
var liengpx = ["gpx/calais-ardres.gpx",
  "gpx/ardres-watten.gpx",
  "gpx/watten-st-omer.gpx",
  "gpx/st-omer-aire-sur-la-lys.gpx",
  "gpx/aire-sur-la-lys-st-venant.gpx",
  "gpx/st-venant-bethune.gpx",
  "gpx/bethunes-olhain.gpx",
  "gpx/olhain-angres.gpx",
  "gpx/angres-lens.gpx",
  "gpx/lens-don.gpx",
  "gpx/don-lille.gpx",
  "gpx/lille-wattrelos.gpx"];

var customOptions =
{
  'className': 'popupCustom'
}
let mapEtape = [];
let popup = [];

for (let gpxetape of liengpx) {
  new L.GPX(gpxetape, {
    polyline_options: {
      color: '#E5B9B5',
      weight: 7,
      lineCap: 'round'
    }
  }).on('mouseover', function (e) {
    this.setStyle({
      color: 'yellow'
    })
  }).on('mouseout', function (e) {
    this.setStyle({
      color: '#E5B9B5'
    })
  }).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);
}
//////////////////
