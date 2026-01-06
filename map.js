// Map instances
let overviewMap = null;
let detailMap = null;

// Sites configuration - All VCMP monitoring locations
const victorianSites = [
    {
        "id": "port-fairy",
        "name": "Port Fairy",
        "lat": -38.3750687,
        "lon": 142.245636,
        "active": true,
        "surveys": 69,
        "firstSurvey": "2018",
        "coastlineKm": 5.6
    },
    {
        "id": "inverloch",
        "name": "Inverloch",
        "lat": -38.6369057,
        "lon": 145.7277069,
        "active": false,
        "surveys": 69,
        "firstSurvey": "2018",
        "coastlineKm": 2.8
    },
    {
        "id": "cowes",
        "name": "Cowes",
        "lat": -38.4479675,
        "lon": 145.2403107,
        "active": false,
        "surveys": 58,
        "firstSurvey": "2018",
        "coastlineKm": 4.2
    },
    {
        "id": "anglesea---demons-bluff",
        "name": "Anglesea - Demons Bluff",
        "lat": -38.4068336,
        "lon": 144.1994629,
        "active": false,
        "surveys": 61,
        "firstSurvey": "2018",
        "coastlineKm": 2.6
    },
    {
        "id": "portarlington",
        "name": "Portarlington",
        "lat": -38.1131058,
        "lon": 144.6522217,
        "active": false,
        "surveys": 50,
        "firstSurvey": "2018",
        "coastlineKm": 4.7
    },
    {
        "id": "aireys-inlet",
        "name": "Aireys Inlet",
        "lat": -38.4608727,
        "lon": 144.1105194,
        "active": false,
        "surveys": 9,
        "firstSurvey": "2022",
        "coastlineKm": 3.0
    },
    {
        "id": "altona",
        "name": "Altona",
        "lat": -37.8706856,
        "lon": 144.8294678,
        "active": false,
        "surveys": 30,
        "firstSurvey": "2022",
        "coastlineKm": 3.3
    },
    {
        "id": "altona-coastal-park",
        "name": "Altona Coastal Park",
        "lat": -37.8604698,
        "lon": 144.8632812,
        "active": false,
        "surveys": 6,
        "firstSurvey": "2024",
        "coastlineKm": 1.2
    },
    {
        "id": "anglesea---point-roadknight",
        "name": "Anglesea - Point Roadknight",
        "lat": -38.4183807,
        "lon": 144.1810608,
        "active": false,
        "surveys": 60,
        "firstSurvey": "2018",
        "coastlineKm": 2.3
    },
    {
        "id": "apollo-bay",
        "name": "Apollo Bay",
        "lat": -38.7482643,
        "lon": 143.6710815,
        "active": false,
        "surveys": 86,
        "firstSurvey": "2018",
        "coastlineKm": 3.6
    },
    {
        "id": "bells-beach",
        "name": "Bells Beach",
        "lat": -38.3752747,
        "lon": 144.2708893,
        "active": false,
        "surveys": 22,
        "firstSurvey": "2022",
        "coastlineKm": 3.6
    },
    {
        "id": "blairgowrie",
        "name": "Blairgowrie",
        "lat": -38.3566513,
        "lon": 144.7676086,
        "active": false,
        "surveys": 35,
        "firstSurvey": "2020",
        "coastlineKm": 3.7
    },
    {
        "id": "dromana-mccrae",
        "name": "Dromana/McCrae",
        "lat": -38.3404884,
        "lon": 144.946579,
        "active": false,
        "surveys": 37,
        "firstSurvey": "2020",
        "coastlineKm": 3.5
    },
    {
        "id": "eastern-view",
        "name": "Eastern View",
        "lat": -38.470211,
        "lon": 144.0600891,
        "active": false,
        "surveys": 26,
        "firstSurvey": "2021",
        "coastlineKm": 6.6
    },
    {
        "id": "flinders",
        "name": "Flinders",
        "lat": -38.4772873,
        "lon": 145.0257263,
        "active": false,
        "surveys": 11,
        "firstSurvey": "2022",
        "coastlineKm": 2.6
    },
    {
        "id": "frankston",
        "name": "Frankston",
        "lat": -38.1503868,
        "lon": 145.1136932,
        "active": false,
        "surveys": 1,
        "firstSurvey": "2018",
        "coastlineKm": 0.3
    },
    {
        "id": "intented-head",
        "name": "Intented Head",
        "lat": -38.1228065,
        "lon": 144.6948547,
        "active": false,
        "surveys": 1,
        "firstSurvey": "2022",
        "coastlineKm": 3.5
    },
    {
        "id": "jan-juc",
        "name": "Jan Juc",
        "lat": -38.3507042,
        "lon": 144.3000488,
        "active": false,
        "surveys": 15,
        "firstSurvey": "2021",
        "coastlineKm": 3.0
    },
    {
        "id": "kennett-river",
        "name": "Kennett River",
        "lat": -38.6682129,
        "lon": 143.8634644,
        "active": false,
        "surveys": 13,
        "firstSurvey": "2021",
        "coastlineKm": 1.0
    },
    {
        "id": "killarney",
        "name": "Killarney",
        "lat": -38.3568039,
        "lon": 142.3132019,
        "active": false,
        "surveys": 2,
        "firstSurvey": "2014",
        "coastlineKm": 1.5
    },
    {
        "id": "lorne",
        "name": "Lorne",
        "lat": -38.5408478,
        "lon": 143.9770508,
        "active": false,
        "surveys": 13,
        "firstSurvey": "2021",
        "coastlineKm": 4.0
    },
    {
        "id": "marengo",
        "name": "Marengo",
        "lat": -38.7717857,
        "lon": 143.6646423,
        "active": false,
        "surveys": 66,
        "firstSurvey": "2018",
        "coastlineKm": 3.0
    },
    {
        "id": "mornington---beleura-cliff",
        "name": "Mornington - Beleura Cliff",
        "lat": -38.2032661,
        "lon": 145.0581055,
        "active": false,
        "surveys": 3,
        "firstSurvey": "2022",
        "coastlineKm": 1.5
    },
    {
        "id": "mornington---fishermans-beach",
        "name": "Mornington - Fishermans Beach",
        "lat": -38.2243195,
        "lon": 145.0308685,
        "active": false,
        "surveys": 3,
        "firstSurvey": "2022",
        "coastlineKm": 1.0
    },
    {
        "id": "mornington---shire-hall-beach",
        "name": "Mornington - Shire Hall Beach",
        "lat": -38.2146378,
        "lon": 145.0368805,
        "active": false,
        "surveys": 2,
        "firstSurvey": "2022",
        "coastlineKm": 0.9
    },
    {
        "id": "mount-eliza",
        "name": "Mount Eliza",
        "lat": -38.1675529,
        "lon": 145.0861359,
        "active": false,
        "surveys": 11,
        "firstSurvey": "2022",
        "coastlineKm": 5.2
    },
    {
        "id": "mount-martha",
        "name": "Mount Martha",
        "lat": -38.2676048,
        "lon": 145.0119171,
        "active": false,
        "surveys": 49,
        "firstSurvey": "2019",
        "coastlineKm": 2.6
    },
    {
        "id": "ocean-grove",
        "name": "Ocean Grove",
        "lat": -38.2715683,
        "lon": 144.5236511,
        "active": false,
        "surveys": 55,
        "firstSurvey": "2019",
        "coastlineKm": 3.7
    },
    {
        "id": "patterson-river",
        "name": "Patterson River",
        "lat": -38.0723991,
        "lon": 145.1199646,
        "active": false,
        "surveys": 33,
        "firstSurvey": "2021",
        "coastlineKm": 3.4
    },
    {
        "id": "point-impossible",
        "name": "Point Impossible",
        "lat": -38.3034286,
        "lon": 144.3787384,
        "active": false,
        "surveys": 10,
        "firstSurvey": "2019",
        "coastlineKm": 1.4
    },
    {
        "id": "point-lonsdale-queenscliff",
        "name": "Point Lonsdale/Queenscliff",
        "lat": -38.2745667,
        "lon": 144.6244965,
        "active": false,
        "surveys": 57,
        "firstSurvey": "2018",
        "coastlineKm": 3.5
    },
    {
        "id": "portland---dutton-way",
        "name": "Portland - Dutton Way",
        "lat": -38.2900314,
        "lon": 141.6412048,
        "active": false,
        "surveys": 47,
        "firstSurvey": "2018",
        "coastlineKm": 5.5
    },
    {
        "id": "portsea",
        "name": "Portsea",
        "lat": -38.3191338,
        "lon": 144.7153473,
        "active": false,
        "surveys": 22,
        "firstSurvey": "2022",
        "coastlineKm": 3.4
    },
    {
        "id": "rye",
        "name": "Rye",
        "lat": -38.3698349,
        "lon": 144.825531,
        "active": false,
        "surveys": 8,
        "firstSurvey": "2022",
        "coastlineKm": 3.2
    },
    {
        "id": "sandringham",
        "name": "Sandringham",
        "lat": -37.9523888,
        "lon": 145.0032806,
        "active": false,
        "surveys": 34,
        "firstSurvey": "2020",
        "coastlineKm": 3.1
    },
    {
        "id": "sandy-point",
        "name": "Sandy Point",
        "lat": -37.847393,
        "lon": 144.8964386,
        "active": false,
        "surveys": 6,
        "firstSurvey": "2024",
        "coastlineKm": 0.8
    },
    {
        "id": "seaspray",
        "name": "Seaspray",
        "lat": -38.3776932,
        "lon": 147.1900482,
        "active": false,
        "surveys": 52,
        "firstSurvey": "2018",
        "coastlineKm": 3.2
    },
    {
        "id": "skenes-creek",
        "name": "Skenes Creek",
        "lat": -38.7251892,
        "lon": 143.7122803,
        "active": false,
        "surveys": 2,
        "firstSurvey": "2018",
        "coastlineKm": 2.4
    },
    {
        "id": "st-leonards",
        "name": "St Leonards",
        "lat": -38.1592064,
        "lon": 144.716095,
        "active": false,
        "surveys": 58,
        "firstSurvey": "2018",
        "coastlineKm": 3.2
    },
    {
        "id": "summerlands-beach",
        "name": "Summerlands Beach",
        "lat": -38.5093765,
        "lon": 145.1541138,
        "active": false,
        "surveys": 12,
        "firstSurvey": "2017",
        "coastlineKm": 1.7
    },
    {
        "id": "torquay",
        "name": "Torquay",
        "lat": -38.3266945,
        "lon": 144.3281708,
        "active": false,
        "surveys": 19,
        "firstSurvey": "2019",
        "coastlineKm": 3.8
    },
    {
        "id": "walkerville",
        "name": "Walkerville",
        "lat": -38.8458061,
        "lon": 145.9983521,
        "active": false,
        "surveys": 13,
        "firstSurvey": "2022",
        "coastlineKm": 2.7
    },
    {
        "id": "warrnambool",
        "name": "Warrnambool",
        "lat": -38.3938942,
        "lon": 142.4815674,
        "active": false,
        "surveys": 67,
        "firstSurvey": "2014",
        "coastlineKm": 4.1
    },
    {
        "id": "wye-river",
        "name": "Wye River",
        "lat": -38.6354446,
        "lon": 143.8924103,
        "active": false,
        "surveys": 25,
        "firstSurvey": "2021",
        "coastlineKm": 1.9
    }
];

// Calculate statistics
const siteStats = {
    totalSites: 44,
    activeSites: 1,
    inDevelopment: 43,
    totalSurveys: 1328,
    totalCoastline: 131.8
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing overview map...');
    console.log('Victorian sites loaded:', victorianSites ? victorianSites.length : 'undefined');
    
    if (typeof victorianSites === 'undefined') {
        console.error('ERROR: victorianSites not defined!');
        return;
    }
    
    try {
        initOverviewMap();
        console.log('Overview map initialized successfully');
    } catch (error) {
        console.error('Error initializing overview map:', error);
    }
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
    console.log('Creating overview map...');
    // Center on Victoria, zoom to show all sites
    overviewMap = L.map('overview-map').setView([-37.8, 143.5], 6);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    }).addTo(overviewMap);
    
    console.log(`Adding ${victorianSites.length} site markers...`);
    
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
            <div style="background: #131829; color: #e5e7eb; padding: 0.75rem; min-width: 240px;">
                <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 1.1rem;">${site.name}</h3>
                <div style="font-size: 0.9rem; color: #9ca3af; line-height: 1.6;">
                    ${site.active ? 
                        `<strong style="color: #10b981;">● Full Analysis Available</strong><br>
                         <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #1f2937;">
                         <strong>Surveys:</strong> ${site.surveys}<br>
                         <strong>Coastline:</strong> ${site.coastlineKm} km<br>
                         <strong>Period:</strong> ${site.firstSurvey} - 2025
                         </div>
                         <button onclick="showSiteDetails('${site.id}')" 
                                 style="background: #00d4ff; color: #0a0e27; border: none; 
                                        padding: 0.5rem 1rem; border-radius: 4px; margin-top: 0.75rem; 
                                        cursor: pointer; font-weight: 600; width: 100%;">
                             View Full Analysis →
                         </button>` 
                        : `<strong style="color: #f59e0b;">⏱ Monitoring Active</strong><br>
                           <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #1f2937;">
                           <strong>Surveys:</strong> ${site.surveys}<br>
                           <strong>Coastline:</strong> ${site.coastlineKm} km<br>
                           <strong>Since:</strong> ${site.firstSurvey}
                           </div>
                           <p style="margin-top: 0.75rem; font-size: 0.85rem; font-style: italic;">
                           Detailed analysis coming soon
                           </p>`}
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
            
            <h3>Site Overview</h3>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
                Port Fairy Bay represents a critical case study in understanding how sandy beaches respond to climate-driven pressures and coastal engineering interventions. Seven years of high-resolution monitoring (2018–2025) reveal complex patterns of vulnerability that vary across the beach profile, with important implications for coastal management under accelerating sea level rise.
            </p>
            
            <div class="info-box">
                <p style="margin-bottom: 1rem;"><strong>Cross-Shore Vulnerability Gradient:</strong> Our analysis identifies distinct behavioral zones across the beach profile. Supratidal areas (above 0.47 m AHD) experience persistent erosion strongly driven by extreme wave conditions, while lower intertidal zones remain more stable. This elevation-dependent vulnerability means that different parts of the beach face different levels of climate risk.</p>
                
                <p style="margin-bottom: 1rem;"><strong>Wave Forcing Thresholds:</strong> Statistical analysis reveals that wave heights exceeding 4.6 m mark a critical threshold—below this, beaches tend to accrete; above it, erosion dominates. When extreme waves persist for more than 30 hours, upper beach elevations can drop by over 40 cm in a single event. Understanding these thresholds enables early warning and proactive response.</p>
                
                <p style="margin-bottom: 1rem;"><strong>Impacts of Rock Armour:</strong> Coastal protection structures at Port Fairy demonstrate how hard engineering can disrupt natural sediment transport. Rock armour creates zones of persistent erosion extending up to 200 m along the coast and shifts sand from upper to lower beach areas. Under projected sea level rise, these effects will intensify as structures prevent beaches from naturally retreating landward—a phenomenon known as "coastal squeeze."</p>
                
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
                <p><strong>Statistical Significance:</strong> Analysis reveals strong negative correlation between wave height and beach elevation (supratidal: r = -0.714, p < 0.001; intertidal: r = -0.301, p = 0.038). When wave heights exceed 4.6 m for more than 30 hours, upper beach areas experience erosion exceeding 40 cm. These thresholds provide quantitative triggers for coastal hazard response.</p>
            </div>
        </section>
        
        <section>
            <h2>Scientific Studies</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Research publications based on Port Fairy Bay monitoring data.
            </p>
            
            <div style="background: var(--darker-bg); border: 1px solid var(--border); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary); font-size: 1.2rem; margin-top: 0;">Cross-shore vulnerability gradients and rock armour impacts on sandy beach evolution</h3>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Authors:</strong> Siegmund Nuyts, et al.</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Journal:</strong> Coastal Engineering (In Review, 2025)</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;"><strong>Study Period:</strong> 2018-2025 (54 UAV surveys)</p>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-top: 1rem;">
                    This study quantifies elevation-specific vulnerability patterns across seven years of high-resolution monitoring, revealing how supratidal zones face greater erosion risk than intertidal areas. We identify a 4.6 m wave height threshold that controls erosion/accretion transitions and demonstrate how rock armour structures create persistent downdrift erosion zones extending up to 200 m. The research provides transferable quantitative frameworks for early warning systems and evidence-based coastal management under climate change.
                </p>
            </div>
            
            <p style="color: var(--text-secondary); font-style: italic;">
                Additional publications will be listed here as research continues at Port Fairy and other VCMP monitoring sites.
            </p>
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
    if (typeof portFairyData === 'undefined') {
        console.error('ERROR: portFairyData not loaded!');
        document.getElementById('map').innerHTML = '<div style="padding: 2rem; text-align: center; color: #ef4444;">Error: Data not loaded. Please refresh the page.</div>';
        return;
    }
    
    console.log('Initializing detail map for Port Fairy...');
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
