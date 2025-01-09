import { DataLoader } from "./helpers/dataLoader";
import { renderChart } from "./helpers/renderChart";
import { chartRegistry } from "./config/registrationConfig";


// Initial chart type
let currentChartType = 'scatter';

// Data and Filtered DAta
let data:any[] =[] ;
let filteredData: any[] = [];

// Filter logic based on checkboxes (very naive implementation.!!!!!)
function applyFilters() {
    const easyChecked = (document.getElementById('filter-easy') as HTMLInputElement).checked;
    const intermediateChecked = (document.getElementById('filter-intermediate') as HTMLInputElement).checked;
    const difficultChecked = (document.getElementById('filter-difficult') as HTMLInputElement).checked;

    filteredData = data.filter((d) => {
        if (easyChecked && d.difficulty === 'Easy') return true;
        if (intermediateChecked && d.difficulty === 'Intermediate') return true;
        if (difficultChecked && d.difficulty === 'Difficult') return true;
        return false;
    });

    renderChart(currentChartType, filteredData, chartRegistry);
}


// Add event listeners to checkboxes
document.addEventListener('DOMContentLoaded', () => {
    const chartTypeSelect = document.querySelector<HTMLSelectElement>('#chart-type');
    const checkboxes = [
        document.getElementById('filter-easy') as HTMLInputElement,
        document.getElementById('filter-intermediate') as HTMLInputElement,
        document.getElementById('filter-difficult') as HTMLInputElement,
    ];

    // Enable or disable checkboxes based on chart type
    function updateCheckboxState() {
        const isScatter = currentChartType === 'scatter';
        checkboxes.forEach(checkbox => {
            checkbox.disabled = !isScatter;
        });
    }

    checkboxes.forEach(checkbox => checkbox.addEventListener('change', applyFilters));

    chartTypeSelect?.addEventListener('change', (event) => {
        const target = event.target as HTMLSelectElement;
        currentChartType = target.value;
        updateCheckboxState();

        DataLoader(
            chartRegistry.get(currentChartType).chartConfig?.dataSetURL!,
            1,
            (dat: any[]) => {
                data = dat;
                filteredData = dat;
                renderChart(currentChartType, filteredData, chartRegistry);
            }
        );
    });

    updateCheckboxState(); // Initial state update

    // Initial data load
    DataLoader(
        chartRegistry.get(currentChartType).chartConfig?.dataSetURL!,
        1,
        (dat: any[]) => {
            data = dat;
            filteredData = dat;
            renderChart(currentChartType, filteredData, chartRegistry);
        }
    );
});

DataLoader(chartRegistry.get(currentChartType).chartConfig?.dataSetURL!,1,
    // Add event listener for the dropdown menu
    (dat : any[])=>{
        data =dat;
        console.log(data)

        // Initial render
        renderChart(currentChartType,data,chartRegistry);

   }
    
)

