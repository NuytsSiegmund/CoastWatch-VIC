// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createTimeSeriesChart();
    createSpatialChart();
    createCrossShoreChart();
    createWaveChart();
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
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
}

// Time Series Chart - MEC with wave overlay
function createTimeSeriesChart() {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    
    const labels = portFairyData.timeSeriesData.map(d => formatDate(d.endDate));
    const mecData = portFairyData.timeSeriesData.map(d => d.mec);
    const waveData = portFairyData.timeSeriesData.map(d => d.maxWaveHeight);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mean Elevation Change (m)',
                data: mecData,
                borderColor: darkTheme.primaryColor,
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: mecData.map(v => v >= 0 ? darkTheme.accretionColor : darkTheme.erosionColor),
                pointBorderColor: darkTheme.primaryColor,
                pointBorderWidth: 2,
                yAxisID: 'y'
            }, {
                label: 'Max Wave Height (m)',
                data: waveData,
                borderColor: darkTheme.secondaryColor,
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: darkTheme.secondaryColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                yAxisID: 'y1',
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Mean Elevation Change and Wave Forcing (2018-2025)',
                    font: { size: 16, weight: 'bold' },
                    color: darkTheme.titleColor
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
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed.y;
                            if (context.datasetIndex === 0) {
                                const changeType = value >= 0 ? 'Accretion' : 'Erosion';
                                label += value.toFixed(3) + ' m (' + changeType + ')';
                            } else {
                                label += value ? value.toFixed(2) + ' m' : 'No data';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.primaryColor
                    },
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        color: darkTheme.gridColor
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Max Wave Height (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.secondaryColor
                    },
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Survey Date',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.textColor
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 20,
                        color: darkTheme.textColor
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Spatial Distribution Chart
function createSpatialChart() {
    const ctx = document.getElementById('spatialChart').getContext('2d');
    
    const sortedTransects = [...portFairyData.transects].sort((a, b) => a.id - b.id);
    const labels = sortedTransects.map(t => `T${t.id}`);
    const data = sortedTransects.map(t => t.change);
    const colors = data.map(value => {
        if (value > 0.5) return '#10b981';
        if (value > 0.2) return '#84cc16';
        if (value > -0.2) return '#fbbf24';
        if (value > -0.5) return '#f97316';
        return '#ef4444';
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Elevation Change (m)',
                data: data,
                backgroundColor: colors,
                borderColor: darkTheme.primaryColor,
                borderWidth: 0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const changeType = value >= 0 ? 'Accretion' : 'Erosion';
                            return `Change: ${value.toFixed(3)} m (${changeType})`;
                        },
                        afterLabel: function(context) {
                            const transect = sortedTransects[context.dataIndex];
                            return `Orientation: ${transect.orientation}°`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Elevation Change (m)',
                        font: { size: 12, weight: 'bold' },
                        color: darkTheme.primaryColor
                    },
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        color: darkTheme.gridColor
                    }
                },
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 30,
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

// Cross-shore Zone Comparison Chart
function createCrossShoreChart() {
    const ctx = document.getElementById('crossShoreChart').getContext('2d');
    
    // Calculate average change per zone
    const avgOffshore = portFairyData.transects.reduce((sum, t) => sum + t.offshoreChange, 0) / portFairyData.transects.length;
    const avgMidbeach = portFairyData.transects.reduce((sum, t) => sum + t.midbeachChange, 0) / portFairyData.transects.length;
    const avgOnshore = portFairyData.transects.reduce((sum, t) => sum + t.onshoreChange, 0) / portFairyData.transects.length;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Offshore', 'Mid-beach', 'Onshore'],
            datasets: [{
                label: 'Average Elevation Change (m)',
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
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(19, 24, 41, 0.95)',
                    titleColor: darkTheme.titleColor,
                    bodyColor: darkTheme.textColor,
                    borderColor: darkTheme.primaryColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const changeType = value >= 0 ? 'Accretion' : 'Erosion';
                            return `Average: ${value.toFixed(3)} m (${changeType})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Elevation Change (m)',
                        font: { size: 12, weight: 'bold' },
                        color: darkTheme.primaryColor
                    },
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        color: darkTheme.gridColor
                    }
                },
                x: {
                    ticks: {
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

// Wave-Morphology Correlation Chart - REAL DATA
function createWaveChart() {
    const ctx = document.getElementById('waveChart').getContext('2d');
    
    // Extract real wave-MEC correlation data
    const correlationData = portFairyData.timeSeriesData
        .filter(d => d.maxWaveHeight !== null)
        .map(d => ({
            x: d.maxWaveHeight,
            y: d.mec
        }));
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Wave Height vs MEC',
                data: correlationData,
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: darkTheme.primaryColor,
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: darkTheme.secondaryColor,
                pointHoverBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Maximum Wave Height vs Mean Elevation Change',
                    font: { size: 16, weight: 'bold' },
                    color: darkTheme.titleColor
                },
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
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return [
                                `Wave Height: ${context.parsed.x.toFixed(2)} m`,
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
                        color: darkTheme.primaryColor
                    },
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
                        text: 'Maximum Wave Height (m)',
                        font: { size: 14, weight: 'bold' },
                        color: darkTheme.secondaryColor
                    },
                    ticks: {
                        color: darkTheme.textColor
                    },
                    grid: {
                        color: darkTheme.gridColor
                    }
                }
            }
        }
    });
}
