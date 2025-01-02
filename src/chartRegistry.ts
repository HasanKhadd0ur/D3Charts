export class ChartRegistry {
    private chartTypes: { [key: string]: any } = {};

    register(name: string, chartClass: any): void {
        if (this.chartTypes[name]) {
            console.error(`Chart type "${name}" is already registered.`);
            return;
        }
        this.chartTypes[name] = chartClass;
    }

    get(name: string): any | null {
        return this.chartTypes[name] || null;
    }
}

export const chartRegistry = new ChartRegistry();
