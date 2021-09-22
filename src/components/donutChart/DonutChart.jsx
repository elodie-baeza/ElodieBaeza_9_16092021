import React from 'react'
import './DonutChart.css'
import * as d3 from 'd3'

export default function DonutChart({ data }) {

    console.log(data)

    React.useEffect(() => {
        // set the dimensions and margins of the graph
        var margin = 24,
        width = 260 - margin*2,
        height = 260 - margin*2;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - 10

        // append the svg object to the div called '#donutChart'
        var svg = d3.select("#donutChart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Create dummy data
        var toto = {a: 9, b: 20, c:30, d:8, e:12}

        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(data)
            .range(["#ff0000"])

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function(d) {return d.value; })
        var data_ready = pie(data*100)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg.selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
            .innerRadius(87)         // This is the size of the donut hole
            .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.value)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
    },[data]);

    return (
        <div id="donutChart">
            <p>{data*100}% de votre objectif</p>
        </div>
    );
}