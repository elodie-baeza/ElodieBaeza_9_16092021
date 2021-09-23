import React from 'react'
import './SpiderChart.css'
import * as d3 from 'd3'
import * as RadarChart from 'radar-chart-d3'

// ************* Bar Chart ************** //
var data = [
    {
      className: 'germany', // optional, can be used for styling
      axes: [
        {axis: "strength", value: 13, yOffset: 10},
        {axis: "intelligence", value: 6},
        {axis: "charisma", value: 5},  
        {axis: "dexterity", value: 9},  
        {axis: "luck", value: 2, xOffset: -20}
      ]
    },
    {
      className: 'argentina',
      axes: [
        {axis: "strength", value: 6},
        {axis: "intelligence", value: 7},
        {axis: "charisma", value: 10},  
        {axis: "dexterity", value: 13},  
        {axis: "luck", value: 9}
      ]
    }
];

export default function SpiderChart() {

    console.log(data)

    React.useEffect(() => {
        RadarChart.defaultConfig.color = function() {};
        RadarChart.defaultConfig.radius = 3;
        RadarChart.defaultConfig.w = 260;
        RadarChart.defaultConfig.h = 260;

        var chart = RadarChart.chart();
        var cfg = chart.config(); // retrieve default config
        var svg = d3.select('body').append('svg')
            .attr('width', cfg.w + cfg.w + 50)
            .attr('height', cfg.h + cfg.h / 4);
        svg.append('g').classed('single', 1).datum(data).call(chart);
    },[]);

    return (
	    <div class="chart-container" />
    );
}