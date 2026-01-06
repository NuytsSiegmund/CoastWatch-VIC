// Port Fairy Site Content and Visualizations
// This file contains the HTML content and chart creation functions specific to Port Fairy

/**
 * Generates the HTML content for the Port Fairy site details
 * @param {Object} site - The site metadata object
 * @returns {string} HTML string for the site details
 */
function getPortFairyHTML(site) {
    return `
        <section>
            <h2>${site.name} | Coastal Change Analysis</h2>

            <h3>Site Overview</h3>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
                Port Fairy represents a case study in understanding how sandy beaches respond to climate-driven pressures and coastal engineering interventions. Seven years of high-resolution monitoring (2018–2025) reveal complex patterns of vulnerability that vary across the beach profile, with important implications for coastal management under accelerating sea level rise.
            </p>

            <div class="info-box">
                <p style="margin-bottom: 1rem;"><strong>Cross-Shore Vulnerability Gradient:</strong> The analysis identifies distinct behavioural zones across the beach profile. Supratidal areas (above 0.47 m AHD) experience persistent erosion strongly driven by extreme wave conditions, while lower intertidal zones remain more stable. This elevation-dependent vulnerability means that different parts of the beach face different levels of climate risk.</p>

                <p style="margin-bottom: 1rem;"><strong>Wave Forcing Thresholds:</strong> Statistical analysis reveals that wave heights exceeding 4.6 m mark a critical threshold. Below this threshold, Port Fairy tends to show local sediment transport; above it, erosion dominates throughout the whole embayment. Understanding these thresholds enables early warning and proactive response.</p>

                <p style="margin-bottom: 1rem;"><strong>Impacts of Rock Armour:</strong> Coastal protection structures at Port Fairy demonstrate how hard engineering can disrupt natural sediment transport. Rock armour creates zones of persistent erosion extending up to 200 m along the coast and shifts sand from upper to lower beach areas. Under projected sea level rise, these effects will intensify as structures prevent beaches from naturally retreating landward. A phenomenon known as "coastal squeeze."</p>

                <p><strong>Management Implications:</strong> The quantitative vulnerability framework developed here provides coastal managers with evidence-based thresholds for intervention timing, spatial prioritization of limited resources, and evaluation of engineering alternatives. This approach is transferable to data-limited coastlines globally seeking sustainable management strategies under climate change.</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <p class="label">Monitoring Period</p>
                    <h3>7</h3>
                    <p class="value-detail">Years (2018-2025)</p>
                </div>
                <div class="stat-card">
                    <p class="label">Survey Campaigns</p>
                    <h3>54</h3>
                    <p class="value-detail">Drone Surveys</p>
                </div>
                <div class="stat-card">
                    <p class="label">Transects Analyzed</p>
                    <h3>220</h3>
                    <p class="value-detail">Shore-perpendicular</p>
                </div>
                <div class="stat-card">
                    <p class="label">Study Area</p>
                    <h3>5.8</h3>
                    <p class="value-detail">km Coastline</p>
                </div>
            </div>
        </section>

        <section>
            <h2>Interactive Spatial Analysis</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Explore transect locations and elevation changes across the study area. Click markers for detailed information on local change patterns.
            </p>
            <div id="map"></div>

            <div class="legend">
                <h4 style="color: #00d4ff; margin-bottom: 0.8rem;">Elevation Change Classification (2018-2025)</h4>
                <div class="legend-item">
                    <div class="legend-color" style="background: #10b981;"></div>
                    <span>High Accretion (> +0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #84cc16;"></div>
                    <span>Moderate Accretion (+0.2 to +0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #fbbf24;"></div>
                    <span>Stable (±0.2 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #f97316;"></div>
                    <span>Moderate Erosion (-0.2 to -0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ef4444;"></div>
                    <span>High Erosion (< -0.5 m)</span>
                </div>
            </div>
        </section>

        <section>
            <h2>Understanding Beach Change Over Time</h2>

            <h3>Seven Years of Coastal Evolution</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Individual and cumulative beach elevation change showing temporal erosion and accretion patterns from 54 drone surveys.
            </p>
            <div class="chart-container">
                <canvas id="mecTimeSeriesChart"></canvas>
            </div>

            <h3>Where Change Happens Along the Coast</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Spatial distribution showing which transects are eroding, accreting, or remaining stable across the 5.8 km study area.
            </p>
            <div class="chart-container">
                <canvas id="behavioralChart"></canvas>
            </div>
        </section>

        <section>
            <h2>The Ocean's Influence</h2>

            <div class="data-source">
                <strong>Wave Monitoring:</strong> Sofar Spotter buoy (~3 km offshore, 28m depth)<br>
                <strong>Data Source:</strong> <a href="https://auswaves.org/vic-waves/" target="_blank">AusWaves - Victorian Wave Network</a><br>
                <strong>Observations:</strong> 111,991 measurements since September 2018
            </div>

            <h3>Wave Conditions Drive Beach Change</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Offshore wave heights directly control erosion and accretion patterns. The critical threshold of 4.6 m marks the transition point between beach building and erosion.
            </p>
            <div class="chart-container">
                <canvas id="waveHeightChart"></canvas>
            </div>

            <div class="info-box">
                <p><strong>Statistical Significance:</strong> Analysis reveals strong negative correlation between wave height and beach elevation (supratidal: r = -0.714, p < 0.001; intertidal: r = -0.301, p = 0.038). These thresholds provide quantitative triggers for coastal hazard response.</p>
            </div>
        </section>

        <section>
            <h2>Scientific Studies</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Research publications based on Port Fairy monitoring data.
            </p>

            <div style="background: var(--darker-bg); border: 1px solid var(--border); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary); font-size: 1.2rem; margin-top: 0;">Cross-shore vulnerability and rock armour impacts on sandy beach evolution under sea level rise</h3>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Authors:</strong> Nuyts et al.</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Journal:</strong> Earth Surface Processes and Landforms (Under Review, 2026)</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Study Period:</strong> 2018-2025 (54 UAV surveys)</p>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 1rem;">
                    This study uses seven years (2018–2025) of high-resolution Unmanned Aerial Vehicle (UAV) surveys and offshore wave monitoring to assess morphodynamic changes and the influence of rock armour structures on a sandy embayment at Port Fairy, Australia. We applied spatially distributed metrics, Mean Elevation Change (MEC) and residual Beachface Cluster Dynamics (r-BCD), across 54 surveys and 220 transects to quantify sediment behaviour and process-response relationships. Results reveal a distinct cross-shore vulnerability gradient: supratidal zones (>0.47 m AHD) exhibit persistent erosion strongly linked to extreme wave conditions (r = –0.714, p < 0.001), while intertidal zones remain more stable (r = –0.301, p = 0.038). A wave height threshold (4.6 m) was identified through comprehensive optimisation analysis (p < 0.001), marking the transition from accretion to erosion in supratidal areas, with prolonged exceedance (>30 hours) producing negative elevation changes exceeding -0.4 m. Rock armour disrupted sediment transport, causing downdrift erosion and flanking erosion up to 200 m from structure edges, while shifting sediment cross-shore from supratidal to intertidal zones.
                </p>
            </div>

            <div style="background: var(--darker-bg); border: 1px solid var(--border); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary); font-size: 1.2rem; margin-top: 0;">Wave direction dominates erosion response of embayed beaches under climate change</h3>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Authors:</strong> Nuyts et al.</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Journal:</strong> Coastal Engineering (Under Review, 2026)</p>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 1rem;">
                    This study addresses a critical gap in understanding how climate-driven changes in wave climate will affect embayed beaches worldwide. Using a validated MIKE 21 coupled wavehydrodynamic-sediment transport model, we systematically quantify the relative influence of wave direction, wave height, and sea-level rise on storm-driven morphodynamic response at Port Fairy embayment, south-eastern Australia. Our findings reveal that wave direction exerts dominant control over coastal change, with directional shifts of just ±10° producing opposing erosion-accretion patterns that exceed the effects of doubling wave height.
            </div>

            <p style="color: var(--text-secondary); font-style: italic;">
                Additional publications will be listed here as research continues at Port Fairy and other VCMP monitoring sites.
            </p>
        </section>
    `;
}

/**
 * Creates all charts for Port Fairy
 */
function createPortFairyCharts() {
    if (typeof portFairyData === 'undefined') {
        console.error('Port Fairy data not loaded');
        return;
    }

    createMECTimeSeriesChart();
    createBehavioralRegimesChart();
    createWaveHeightChart();
}

// Dark theme colors (shared with charts.js)
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
                borderColor: darkTheme.primaryColor,
                backgroundColor: darkTheme.primaryColor,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false
            }, {
                label: 'Cumulative MEC',
                data: cumulativeMEC,
                borderColor: darkTheme.secondaryColor,
                borderWidth: 2,
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
