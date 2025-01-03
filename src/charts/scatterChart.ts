import { BaseChart } from "./baseChart";
import * as d3 from 'd3'

export class ScatterChart extends BaseChart {

    protected initVis() {
     
        const vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // vis.colorScale = d3.scaleOrdinal()
        //     .range(['#d3eecd', '#7bc77e', '#2a8d46'])
        //     .domain(['Easy', 'Intermediate', 'Difficult']);

        vis.xScale = d3.scaleLinear().range([0, vis.width]);
        vis.yScale = d3.scaleLinear().range([vis.height, 0]);


        // vis.xAxis = d3.axisBottom(vis.xScale).ticks(6).tickPadding(10);
        // vis.yAxis = d3.axisLeft(vis.yScale).ticks(6).tickPadding(10);

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.width)
            .attr('height', vis.height);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // vis.xAxisG = vis.chart.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate(0,${vis.height})`);

        // vis.yAxisG = vis.chart.append('g')
        //     .attr('class', 'axis y-axis');

        vis.xAxis = vis.chart.append('g').attr('transform', `translate(0, ${vis.height})`);
        vis.yAxis = vis.chart.append('g');

    }


    
    protected renderVis() {
        const vis = this;

        const points = vis.chart.selectAll('.point')
            .data(vis.data, (d: any) => d.id);

        points.enter()
            .append('circle')
            .attr('class', 'point')
            .attr('r', 4)
            .attr('cx', d => vis.xScale(d.xValue))
            .attr('cy', d => vis.yScale(d.yValue))
            .on('mouseover', (_event, d) => {
                vis.tooltip.style('opacity', 1)
                    .html(`<div>Time: ${d.xValue} hrs</div><div>Distance: ${d.yValue} km</div></div>`);
            })
            .on('mousemove', (event) => {
                vis.tooltip
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 10}px`);
            })
            .on('mouseout', () => {
                vis.tooltip.style('opacity', 0);
            })
//            .merge(points)
            .transition().duration(300)
            .attr('cx', d => vis.xScale(d.xValue))
            .attr('cy', d => vis.yScale(d.yValue));

        points.exit().remove();

        vis.xAxis.call(d3.axisBottom(vis.xScale));
        vis.yAxis.call(d3.axisLeft(vis.yScale));
        
    }
    protected onMouseOver(event : any,d:any): void {
        const vis =this ;
        vis.tooltip
        .style("opacity", 1)
        .text(`${d.value}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    }



  }
