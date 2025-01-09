import { ChartRegistry } from "../chartRegistry";
import { ScatterChart } from "../scatterChart";
import { LineChart } from "../lineChart";
import { lineChartConfig, ScatterChartConfig } from "./chartsConfigurating";

const chartRegistry = new ChartRegistry();



// Register chart types
chartRegistry.register('scatter', ScatterChart,ScatterChartConfig);
chartRegistry.register('line', LineChart,lineChartConfig);

export  { chartRegistry}; 
