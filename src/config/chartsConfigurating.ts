import { ChartConfig } from "../chartConfig";

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
    chartTitle: 'Vancouver Trails',
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
    lineColor: 'steelblue',    
    dataSetURL:'/data/sp_500_index.csv',
    fields:['date','close'],
    chartTitle: 'SP 500 Index ',
    timeFormat:"%Y-%m-%d" 
};