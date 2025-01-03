import * as d3 from 'd3';
import { ChartConfig } from './chartConfig';


export abstract class BaseChart {
    protected config: ChartConfig;
    protected height: number;
    protected width: number;
    protected data: {xValue : any , yValue : any}[];
    protected rawData : any[];
    protected svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;
    protected chart: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected xScale: d3.ScaleLinear<number, number>;
    protected yScale: d3.ScaleLinear<number, number>;
    protected xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    protected overlay: d3.Selection<SVGRectElement, unknown, HTMLElement, undefined>;
    
    
    constructor(config: ChartConfig, data: any[]) {
        this.config = config;
        this.rawData=data;
        this.mapData(data);
        this.initVis();
    }
    

    public updateVis() {
        const vis = this;

        vis.xScale.domain(d3.extent(vis.data, d => d.xValue) as [number, number]);
        vis.yScale.domain([0, d3.max(vis.data, d => d.yValue) as number]);

        vis.renderVis();
    }

    protected abstract renderVis(): void;
    protected abstract initVis():void;

    // create the tool tip element to show helpfull text to the user when over the path 
    protected  createTooltip(){
        const vis = this ;
        
         // Tooltip element
         // this ellement we use it to show the y value when  the mouse move  over the path 
         //
         //  and we do it by adding a div element with absoulute pposition 
         //  and show it when mouse over 

         vis.tooltip = d3.select(vis.config.parentElement)
         .append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);

        // circle for tracking tooltip position
  
        // vis.tooltipCircle = vis.chart.append("circle")
        //     .attr("r", 5)
        //     .attr("fill", "orange")
        //     .attr("stroke", "black")
        //     .style("opacity", 0);

        // Ooerlay rectangle for capturing mouse events
        vis.overlay = vis.chart.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("opacity", 0)

            // mouse events listners 
            .on("mouseover", (event,d) => this.onMouseOver(event,d))
            .on("mousemove", (event) => this.onMouseMove(event))
            .on("mouseout", () => this.onMouseOut());

    }

    /// this is listiner in the mous movement out 
    // to make the tooltip invisible 
    protected onMouseOut() {
        const vis= this;
        vis.tooltip.style("opacity", 0);
    }
    
    /// this is listiner in the mous movement move  
    // to make the tooltip position on the mouse coordinates 
    protected onMouseMove(event : any ) {
        const vis= this;
        vis.tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    protected abstract onMouseOver(event :any,d:any):void;

    protected mapData(data : any[]):void{
        const vis =this ;

        // parse numeric values and map fields name 
        vis.data = data.map(d => ({
            xValue: d[this.config.xField],  
            yValue: d[this.config.yField]  
        }));
        
    }
}
