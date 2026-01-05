// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createMECTimeSeriesChart();
    createBehavioralRegimesChart();
    createCrossShoreComparisonChart();
    createWaveHeightChart();
    createWaveCorrelationChart();
});

// Dark theme colors
const darkTheme = {
    gridColor: 'rgba(255, 255, 255, 0.05)',
    textColor: '#9ca3af',
    titleColor: '#00d4ff',
    primaryColor: '#00d4ff',
    secondaryColor: '#7c3aed',
    erosionColor: '#ef4444',
    accretionColor: '#10b981',
    neutralColor: '#fbbf24'
};

// Helper function to format dates
function formatDate(dateStr) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    return `${year}-${month}`;
}

// Figure 1: MEC Time Series (matching Python plot_mec_time_series)
function createMECTimeSeriesChart() {
    const ctx = document.getElementById('mecTimeSeriesChart').getContext('2d');
    
    const labels = portFairyData.timeSeriesData.map(d => formatDate(d.endDate));
    const mecData = portFairyData.timeSeriesData.map(d => d.mec);
    
    // Calculate cumulative MEC
    let cumulative = 0;
    const cumulativeMEC = mecData.map(mec => {
        cumulative += mec;
        return cumulative;
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Individual MEC',
                data: mecData,
                borderColor: 'black',
                backgroundColor: 'black',
                borderWidth: 1,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false,
                yAxisID: 'y'
            }, {
                label: 'Cumulative MEC',
                data: cumulativeMEC,
                borderColor: 'black',
                borderWidth: 1.5,
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                yAxisID: 'y'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
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
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        color: darkTheme.gridColor
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        color: darkTheme.textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Figure 2: Behavioral Regimes (simplified without Jenks colors)
function createBehavioralRegimesChart() {
    const ctx = document.getElementById('behavioralChart').getContext('2d');
    
    const transects = portFairyData.transects.sort((a, b) => a.id - b.id);
    const labels = transects.map(t => t.id);
    const changes = transects.map(t => t.change);
    
    // Simple color coding
    const colors = changes.map(c => {
        if (c > 0.5) return '#10b981';
        if (c > 0.2) return '#84cc16';
        if (c > -0.2) return '#fbbf24';
        if (c > -0.5) return '#f97316';
        return '#ef4444';
    });
    
    new Chart(ctx, {
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
}

// Figure 3: Cross-shore Zone Comparison
function createCrossShoreComparisonChart() {
    const ctx = document.getElementById('crossShoreChart').getContext('2d');
    
    // Calculate average change per zone
    const transects = portFairyData.transects;
    const avgOffshore = transects.reduce((sum, t) => sum + t.offshoreChange, 0) / transects.length;
    const avgMidbeach = transects.reduce((sum, t) => sum + t.midbeachChange, 0) / transects.length;
    const avgOnshore = transects.reduce((sum, t) => sum + t.onshoreChange, 0) / transects.length;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Offshore', 'Mid-beach', 'Onshore'],
            datasets: [{
                label: 'Average Change',
                data: [avgOffshore, avgMidbeach, avgOnshore],
                backgroundColor: [
                    avgOffshore >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)',
                    avgMidbeach >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)',
                    avgOnshore >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    avgOffshore >= 0 ? '#10b981' : '#ef4444',
                    avgMidbeach >= 0 ? '#10b981' : '#ef4444',
                    avgOnshore >= 0 ? '#10b981' : '#ef4444'
                ],
                borderWidth: 2
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
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const type = value >= 0 ? 'Accretion' : 'Erosion';
                            return `${value.toFixed(3)} m (${type})`;
                        }
                    }
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
                        text: 'Cross-shore Zone',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: { color: darkTheme.textColor },
                    grid: { display: false }
                }
            }
        }
    });
}

// Figure 4: Wave Height Time Series
function createWaveHeightChart() {
    const ctx = document.getElementById('waveHeightChart').getContext('2d');
    
    const labels = portFairyData.timeSeriesData.map(d => formatDate(d.endDate));
    const p99Wave = portFairyData.timeSeriesData.map(d => d.p99WaveHeight);
    const maxWave = portFairyData.timeSeriesData.map(d => d.maxWaveHeight);
    const meanWave = portFairyData.timeSeriesData.map(d => d.meanWaveHeight);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '99th Percentile',
                data: p99Wave,
                borderColor: darkTheme.secondaryColor,
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
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
                        maxRotation: 45,
                        minRotation: 45,
                        color: darkTheme.textColor
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Figure 5: Wave-MEC Correlation (simplified, no regression)
function createWaveCorrelationChart() {
    const ctx = document.getElementById('waveCorrelationChart').getContext('2d');
    
    // Extract correlation data
    const correlationData = portFairyData.timeSeriesData
        .filter(d => d.p99WaveHeight !== null)
        .map(d => ({
            x: d.p99WaveHeight,
            y: d.mec
        }));
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '99th %ile Wave Height vs MEC',
                data: correlationData,
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: darkTheme.primaryColor,
                borderWidth: 2,
                pointRadius: 7,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    labels: {
                        color: darkTheme.textColor
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return [
                                `Wave: ${context.parsed.x.toFixed(2)} m`,
                                `MEC: ${context.parsed.y.toFixed(3)} m`,
                                context.parsed.y >= 0 ? 'Accretion' : 'Erosion'
                            ];
                        }
                    }
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
                    ticks: { color: darkTheme.textColor },
                    grid: { color: darkTheme.gridColor }
                },
                x: {
                    title: {
                        display: true,
                        text: '99th Percentile Wave Height (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.secondaryColor
                    },
                    ticks: { color: darkTheme.textColor },
                    grid: { color: darkTheme.gridColor }
                }
            }
        }
    });
}
