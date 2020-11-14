/*var diameter = 500, //max size of the bubbles
    color    = d3.scaleOrdinal(d3.schemeCategory20); //color category



var bubble = d3.pack()
    //.sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.csv("music.csv", function(error, data){

    //convert numerical values from strings to numbers
    data = data.map(function(d){ d.value = +d["position"]; return d; });

    //bubbles needs very specific format, convert data to this.
     var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.responseCount; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())

    //setup the chart
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

    //create the bubbles
    bubbles.append("circle")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.value); });

    //format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d["title"]; })
        .style({
            "fill":"white", 
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
        });
})*/


    dataset = {
        "children": [{
            "facilityId": "FAC0001",
            "responseCount": 2
        }, {
            "facilityId": "FAC0006",
            "responseCount": 2
        }, {
            "facilityId": "FAC0002",
            "responseCount": 1
        }, {
            "facilityId": "FAC0003",
            "responseCount": 2
        }, {
            "facilityId": "FAC0004",
            "responseCount": 3
        }, {
            "facilityId": "FAC0005",
            "responseCount": 1
        }]
    };

    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);
    var svg = d3.select(".chart")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.responseCount; });

    var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

    node.append("title")
            .text(function(d) {
                return d.facilityId + ": " + d.responseCount;
            });

    node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d) {
                return color(d.facilityId);
            });

    node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount;
            });

    d3.select(self.frameElement)
            .style("height", diameter + "px");

