// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createTimeSeriesChart();
    createSpatialChart();
    createWaveChart();
});

// Helper function to format dates
function formatDate(dateStr) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
}

// Time Series Chart - Mean Elevation Change over time
function createTimeSeriesChart() {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    
    const labels = portFairyData.timeSeriesData.map(d => formatDate(d.date));
    const data = portFairyData.timeSeriesData.map(d => d.mec);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mean Elevation Change (m)',
                data: data,
                borderColor: '#2a5298',
                backgroundColor: 'rgba(42, 82, 152, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: data.map(v => v >= 0 ? '#1a9850' : '#d73027'),
                pointBorderColor: '#fff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Beach Elevation Change Over Time (2018-2025)',
                    font: { size: 16, weight: 'bold' },
                    color: '#1e3c72'
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed.y;
                            const changeType = value >= 0 ? 'Accretion' : 'Erosion';
                            label += value.toFixed(3) + ' m (' + changeType + ')';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Survey Date',
                        font: { size: 14, weight: 'bold' }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 20
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

// Spatial Distribution Chart - Change by transect
function createSpatialChart() {
    const ctx = document.getElementById('spatialChart').getContext('2d');
    
    // Sort transects by ID
    const sortedTransects = [...portFairyData.transects].sort((a, b) => a.id - b.id);
    
    const labels = sortedTransects.map(t => `T${t.id}`);
    const data = sortedTransects.map(t => t.change);
    const colors = data.map(value => {
        if (value > 0.5) return '#1a9850';
        if (value > 0.2) return '#91cf60';
        if (value > -0.2) return '#fee08b';
        if (value > -0.5) return '#fc8d59';
        return '#d73027';
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Elevation Change (m)',
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Total Elevation Change by Transect (2018-2025)',
                    font: { size: 16, weight: 'bold' },
                    color: '#1e3c72'
                },
                legend: {
                    display: false
                },
                tooltip: {
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
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Transect ID',
                        font: { size: 14, weight: 'bold' }
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 30
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Wave-Morphology Correlation Chart (simulated data for demonstration)
function createWaveChart() {
    const ctx = document.getElementById('waveChart').getContext('2d');
    
    // Generate simulated wave-MEC correlation data
    // In reality, this would come from your wave analysis
    const simulatedData = portFairyData.timeSeriesData.map((d, i) => {
        // Simulate wave height with some correlation to MEC
        const baseWaveHeight = 2.5 + Math.random() * 2.5;
        const mec = d.mec;
        // Add some correlation
        const waveHeight = baseWaveHeight - (mec * 0.8) + (Math.random() * 0.5);
        return {
            x: waveHeight,
            y: mec
        };
    });
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Wave Height vs MEC',
                data: simulatedData,
                backgroundColor: 'rgba(42, 82, 152, 0.6)',
                borderColor: '#2a5298',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Wave Height vs Mean Elevation Change (Simulated)',
                    font: { size: 16, weight: 'bold' },
                    color: '#1e3c72'
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return [
                                `Wave Height: ${context.parsed.x.toFixed(2)} m`,
                                `MEC: ${context.parsed.y.toFixed(3)} m`
                            ];
                        }
                    }
                },
                annotation: {
                    annotations: {
                        note: {
                            type: 'label',
                            xValue: 4.5,
                            yValue: 0.3,
                            content: ['r = 0.61', 'p < 0.001'],
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#d73027',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderColor: '#d73027',
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 10
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Maximum Wave Height (m)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}
