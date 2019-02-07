// create map

var myMap = L.map("map",{
    center:[39.8283, -98.5795],
    zoom: 4
});

// add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
// create custom icons
var blkShip = L.icon({
    iconUrl: 'images/ship.png',
    // shadowUrl:'images/ship_shadow.png',
    iconSize: [30,30],
    // shadowSize: [30,30],
    iconAnchor: [15,29],
    // shadowAnchor: [4,10],
    popupAnchor: [-3,-40]
});
var redShip = L.icon({
    iconUrl: 'images/ship_red.png',
    // shadowUrl:'images/ship_shadow.png',
    iconSize: [30,30],
    // shadowSize: [30,30],
    iconAnchor: [15,29],
    // shadowAnchor: [4,10],
    popupAnchor: [-3,-40]
});
var purShip = L.icon({
    iconUrl: 'images/ship_purple.png',
    // shadowUrl:'images/ship_shadow.png',
    iconSize: [30,30],
    // shadowSize: [30,30],
    iconAnchor: [15,29],
    // shadowAnchor: [4,10],
    popupAnchor: [-3,-40]
});
var lighthouse = L.icon({
    iconUrl: 'images/lighthouse.png',
    // shadowUrl:'images/lighthouse_shadow.png',
    iconSize: [50,50],
    // shadowSize: [40,40],
    iconAnchor: [25,49],
    // shadowAnchor: [4,38],
    popupAnchor: [-3,-40]
});
var popup = L.responsivePopup().setContent(
    '<h4>Test</h4> Responsive Popup.<br> Easily customizable.');

var boatMarker1 = L.marker([34.0195, -122.4912], {
    icon: blkShip
});
var boatMarker2 = L.marker([34.0195, -120.4912], {
    icon: redShip
});
var boatMarker3 = L.marker([34.0195, -119.4912], {
    icon: purShip
});
var markerLighthouse = L.marker([34.0195, -118.4912], {
    icon: lighthouse
});

boatMarker1.addTo(myMap).bindPopup(popup);
boatMarker2.addTo(myMap);
boatMarker3.addTo(myMap);
markerLighthouse.addTo(myMap);