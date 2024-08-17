
// DOMContentLoaded event is executed when the DOM is ready
// (i.e all the HTML elements have been created), so it's
// a good starting point to run any code
document.addEventListener("DOMContentLoaded", async function(){
    // the first argument of L.map is the ID
    // where the map will be rendered (i.e drawn)
    const map = L.map('map');
    // two parameters for setView
    // 1st: lat lng of the center of the map
    // 2nd: the zoom level
    map.setView([1.2494, 103.8303], 13);

    // a layer in leaflet = something that is drawn on top of th emap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // a layer group can contain other layers
    // a 'layer' is a generic term for anything that is drawn on top of the map
    // eg. markers, circles, entire GeoJSON -> "layers"
    const markerLayerGroup = L.layerGroup();  // a layer group can contain other layers

    // use a for loop to add 10 markers
    for (let i = 0; i < 10; i++) {
        const marker = L.marker(getRandomLatLng(map));
        marker.addTo(markerLayerGroup);
    }

    // add the marker layer group to th emap
    markerLayerGroup.addTo(map);


    // create a layer group for cirlces
    const circleLayerGroup = L.layerGroup();

    for (let i = 0; i < 5; i++) {
        L.circle(getRandomLatLng(map), {
            color: 'red',
            fillColor:'orange',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(circleLayerGroup);
    }


    const greenCircleLayerGroup = L.layerGroup();
    greenCircleLayerGroup.addTo(map); // show by default
    // green circle layer group
    for (let i = 0; i < 5; i++) {
        L.circle(getRandomLatLng(map), {
            color: 'green',
            fillColor:'blue',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(greenCircleLayerGroup);
    }


    // Add in a layer control to our map
    let baseLayers = {
        "Red Circles": circleLayerGroup,
        "Green Circles": greenCircleLayerGroup
    }

    // optional (can toggle on or off) and can have more than one visible 
    let overlays = {
        "Markers":  markerLayerGroup,
       
    };

    // a layer control to our map
    L.control.layers(baseLayers, overlays).addTo(map);

    // add event listener to the button to toggle red circles on/off
    document.querySelector("#btnToggle").addEventListener("click", function(){
        // hasLayer returns true if the map is showing the given layer
        if (map.hasLayer(circleLayerGroup)) {
            // use map.removeLayer to remove a layer from the map
            map.removeLayer(circleLayerGroup)
        } else {
            map.addLayer(circleLayerGroup);
        }
    })

})

function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}
