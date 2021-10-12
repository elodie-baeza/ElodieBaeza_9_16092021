import * as d3 from 'd3'
import { useD3 } from 'hooks/useD3';
import './LineChart.css'
import PropTypes from 'prop-types';

/**
 * Create line chart and tooltip with D3 library
 * 
 * @component 
 */
function LineChart({ data }) {

    useD3( svg => {
            // set the dimensions and margins of the graph
            var margin = {top: 30, right: 10, bottom: 30, left: 10},
            width = 260 - margin.left - margin.right,
            height = 260 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            svg = d3.select("#lineChart")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
            // .append("g")
            //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
            .domain([ 1, 7 ])
            .range([ 0, width ]);
            
            const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
            const xAxis = d3.axisBottom(x)
            .ticks(7)
            .tickFormat(function (d) {
                return daysOfWeek[d-1];
                });
                
            svg.append("g")
            .attr("transform", `translate(${margin.left},${height + 20})`)
                .call(xAxis)
                
            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 120])
                .range([ height, 0 ]);
                // svg.append("g")
                //     .call(d3.axisLeft(y));
                
            // week-end area
            svg.append('rect')
                .attr("width", 70)
                .attr("height", height + margin.top + margin.bottom)
                .attr('transform', `translate(${width + margin.left + margin.right - 70}, 0)`)
                .style("fill", "black")
                .style("fill-opacity", ".1");

            // Create the curve line
            svg.append("path")
                .datum(data)
                .attr('transform', `translate(${margin.left}, 0)`)
                .attr("d", d3.line()
                    .x((d) => {return x(d.day)})
                    .y((d) => {return y(d.sessionLength)})
                    .curve(d3.curveNatural)
                )
            
            //////////////////////// TOOLTIP /////////////////////////////
            
            // This allows to find the closest X index of the mouse:
            var bisect = d3.bisector(function(d) { return d.day; }).center;

            // Create the circle that travels along the curve of chart
            var focus = svg
                // .append('g')
                .append('circle')
                    .style("fill", "white")
                    .attr('transform', `translate(${margin.left}, 0)`)
                    .attr("stroke", "white")
                    .attr('r', 4)
                    .style("opacity", 0)

            // Create the text that travels along the curve of chart
            var rect = svg
                .append('g')
                    .attr('id', 'focusText')
                // .select('#focusText')
                .append("rect")
                .style("opacity", 0)
                // .attr("x", bbox.x)
                // .attr("y", bbox.y)
                .style('transform', 'translate(15px, -30px)')
                .attr("width", 40)
                .attr("height", 25)
                .style("fill", "white")
                // .style("fill-opacity", ".3")
                // .style("stroke", "#666")
                // .style("stroke-width", "1.5px"); 

            var focusText = svg
                // .append('g')
                //     .attr('id', 'focusText')
                .select('#focusText')
                .append('text')
                    .style("opacity", 0)
                    .style('fill', 'black')
                    .style('transform', 'translate(20px, -17px)')
                    .attr("text-anchor", "left")
                    .attr("alignment-baseline", "middle")
                    .attr('font-size', '8px')

            //  ligne vertical qui suivra le curseur de la souris
            // var verticalLine = svg.append("line")
            //     .attr("class", "verticalLine")
            //     .attr("x1",0)
            //     .attr("y1",0)
            //     .attr("x2",0)
            //     .attr("y2",height)
            //     .style("opacity", 0)
            //     .style('fill', 'black');
            
            // Create a rect on top of the svg area: this rectangle recovers mouse position
            svg.append('rect')
                // .attr('transform', `translate(${margin.left}, 0)`)
                .attr("width", 260)
                .attr("height", 260)
                .style("fill", "none")
                .style("pointer-events", "all")
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .on('mouseover', mouseover)
                .on('mousemove', function(event){
                    var x0 = x.invert(d3.pointer(event,this)[0])
                    var i = bisect(data, x0, 1);
                    const selectedData = data[i];
                    focus
                        .attr("cx", x(selectedData.day))
                        .attr("cy", y(selectedData.sessionLength))
                    focusText
                        .html(selectedData.sessionLength + ' min')
                        .attr("x", x(selectedData.day))
                        .attr("y", y(selectedData.sessionLength))
                    rect
                        .html(selectedData.sessionLength + ' min')
                        .attr("x", x(selectedData.day))
                        .attr("y", y(selectedData.sessionLength))
                })
                .on('mouseout', mouseout);


            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover() {
                focus.style("opacity", 1)
                focusText.style("opacity",1)
                // verticalLine.style("opacity",1)
                rect.style("opacity",1)
            }
            // function mousemove() {
            //     // recover coordinate we need
            //     var x0 = x.invert(d3.pointer(event,this)[0])
            //     var i = bisect(data, x0, 1);
            //     const selectedData = data[i]
            //     focus
            //         .attr("cx", x(selectedData.x))
            //         .attr("cy", y(selectedData.y))
            //     focusText
            //         .html("x:" + selectedData.x + '-' , "y:" + selectedData.y)
            //         .attr("x", x(selectedData.x)+15)
            //         .attr("y", y(selectedData.y))
            // }
            function mouseout() {
                focus.style("opacity", 0)
                focusText.style("opacity", 0)
                // verticalLine.style("opacity",0)
                rect.style("opacity",0)
            }

            svg.append('g')
                    .attr('class', 'title')
                .append("text")
                    .text(`Durée moyenne des`)
                
            svg.select('.title')
                .append("text")
                .text(`sessions`)
                .style('transform', 'translate(0, 25px)')

    }, [data.length]);

    return (
        <div id="lineChart" />
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
LineChart.propTypes = {
    data: PropTypes.array.isRequired
  }  

export default LineChart