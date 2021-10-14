import * as d3 from 'd3'
import { useEffect, useRef } from 'react';
import './SpiderChart.css'
import PropTypes from 'prop-types';

// const data = [[ {"area": "Central ", "value": 80},
//     {"area": "Kirkdale", "value": 40},
//     {"area": "Kensington ", "value": 40},
//     {"area": "Everton ", "value": 90},
//     {"area": "Picton ", "value": 60},
//     {"area": "Riverside ", "value": 80} ]]

/**
 * Create spider chart with D3 library
 * 
 * @component 
 */
function SpiderChart({ data }) {
  const ref = useRef()

  useEffect(() => {
    // Config for the Radar chart
    var config = {
      radius: 5,
      w: 180,
      h: 180,
      factor: 1,
      factorLegend: 1,
      levels: 5,
      maxValue: 200,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 45,
      TranslateY: 40,
      ExtraWidthX: 85,
      ExtraWidthY: 80,
      color: d3.scaleOrdinal().range(["#ff0000"])
    }
    //Call function to draw the Radar chart
    // d3.json("data/toto.json", function(error, data) {
        // if (error) throw error;
        // RadarChart.draw("#spiderChart", formatUserPerformance(data), config);
    // });

    // d3.select('#chart')
    //   .selectAll('svg')
    //   .append('svg')
    //   .attr("width", 260)
    //   .attr("height", 260);
    var allAxis = (data[0].map(function(i, j){return i.kind}));
    var total = allAxis.length;
    var radius = config.factor*Math.min(config.w/2, config.h/2);
    //   var Format = d3.format('%');
    // d3.select('#spiderChart').select("svg").remove();

    var g = d3.select(ref.current)
        .append("svg")
          .attr("width", config.w+config.ExtraWidthX)
          .attr("height", config.h+config.ExtraWidthY)
        .append("g")
          .attr("transform", "translate(" + config.TranslateX + "," + config.TranslateY + ")");

    function drawSegment(levelFactor) {
      g.selectAll(".levels")
      .data(allAxis)
      .enter()
      .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-config.factor*Math.sin(i*config.radians/total));})
       .attr("y1", function(d, i){return levelFactor*(1-config.factor*Math.cos(i*config.radians/total));})
       .attr("x2", function(d, i){return levelFactor*(1-config.factor*Math.sin((i+1)*config.radians/total));})
       .attr("y2", function(d, i){return levelFactor*(1-config.factor*Math.cos((i+1)*config.radians/total));})
       .attr("class", "line")
       .style("stroke", "white")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "1px")
       .attr("transform", "translate(" + (config.w/2-levelFactor) + ", " + (config.h/2-levelFactor) + ")");
    }

    //Circular segments
    for(var j=0; j<config.levels; j++){
      var levelFactor = config.factor*radius*((j+1)/config.levels);
      drawSegment(levelFactor)
    }

    let series = 0;

    var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
          .attr("class", "axis");

    axis.append("text")
          .attr("class", "legend")
          .text(function(d){return d})
              .style("Roboto", "sans-serif")
              .style("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("dy", "1.5em")
          .attr("transform", function(d, i){return "translate(0, -15)"})
          .attr("x", function(d, i){return config.w/2*(1-config.factorLegend*Math.sin(i*config.radians/total))-30*Math.sin(i*config.radians/total);})
          .attr("y", function(d, i){return config.h/2*(1-Math.cos(i*config.radians/total))-20*Math.cos(i*config.radians/total);});  
 
    var dataValues = [];
    data.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        config.w/2*(1-(parseFloat(Math.max(j.value, 0))/config.maxValue)*config.factor*Math.sin(i*config.radians/total)), 
        config.h/2*(1-(parseFloat(Math.max(j.value, 0))/config.maxValue)*config.factor*Math.cos(i*config.radians/total))
        ]);
      });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
             .data([dataValues])
             .enter()
             .append("polygon")
             .attr("class", "radar-chart-serie"+series)
             .style("stroke-width", "0px")
             .style("stroke", config.color(series))
             .attr("points",function(d) {
               var str="";
               for(var pti=0;pti<d.length;pti++){
                 str=str+d[pti][0]+","+d[pti][1]+" ";
               }
               return str;
              })
             .style("fill", function(j, i){return config.color(series)})
             .style("fill-opacity", config.opacityArea)
             .on('mouseover', function (d){
                      const z = "polygon."+d3.select(this).attr("class");
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", 0.1); 
                      g.selectAll(z)
                       .transition(200)
                       .style("fill-opacity", .7);
                      })
             .on('mouseout', function(){
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", config.opacityArea);
             });
      series++;
    });
    series=0;
  },[data]);

  return (
    <div ref={ref} id="spiderChart" />
  );
}

/**
 * @example
 * data = {
 * userId: 12,
 * kind: { 1: 'cardio', 2: 'energy' },
 * data: [ {value: 80, kind: 1}, {value: 120, kind: 2} ]
 * }
 */
SpiderChart.propTypes = {
  /**
   * data is an object
   */
  data: PropTypes.object.isRequired
}

export default SpiderChart
