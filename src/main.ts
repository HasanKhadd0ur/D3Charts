import { DataLoader } from "./Loaders/dataLoader";
import { renderChart } from "./renderChart";
import { chartRegistry } from "./config/registrationConfig";


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

DataLoader('/data/sp_500_index.csv',1,
    // Add event listener for the dropdown menu
    (dat : any[])=>{
        data =dat;
        console.log(data)

        // Initial render
        renderChart(currentChartType,data,chartRegistry);

   }
    
)

