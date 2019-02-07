//////////////////// MAPS//////////////////////////////////////////
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pirates",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    Lighthouses: new L.LayerGroup(),
    Shipwrecks_before: new L.LayerGroup(),
    Shipwrecks_after: new L.LayerGroup(),
    Shipwrecks_other: new L.LayerGroup()

    // LightHouseCircle: new L.LayerGroup()
  };


  var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [
      layers.Lighthouses,
      layers.Shipwrecks_before,
      layers.Shipwrecks_after,
      layers.Shipwrecks_other
      // layers.LightHouseCircle
    ]
  });

  // Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

var overlays = {
    "Lighthouses": layers.Lighthouses,
    "Before": layers.Shipwrecks_before,
    "After": layers.Shipwrecks_after,
    "Other": layers.Shipwrecks_other
    // "LightHouseCircle": layers.LightHouseCircle
  };

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);


// // Create a legend to display information about our map
// var info = L.control({
//     position: "bottomright"
//   });
// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
//   };
//   // Add the info legend to the map
//   info.addTo(map);

// create custom icons
var blkShip = L.icon({
  iconUrl: './static/images/ship.png',
  // shadowUrl:'images/ship_shadow.png',
  iconSize: [30,30],
  // shadowSize: [30,30],
  iconAnchor: [15,29],
  // shadowAnchor: [4,10],
  popupAnchor: [-3,-40]
});
var redShip = L.icon({
  iconUrl: './static/images/ship_red.png',
  // shadowUrl:'images/ship_shadow.png',
  iconSize: [30,30],
  // shadowSize: [30,30],
  iconAnchor: [15,29],
  // shadowAnchor: [4,10],
  popupAnchor: [-3,-40]
});
var purShip = L.icon({
  iconUrl: './static/images/ship_purple.png',
  // shadowUrl:'images/ship_shadow.png',
  iconSize: [30,30],
  // shadowSize: [30,30],
  iconAnchor: [15,29],
  // shadowAnchor: [4,10],
  popupAnchor: [-3,-40]
});
var lighthouse = L.icon({
  iconUrl: './static/images/lighthouse.png',
  // shadowUrl:'images/lighthouse_shadow.png',
  iconSize: [50,50],
  // shadowSize: [40,40],
  iconAnchor: [25,49],
  // shadowAnchor: [4,38],
  popupAnchor: [-3,-40]
});


//////////////////////// get data from /data url //////////////////////////////

d3.queue()
    .defer(d3.json, "/data")
    .await(makeViz);


// function to create viz
function makeViz(error,appData) {

  // console.log(appData[1]);
console.log(appData);
//Note: may need to adjust vars depending on what/how data is returned.
var lighthouses = appData[0].lighthouses;
var shipwreckData = appData[1].shipwrecks;
console.log(shipwreckData);
//  console.log(shipwreckData);
// Create Polygon of lighthouses with x radius from center. Assumes lighthouses is geoJson

var features = lighthouses[0].features;
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
 console.log(poly);

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
for (var k in shipwreckData) {
  console.log(k,shipwreckData[k].coordinates);
  if (shipwreckData[k].coordinates != null && shipwreckData[k].coordinates.length>1 && isNaN(shipwreckData[k].coordinates[1])==false){
  var year;
  var notes;
  if(isNaN(shipwreckData[k].sunk_date.substr(shipwreckData[k].sunk_date.length - 4))){
    year = shipwreckData[k].notes.substr(shipwreckData[k].notes.length - 4);
    notes = shipwreckData[k].sunk_date;
  }
  else {
    year = shipwreckData[k].sunk_date.substr(shipwreckData[k].sunk_date.length - 4);
    notes = shipwreckData[k].notes};
  var ship = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(shipwreckData[k].coordinates[0]), parseFloat(shipwreckData[k].coordinates[1])]
      },
      "properties": {
        "title": shipwreckData[k].ship,
        "description": notes,
        "year": year
      }
    };
    // console.log(ship);
    shipWrecks['features'].push(ship);
  }
  // else {console.log(shipwreckData[k])
  // }
   ; 
  // var ship = {
  //   "type": "Feature",
  //   "geometry": {
  //     "type": "Point",
  //     "coordinates": [parseFloat(shipwreckData.coordinates[0]), parseFloat(shipwreckData.coordinates[1])]
  //   },
  //   "properties": {
  //     "title": shipwreckData.ship,
  //     "description": shipwreckData.notes,
  //     "year": shipwreckData.sunk_date.substr(shipwreckData.sunk_date.length - 4) 
  //   }
  };


      console.log('shipwrecks');
      // console.log(shipWrecks);






      // var LightHouseCircle = L.geoJSON(lighthousePolygons.features);
      //     LightHouseCircle.addTo(layers['LightHouseCircle']);

      
      var wrecks = shipWrecks.features;
      var lpoly = lighthousePolygons.features;
      console.log(lpoly.length);
      console.log(wrecks.length);
      for (var i = 0; i < wrecks.length; i++){
        var boat = Object.assign({}, wrecks[i]); 
        // console.log(boat.properties);
          // console.log(boat.geometry);
          // compare ship to lighthouse locations
          //var marker ;
        var layerName = 'Shipwrecks_other';
        var marker = L.marker([boat.geometry.coordinates[0],boat.geometry.coordinates[1]], {
          'icon': purShip
          });
        var popup = L.responsivePopup().setContent(
            `<strong>${boat.properties.title}</strong><br>
            ${boat.properties.description}<br>
            ${boat.properties.year}<br>
            ${boat.geometry.coordinates[0]}<br>
            ${boat.geometry.coordinates[1]}`);
        for (var p = 0; p<lpoly.length;p++){
          var intersection = turf.intersect(boat.geometry,lpoly[p].geometry );
        
          //If point and polygon intersect:
          if (intersection !== null) {
            boat.properties['lighthouse'] = lpoly[p].properties.name
            if( boat.properties.year > lpoly[p].properties.year){
              // console.log('after',boat.properties.year,lpoly[p].properties.year);
              boat.properties['when'] = 'after';
              layerName = 'Shipwrecks_after';
              marker = L.marker([boat.geometry.coordinates[0],boat.geometry.coordinates[1]], {
                'icon': redShip
              
              });


            }
            else {
              // console.log('before',boat.properties.title,boat.properties.year,lpoly[p].properties.year);
              boat.properties['when'] = 'before';
              layerName = 'Shipwrecks_before';
              marker = L.marker([boat.geometry.coordinates[0],boat.geometry.coordinates[1]], {
                'icon': blkShip
            });
            
            }
            
          // console.log(lpoly[p].properties.name);
          // console.log([boat.geometry.coordinates[0],boat.geometry.coordinates[1]]);
          break;
          };
      
        // console.log('bind popup');
        // var newMarker = L.circleMarker([boat.geometry.coordinates[0],boat.geometry.coordinates[1]], {
          // 'color': icons.Shipwrecks.color,
          // 'radius' : icons.Shipwrecks.radius
    // });

    //marker.addTo(layers['Shipwrecks']);

      };
      // marker.bindPopup(popup);
      // console.log(layerName);
      marker.addTo(layers[layerName]).bindPopup(popup);
      // marker.addTo(layers[layerName]).bindPopup(popup);
      // marker.addTo(map);
    };
    console.log('ships complete');

      var l_houses = features;
      for (var l = 0; l < l_houses.length; l++){
        //console.log(l_houses[l]);
        var light = Object.assign({}, l_houses[l]); 
        // console.log(light.geometry.coordinates);
        var popup = L.responsivePopup().setContent(
          `<h4>${light.properties.name}</h4><br>
          ${light.properties.year}<br>
          ${light.geometry.coordinates[1]}<br>
          ${light.geometry.coordinates[0]}`);

        var lighthouseMarker =  L.marker([light.geometry.coordinates[1],light.geometry.coordinates[0]], {
          icon: lighthouse
      });
      
    //   L.circleMarker([light.geometry.coordinates[1],light.geometry.coordinates[0]], {
    //       'color':icons.Lighthouses.color,
    //       'radius':icons.Lighthouses.radius
    // });

    lighthouseMarker.addTo(layers['Lighthouses']).bindPopup(popup);
    };

};
  