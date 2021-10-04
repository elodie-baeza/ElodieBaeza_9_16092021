import * as d3 from 'd3';
import { useD3 } from 'hooks/useD3';
import './GroupedBarChart.css'

export default function GroupedBarChart({ data }) {
    const ref = useD3(
        (svg) => {
            // set the dimensions and margins of the graph
            const margin = { top: 95, right: 43, bottom: 62, left: 43 };
            const width = 835
            const height = 320
    
            // List of subgroups = header of the csv files = soil condition here
            const subgroups = ['kilogram', 'calories']
            
            // extract min and max value of data.kilogram
            const minWeight = Math.min(...data.map(d => d.kilogram))
            const maxWeight = Math.max(...data.map(d => d.kilogram))
    
            // extract min and max value of data.calories
            const minCalories = Math.min(...data.map(d => d.calories))
            const maxCalories = Math.max(...data.map(d => d.calories))
                        
            // Add X axis
            const x = d3.scaleBand()
                .domain(data.map(d => d.day.slice(-2)))
                .range([0, width - margin.right])
                .padding([0.5])
    
            const xAxis = (g) =>
                g.attr("transform", `translate(0, ${height-margin.bottom+15})`)
                .call(d3.axisBottom(x));
            
            svg.select('.x-axis').call(xAxis)
    
            // Add Y axis for kilogram
            const y = d3.scaleLinear()
                .domain([ (minWeight-1), (maxWeight+1) ])
                .range([ height - margin.bottom, margin.top ]);
            
            const yAxis = (g) =>
                g.attr("transform", `translate(${width-margin.right-margin.left},0)`)
                .call(d3
                    .axisRight(y)
                    .ticks(Math.floor(maxWeight)-Math.floor(minWeight-1))
                .tickSize(-width-margin.left-margin.right)
                );

            svg.select('.y-axis').call(yAxis)
    
            // Add Y1 axis for calories
            const y1 = d3.scaleLinear()
                .domain([ (minCalories-50), (maxCalories+50)])
                .range([ height-margin.bottom, margin.top ]);
                
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
            svg.select(".plot-area")
                .selectAll("g")
                // Enter in data = loop group per group
                    .data(data)
                    .join("g")
                        .attr("transform", d => `translate(${x(d.day.slice(-2))}, 0)`)
                .selectAll(".barA")
                    .data(function(d) {
                        return subgroups.map(function(key) {
                            return {key: 'kilogram', value: d.kilogram}; 
                        }); 
                    })
                    .join("rect")
                        .attr('class', 'barA')
                        .attr("x", d => xSubgroup(d.key))
                        .attr("y", d => y(d.value))
                        .attr("width", xSubgroup.bandwidth())
                        .attr("height", d => height - margin.bottom - y(d.value))
                        .attr("fill", d => color(d.key))
    
            // Show the calories bars
            svg.select(".plot-area")
                .selectAll("g")
                // Enter in data = loop group per group
                    .data(data)
                    .join("g")
                        .attr("transform", d => `translate(${x(d.day.slice(-2))}, 0)`)
                .selectAll(".barB")
                    .data(function(d) {
                        return subgroups.map(function(key) {
                            return {key: 'calories', value: d['calories']}; 
                        }); 
                    })
                    .join("rect")
                        .attr('class', 'barB')
                        .attr("x", d => xSubgroup(d.key))
                        .attr("y", d => y1(d.value))
                        .attr("width", xSubgroup.bandwidth())
                        .attr("height", d => height - margin.bottom - y1(d.value))
                        .attr("fill", d => color(d.key))
    
            //title
            svg.append("text")
                .attr('class','title')
                .text("Activité quotidienne")
                .attr("x", 32)
                .attr("y", 32)

    
            // Handmade legend
            // legend poids
            svg.append("circle")
                .attr('class','legend')
                .attr("cx",width-325)
                .attr("cy",32)
                .attr("r", 4)
                .style("fill", "#000000")
            svg.append("text")
                .attr('class','legend')
                .attr("x", width-315)
                .attr("y", 32)
                .text("Poids (kg)")
                .style("font-size", "15px")
                .style("fill", "#74798C")
                .attr("alignment-baseline","middle")
            
            //handmade legend
            //legend calories
            svg.append("circle")
                .attr('class','legend')
                .attr("cx",width-210)
                .attr("cy",32)
                .attr("r", 4)
                .style("fill", "#ff0000")
            svg.append("text")
                .attr('class','legend')
                .attr("x", width-200)
                .attr("y", 32)
                .text("Calories brûlées (kCal)")
                .style("font-size", "15px")
                .style("fill", "#74798C")
                .attr("alignment-baseline","middle")
        }, [data.length]);

    return (
        <div id={'groupedBarChart'}>
            <svg
                ref={ref}
                style={{
                    height: 320,
                    width: 835,
                    marginRight: "0px",
                    marginLeft: "0px",
                }}>
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>

    );
}
