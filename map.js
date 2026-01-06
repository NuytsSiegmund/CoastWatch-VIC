// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    // Create the map centered on Port Fairy
    const map = L.map('map').setView(portFairyData.studyArea.center, portFairyData.studyArea.zoom);
    
    // Dark satellite imagery
    const darkSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18,
        className: 'dark-tiles'
    });
    
    // Dark map tiles
    const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    // Add default layer
    darkMap.addTo(map);
    
    // Layer control
    const baseMaps = {
        "Dark Map": darkMap,
        "Satellite": darkSatellite
    };
    
    L.control.layers(baseMaps).addTo(map);
    
    // Function to get color based on elevation change
    function getColor(change) {
        if (change > 0.5) return '#1a9850';      // High accretion - dark green
        if (change > 0.2) return '#91cf60';      // Moderate accretion - light green
        if (change > -0.2) return '#fee08b';     // Stable - yellow
        if (change > -0.5) return '#fc8d59';     // Moderate erosion - orange
        return '#d73027';                        // High erosion - red
    }
    
    // Function to get size based on magnitude of change
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
        
        // Create popup content with dark theme
        const changeText = transect.change >= 0 ? 
            `+${transect.change.toFixed(2)}m (Accretion)` : 
            `${transect.change.toFixed(2)}m (Erosion)`;
        
        const popupContent = `
            <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 250px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #00d4ff; border-bottom: 1px solid #1f2937; padding-bottom: 5px;">Transect ${transect.id}</h3>
                <div style="display: grid; gap: 8px;">
                    <div><strong style="color: #9ca3af;">Orientation:</strong> ${transect.orientation}Â°</div>
                    <div><strong style="color: #9ca3af;">Total Change (2018-2025):</strong></div>
                    <div style="font-size: 1.2em; font-weight: bold; color: ${getColor(transect.change)};">
                        ${changeText}
                    </div>
                    <div style="border-top: 1px solid #1f2937; padding-top: 8px; margin-top: 4px;">
                        <strong style="color: #9ca3af;">Cross-shore Zones:</strong>
                        <div style="font-size: 0.9em; margin-top: 4px;">
                            Offshore: ${transect.offshoreChange >= 0 ? '+' : ''}${transect.offshoreChange.toFixed(2)}m<br>
                            Mid-beach: ${transect.midbeachChange >= 0 ? '+' : ''}${transect.midbeachChange.toFixed(2)}m<br>
                            Onshore: ${transect.onshoreChange >= 0 ? '+' : ''}${transect.onshoreChange.toFixed(2)}m
                        </div>
                    </div>
                    <div style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">
                        ${transect.lat.toFixed(5)}Â°S, ${transect.lon.toFixed(5)}Â°E
                    </div>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(map);
    });
    
    // Add wave buoy marker
    const buoyIcon = L.divIcon({
        className: 'wave-buoy-marker',
        html: `
            <div style="
                background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid #00d4ff;
                box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 16px;
            ">âš“</div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    const buoyMarker = L.marker([portFairyData.waveBuoy.lat, portFairyData.waveBuoy.lon], {
        icon: buoyIcon
    });
    
    const buoyPopup = `
        <div style="background: #131829; color: #e5e7eb; padding: 0.5rem; min-width: 280px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #f59e0b; border-bottom: 1px solid #1f2937; padding-bottom: 5px;">
                âš“ ${portFairyData.waveBuoy.name}
            </h3>
            <div style="display: grid; gap: 6px;">
                <div><strong style="color: #9ca3af;">Depth:</strong> ${portFairyData.waveBuoy.depth}m</div>
                <div><strong style="color: #9ca3af;">Distance:</strong> ~3 km offshore</div>
                <div><strong style="color: #9ca3af;">Data Provider:</strong> AusWaves</div>
                <div style="border-top: 1px solid #1f2937; padding-top: 8px; margin-top: 4px;">
                    <a href="${portFairyData.waveBuoy.source}" target="_blank" 
                       style="color: #00d4ff; text-decoration: none; font-weight: 600;">
                        View Live Data â†’
                    </a>
                </div>
                <div style="font-size: 0.85em; color: #6b7280; margin-top: 4px;">
                    ${portFairyData.waveBuoy.lat.toFixed(5)}Â°S, ${portFairyData.waveBuoy.lon.toFixed(5)}Â°E
                </div>
            </div>
        </div>
    `;
    
    buoyMarker.bindPopup(buoyPopup);
    buoyMarker.addTo(map);
    
    // Add study area boundary (approximate Port Fairy Bay)
    const bayBoundary = L.polygon([
        [-38.365, 142.238],
        [-38.365, 142.252],
        [-38.377, 142.252],
        [-38.377, 142.238]
    ], {
        color: '#1e3c72',
        weight: 2,
        fillColor: '#1e3c72',
        fillOpacity: 0.1,
        dashArray: '5, 10'
    }).addTo(map);
    
    bayBoundary.bindPopup('<strong>Port Fairy Bay Study Area</strong><br>~5.8 km coastal extent');
    
    // Add scale
    L.control.scale({imperial: false}).addTo(map);
    
    // Add north arrow (simple text)
    const northArrow = L.control({position: 'bottomright'});
    northArrow.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'north-arrow');
        div.innerHTML = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><strong style="font-size: 20px;">â†‘</strong><br><span style="font-size: 12px;">N</span></div>';
        return div;
    };
    northArrow.addTo(map);
}
