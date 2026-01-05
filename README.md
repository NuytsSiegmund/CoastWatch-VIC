# Port Fairy Coastal Change Analysis Website

Interactive website showcasing 7 years of UAV-based coastal monitoring at Port Fairy Bay, Victoria, Australia.

## Features

- **Interactive Map**: Leaflet-based map showing 220+ transect locations with elevation change data
- **Time Series Visualization**: Beach elevation changes across 54 survey campaigns (2018-2025)
- **Spatial Analysis**: Transect-by-transect elevation change patterns
- **Wave Correlation**: Relationship between wave conditions and morphological change
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (or create an account)
2. Click the "+" icon in the top right and select "New repository"
3. Name it something like `port-fairy-coastal-analysis`
4. Choose "Public" 
5. Don't initialize with README (we have our own files)
6. Click "Create repository"

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all these files:
   - `index.html`
   - `map.js`
   - `charts.js`
   - `data.js`
   - `README.md`
3. Scroll down and click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to the folder containing your website files
cd /path/to/your/website/files

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Port Fairy coastal analysis website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/port-fairy-coastal-analysis.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/ (root)"
6. Click "Save"

### Step 4: Access Your Website

After a few minutes, your website will be live at:
```
https://YOUR-USERNAME.github.io/port-fairy-coastal-analysis/
```

For example, if your GitHub username is "snuyts":
```
https://snuyts.github.io/port-fairy-coastal-analysis/
```

## Customization

### Adding Real Wave Data

Currently, the wave-morphology correlation chart uses simulated data. To add your real wave data:

1. Edit `data.js` and add a new `waveData` array with your wave measurements
2. Edit `charts.js` in the `createWaveChart()` function to use your actual data
3. Format: `{ date: 'YYYYMMDD', waveHeight: X.XX, direction: XXX, mec: X.XX }`

### Adding More Transects or Survey Data

1. Replace the `/mnt/user-data/uploads/Transects_Partly_Low_Sand_2.csv` file with your updated data
2. Re-run the Python script to regenerate `data.js`
3. Upload the new `data.js` to GitHub

### Styling Changes

All styling is in the `<style>` section of `index.html`. Key colors:
- Primary: `#1e3c72` (dark blue)
- Secondary: `#2a5298` (medium blue)
- Erosion: `#d73027` (red)
- Accretion: `#1a9850` (green)

## File Structure

```
port-fairy-coastal-analysis/
├── index.html       # Main website HTML
├── map.js          # Interactive map functionality
├── charts.js       # Chart visualizations
├── data.js         # Processed elevation and transect data
└── README.md       # This file
```

## Data Sources

- **Elevation Data**: UAV photogrammetry surveys (2018-2025)
- **Wave Data**: Sofar Spotter buoy (offshore Port Fairy)
- **Analysis**: Python-based coastal change detection using sandpyper package

## Technologies Used

- **Leaflet.js** - Interactive mapping
- **Chart.js** - Data visualization
- **GitHub Pages** - Free web hosting
- **Python** - Data processing and analysis

## Citation

If you use this website or methodology in your research, please cite:

```
Nuyts, S., et al. (2025). Cross-shore vulnerability gradients and rock armour 
impacts on sandy beach evolution. Coastal Engineering (In Review).
```

## License

This website is created for research and educational purposes. The code is available under MIT License.

## Contact

For questions about the research or website:
- Email: siegmund.nuyts@bushheritage.org.au
- GitHub: [Create an issue](https://github.com/YOUR-USERNAME/port-fairy-coastal-analysis/issues)

## Updates

To update the website after it's published:
1. Make changes to your local files
2. Commit and push to GitHub (or upload via web interface)
3. GitHub Pages will automatically rebuild and update your site within a few minutes

---

**Note**: This README assumes you have the processed data files. If you need to regenerate `data.js` from raw elevation data, use the provided Python script.
