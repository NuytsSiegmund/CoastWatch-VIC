// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    // Create the map centered on Port Fairy
    const map = L.map('map').setView(portFairyData.studyArea.center, portFairyData.studyArea.zoom);
    
    // Add base layer - satellite imagery
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
    });
    
    // Add OpenStreetMap layer
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });
    
    // Add default layer
    satellite.addTo(map);
    
    // Layer control
    const baseMaps = {
        "Satellite": satellite,
        "Street Map": osm
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
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        // Create popup content
        const changeText = transect.change >= 0 ? 
            `+${transect.change.toFixed(2)}m (Accretion)` : 
            `${transect.change.toFixed(2)}m (Erosion)`;
        
        const changeClass = transect.change >= 0 ? 'accretion' : 'erosion';
        
        const popupContent = `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #1e3c72;">Transect ${transect.id}</h3>
                <p style="margin: 5px 0;"><strong>Orientation:</strong> ${transect.orientation}°</p>
                <p style="margin: 5px 0;"><strong>Total Change (2018-2025):</strong></p>
                <p style="font-size: 1.2em; font-weight: bold; color: ${getColor(transect.change)}; margin: 5px 0;">
                    ${changeText}
                </p>
                <p style="margin: 5px 0; font-size: 0.85em; color: #666;">
                    Location: ${transect.lat.toFixed(5)}°S, ${transect.lon.toFixed(5)}°E
                </p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(map);
    });
    
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
        div.innerHTML = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><strong style="font-size: 20px;">↑</strong><br><span style="font-size: 12px;">N</span></div>';
        return div;
    };
    northArrow.addTo(map);
}
