import React from 'react'
import './GroupedBarChart.css'
import * as d3 from 'd3';


// ************* Bar Chart ************** //

export default function GroupedBarChart({ data }) {

    console.log(data)

    React.useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 24, right: 32, bottom: 24, left: 32 };
        const width = 835 - margin.left - margin.right
        const height = 320 - margin.top - margin.bottom

        // append the svg object to the body of the page
        const svg = d3.select("#groupedBarChart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",`translate(${margin.left},${margin.top})`)

        // List of subgroups = header of the csv files = soil condition here
        const subgroups = ['kilogram', 'calories']

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        const groups = data.map(d => d.day.slice(-2))

        console.log(groups)

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.5])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([69, 71])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisRight(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.2])

        console.dir(xSubgroup)

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#ff0000','#000000'])

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
                .attr("transform", d => `translate(${x(d.day.slice(-2))}, 0)`)
            .selectAll("rect")
            .data(function(d) { 
                return subgroups.map(function(key) {
                     return {key: key, value: d[key]}; 
                }); 
            })
            .enter().append("rect")
                .attr("x", d => xSubgroup(d.key))
                .attr("y", d => y(d.value))
                .attr("width", xSubgroup.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", d => color(d.key));

    },[data]);

    return (
        <div id="groupedBarChart">
            <p>Activité quotidienne</p>
        </div>
    );
}