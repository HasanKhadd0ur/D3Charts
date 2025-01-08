import { ChartConfig } from "../charts/chartConfig";

// Default Configuration for line Chart
export const ScatterChartConfig : ChartConfig = {
    parentElement: '#chart-container',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'time',
    yField: 'distance',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',
    dataSetURL:'/data/vancouver_trails.csv',
    fields:['trail','region','difficulty','time','distance','season'],
    chartTitle: 'Dynamic Chart',
    timeFormat:"%Y-%m-%d" 
};

// Default Configuration for line Chart
export const lineChartConfig : ChartConfig = {
    parentElement: '#chart-container',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'date',
    yField: 'close',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',    
    dataSetURL:'/data/sp_500_index.csv',
    fields:['date','close'],
    chartTitle: 'Dynamic Chart',
    timeFormat:"%Y-%m-%d" 
};