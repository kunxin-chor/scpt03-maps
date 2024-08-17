
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
    map.setView([1.3526, 103.8352], 13);

    // a layer in leaflet = something that is drawn on top of th emap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Part 1: Get all the JSON data

    // launch these 3 axios.get together
    const hdbRequest = axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/hdb.json");
    const mallRequest =  axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/malls.json");
    const natureRequest =  axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/nature.json");
    
    const hdbResponse = await hdbRequest;
    const mallResponse = await mallRequest;
    const natureResponse = await natureRequest;


    // Part 2: Go through the JSON data and create layer groups has based them
    const hdbLayerGroup = L.layerGroup();
    hdbLayerGroup.addTo(map);
    for (let location of hdbResponse.data) {
        const marker  = L.marker(location.coordinates);
        marker.bindPopup(`<h1>${location.name}</h1>`)
        marker.addTo(hdbLayerGroup);
    }


    const mallLayerGroup = L.layerGroup();
    for (let location of mallResponse.data) {
        const marker = L.marker(location.coordinates);
        marker.bindPopup(`<h1>${location.name}</h1>`);
        marker.addTo(mallLayerGroup);
    }

    const natureLayerGroup  = L.layerGroup();
    for (let location of natureResponse.data) {
        const marker = L.marker(location.coordinates);
        marker.bindPopup(`<h1>${location.name}</h1>`);
        marker.addTo(natureLayerGroup);
    }

    const baseLayers = {
        "HDB": hdbLayerGroup,
        "Malls": mallLayerGroup,
        "Nature": natureLayerGroup
    }
    // first parameter: base layers
    // second parameter: overlays
    L.control.layers(baseLayers, {}).addTo(map);

})

