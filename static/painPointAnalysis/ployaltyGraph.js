/**
 * Created by heshanjayasinghe on 6/17/17.
 */
function loyaltygraph(data){
    d3.select("#loyaltypoint").select("svg").remove();

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d %b %Y").parse;
var formatTime = d3.time.format("%e %B");

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.ppoint); });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("#loyaltypoint")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
// Adds the svg canvas

 //    var data = [{
 //      "date" : "05 Jan 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "5"
 //  },{
 // "date" : "05 Feb 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "2"
 //  },{
 //      "date" : "05 Mar 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "1"
 //  },{
 //      "date" : "05 Apr 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "3"
 //
 //  },{
 // "date" : "05 May 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "4"
 //  },{
 //      "date" : "05 Jun 2017",
 //        "fdata" : "fish bad smell",
 //    "ppoint" : "1"
 //
 //  }];

// var svg = d3.select("body")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//         .attr("transform",
//               "translate(" + margin.left + "," + margin.top + ")");

// Get the data
// d3.csv("data.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.ppoint = +d.ppoint;
        d.fdata = d.fdata;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.ppoint; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.ppoint); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(d.fdata + "<br/>"  + d.ppoint)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


}