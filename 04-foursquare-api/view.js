function createMap() {
  const singaporeLatLng = [1.3521, 103.8198];
  const map = L.map("map");
  map.setView(singaporeLatLng, 11);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}


function addSearchResultToMap(data, searchResultLayer) {
    for (let r of data.results) {
        const lat = r.geocodes.main.latitude;
        const lng = r.geocodes.main.longitude;
        const marker = L.marker([lat, lng]);
        marker.bindPopup(`<h1>${r.name}</h1>
                <h2>Address:${r.location.formatted_address}</h2>           
            `);
        marker.addTo(searchResultLayer);
      }
}