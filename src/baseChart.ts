import * as d3 from 'd3';
import { ChartConfig } from './config/chartConfig';


export abstract class BaseChart {
    protected config: ChartConfig;
    protected data: {xValue : any , yValue : any}[];
    protected svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;
    protected chart: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected xScale: d3.ScaleLinear<number, number>;
    protected yScale: d3.ScaleLinear<number, number>;
    protected xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined> | any;
    protected yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined> |any;
    protected height: number;
    protected width: number;
    
    
    constructor(config: ChartConfig, data: any[]) {
        this.config = config;
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

    protected mapData(data : any[]):void{
        const vis =this ;

        // parse numeric values and map fields name 
        vis.data = data.map(d => ({
            xValue: d[this.config.xField],  
            yValue: d[this.config.yField]  
        }));
        
    }
}
