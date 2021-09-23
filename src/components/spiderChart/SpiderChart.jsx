import React from 'react'
import './SpiderChart.css'
import * as d3 from 'd3'
import { RadarChart } from 'components/spiderChart/RadarChart.js'
import formatUserPerformance from './formatUserPerformance'

// const data = [
//   [
//     {"area": "Central ", "value": 80},
//     {"area": "Kirkdale", "value": 40},
//     {"area": "Kensington ", "value": 40},
//     {"area": "Everton ", "value": 90},
//     {"area": "Picton ", "value": 60},
//     {"area": "Riverside ", "value": 80}
//   ]
// ]

export default function SpiderChart(data) {

  React.useEffect(() => {
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
      TranslateX: 40,
      TranslateY: 40,
      ExtraWidthX: 80,
      ExtraWidthY: 80,
      color: d3.scaleOrdinal().range(["#ff0000"])
   }
    //Call function to draw the Radar chart
    // d3.json("data/toto.json", function(error, data) {
        // if (error) throw error;
        RadarChart.draw("#chart", formatUserPerformance(data.data), config);
    // });

    var svg = d3.select('body')
      .selectAll('svg')
      .append('svg')
      .attr("width", 260)
      .attr("height", 260);

  },[data.data]);

  return (
    <div id="chart" />
  );
}