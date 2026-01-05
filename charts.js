// Chart instances
let chartInstances = [];

// Create all charts
function createAllCharts() {
    destroyAllCharts();
    
    // Wait for DOM to be ready
    setTimeout(() => {
        createMECTimeSeriesChart();
        createBehavioralRegimesChart();
        createWaveHeightChart();
    }, 50);
}

// Destroy all chart instances
function destroyAllCharts() {
    chartInstances.forEach(chart => {
        if (chart) chart.destroy();
    });
    chartInstances = [];
}

// Dark theme colors
const darkTheme = {
    gridColor: 'rgba(255, 255, 255, 0.05)',
    textColor: '#9ca3af',
    titleColor: '#00d4ff',
    primaryColor: '#00d4ff',
    secondaryColor: '#7c3aed',
    erosionColor: '#ef4444',
    accretionColor: '#10b981'
};

// Helper function to format dates
function formatDate(dateStr) {
    const year = dateStr.substring(0, 4);
    return year;
}

// MEC Time Series Chart
function createMECTimeSeriesChart() {
    const canvas = document.getElementById('mecTimeSeriesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const mecData = portFairyData.timeSeriesData.map(d => d.mec);
    const labels = portFairyData.timeSeriesData.map((d, i) => {
        // Show year only when it changes
        const year = formatDate(d.endDate);
        if (i === 0) return year;
        const prevYear = formatDate(portFairyData.timeSeriesData[i-1].endDate);
        return year !== prevYear ? year : '';
    });
    
    // Calculate cumulative MEC
    let cumulative = 0;
    const cumulativeMEC = mecData.map(mec => {
        cumulative += mec;
        return cumulative;
    });
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Individual MEC',
                data: mecData,
                borderColor: '#000',
                backgroundColor: '#000',
                borderWidth: 1,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false
            }, {
                label: 'Cumulative MEC',
                data: cumulativeMEC,
                borderColor: '#000',
                borderWidth: 1.5,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: darkTheme.textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    min: -0.8,
                    max: 0.8,
                    ticks: { color: darkTheme.textColor },
                    grid: { color: darkTheme.gridColor }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: {
                        autoSkip: false,
                        color: darkTheme.textColor
                    },
                    grid: { display: false }
                }
            }
        }
    });
    
    chartInstances.push(chart);
}

// Behavioral Regimes Chart
function createBehavioralRegimesChart() {
    const canvas = document.getElementById('behavioralChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const transects = [...portFairyData.transects].sort((a, b) => a.id - b.id);
    const labels = transects.map(t => t.id);
    const changes = transects.map(t => t.change);
    
    const colors = changes.map(c => {
        if (c > 0.5) return '#10b981';
        if (c > 0.2) return '#84cc16';
        if (c > -0.2) return '#fbbf24';
        if (c > -0.5) return '#f97316';
        return '#ef4444';
    });
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Change (m)',
                data: changes,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Elevation Change (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: { color: darkTheme.textColor },
                    grid: { color: darkTheme.gridColor }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Transects Alongshore (West → East)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                        color: darkTheme.textColor
                    },
                    grid: { display: false }
                }
            }
        }
    });
    
    chartInstances.push(chart);
}

// Wave Height Chart
function createWaveHeightChart() {
    const canvas = document.getElementById('waveHeightChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const labels = portFairyData.timeSeriesData.map((d, i) => {
        const year = formatDate(d.endDate);
        if (i === 0) return year;
        const prevYear = formatDate(portFairyData.timeSeriesData[i-1].endDate);
        return year !== prevYear ? year : '';
    });
    
    const p99Wave = portFairyData.timeSeriesData.map(d => d.p99WaveHeight);
    const maxWave = portFairyData.timeSeriesData.map(d => d.maxWaveHeight);
    const meanWave = portFairyData.timeSeriesData.map(d => d.meanWaveHeight);
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '99th Percentile',
                data: p99Wave,
                borderColor: darkTheme.secondaryColor,
                borderWidth: 2,
                pointRadius: 3,
                fill: false
            }, {
                label: 'Maximum',
                data: maxWave,
                borderColor: darkTheme.erosionColor,
                borderWidth: 2,
                pointRadius: 3,
                borderDash: [5, 5],
                fill: false
            }, {
                label: 'Mean',
                data: meanWave,
                borderColor: darkTheme.accretionColor,
                borderWidth: 1.5,
                pointRadius: 2,
                borderDash: [2, 2],
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: darkTheme.textColor,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Wave Height (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.secondaryColor
                    },
                    ticks: { color: darkTheme.textColor },
                    grid: { color: darkTheme.gridColor }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: {
                        autoSkip: false,
                        color: darkTheme.textColor
                    },
                    grid: { display: false }
                }
            }
        }
    });
    
    chartInstances.push(chart);
}
