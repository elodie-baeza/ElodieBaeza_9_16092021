import React from 'react'
import './DonutChart.css'
import * as d3 from 'd3'
import PropTypes from 'prop-types';

export default function DonutChart({ data }) {

    // console.log(data)

    React.useEffect(() => {
        // set the dimensions and margins of the graph
        var margin = 20,
        width = 300 - margin*2,
        height = 300 - margin*2;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin*2

        // append the svg object to the div called '#donutChart'
        var svg = d3.select("#donutChart")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + (width / 2 - 20) + "," + (height / 2 - 20) + ")");

        // Create dummy data
        var dataPourcent = {a:data, b:100-data}

        // set the color scale
        var color = d3.scaleOrdinal()
            .range(["#ff0000","#fbfbfb"])

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(d=>d[1])
        var data_ready = pie(Object.entries(dataPourcent))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
            .attr('d', d3.arc()
                .innerRadius(radius - 10)      // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', d => color(d.data[0]))

            // .attr("stroke", "black")
            // .style("stroke-width", "2px")
            // .style("opacity", 0.7)
            
        //svg
        // .selectAll('whatever')
        // .append('path')
        //     .attr('d', d3.arc()
        //         .innerRadius(80)
        //         .outerRadius(80)
        //         .startAngle(100)
        //         .endAngle(2 * 180)
        //     )
        //     .attr('fill', '#ffffff')

        // svg.select('path:nth-child(2)')
        //     .attr('fill', '#ffffff')


        svg.append("text")
            .text('Score')
            .attr('class', 'title')

        svg.append("text")
            .text(`${data}%`)
            .attr('class', 'pourcentValue')

        svg.append("text")
            .text('de votre objectif')
            .attr('class', 'textInDonut')


    },[data]);

    return (
        <div id="donutChart" />
    );
}

DonutChart.propTypes = {

    data: PropTypes.number.isRequired

};