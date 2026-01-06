// App state management
let currentView = 'overview';
let overviewMap = null;
let detailMap = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeOverviewMap();
});

// Navigation functions
function showOverview() {
    // Hide site details
    document.getElementById('site-details').classList.add('hidden');
    document.getElementById('victoria-overview').classList.remove('hidden');
    document.getElementById('breadcrumb').classList.remove('active');
    document.getElementById('site-nav').classList.add('hidden');
    
    // Reset header
    document.getElementById('header-subtitle').textContent = 'Coastal Monitoring Data Analytics Platform';
    document.getElementById('header-meta').classList.add('hidden');
    
    currentView = 'overview';
    window.scrollTo(0, 0);
}

function showSiteDetails(siteName) {
    if (siteName === 'Port Fairy') {
        showPortFairy();
    } else {
        showComingSoon(siteName);
    }
}

function showPortFairy() {
    // Update header
    document.getElementById('header-subtitle').textContent = 'High-Resolution Coastal Monitoring & Morphodynamic Analysis';
    document.getElementById('header-meta').textContent = 'Port Fairy Bay Case Study | 2018-2025';
    document.getElementById('header-meta').classList.remove('hidden');
    
    // Update breadcrumb
    document.getElementById('current-site-name').textContent = 'Port Fairy';
    document.getElementById('breadcrumb').classList.add('active');
    
    // Show site nav
    document.getElementById('site-nav').classList.remove('hidden');
    
    // Hide overview, show details
    document.getElementById('victoria-overview').classList.add('hidden');
    document.getElementById('site-details').classList.remove('hidden');
    
    // Load Port Fairy content
    loadPortFairyContent();
    
    currentView = 'port-fairy';
    window.scrollTo(0, 0);
}

function showComingSoon(siteName) {
    document.getElementById('victoria-overview').classList.add('hidden');
    document.getElementById('site-details').classList.remove('hidden');
    document.getElementById('site-details').innerHTML = `
        <section>
            <h2>${siteName}</h2>
            <div class="info-box">
                <p style="font-size: 1.2rem;"><strong>Coming Soon</strong></p>
                <p>Detailed analysis for ${siteName} is currently in development. This site is part of the Victorian Coastal Monitoring Program and data collection is ongoing.</p>
                <p style="margin-top: 1rem;">Port Fairy demonstrates the comprehensive analysis framework that will be applied to other VCMP sites.</p>
                <button class="btn" onclick="showOverview()" style="margin-top: 1.5rem;">← Back to Overview</button>
            </div>
        </section>
    `;
    
    document.getElementById('current-site-name').textContent = siteName;
    document.getElementById('breadcrumb').classList.add('active');
    window.scrollTo(0, 0);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize overview map with all VCMP sites
function initializeOverviewMap() {
    overviewMap = L.map('overview-map').setView([-37.8, 144.5], 7);
    
    const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    darkMap.addTo(overviewMap);
    
    // Add markers for all sites
    vcmpSites.forEach(site => {
        const markerColor = site.status === 'active' ? '#00d4ff' : '#9ca3af';
        const markerIcon = L.divIcon({
            className: 'vcmp-marker',
            html: `
                <div style="
                    background: ${markerColor};
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 3px solid #0a0e27;
                    box-shadow: 0 0 10px ${markerColor};
                    cursor: pointer;
                "></div>
            `,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });
        
        const marker = L.marker([site.lat, site.lon], { icon: markerIcon });
        
        const popupContent = `
            <div style="background: #131829; color: #e5e7eb; padding: 0.75rem; min-width: 220px;">
                <h3 style="margin: 0 0 8px 0; color: ${markerColor}; font-size: 1.1rem;">${site.name}</h3>
                <div style="display: grid; gap: 4px; font-size: 0.9rem;">
                    ${site.surveys ? `<div><strong style="color: #9ca3af;">Surveys:</strong> ${site.surveys}</div>` : ''}
                    ${site.coastlineKm ? `<div><strong style="color: #9ca3af;">Extent:</strong> ${site.coastlineKm} km</div>` : ''}
                    ${site.years ? `<div><strong style="color: #9ca3af;">Period:</strong> ${site.years}</div>` : ''}
                    ${site.status === 'active' ? 
                        `<button onclick="showSiteDetails('${site.name}')" style="
                            margin-top: 8px;
                            padding: 6px 12px;
                            background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                        ">View Analysis →</button>` : 
                        `<div style="margin-top: 8px; color: #9ca3af; font-size: 0.85rem;">Monitoring in progress</div>`
                    }
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(overviewMap);
        
        // Click to view details
        marker.on('click', function() {
            setTimeout(() => {
                showSiteDetails(site.name);
            }, 100);
        });
    });
    
    L.control.scale({imperial: false}).addTo(overviewMap);
}

// Load Port Fairy detailed content
function loadPortFairyContent() {
    const portFairyHTML = `
        <!-- Port Fairy Overview Section -->
        <section id="overview">
            <h2>Research Overview</h2>
            
            <div class="highlight-box">
                <h3>Port Fairy Bay Coastal Change Analysis</h3>
                <p style="font-size: 1.1rem; line-height: 1.8;">
                    This analysis showcases <strong>seven years of high-resolution coastal monitoring</strong> 
                    at Port Fairy Bay, Victoria, combining UAV photogrammetry with offshore wave measurements 
                    to understand how wave climate drives beach morphological change. The methodology demonstrates 
                    a scalable framework applicable to all Victorian Coastal Monitoring Program (VCMP) sites.
                </p>
            </div>
            
            <h3>Key Findings</h3>
            <div class="findings-grid">
                <div class="finding-card" style="border-left-color: var(--erosion);">
                    <h4 style="color: var(--erosion);">⚠️ Wave Control on Erosion</h4>
                    <p style="color: var(--text-secondary);">Strong negative correlation (r = -0.61, p < 0.001) between maximum wave height and beach elevation change demonstrates primary wave forcing control on coastal morphodynamics</p>
                </div>
                <div class="finding-card" style="border-left-color: var(--accent);">
                    <h4 style="color: var(--accent);">🏗️ Structure Impacts</h4>
                    <p style="color: var(--text-secondary);">Rock armour creates persistent erosional zones with 67% behavioral stability compared to 23% in natural beach sections</p>
                </div>
                <div class="finding-card" style="border-left-color: var(--primary);">
                    <h4 style="color: var(--primary);">📊 Cross-shore Gradients</h4>
                    <p style="color: var(--text-secondary);">Distinct elevation-dependent vulnerability patterns with intertidal regions showing highest sensitivity to wave forcing</p>
                </div>
            </div>
        </section>
        
        <!-- Study Stats Section -->
        <section id="study-stats">
            <h2>Study Characteristics</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📐</div>
                    <div class="stat-value">5.8 km</div>
                    <div class="stat-label">Coastal Extent</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🛸</div>
                    <div class="stat-value">54</div>
                    <div class="stat-label">UAV Surveys</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📍</div>
                    <div class="stat-value">227</div>
                    <div class="stat-label">Transects</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value">7 Years</div>
                    <div class="stat-label">Monitoring Period</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🌊</div>
                    <div class="stat-value">111,991</div>
                    <div class="stat-label">Wave Observations</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📏</div>
                    <div class="stat-value">±0.1 m</div>
                    <div class="stat-label">Vertical Accuracy</div>
                </div>
            </div>
        </section>
        
        <!-- Map Section -->
        <section id="map-section">
            <h2>Interactive Spatial Analysis</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Explore 227 cross-shore transects showing cumulative elevation change from March 2018 to May 2025. 
                Click on markers for detailed transect information.
            </p>
            <div id="map"></div>
            
            <div class="legend">
                <h4 style="color: var(--primary); margin-bottom: 0.8rem;">Elevation Change Classification</h4>
                <div class="legend-item">
                    <div class="legend-color" style="background: #1a9850;"></div>
                    <span>High Accretion (> +0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #91cf60;"></div>
                    <span>Moderate Accretion (+0.2 to +0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #fee08b;"></div>
                    <span>Stable (±0.2 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #fc8d59;"></div>
                    <span>Moderate Erosion (-0.2 to -0.5 m)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #d73027;"></div>
                    <span>High Erosion (< -0.5 m)</span>
                </div>
            </div>
        </section>
        
        <!-- Analytics Section -->
        <section id="analytics">
            <h2>Data Analytics Dashboard</h2>
            
            <h3>Mean Elevation Change Time Series</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Beach-wide average elevation change between consecutive surveys overlaid with maximum wave height.
            </p>
            <div class="chart-container">
                <canvas id="timeSeriesChart"></canvas>
            </div>
            
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>Spatial Distribution</h4>
                    <div style="height: 300px;">
                        <canvas id="spatialChart"></canvas>
                    </div>
                </div>
                <div class="analysis-card">
                    <h4>Cross-shore Zone Comparison</h4>
                    <div style="height: 300px;">
                        <canvas id="crossShoreChart"></canvas>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Wave Analysis Section -->
        <section id="wave-analysis">
            <h2>Wave-Morphology Correlation Analysis</h2>
            
            <div class="data-source">
                <strong>Wave Data Source:</strong> Sofar Spotter buoy (~3 km offshore, 28m depth)<br>
                <strong>Provider:</strong> <a href="https://auswaves.org/vic-waves/" target="_blank">AusWaves</a><br>
                <strong>Period:</strong> September 2018 - Present | 111,991 observations
            </div>
            
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>Wave Height vs Beach Change</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
                        Scatter plot showing correlation between maximum wave height and elevation change.
                    </p>
                    <div style="height: 350px;">
                        <canvas id="waveChart"></canvas>
                    </div>
                </div>
                <div class="analysis-card">
                    <h4>Wave Direction Distribution</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
                        Polar plot showing dominant wave approach directions (2018-2025).
                    </p>
                    <div style="height: 350px;">
                        <canvas id="waveRoseChart"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="info-box">
                <p><strong>Statistical Significance:</strong> Pearson correlation r = -0.61 (p < 0.001) indicates strong negative relationship between wave height and beach elevation.</p>
            </div>
        </section>
        
        <!-- Methodology Section -->
        <section id="methodology">
            <h2>Analytical Methodology</h2>
            
            <div class="methodology-flow">
                <h4 style="text-align: center; color: var(--primary); margin-bottom: 1rem;">Integrated Monitoring & Analysis Workflow</h4>
                <div class="flow-container">
                    <div class="flow-step">
                        <div class="flow-step-icon">🛸</div>
                        <strong>UAV Surveys</strong>
                        <p>DJI Phantom 4 RTK<br>Every 6-8 weeks</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="flow-step-icon">🗺️</div>
                        <strong>SfM Processing</strong>
                        <p>Agisoft Metashape<br>1m DEMs</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="flow-step-icon">🌊</div>
                        <strong>Wave Data</strong>
                        <p>Offshore buoy<br>Hsig, Tp, Dp</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="flow-step-icon">🐍</div>
                        <strong>Python Analysis</strong>
                        <p>MEC, BCD<br>Statistics</p>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step">
                        <div class="flow-step-icon">📊</div>
                        <strong>Visualization</strong>
                        <p>Interactive web<br>platform</p>
                    </div>
                </div>
            </div>
            
            <h3>Analysis Framework</h3>
            <ul class="method-list">
                <li><strong>Mean Elevation Change (MEC):</strong> Average elevation difference between consecutive surveys</li>
                <li><strong>Beachface Cluster Dynamics (BCD):</strong> Jenks classification of morphological states</li>
                <li><strong>Cross-shore Zonation:</strong> Offshore, mid-beach, and onshore vulnerability assessment</li>
                <li><strong>Wave Correlation:</strong> Integration with offshore wave buoy data (Hsig, Tp, Dp)</li>
            </ul>
            
            <h3>Python Analysis Pipeline</h3>
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>Core Libraries</h4>
                    <ul class="method-list">
                        <li><code>pandas</code> - Data manipulation</li>
                        <li><code>numpy</code> - Numerical computing</li>
                        <li><code>scipy</code> - Statistical analysis</li>
                    </ul>
                </div>
                <div class="analysis-card">
                    <h4>Geospatial Tools</h4>
                    <ul class="method-list">
                        <li><code>geopandas</code> - Spatial analysis</li>
                        <li><code>arcpy</code> - GIS automation</li>
                        <li><code>rasterio</code> - Raster processing</li>
                    </ul>
                </div>
                <div class="analysis-card">
                    <h4>Visualization</h4>
                    <ul class="method-list">
                        <li><code>matplotlib</code> - Statistical plots</li>
                        <li><code>seaborn</code> - Advanced viz</li>
                        <li><code>plotly</code> - Interactive figures</li>
                    </ul>
                </div>
            </div>
            
            <a href="https://github.com/npucino/sandpyper" class="btn" target="_blank">📦 View sandpyper Repository →</a>
            <a href="https://github.com/NuytsSiegmund/CoastWatch-VIC" class="btn btn-secondary" target="_blank">💻 View Analysis Code →</a>
        </section>
        
        <!-- Publication Section -->
        <section id="publication">
            <h2>Publication</h2>
            
            <div class="info-box" style="border-left-color: var(--secondary);">
                <h3 style="color: var(--text-primary); margin-top: 0;">Journal Article</h3>
                <p style="margin: 0.5rem 0;"><strong style="color: var(--primary);">Title:</strong> Cross-shore vulnerability gradients and rock armour impacts on sandy beach evolution</p>
                <p style="margin: 0.5rem 0;"><strong style="color: var(--primary);">Authors:</strong> Siegmund Nuyts, et al.</p>
                <p style="margin: 0.5rem 0;"><strong style="color: var(--primary);">Journal:</strong> Coastal Engineering (In Review)</p>
                <p style="margin: 0.5rem 0;"><strong style="color: var(--primary);">Study Period:</strong> 2018-2025 (54 UAV surveys)</p>
            </div>
            
            <h3>Research Impact & Scalability</h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                This research provides quantitative evidence for coastal management decision-making. The integrated monitoring and analytical framework is directly applicable to other VCMP sites, enabling statewide coastal vulnerability assessment across Victoria's 1,000+ km coastline.
            </p>
            
            <button class="btn" onclick="showOverview()" style="margin-top: 2rem;">← Back to Victoria Overview</button>
        </section>
    `;
    
    document.getElementById('site-details').innerHTML = portFairyHTML;
    
    // Initialize Port Fairy map and charts
    setTimeout(() => {
        initializeDetailMap();
        createTimeSeriesChart();
        createSpatialChart();
        createCrossShoreChart();
        createWaveChart();
        createWaveRoseChart();
    }, 100);
}

// Initialize detail map for Port Fairy
function initializeDetailMap() {
    if (detailMap) {
        detailMap.remove();
    }
    
    detailMap = L.map('map').setView(portFairyData.studyArea.center, portFairyData.studyArea.zoom);
    
    const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    darkMap.addTo(detailMap);
    
    // Function to get color based on elevation change
    function getColor(change) {
        if (change > 0.5) return '#1a9850';
        if (change > 0.2) return '#91cf60';
        if (change > -0.2) return '#fee08b';
        if (change > -0.5) return '#fc8d59';
        return '#d73027';
    }
    
    function getSize(change) {
        const magnitude = Math.abs(change);
        if (magnitude > 1.0) return 12;
        if (magnitude > 0.5) return 10;
        if (magnitude > 0.2) return 8;
        return 6;
    }
    
    // Add transect markers
    portFairyData.transects.forEach(transect => {
        const marker = L.circleMarker([transect.lat, transect.lon], {
            radius: getSize(transect.change),
            fillColor: getColor(transect.change),
            color: '#00d4ff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.7
        });
        
        const changeText = transect.change >= 0 ? 
            `+${transect.change.toFixed(2)}m (Accretion)` : 
            `${transect.change.toFixed(2)}m (Erosion)`;
        
        const popupContent = `
            <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 250px;">
                <h3 style="margin: 0 0 10px 0; color: #00d4ff;">Transect ${transect.id}</h3>
                <div><strong>Total Change (2018-2025):</strong></div>
                <div style="font-size: 1.2em; font-weight: bold; color: ${getColor(transect.change)};">
                    ${changeText}
                </div>
                <div style="margin-top: 8px;">
                    <strong>Cross-shore Zones:</strong><br>
                    Offshore: ${transect.offshoreChange >= 0 ? '+' : ''}${transect.offshoreChange.toFixed(2)}m<br>
                    Mid-beach: ${transect.midbeachChange >= 0 ? '+' : ''}${transect.midbeachChange.toFixed(2)}m<br>
                    Onshore: ${transect.onshoreChange >= 0 ? '+' : ''}${transect.onshoreChange.toFixed(2)}m
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(detailMap);
    });
    
    // Add wave buoy marker
    const buoyIcon = L.divIcon({
        className: 'wave-buoy-marker',
        html: '<div style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); width: 24px; height: 24px; border-radius: 50%; border: 3px solid #00d4ff; box-shadow: 0 0 15px rgba(0, 212, 255, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">⚓</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    const buoyMarker = L.marker([portFairyData.waveBuoy.lat, portFairyData.waveBuoy.lon], { icon: buoyIcon });
    buoyMarker.bindPopup(`
        <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #f59e0b;">⚓ ${portFairyData.waveBuoy.name}</h3>
            <div><strong>Depth:</strong> ${portFairyData.waveBuoy.depth}m</div>
            <div><strong>Distance:</strong> ~3 km offshore</div>
            <div style="margin-top: 8px;">
                <a href="${portFairyData.waveBuoy.source}" target="_blank" style="color: #00d4ff;">View Live Data →</a>
            </div>
        </div>
    `);
    buoyMarker.addTo(detailMap);
    
    L.control.scale({imperial: false}).addTo(detailMap);
}
