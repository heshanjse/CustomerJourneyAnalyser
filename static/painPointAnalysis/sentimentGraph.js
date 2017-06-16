/**
 * Created by heshanjayasinghe on 6/15/17.
 */
'use strict';




function dpage_download(){
d3.select("svg").remove();
d3.select("svg").remove();

//console.log(data)
  console.log("this is the graph");
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom:80, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


var parseDate = d3.time.format("%d %b %Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var downloadline = d3.svg.line()
    .x(function(d) { return x(d.downloaddate); })
    .y(function(d) { return y(d.download); });

// var area = d3.svg.area()
//     .x(function(d) { return x(d.downloaddate); })
//     .y0(height)
//     .y1(function(d) { return y(d.download); });

// Adds the svg canvas
var svg = d3.select("#linegraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
// d3.csv("stocks.csv", function(error, data) {
  var data = [{
      "product_id" : "MSFT",
    "date" : "05 Apr 2006",
    "download" : 39,

  },{
 "product_id" : "MSFT",
    "date" : "09 May 2006",
    "download" : 32,
  },{
      "product_id" : "MSFT",
    "date" : "30 May 2006",
    "download" : 23,

  }
  ,
  {
      "product_id" : "ABC",
    "date" : "02 Apr 2006",
    "download" : 19,

  },{
 "product_id" : "ABC",
    "date" : "09 May 2006",
    "download" : 22,
  },{
      "product_id" : "ABC",
    "date" : "30 May 2006",
    "download" : 43,

  }
 //  ,
 //  {
 //      "product_id" : "ABD",
 //    "date" : "09 Apr 2006",
 //    "download" : 15,
 //
 //  },{
 // "product_id" : "ABD",
 //    "date" : "09 May 2006",
 //    "download" : 20,
 //  },{
 //      "product_id" : "ABD",
 //    "date" : "30 May 2006",
 //    "download" : 13,
 //
 //  }
 //  ,
 //  {
 //      "product_id" : "ABS",
 //    "date" : "02 Apr 2006",
 //    "download" : 25,
 //
 //  },{
 // "product_id" : "ABS",
 //    "date" : "09 May 2006",
 //    "download" : 104,
 //  },{
 //      "product_id" : "ABS",
 //    "date" : "30 May 2006",
 //    "download" : 33,
 //
 //  }
 //  ,
 //  {
 //      "product_id" : "ABV",
 //    "date" : "12 Apr 2006",
 //    "download" : 9,
 //
 //  },{
 // "product_id" : "ABV",
 //    "date" : "09 May 2006",
 //    "download" : 43,
 //  },{
 //      "product_id" : "ABV",
 //    "date" : "30 May 2006",
 //    "download" : 27,
 //
 //  }

  ];

    data.forEach(function(d) {
		//d.downloaddate = parseDate(d.downloaddate);
		d.downloaddate = new Date(d.date);
		d.download = d.download;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.downloaddate; }));
    y.domain([0, d3.max(data, function(d) { return d.download; })]);

    // Nest the entries by product_id
    var dataNest = d3.nest()
        .key(function(d) {return d.product_id;})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

  var  legendSpace = width/dataNest.length; // spacing for legend
    var num =0
    // Loop through each product_id / key
    dataNest.forEach(function(d,i) {

        svg.append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("d", downloadline(d.values));




//         // Add the Legend
//         svg.append("text")
//             .attr("x", (legendSpace/2)+i*legendSpace) // spacing
//             .attr("y", height + (margin.bottom/2)+ 5)
//             .attr("class", "legend")    // style the legend
//             .style("fill", function() { // dynamic colours
//                 return d.color = color(d.key); })
//             .text(d.key+"app");

        svg.append("circle").attr({
    cx: (legendSpace/2)+i*legendSpace - 30 ,
    cy: height + (margin.bottom/2)+ 5,
    r: 10,
    fill: color(d.key),
    stroke: "white"
});


//         svg.append("circle")
//             .append("circle")
//           //  .style("stroke", "gray")
//             .style("fill", function() { // dynamic colours
//                          return d.color = color(d.key); })
//             .attr("class", "legend")    // style the legend
//             .attr('x',(legendSpace/2)+i*legendSpace)
//             .attr('y',height + (margin.bottom/2)+ 5)
//             .attr("r", 5)
//             .attr("cx", 50)
//             .attr("cy", 20);


        // svg.append("svg:image")
        //    .attr('x',(legendSpace/2)+i*legendSpace)
        //    .attr('y',height + (margin.bottom/2)-8)
        //    .attr('width', 30)
        //    .attr('height', 30)
        //    .attr("xlink:href",iconarray[num])
        //     .text("Positive");



    });

    // svg.append("line")          // attach a line
    // .style("stroke", "gray")  // colour the line
    // .attr("x1", 1)     // x position of the first end of the line
    // .attr("y1", height)      // y position of the first end of the line
    // .attr("x2", legendSpace +9*legendSpace)     // x position of the second end of the line
    // .attr("y2", height);

//     svg.append("path")
//       .datum(data)
//       .attr("class", "area")
//       .attr("d", area);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("x",6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Polarity value");

    // Add the Y Axis
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);

// });

}