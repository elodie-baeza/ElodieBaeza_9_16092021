import React from 'react'
import './LineChart.css'
import * as d3 from 'd3'

// ************* Bar Chart ************** //

export default function GroupedBarChart({ data }) {

    console.log(data)

    React.useEffect(() => {
        // set the dimensions and margins of the graph
        var margin = {top: 29, right: 0, bottom: 16, left: 0},
        width = 260 - margin.left - margin.right,
        height = 260 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#lineChart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
            .domain([1, 7])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(7))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 120])
            .range([ height, 0 ]);
        svg.append("g")
            // .call(d3.axisLeft(y));

        // This allows to find the closest X index of the mouse:
        var bisect = d3.bisector(function(d) { return d.x; }).left;

        // Create the circle that travels along the curve of chart
        var focus = svg
            .append('g')
            .append('circle')
                .style("fill", "none")
                .attr("stroke", "black")
                .attr('r', 8.5)
                .style("opacity", 0)

        // Create the text that travels along the curve of chart
        var focusText = svg
            .append('g')
            .append('text')
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")

        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d) { return x(d.day) })
            .y(function(d) { return y(d.sessionLength) })
            .curve(d3.curveBundle.beta(1))
        )
    },[data]);

    return (
        <div id="lineChart">
            <p>Durée moyenne des sessions</p>
        </div>
    );
}