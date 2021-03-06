import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import './GroupedBarChart.css'
import PropTypes from 'prop-types';

/**
 * Create grouped bar chart and tooltip with D3 library
 * 
 * @component
 */
function GroupedBarChart({ data }) {
    const ref = useRef()

    useEffect(() => {
            const svg = d3.select(ref.current)
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
                .domain(data.map(d => parseInt(d.day.slice(-2)),10))
                .range([0, width - margin.right - margin.left])
                .padding([0.4])
                
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
                    .tickSize(- width + margin.left*2 + margin.right)
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
                .padding([0.5])
    
            // console.dir(xSubgroup)
    
            // color palette = one color per subgroup
            const color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#000000','#ff0000'])        
            
            // select divTooltip
            var divTooltip = d3.select(".tooltip")

            // Show bars
            svg.select(".plot-area")
                .selectAll(".groupBars")
                // Enter in data = loop group per group
                    .data(data)
                    .join("g")
                        .attr('class', 'groupBars')
                        .attr("transform", d => `translate(${x(parseInt(d.day.slice(-2)),10)}, 0)`)
                        .on("mouseover", function(event, d){
                            divTooltip.style("opacity", 1)
                                .style("left", (event.pageX) + "px")
                                .style("top", (event.pageY - 28) + "px");
                            divTooltip.html(`${d.kilogram} kg <br> ${d.calories} kCal`)
                        })
                        .on("mouseout", function(d) {
                            divTooltip.style("opacity", 0);
                            divTooltip.html('')
                        })
                    .selectAll(".bar")
                        .data(d => subgroups.map(key => ({key, value: d[key]}) ))
                        .join("rect")
                            .attr('class', 'bar')
                            .attr('rx', 3)
                            .attr('ry', 3)
                            .attr("x", d => xSubgroup(d.key))
                            .attr("y", d => {
                                if (d.key === 'kilogram')
                                    return y(d.value);
                                return y1(d.value)
                            })
                            .attr("width", xSubgroup.bandwidth())
                            .attr("height", d => {
                                if (d.key === 'kilogram')
                                    return height - margin.bottom - y(d.value)
                                return height - margin.bottom - y1(d.value)
                            })
                            .attr("fill", d => color(d.key))

            //TOOLTIP AREA
            svg.select('.plot-area')
                .selectAll('.groupBars')
                .append('rect')
                    .attr('class', 'groupedRectArea')
                    .attr('x', 10)
                    .attr('y', margin.top)
                    .attr('width', 40)
                    .attr('height', 165)
                    .attr('fill', '#C4C4C4')
                    .attr('opacity', 0)
                    // .on("mouseover", function(event, d){
                    //     this.parentNode.style('opacity', 0.5)
                    // })
                    // .on("mouseout", function(d) {
                    // })


            // var groupedRectArea = d3.select(".groupedRectArea")

            //title
            svg.append("text")
                .attr('class','title')
                .text("Activit?? quotidienne")
                .attr("x", 32)
                .attr("y", 32)
    
            // Handmade legend
            // legend poids
            svg.append("circle")
                .attr('class','legend')
                .attr("cx", width-370)
                .attr("cy",32)
                .attr("r", 4)
                .style("fill", "#000000")
            svg.append("text")
                .attr('class','legend')
                .attr("x", width-360)
                .attr("y", 32)
                .text("Poids (kg)")
                .style("font-size", "15px")
                .style("fill", "#74798C")
                .attr("alignment-baseline","middle")
            
            //handmade legend
            //legend calories
            svg.append("circle")
                .attr('class','legend')
                .attr("cx", width-270)
                .attr("cy",32)
                .attr("r", 4)
                .style("fill", "#ff0000")
            svg.append("text")
                .attr('class','legend')
                .attr("x", width-260)
                .attr("y", 32)
                .text("Calories br??l??es (kCal)")
                .style("font-size", "15px")
                .style("fill", "#74798C")
                .attr("alignment-baseline","middle")
        }, [data]);

    return (
        <div id={'groupedBarChart'}>
            <svg
                ref={ref}
                style={{
                    height: 320,
                    width: 835,
                    marginRight: 0,
                    marginLeft: 0,
                }}>
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <div className={'tooltip'} />
        </div>

    );
}
/**
 * @example
 * data = [ {day: '2020-07-01', kilogram: 70, calories: 240},
 * {day: '2020-07-02', kilogram: 69, calories: 220},
 * {day: '2020-07-03', kilogram: 70, calories: 280},
 * {day: '2020-07-04', kilogram: 70, calories: 500},
 * {day: '2020-07-05', kilogram: 69, calories: 160},
 * {day: '2020-07-06', kilogram: 69, calories: 162},
 * {day: '2020-07-07', kilogram: 69, calories: 390} ]
 */
GroupedBarChart.propTypes = {
    /**
     * data is an array
     */
    data: PropTypes.array.isRequired
}

export default GroupedBarChart
