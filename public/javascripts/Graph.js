var width = 800,
    height = 690;

var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(100)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("#main").append("svg")
    .attr("width", width)
    .attr("height", height);

var link =  svg.selectAll(".link"),
    node = svg.selectAll(".node"),
    text = svg.selectAll(".text")


d3.json("javascripts/graph.json", function(error, graph) {
    if (error) throw error;

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    node = node.data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag)  ;


    node.append ("rect")
        .attr("class", "node")
        .attr("width",  function (d) { return d.xr})
        .attr("height", 25)
        .attr("x", function (d) { return (d.xr)* (-1)  / 2} )
        .attr("y", -15)
        .on("dblclick", dblclick)
        .call(drag);


    node.append("text")
        .attr("dx", function (d) { return (d.xr) * (-1) / 2 })
        .attr("dy", 0)
        .text(function(d) { return d.text });


});

function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })


}

function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.select(this).classed("fixed", d.fixed = true);
}