import { ChartRegistry } from "./chartRegistry";

// Function to render the selected chart type
export function renderChart(chartType: string,data :any[],chartRegistry : ChartRegistry) {
    
    // Clear existing chart container
    const container = document.querySelector('#chart-container');
    if (container) container.innerHTML = '';

    // Retrieve and instantiate the selected chart class
    const ChartRegistration = chartRegistry.get(chartType);
    if (ChartRegistration.chartClass) {

        new ChartRegistration.chartClass(ChartRegistration.chartConfig, data).updateVis();

    } else {
        console.error(`Unknown chart type: ${chartType}`);
    }
}
