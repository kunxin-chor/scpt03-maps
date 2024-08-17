// DOMContentLoaded event is executed when the DOM is ready
// (i.e all the HTML elements have been created), so it's
// a good starting point to run any code
document.addEventListener("DOMContentLoaded", async function () {
  // the first argument of L.map is the ID
  // where the map will be rendered (i.e drawn)
  const map = L.map("map");
  // two parameters for setView
  // 1st: lat lng of the center of the map
  // 2nd: the zoom level
  map.setView([1.2494, 103.8303], 13);

  // a layer in leaflet = something that is drawn on top of th emap
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // create a marker cluster group
  const markerCluster = L.markerClusterGroup();

  // draw the initial set of taxi markers
  drawTaxiMarkers(markerCluster);

  setInterval(async function () {
    // draw every 30s
    drawTaxiMarkers(markerCluster);
  }, 1000*30);

  markerCluster.addTo(map);
});

async function drawTaxiMarkers(markerCluster) {
    // remove all the existing markers first
// in general, to remove all items in a layer
markerCluster.clearLayers();

// load in all the taxi
const response = await axios.get(
    "https://api.data.gov.sg/v1/transport/taxi-availability"
);
const taxiCoordinates = response.data.features[0].geometry.coordinates;

// create the markers manually (it's so that later we can use marker clustering)
for (let coordinate of taxiCoordinates) {
    // keep in mind that the API is [lng, lat] so we have to inverse manually
    const lat = coordinate[1];
    const lng = coordinate[0];
    L.marker([lat, lng]).addTo(markerCluster);
}
}