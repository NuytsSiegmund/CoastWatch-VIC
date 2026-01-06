// Shared Chart Management
// Global chart instances array
let chartInstances = [];

/**
 * Destroys all active chart instances
 * Called when navigating away from site details
 */
function destroyAllCharts() {
    chartInstances.forEach(chart => {
        if (chart) chart.destroy();
    });
    chartInstances = [];
}
