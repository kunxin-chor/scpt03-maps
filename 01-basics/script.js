document.addEventListener("DOMContentLoaded", async function(){
    let singaporeLatlng = [1.3521, 103.8198];
    
    // L is a global variable which represents the Leaflet object
    // all functions and variables in Leaflet are in the `L` object
    let map = L.map("myMap");  // create the map in inside the element with id `myMap`
    map.setView(singaporeLatlng, 12);   // two parameters: one is an array which represents the lat lng, second the zoom level

    // create a tile layer
    let tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tileLayer.addTo(map);

    // add a marker
    let internationalPlaza = L.marker([1.2761, 103.8458]);
    // internationalPlaza.addTo(map); 
    map.addLayer(internationalPlaza); // any objects that you can draw on top of a map is known a layer
    internationalPlaza.bindPopup("<h1>Welcome to Singapore</h1>"); // show some HTML when the marker is clicked

    let changiAirport = L.marker([1.3586, 103.9899]);
    changiAirport.addTo(map);
    changiAirport.addEventListener("click", function(){
        alert("Changi Airport");
    });

    // first parameter: array that stores the lat lng
    // second paramater: an object that set the properties of the circle
    let circle = L.circle([1.3294, 103.8021], {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 2000
    });
    circle.addTo(map);

    let response = await axios.get("cycling.geojson");
    console.log(response.data);

    let cyclingLayer = L.geoJson(response.data);
    cyclingLayer.addTo(map);

    let taxiResponse =  await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let taxiLayer = L.geoJson(taxiResponse.data);
    taxiLayer.addTo(map);
});