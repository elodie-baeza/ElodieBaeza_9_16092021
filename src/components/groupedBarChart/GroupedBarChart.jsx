import React from 'react'
import './GroupedBarChart.css'
import * as d3 from 'd3';

export default function GroupedBarChart({ data }) {

    React.useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 112, right: 90, bottom: 83, left: 43 };
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
        
        // extract min and max value of data.kilogram
        const minWeight = Math.min(...data.map(d => d.kilogram))
        const maxWeight = Math.max(...data.map(d => d.kilogram))

        // extract min and max value of data.calories
        const minCalories = Math.min(...data.map(d => d.calories))
        const maxCalories = Math.max(...data.map(d => d.calories))
        
        // apply scale to data.calories
        // const calories2pixels = d3.scaleLinear()
        //     .domain([0, Math.max(...data.map(d => d.calories))]) // unit: km
        //     .range([0, height]) // unit: pixels
        
        // console.log(groups)
        
        // Add X axis
        const x = d3.scaleBand()
            .domain(data.map(d => d.day.slice(-2)))
            .range([0, width])
            .padding([0.5])

        svg.append("g")
            .attr("transform", `translate(0, ${height+15})`)
            .call(d3.axisBottom(x));

        // Add Y axis for kilogram
        const y = d3.scaleLinear()
            .domain([ (minWeight-1), (maxWeight+1) ])
            .range([ height, 0 ]);
        
        svg.append("g")
            .attr("transform", `translate(${width},0)`)
            .call(d3.axisRight(y).ticks(Math.floor(maxWeight)-Math.floor(minWeight-1))
            .tickSize(-width)
            );

        // Add Y1 axis for calories
        const y1 = d3.scaleLinear()
            .domain([ (minCalories-50), (maxCalories+50)])
            .range([ height, 0 ]);
            
        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.4])

        // console.dir(xSubgroup)

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#000000','#ff0000'])

        // Show the kilogram bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
                .attr("transform", d => `translate(${x(d.day.slice(-2))}, 0)`)
            //
            .selectAll("rect")
            .data(function(d) {
                return subgroups.map(function(key) {
                    return {key: 'kilogram', value: d['kilogram']}; 
                }); 
            })
            .join("rect")
                .attr('class', 'bar')
                .attr("x", d => xSubgroup(d.key))
                .attr("y", d => y(d.value))
                .attr("width", xSubgroup.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", d => color(d.key))

        // Show the calories bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
                .attr("transform", d => `translate(${x(d.day.slice(-2))}, 0)`)
            //
            .selectAll("rect")
            .data(function(d) {
                return subgroups.map(function(key) {
                    return {key: 'calories', value: d['calories']}; 
                }); 
            })
            .join("rect")
                .attr('class', 'bar')
                .attr("x", d => xSubgroup(d.key))
                .attr("y", d => y1(d.value))
                .attr("width", xSubgroup.bandwidth())
                .attr("height", d => height - y1(d.value))
                .attr("fill", d => color(d.key))

        //title
        svg.append("text")
            .attr('class','title')
            .text("Activité quotidienne")

        // Handmade legend
        // legend poids
        svg.append("circle")
            .attr('class','legend')
            .attr("cx",width-260)
            // .attr("cy",130)
            .attr("r", 4)
            .style("fill", "#000000")
        svg.append("text")
            .attr('class','legend')
            .attr("x", width-250)
            // .attr("y", 130)
            .text("Poids (kg)")
            .style("font-size", "15px")
            .style("fill", "#74798C")
            .attr("alignment-baseline","middle")
        
        //handmade legend
        //legend calories
        svg.append("circle")
            .attr('class','legend')
            .attr("cx",width-150)
            // .attr("cy",130)
            .attr("r", 4)
            .style("fill", "#ff0000")
        svg.append("text")
            .attr('class','legend')
            .attr("x", width-140)
            // .attr("y", 130)
            .text("Calories brûlées (kCal)")
            .style("font-size", "15px")
            .style("fill", "#74798C")
            .attr("alignment-baseline","middle")
                
    },[data]);

    return (
        <div id="groupedBarChart" />
    );
}