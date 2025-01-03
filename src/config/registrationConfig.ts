import { ChartRegistry } from "../chartRegistry";
import { ScatterChart } from "../charts/scatterChart";
import { LineChart } from "../charts/lineChart";
import { lineChartConfig, ScatterChartConfig } from "./chartsConfigurating";

const chartRegistry = new ChartRegistry();



// Register chart types
chartRegistry.register('scatter', ScatterChart,lineChartConfig);
chartRegistry.register('line', LineChart,ScatterChartConfig);

export  { chartRegistry}; 
