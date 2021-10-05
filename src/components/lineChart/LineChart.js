import * as d3 from 'd3'
import { useD3 } from 'hooks/useD3';
import './LineChart.css'

export default function LineChart({ data }) {

    const ref = useD3(
        (svg) => {
            // set the dimensions and margins of the graph
            var margin = {top: 30, right: 0, bottom: 30, left: 0},
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
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(7))

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 120])
                .range([ height, 0 ]);
            // svg.append("g")
            //     .call(d3.axisLeft(y));
            
            //////////////////////// TOOLTIP /////////////////////////////
            
            // This allows to find the closest X index of the mouse:
            var bisect = d3.bisector(function(d) { return d.day; }).left;

            // Create the circle that travels along the curve of chart
            var focus = svg
                .append('g')
                .append('circle')
                    .style("fill", "white")
                    .attr("stroke", "white")
                    .attr('r', 4)
                    .style("opacity", 0)

            // Create the text that travels along the curve of chart
            var focusText = svg
                .append('g')
                .append('text')
                    .style("opacity", 0)
                    .style('fill', 'black')
                    .style('transform', 'translate(10px, -20px)')
                    .attr("text-anchor", "left")
                    .attr("alignment-baseline", "middle")

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("d", d3.line()
                    .x(function(d) { return x(d.day) })
                    .y(function(d) { return y(d.sessionLength) })
                    // .curve(d3.curveBundle.beta(1))
                )

            // Create a rect on top of the svg area: this rectangle recovers mouse position
            svg
                .append('rect')
                    .style("fill", "none")
                    .style("pointer-events", "all")
                    .attr('width', width)
                    .attr('height', height)
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
            
                    })
                    .on('mouseout', mouseout);


            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover() {
                focus.style("opacity", 1)
                focusText.style("opacity",1)
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
            }

            //  ligne vertical qui suivra le curseur de la souris
            var verticalLine = svg.append("line")
                .attr("class", "verticalLine")
                .attr("x1",0)
                .attr("y1",0)
                .attr("x2",0)
                .attr("y2",height)
                .style("opacity", 0);

            svg.append("text")
                .text('Durée moyenne des sessions')
                .attr('class', 'title')
    }, [data.length]);

    return (
        <div id="lineChart" />
    );
}