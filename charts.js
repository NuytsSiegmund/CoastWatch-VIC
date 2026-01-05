// Chart.js configurations for coastal analysis visualizations

// Color schemes
const colors = {
    primary: '#2a5298',
    secondary: '#1e3c72',
    accent: '#27ae60',
    erosion: '#e74c3c',
    accretion: '#3498db',
    neutral: '#95a5a6',
    warning: '#f39c12'
};

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    createTimeSeriesChart();
    createSpatialChart();
    createWaveCorrelationChart();
}

// Time Series Chart - Mean Elevation Change over time
function createTimeSeriesChart() {
    const ctx = document.getElementById('timeSeriesChart');
    if (!ctx) return;

    // Sample data - replace with actual data from data.js
    const dates = generateSampleDates(54);
    const mecSupratidal = generateSampleMEC(54, 'supratidal');
    const mecIntertidal = generateSampleMEC(54, 'intertidal');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Supratidal Zone (>0.47m AHD)',
                    data: mecSupratidal,
                    borderColor: colors.erosion,
                    backgroundColor: colors.erosion + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 6
                },
                {
                    label: 'Intertidal Zone (<0.47m AHD)',
                    data: mecIntertidal,
                    borderColor: colors.accretion,
                    backgroundColor: colors.accretion + '20',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Mean Elevation Change (MEC) Time Series',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.secondary
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: {
                        size: 13
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toFixed(3) + ' m';
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Survey Date',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            }
        }
    });
}

// Spatial Chart - Elevation change by transect location
function createSpatialChart() {
    const ctx = document.getElementById('spatialChart');
    if (!ctx) return;

    // Sample data - replace with actual transect data
    const transects = generateTransectLabels(220);
    const elevationChanges = generateSampleSpatialData(220);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: transects,
            datasets: [{
                label: 'Mean Elevation Change',
                data: elevationChanges,
                backgroundColor: elevationChanges.map(val => 
                    val > 0 ? colors.accretion + 'CC' : colors.erosion + 'CC'
                ),
                borderColor: elevationChanges.map(val => 
                    val > 0 ? colors.accretion : colors.erosion
                ),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Spatial Distribution of Elevation Change Across Transects',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.secondary
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    callbacks: {
                        title: function(context) {
                            return 'Transect ' + context[0].label;
                        },
                        label: function(context) {
                            const value = context.parsed.y;
                            const change = value > 0 ? 'Accretion' : 'Erosion';
                            return change + ': ' + Math.abs(value).toFixed(3) + ' m';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Transect Number (West to East)',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            }
        }
    });
}

// Wave Correlation Chart
function createWaveCorrelationChart() {
    const ctx = document.getElementById('waveChart');
    if (!ctx) return;

    // Sample data for wave height vs elevation change correlation
    const waveData = generateWaveCorrelationData(100);

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Supratidal Zone',
                    data: waveData.supratidal,
                    backgroundColor: colors.erosion + '80',
                    borderColor: colors.erosion,
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Intertidal Zone',
                    data: waveData.intertidal,
                    backgroundColor: colors.accretion + '80',
                    borderColor: colors.accretion,
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Wave Height vs Elevation Change Correlation',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.secondary
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return [
                                context.dataset.label,
                                'Wave Height: ' + context.parsed.x.toFixed(2) + ' m',
                                'Elevation Change: ' + context.parsed.y.toFixed(3) + ' m'
                            ];
                        }
                    }
                },
                annotation: {
                    annotations: {
                        thresholdLine: {
                            type: 'line',
                            xMin: 4.6,
                            xMax: 4.6,
                            borderColor: colors.warning,
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'Threshold: 4.6m',
                                position: 'start',
                                backgroundColor: colors.warning,
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: true,
                    title: {
                        display: true,
                        text: 'Significant Wave Height (m)',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 8,
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mean Elevation Change (m)',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            }
        }
    });
}

// Helper functions to generate sample data
// Replace these with actual data loading from data.js

function generateSampleDates(n) {
    const dates = [];
    const startDate = new Date('2018-01-01');
    const daysBetweenSurveys = Math.floor((7 * 365) / n);
    
    for (let i = 0; i < n; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (i * daysBetweenSurveys));
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

function generateSampleMEC(n, zone) {
    const data = [];
    const baseTrend = zone === 'supratidal' ? -0.05 : -0.01;
    const variance = zone === 'supratidal' ? 0.15 : 0.08;
    
    for (let i = 0; i < n; i++) {
        const seasonal = Math.sin(i * Math.PI / 6) * 0.1;
        const random = (Math.random() - 0.5) * variance;
        data.push(baseTrend + seasonal + random);
    }
    return data;
}

function generateTransectLabels(n) {
    return Array.from({length: n}, (_, i) => (i + 1).toString());
}

function generateSampleSpatialData(n) {
    const data = [];
    for (let i = 0; i < n; i++) {
        // Create spatial pattern with erosion near structures
        const distanceEffect = Math.abs(i - 110) / 110;
        const structureEffect = i > 100 && i < 120 ? -0.3 : 0;
        const base = (Math.random() - 0.5) * 0.2;
        data.push(base + structureEffect - (distanceEffect * 0.1));
    }
    return data;
}

function generateWaveCorrelationData(n) {
    const supratidal = [];
    const intertidal = [];
    
    for (let i = 0; i < n; i++) {
        const waveHeight = Math.random() * 7 + 1;
        
        // Supratidal: strong negative correlation above threshold
        const supratidalChange = waveHeight > 4.6 
            ? -0.1 - (waveHeight - 4.6) * 0.08 + (Math.random() - 0.5) * 0.1
            : 0.05 - waveHeight * 0.02 + (Math.random() - 0.5) * 0.08;
        
        // Intertidal: weaker correlation
        const intertidalChange = -0.02 - waveHeight * 0.015 + (Math.random() - 0.5) * 0.08;
        
        supratidal.push({x: waveHeight, y: supratidalChange});
        intertidal.push({x: waveHeight, y: intertidalChange});
    }
    
    return {supratidal, intertidal};
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCharts,
        colors
    };
}
