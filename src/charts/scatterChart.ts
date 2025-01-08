import { BaseChart } from "./baseChart";
import * as d3 from 'd3'

export class ScatterChart extends BaseChart {
    colorScale: d3.ScaleOrdinal<string, unknown, never>;

    protected initVis() {
     
        const vis = this;
        
        super.initVis();

        vis.colorScale = d3.scaleOrdinal()
             .range(['#d3eecd', '#7bc77e', '#2a8d46'])
             .domain(['Easy', 'Intermediate', 'Difficult']);

        
        vis.setupScales();


        vis.tooltip = d3.select(vis.config.parentElement)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
  
          
        // Ooerlay rectangle for capturing mouse events
        vis.overlay = vis.chart.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("opacity", 0)
        
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
            .on("mouseover", (event,d) => this.onMouseOver(event,d))
            .on("mousemove", (event) => this.onMouseMove(event))
            .on("mouseout", () => this.onMouseOut())
            .transition().duration(300)
            .attr('cx', d => vis.xScale(d.xValue))
            .attr('cy', d => vis.yScale(d.yValue));

        points.exit().remove();

        vis.xAxis.call(d3.axisBottom(vis.xScale).ticks(6));
        
        vis.yAxis.call(d3.axisLeft(vis.yScale).ticks(6));
        
    }

    protected onMouseOver(_event : any,d:any): void {
        const vis= this;
        
        vis.tooltip.style('opacity', 1)
                .html(`<div>Time: ${d.xValue} hrs</div><div>Distance: ${d.yValue} km</div></div>`);
    }

    protected onMouseOut() {
        const vis= this;
        vis.tooltip.style("opacity", 0);
    }
   
    protected setupScales(){
        const vis =this;

        // Time scale for the date field
        vis.xScale = d3.scaleLinear().range([0, vis.width]);

        // Linear scale for the value field
        vis.yScale = d3.scaleLinear().range([vis.height, 0]);  
    }
  }
