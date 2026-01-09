// Map instances
let overviewMap = null;
let detailMap = null;

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

        // Add breadcrumb click listener
        const breadcrumbLink = document.getElementById('breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', showOverview);
        }
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
                         <button id="view-analysis-${site.id}"
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

        // Add event listener to button inside popup (after popup opens)
        if (site.active) {
            marker.on('popupopen', () => {
                const button = document.getElementById(`view-analysis-${site.id}`);
                if (button) {
                    button.addEventListener('click', () => showSiteDetails(site.id));
                }
            });
        }

        marker.addTo(overviewMap);
    });
}

// Load site content - dynamically loads location-specific files
function loadSiteContent(site) {
    // Dynamically load location-specific data and content
    const dataScript = document.createElement('script');
    const contentScript = document.createElement('script');

    dataScript.src = `locations/${site.id}-data.js`;
    contentScript.src = `locations/${site.id}-content.js`;

    dataScript.onerror = () => {
        console.error(`Failed to load data for ${site.id}`);
        document.getElementById('site-details').innerHTML = `
            <section>
                <h2>Error Loading Site Data</h2>
                <p style="color: var(--text-secondary);">Unable to load data for ${site.name}. Please try again later.</p>
            </section>
        `;
    };

    contentScript.onerror = () => {
        console.error(`Failed to load content for ${site.id}`);
    };

    // Load data first, then content
    dataScript.onload = () => {
        console.log(`Data loaded for ${site.id}`);
        contentScript.onload = () => {
            console.log(`Content loaded for ${site.id}`);

            // Call location-specific HTML generator
            if (typeof getPortFairyHTML === 'function') {
                const html = getPortFairyHTML(site);
                document.getElementById('site-details').innerHTML = html;

                // Add back button event listener
                const backButton = document.getElementById('back-to-home');
                if (backButton) {
                    backButton.addEventListener('click', showOverview);
                    // Add hover effect
                    backButton.addEventListener('mouseenter', function() {
                        this.style.background = 'var(--primary)';
                        this.style.color = 'var(--dark-bg)';
                    });
                    backButton.addEventListener('mouseleave', function() {
                        this.style.background = 'var(--card-bg)';
                        this.style.color = 'var(--primary)';
                    });
                }

                // Initialize detail map and charts after DOM update
                setTimeout(() => {
                    initDetailMap();
                    if (typeof createPortFairyCharts === 'function') {
                        createPortFairyCharts();
                    }
                }, 100);
            }
        };
        document.head.appendChild(contentScript);
    };

    document.head.appendChild(dataScript);
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
