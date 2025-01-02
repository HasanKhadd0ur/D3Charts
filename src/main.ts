import { chartRegistry } from "./chartRegistry";
import { LineChart } from "./lineChart";
import { ScatterChart } from "./scatterChart";
import { DataLoader } from "./Loaders/dataLoader";
import { renderChart } from "./renderChart";

// Register chart types
chartRegistry.register('scatter', ScatterChart);
chartRegistry.register('line', LineChart);


// Initial chart type
let currentChartType = 'scatter';


let data:any[] =[] ;

document.addEventListener('DOMContentLoaded', () => {

    const chartTypeSelect = document.querySelector<HTMLSelectElement>('#chart-type');
    chartTypeSelect?.addEventListener('change', (event) => {
        const target = event.target as HTMLSelectElement;
        currentChartType = target.value;
        renderChart(currentChartType,data,chartRegistry);
    });

})

DataLoader('/data/vancouver_trails.csv',1,
    // Add event listener for the dropdown menu
    (dat : any[])=>{
        data =dat;
        console.log(data)

        // Initial render
        renderChart(currentChartType,data,chartRegistry);

   }
    
)

