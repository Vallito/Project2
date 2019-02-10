

d3.queue()
    .defer(d3.json, "/data")
    .await(makeViz);

function makeViz(error,appData) {   
  if (error) throw error;



  var shipwreckData = appData[1].shipwrecks;
  // Format the data
  var wreckYears = [];
  for (var k in shipwreckData) {
    var year;
    if(isNaN(shipwreckData[k].sunk_date.substr(shipwreckData[k].sunk_date.length - 4))){
      year = shipwreckData[k].notes.substr(shipwreckData[k].notes.length - 4);
      
    }
    else {
      year = shipwreckData[k].sunk_date.substr(shipwreckData[k].sunk_date.length - 4);
    };
  
  wreckYears.push(parseInt(year));
  };
  // console.log(wreckYears);
  var uniqueYears = wreckYears.filter((v, i, a) => a.indexOf(v) === i)
  var yearCounts = Object.create(null);
  wreckYears.forEach(yr => {
    yearCounts[yr] = yearCounts[yr] ? yearCounts[yr] + 1 : 1;
  });
  // console.log("uniqueyears: " + uniqueYears);
  // console.log(yearCounts);


  var lighthousedata = appData[0].lighthouses;

  var litYears = [];
  for (var l in lighthousedata) {
    var lYear;
    if(isNaN(lighthousedata[l]["Year first lit"])){
      lYear = 0
    }
    else {
      lYear = lighthousedata[l]["Year first lit"]
    };
  litYears.push(parseInt(lYear));

  };
  // console.log(litYears);
  var uniqueLYears = litYears.filter((v,i,a) => a.indexOf(v) == i)
  var lYearCounts = Object.create(null);
  litYears.forEach(ly => {
    lYearCounts[ly] = lYearCounts[ly] ? lYearCounts[ly] + 1 : 1;
  });
  // console.log("unique lit years: " + uniqueLYears);
  // console.log(lYearCounts);

  var chartData2 = [];
  var chartData = [];
    
    
  obj = {};
  var lnewKey = [];
  var lval = [];
  for (lkey in lYearCounts) {
   
    if (isNaN(lkey)){
      continue;
    } else if (lkey == 0){
      continue;
    }
    else {
      // console.log('key' ,lkey);
      lnewKey.push(lkey);
      lval.push(lYearCounts[lkey]);
    }
    
    
  };
  // console.log('newKey',lnewKey);
 obj = {'year':lnewKey,'count':lval};
  chartData.push(obj);
  // console.log('chart data',chartData);

  var obj2 = {};
  var val = [];
  var newKey = [];
  for (key in yearCounts) {
    obj = {};
    if (isNaN(key)){
      continue;
    } else if (key <= 1750){
      continue;
    } else if (yearCounts[key] == null) {
      val.push(0);
      newKey.push(key);
    }
    else {
      newKey.push(key);
      val.push(yearCounts[key]);
    }
    
 
  };
  obj2 = {'year':newKey,'count':val}
  chartData2.push(obj2)
 


totals = [];

var shipCount = 0;
var lightCount = 0;
for (key in yearCounts) {
  shipCount = shipCount + yearCounts[key]
};
// console.log(shipCount)
for (key in lYearCounts) {
  lightCount = lightCount + lYearCounts[key]
};
// console.log(lightCount)

shipVsLight = []
shipVsLight.push(shipCount);
shipVsLight.push(lightCount);
// console.log(shipVsLight)


  
var trace1 = {
  x: chartData[0].year,
  y: chartData[0].count,
  mode: 'lines',
  name: 'Lighthouses'
};

var trace2 = {
  x: chartData2[0].year,
  y: chartData2[0].count,
  mode: 'lines',
  name: 'Shipwrecks'
};

var trace3 = {
  x: [1861,1865],
  y: 1,
  mode: 'lines',
  // text: 'Civil War',
  line: {
    color: '#d3d3d3'
  },
  name: 'Civil War',
  visible: 'legendonly',
  showlegend: true
};

var trace5 = {
  x: [1939,1945],
  y: 1,
  mode: 'lines',
  // text: 'World War 1',
  name: 'World War II',
  line: {
    color: '#B5D3E7'
  },
  visible: 'legendonly',
  showlegend: true
};
var trace4 = {
  x: [1914,1918],
  y: 1,
  mode: 'lines',
  // text: 'World War 1',
  name: 'World War I',
  line: {
    color: '#adccbb'
  },
  visible: 'legendonly',
  showlegend: true
};
var data = [trace1, trace2,trace3,trace4,trace5];

// console.log(chartData[0]);
var layout = {
  title: 'Counts over the Years',
  xaxis: {
    title: 'Years'
  },
  yaxis: {
    title: 'Count'
  },
  'shapes': [
    // # 1st highlight during Feb 4 - Feb 6
    {
        'type': 'rect',
        // # x-reference is assigned to the x-values
        'xref': 'x',
        // # y-reference is assigned to the plot paper [0,1]
        'yref': 'paper',
        'x0': '1861',
        'y0': 0,
        'x1': '1865',
        'y1': 1,
        'fillcolor': '#d3d3d3',
        'opacity': 0.2,
        'line': {
            'width': 0,
        }
    },
    // # 2nd highlight during Feb 20 - Feb 23
    {
        'type': 'rect',
        'xref': 'x',
        'yref': 'paper',
        'x0': '1939',
        'y0': 0,
        'x1': '1945',
        'y1': 1,
        'fillcolor': '#B5D3E7',
        'opacity': 0.2,
        'line': {
            'width': 0,
        }
      },
        {
          'type': 'rect',
          'xref': 'x',
          'yref': 'paper',
          'x0': '1914',
          'y0': 0,
          'x1': '1919',
          'y1': 1,
          'fillcolor': '#adccbb',
          'opacity': 0.2,
          'line': {
              'width': 0,
          }
    }
]
};

Plotly.newPlot('graph', data, layout);
/// Bar Chart
var trace1 = {
  x: ['Shipwrecks'],
  y: [shipVsLight[0]],
  name: 'Shipwrecks',
  type: 'bar'
};

var trace2 = {
  x: ['Lighthouses'],
  y: [shipVsLight[1]],
  name: 'Lighthouses',
  type: 'bar'
};

var data = [trace1, trace2];

var layout = {barmode: 'group'};

Plotly.newPlot('bar', data, layout);

};
