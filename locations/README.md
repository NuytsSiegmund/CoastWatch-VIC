# CoastWatch VIC - Location Files

This directory contains location-specific data and content for individual coastal monitoring sites.

## File Structure

Each location requires two files:

1. **`{location-id}-data.js`** - Contains the monitoring data
2. **`{location-id}-content.js`** - Contains HTML content and visualization functions

## Adding a New Location

To add a new coastal monitoring location, follow these steps:

### 1. Update data.js

Add the new site to the `victorianSites` array in `/data.js`:

```javascript
{
    "id": "your-site-id",          // Unique identifier (use kebab-case)
    "name": "Your Site Name",       // Display name
    "lat": -38.1234,               // Latitude
    "lon": 144.5678,               // Longitude
    "active": true,                 // Set to true when ready
    "surveys": 50,                  // Number of surveys conducted
    "firstSurvey": "2020",         // Year of first survey
    "coastlineKm": 3.5             // Coastline length in kilometers
}
```

### 2. Create Data File

Create `/locations/{your-site-id}-data.js`:

```javascript
const yourSiteData = {
    "timeSeriesData": [
        {
            "startDate": "20200101",
            "endDate": "20200201",
            "mec": -0.15,  // Mean elevation change
            "maxWaveHeight": 5.2,
            "p99WaveHeight": 4.8,
            "meanWaveHeight": 2.1
        }
        // ... more time series data
    ],
    "transects": [
        {
            "id": 1,
            "lat": -38.1234,
            "lon": 144.5678,
            "change": -0.25,      // Total elevation change
            "orientation": 120     // Transect bearing
        }
        // ... more transects
    ],
    "studyArea": {
        "center": [-38.1234, 144.5678],  // Map center coordinates
        "zoom": 14                        // Default zoom level
    },
    "waveBuoy": {
        "lat": -38.1234,
        "lon": 144.5678,
        "name": "Your Wave Buoy Name",
        "depth": 25,
        "source": "https://wave-data-source.com"
    },
    "stats": {
        "numTransects": 150,
        "numSurveys": 50,
        "timeSpan": "20200101-20250101",
        "avgChange": -0.20
    }
};
```

### 3. Create Content File

Create `/locations/{your-site-id}-content.js`:

```javascript
/**
 * Generates HTML content for your site
 */
function getYourSiteHTML(site) {
    return `
        <section>
            <h2>${site.name} | Coastal Change Analysis</h2>
            <!-- Your custom HTML content here -->
        </section>
    `;
}

/**
 * Creates charts for your site
 */
function createYourSiteCharts() {
    // Create your custom charts here
    // Use the global chartInstances array to track charts
}
```

### 4. Update map.js (if needed)

If your location uses different function names, update the `loadSiteContent()` function in `/map.js` to handle your site:

```javascript
// In the contentScript.onload callback
if (site.id === 'your-site-id' && typeof getYourSiteHTML === 'function') {
    const html = getYourSiteHTML(site);
    // ... rest of the code
}
```

### 5. Test Your Location

1. Open the website in a browser
2. Click on your site marker
3. Verify data loads correctly
4. Check that charts display properly
5. Test navigation back to overview

## Example: Port Fairy

See the existing Port Fairy files as a reference:
- `/locations/port-fairy-data.js` - Complete data structure
- `/locations/port-fairy-content.js` - HTML generation and chart functions

## Best Practices

1. **Data Format**: Use consistent date format (YYYYMMDD)
2. **File Naming**: Use kebab-case for file names
3. **Function Naming**: Use clear, descriptive function names
4. **Documentation**: Add comments explaining complex data structures
5. **Testing**: Test on multiple browsers and devices
6. **Performance**: Keep data files under 500KB when possible

## Chart Integration

All charts must use the global `chartInstances` array:

```javascript
const chart = new Chart(ctx, {...});
chartInstances.push(chart);  // Important for cleanup
```

This ensures charts are properly destroyed when navigating away.

## Questions or Issues?

Contact the development team or open an issue on GitHub.
