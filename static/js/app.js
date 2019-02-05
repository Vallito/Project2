// get data from /data url

d3.queue()
    .defer(d3.json, "/data")
    .await(makeViz);


// function to create viz
function makeViz(error,appData) {

  // console.log(appData[1]);
//Note: may need to adjust vars depending on what/how data is returned.
var lighthouses = appData[0].lighthouses;
var shipwreckData = appData[1].shipwrecks;

//  console.log(shipwreckData);
// Create Polygon of lighthouses with x radius from center. Assumes lighthouses is geoJson

var features = lighthouses.features;
var radius = 10;
var options = {steps: 25, units: 'miles'};

var poly = [];


for (var i in features){
  // Note: if corrdinates are in Lat,Lon then features.geometry.coordinates can be used. 
    var coord = [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]];
    // Update the properties of the polygons to match the features of the lighthouse
    options['properties']=features[i].properties;
    // create polygon
    var circle = turf.circle(coord, radius, options);
    // add the polygon to the ploy obj
    poly.push(circle);
};
// console.log(poly);

// Convert poly to a geoJson for spatial analysis
var lighthousePolygons = {};
lighthousePolygons['type'] = 'FeatureCollection';
lighthousePolygons['features'] = poly;

// console.log(lighthousePolygons);
// Create geoJson for shipwrecks
var shipWrecks = {};
shipWrecks['type'] = 'FeatureCollection';
shipWrecks['features'] = [];

//NOTE: may need to be used depending on how data comes across
// for (var k in shipwreckData) {
//   console.log(k);
//     var ship = {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [parseFloat(shipwreckData[k].lat), parseFloat(shipwreckData[k].lon)]
//       },
//       "properties": {
//         "title": shipwreckData[k].title,
//         "description": shipwreckData[k].desc,
//         "year": shipwreckData[k].year
//       }
//     };
//     shipWrecks['features'].push(ship);
//   };

var ship = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [parseFloat(shipwreckData.lat), parseFloat(shipwreckData.lon)]
  },
  "properties": {
    "title": shipwreckData.title,
    "description": shipwreckData.desc,
    "year": shipwreckData.year
  }
};
shipWrecks['features'].push(ship);

  console.log('shipwrecks');
  console.log(shipWrecks);



// MAPS
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map shipwreckData &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    Lighthouses: new L.LayerGroup(),
    Shipwrecks: new L.LayerGroup(),
    LightHouseCircle: new L.LayerGroup()
  };


  var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [
      layers.Lighthouses,
      layers.Shipwrecks,
      layers.LightHouseCircle
    ]
  });

  // Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

var overlays = {
    "Lighthouses": layers.Lighthouses,
    "Shipwrecks": layers.Shipwrecks,
    "LightHouseCircle": layers.LightHouseCircle
  };

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);


// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
  });
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);

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

  var LightHouseCircle = L.geoJSON(lighthousePolygons.features);
      LightHouseCircle.addTo(layers['LightHouseCircle']);

  
  var wrecks = shipWrecks.features;
  var lpoly = lighthousePolygons.features;
  console.log(lpoly.length);
  console.log(wrecks.length);
  for (var i = 0; i < wrecks.length; i++){
    var boat = Object.assign({}, wrecks[i]); 
      console.log(boat.geometry);
      // compare ship to lighthouse locations
    for (var p = 0; p<lpoly.length;p++){
      var intersection = turf.intersect(boat.geometry,lpoly[p].geometry );
      var marker ;
      //If point and polygon intersect:
      if (intersection !== null) {
        boat.properties['lighthouse'] = lpoly[p].properties.name
        if( boat.properties.year > lpoly[p].properties.year){
          boat.properties['when'] = 'after'
          marker = L.marker(boat.geometry, {
            icon: redShip
          });
        }
        else {
          boat.properties['when'] = 'before'
          marker = L.marker(boat.geometry, {
            icon: blkShip
        });
        };
      console.log(lpoly[p].properties.name);
      console.log(boat.properties);
      }
    else {
    marker = L.marker(boat.geometry, {
      icon: purShip
    });
    };

    marker.addTo(myMap).bindPopup(popup);
    // var newMarker = L.circleMarker([boat.geometry.coordinates[0],boat.geometry.coordinates[1]], {
      // 'color': icons.Shipwrecks.color,
      // 'radius' : icons.Shipwrecks.radius
 // });

  // newMarker.addTo(layers['Shipwrecks']);

  };
};

  var l_houses = lighthouses.features;
  for (var l = 0; l < l_houses.length; l++){
    //console.log(l_houses[l]);
    var light = Object.assign({}, l_houses[l]); 
    //console.log(light.geometry.coordinates);
    var lighthouseMarker =  L.marker([light.geometry.coordinates[1],light.geometry.coordinates[0]], {
      icon: lighthouse
  });
  
//   L.circleMarker([light.geometry.coordinates[1],light.geometry.coordinates[0]], {
//       'color':icons.Lighthouses.color,
//       'radius':icons.Lighthouses.radius
// });

lighthouseMarker.addTo(layers['Lighthouses']);
};

};
  