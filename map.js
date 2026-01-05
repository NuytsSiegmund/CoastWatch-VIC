// Map instances
let overviewMap = null;
let detailMap = null;

// Sites configuration
const victorianSites = [
    {
        id: 'port-fairy',
        name: 'Port Fairy Bay',
        location: 'South-western Victoria',
        lat: -38.371,
        lon: 142.250,
        active: true,
        surveys: 54,
        period: '2018-2025'
    },
    {
        id: 'apollo-bay',
        name: 'Apollo Bay',
        location: 'Great Ocean Road',
        lat: -38.756,
        lon: 143.672,
        active: false
    },
    {
        id: 'point-lonsdale',
        name: 'Point Lonsdale',
        location: 'Bellarine Peninsula',
        lat: -38.291,
        lon: 144.606,
        active: false
    },
    {
        id: 'inverloch',
        name: 'Inverloch',
        location: 'South Gippsland',
        lat: -38.633,
        lon: 145.683,
        active: false
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initOverviewMap();
});

// Show overview
function showOverview() {
    document.getElementById('victoria-overview').classList.remove('hidden');
    document.getElementById('site-details').classList.add('hidden');
    document.getElementById('breadcrumb').classList.remove('active');
    
    // Destroy detail map and charts
    if (detailMap) {
        detailMap.remove();
        detailMap = null;
    }
    destroyAllCharts();
    
    // Refresh overview map
    if (overviewMap) {
        setTimeout(() => overviewMap.invalidateSize(), 100);
    }
}

// Show site details
function showSiteDetails(siteId) {
    const site = victorianSites.find(s => s.id === siteId);
    
    if (!site || !site.active) {
        alert(site ? `${site.name} coming soon!` : 'Site not found');
        return;
    }
    
    // Update breadcrumb
    document.getElementById('current-site-name').textContent = site.name;
    document.getElementById('breadcrumb').classList.add('active');
    
    // Switch views
    document.getElementById('victoria-overview').classList.add('hidden');
    document.getElementById('site-details').classList.remove('hidden');
    
    // Load site content
    loadSiteContent(site);
}

// Initialize overview map
function initOverviewMap() {
    overviewMap = L.map('overview-map').setView([-37.8, 144.9], 7);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    }).addTo(overviewMap);
    
    // Add site markers
    victorianSites.forEach(site => {
        const icon = L.divIcon({
            className: 'site-marker',
            html: `<div style="
                background: ${site.active ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' : '#6b7280'};
                width: ${site.active ? '24px' : '18px'};
                height: ${site.active ? '24px' : '18px'};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 15px ${site.active ? 'rgba(0, 212, 255, 0.6)' : 'rgba(107, 114, 128, 0.3)'};
                cursor: pointer;
            "></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([site.lat, site.lon], { icon: icon });
        
        marker.bindPopup(`
            <div style="background: #131829; color: #e5e7eb; padding: 0.75rem; min-width: 220px;">
                <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 1.1rem;">${site.name}</h3>
                <div style="font-size: 0.9rem; color: #9ca3af;">
                    ${site.location}<br>
                    ${site.active ? 
                        `<strong style="color: #10b981;">● Active</strong><br>
                         ${site.surveys} surveys | ${site.period}<br>
                         <button onclick="showSiteDetails('${site.id}')" 
                                 style="background: #00d4ff; color: #0a0e27; border: none; 
                                        padding: 0.5rem 1rem; border-radius: 4px; margin-top: 0.75rem; 
                                        cursor: pointer; font-weight: 600; width: 100%;">
                             View Details →
                         </button>` 
                        : '<strong style="color: #f59e0b;">⏱ Coming Soon</strong>'}
                </div>
            </div>
        `);
        
        if (site.active) {
            marker.on('click', () => showSiteDetails(site.id));
        }
        
        marker.addTo(overviewMap);
    });
}

// Load site content
function loadSiteContent(site) {
    const html = `
        <section>
            <h2>${site.name} | Coastal Change Analysis</h2>
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
                Explore transect locations and elevation changes. Click markers for detailed information.
            </p>
            <div id="map"></div>
            
            <div class="legend">
                <h4 style="color: #00d4ff; margin-bottom: 0.8rem;">Elevation Change Classification</h4>
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
                Individual and cumulative beach elevation change showing temporal erosion and accretion patterns.
            </p>
            <div class="chart-container">
                <canvas id="mecTimeSeriesChart"></canvas>
            </div>
            
            <h3>Where Change Happens Along the Coast</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Spatial distribution showing which areas are eroding, accreting, or remaining stable.
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
                Wave height directly controls whether beaches erode or build up.
            </p>
            <div class="chart-container">
                <canvas id="waveHeightChart"></canvas>
            </div>
            
            <div class="info-box">
                <p><strong>The Connection:</strong> Statistical analysis shows a strong relationship (r = 0.61, p < 0.001) between wave height and beach change. Higher waves cause erosion, while calmer periods allow beach recovery.</p>
            </div>
        </section>
    `;
    
    document.getElementById('site-details').innerHTML = html;
    
    // Initialize detail map and charts after DOM update
    setTimeout(() => {
        initDetailMap();
        createAllCharts();
    }, 100);
}

// Initialize detail map
function initDetailMap() {
    detailMap = L.map('map').setView(portFairyData.studyArea.center, portFairyData.studyArea.zoom);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    }).addTo(detailMap);
    
    // Add transects
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
        
        marker.bindPopup(`
            <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #00d4ff;">Transect ${transect.id}</h3>
                <div>
                    <strong style="color: #9ca3af;">Total Change (2018-2025):</strong><br>
                    <span style="font-size: 1.2em; font-weight: bold; color: ${getColor(transect.change)};">
                        ${changeText}
                    </span>
                </div>
            </div>
        `);
        
        marker.addTo(detailMap);
    });
    
    // Add wave buoy
    const buoyIcon = L.divIcon({
        className: 'wave-buoy',
        html: `<div style="background: linear-gradient(135deg, #f59e0b, #ef4444); width: 24px; height: 24px; border-radius: 50%; border: 3px solid #00d4ff; box-shadow: 0 0 15px rgba(0, 212, 255, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">⚓</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    L.marker([portFairyData.waveBuoy.lat, portFairyData.waveBuoy.lon], { icon: buoyIcon })
        .bindPopup(`
            <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #f59e0b;">⚓ ${portFairyData.waveBuoy.name}</h3>
                <div style="font-size: 0.9rem;">
                    <strong>Depth:</strong> ${portFairyData.waveBuoy.depth}m<br>
                    <a href="${portFairyData.waveBuoy.source}" target="_blank" style="color: #00d4ff;">View Live Data →</a>
                </div>
            </div>
        `)
        .addTo(detailMap);
}

// Helper functions
function getColor(change) {
    if (change > 0.5) return '#10b981';
    if (change > 0.2) return '#84cc16';
    if (change > -0.2) return '#fbbf24';
    if (change > -0.5) return '#f97316';
    return '#ef4444';
}

function getSize(change) {
    const mag = Math.abs(change);
    if (mag > 1.0) return 12;
    if (mag > 0.5) return 10;
    if (mag > 0.2) return 8;
    return 6;
}
