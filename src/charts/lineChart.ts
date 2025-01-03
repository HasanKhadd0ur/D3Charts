import { BaseChart } from './baseChart';
import * as d3 from 'd3';

export class LineChart extends BaseChart {
    
    protected initVis() {

        const vis = this;
        const { containerWidth, containerHeight, margin } = vis.config;

        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        vis.chart = vis.svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

        vis.svg.append('text')
            .attr('x', containerWidth / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', vis.config.textColor)
            .text(vis.config.chartTitle);

        vis.xScale = d3.scaleLinear().range([0, width]);
        vis.yScale = d3.scaleLinear().range([height, 0]);

        vis.xAxis = vis.chart.append('g').attr('transform', `translate(0, ${height})`);
        vis.yAxis = vis.chart.append('g');
    }

    protected renderVis() {
        const vis = this;

        const line = d3.line<any>()
            .x(d => vis.xScale(d.xValue))
            .y(d => vis.yScale(d.yValue));

        vis.chart.selectAll('.line')
            .data([vis.data])
            .join('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', vis.config.color)
            .attr('stroke-width', 2)
            .attr('d', line);

        vis.xAxis.call(d3.axisBottom(vis.xScale));
        vis.yAxis.call(d3.axisLeft(vis.yScale));
    }
    protected onMouseOver(): void {
        const vis =this;
        vis.tooltip.style("opacity", 1);
        vis.tooltip.style("opacity", 1);
    }

    protected onMouseMove(event :any){
        const vis =this;

        const [mouseX] = d3.pointer(event);

        //revers sale to get the date fur to the x pos of the mouse 
        const xDate = vis.xScale.invert(mouseX);

        // find the closest data point
        const closestPoint = vis.data.reduce((a, b) => {
            return Math.abs(b.xValue - xDate) < Math.abs(a.xValue - xDate) ? b : a;
        });

        // tooltip text 
        vis.tooltip
            .html(`<strong>Date:</strong> ${d3.timeFormat("%b %d, %Y")(closestPoint.xValue)}<br/>
                   <strong>Value:</strong> ${closestPoint.xValue}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");

        // position the tooltip circle
        vis.tooltip
            .attr("cx", vis.xScale(closestPoint.xValue))
            .attr("cy", vis.yScale(closestPoint.yValue));

    }


}
