// Step 1: Set up our chart
//= ================================
var svgWidth = 474;
var svgHeight = 374;

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
    

var formatCount = d3.format("f");

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

var chartGroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    


// Parse the date / time
// var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
// var x = d3.time.scale().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
//   .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//   .orient("left").ticks(5);

// // Define the line
// var valueline = d3.svg.line()
//   .x(function(d) { return x(d.date); })
//   .y(function(d) { return y(d.close); });

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file

// Step 3:
// Import data from the donuts.csv file
// =================================

d3.queue()
    .defer(d3.json, "/data")
    .await(makeViz);

function makeViz(error,appData) {   
  if (error) throw error;
// d3.csv("donuts.csv", function(error, donutData) { // old code
//   if (error) throw error;

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time
  // var parseTime = d3.timeParse("%d-%b");


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
  console.log(wreckYears);
  var uniqueYears = wreckYears.filter((v, i, a) => a.indexOf(v) === i)
  var yearCounts = Object.create(null);
  wreckYears.forEach(yr => {
    yearCounts[yr] = yearCounts[yr] ? yearCounts[yr] + 1 : 1;
  });
  console.log("uniqueyears: " + uniqueYears);
  console.log(yearCounts);


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
  console.log(litYears);
  var uniqueLYears = litYears.filter((v,i,a) => a.indexOf(v) == i)
  var lYearCounts = Object.create(null);
  litYears.forEach(ly => {
    lYearCounts[ly] = lYearCounts[ly] ? lYearCounts[ly] + 1 : 1;
  });
  // console.log("unique lit years: " + uniqueLYears);
  console.log(lYearCounts);

  var chartData2 = [];
  var chartData = [];
    
    
  
  for (key in lYearCounts) {
    obj = {};
    if (isNaN(key)){
      continue;
    } else if (key == 0){
      continue;
    }
    else {
      newKey = key
      val = lYearCounts[key]
    }
    
    obj = {'year':newKey,'count':val}
    chartData.push(obj)
  };


  for (key in yearCounts) {
    obj = {};
    if (isNaN(key)){
      continue;
    } else if (key <= 1750){
      continue;
    } else if (yearCounts[key] == null) {
      val = 0;
      newKey = key
    }
    else {
      newKey = key
      val = yearCounts[key]
    }
    
    obj = {'year':newKey,'count':val}
    chartData2.push(obj)
  };

 
console.log(chartData2)

var xLinearScale = d3.scaleLinear()
  .domain([1750,d3.max(chartData2,d => d.year)])
  .range([0,chartWidth]);

var yLinearScale = d3.scaleLinear()
  .domain([0,15])
  .range([chartHeight,0]);

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

var lhLine = d3.line()
  .x(d => xLinearScale(d.year))
  .y(d => yLinearScale(d.count));

chartGroup.append("path")
  .attr("d",lhLine(chartData))
  .attr("fill","none")
  .attr("stroke-width",2)
  .attr("stroke","gold")
  .attr("data-legend","Lighthouses");

chartGroup.append("path")
  .attr("d",lhLine(chartData2))
  .attr("fill","none")
  .attr("stroke-width",2)
  .attr("stroke","brown")
  .attr("data-legend","Ship Wrecks");

chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Append an SVG group element to the chartGroup, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);


// var lhCircles = chartGroup.selectAll('circle')
//     .enter()
//     .append("circle")
//     .attr("cx",d => lYear[d])
//     .attr("cy",d => lYearCounts[d])
//     .attr("r",5)
//     .attr("fill","darkblue");















  // Loop through yearCounts to bin
  
  
//   var data = {};
//   wreckYears.forEach(function (o) {
//     // add the type to the hash if it is missing;
//     // set initial count to 0
//     if (!data.hasOwnProperty(data[o])) {
//       counts[o] = 0;
//     }
//     // increment the count based on the type
//     counts[o] += 1;
// });
//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) { return d.close; })]);

//   // Add the valueline path.
//   svg.append("path")
//       .attr("class", "line")
//       .attr("d", valueline(data));

//   // Add the X Axis
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   // Add the Y Axis
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);

// });

};
