# Version 1.1.0 Quick Start Guide

## Prerequisites
- Node.js installed
- npm installed
- Python 3.x installed (for data generation)

## Installation & Running

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Generate Traffic Data (if needed)
```bash
cd data-simulator
python generate_traffic.py
# Data will be saved to ../data/simulated_traffic.json
# Copy to frontend if needed:
cp ../data/simulated_traffic.json ../frontend/public/data/
```

### 3. Run Development Server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal)

## New Features in v1.1.0

### 1. ISP Provider Information
- Each visitor now has a randomly assigned Philippine ISP provider
- Visible in map marker popups
- 13 ISP providers included: PLDT, Globe, Converge, Sky, DITO, Starlink, and more

### 2. Active Now Counter
- Real-time counter showing visitors active in the last 10 minutes
- Updates automatically based on timestamp
- Green indicator in statistics panel

### 3. Top Barangays Bar Chart
- Interactive bar chart showing top 10 barangays by visit count
- Hover tooltips for detailed information
- Responsive design using Chart.js

### 4. Peak Traffic Hour
- Automatically calculates and displays the hour with most traffic
- Shows time range and visit count
- Orange indicator in statistics panel

### 5. Trend Indicators
- Shows percentage increase/decrease in traffic
- Up/down arrows with color coding
- Compares current period to previous period of same duration

### 6. Last Updated Timestamp
- Shows when data was last refreshed or filtered
- Updates in real-time
- Located in control panel

### 7. Export to CSV
- Download filtered traffic data as CSV file
- Includes all fields: timestamp, barangay, IP, ISP, coordinates, address
- Green button in control panel

## Dashboard Components

### Control Panel
- Time filters: All, 1 Hour, 24 Hours, 7 Days
- Last Updated timestamp
- Show/Hide Markers toggle
- Show/Hide Heatmap toggle
- Export CSV button
- Refresh button

### Statistics Panel (4 cards)
1. **Total Visitors** - with trend indicator (↑/↓ percentage)
2. **Active Now** - visitors in last 10 minutes
3. **Peak Hour** - busiest hour with visit count
4. **Latest Visit** - most recent barangay and time

### Visualizations
1. **Top 10 Barangays Bar Chart** - interactive chart showing visit distribution
2. **Traffic Map** - interactive map with heatmap and markers
3. **Top 5 Barangays List** - detailed list with progress bars (below statistics)

## Usage Tips

### Filtering Data
1. Use time filters to view specific time periods
2. "Last Updated" timestamp shows when filter was applied
3. Trend indicator compares current period to previous period

### Map Interactions
- Click markers to view detailed visitor information including ISP
- Toggle heatmap to see density visualization
- Toggle markers to see individual visits
- Zoom and pan to explore different areas

### Exporting Data
1. Apply desired filters
2. Click "Export CSV" button
3. File downloads automatically with date in filename
4. Open in Excel, Google Sheets, or any CSV viewer

### Understanding Metrics
- **Active Now**: Visitors in last 10 minutes (real-time activity)
- **Peak Hour**: Hour with most traffic (based on filtered data)
- **Trend**: Percentage change vs. previous equivalent period
- **Top Barangays**: Ranked by visit count in filtered period

## Troubleshooting

### No data showing
- Check that `simulated_traffic.json` exists in `frontend/public/data/`
- Regenerate data using `python data-simulator/generate_traffic.py`
- Refresh the page

### Chart not displaying
- Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`
- Check browser console for errors
- Clear browser cache and refresh

### Export CSV not working
- Check browser's download settings
- Ensure pop-up blocker isn't blocking download
- Try a different browser

## File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx (main component, now with export & last updated)
│   │   ├── StatisticsPanel.jsx (enhanced with new metrics)
│   │   ├── BarangayBarChart.jsx (NEW - bar chart component)
│   │   ├── MapView.jsx (updated popup with ISP)
│   │   └── TimeFilter.jsx (unchanged)
│   ├── App.jsx
│   └── main.jsx
└── public/
    └── data/
        └── simulated_traffic.json (now includes ISP provider)

data-simulator/
└── generate_traffic.py (updated with ISP providers)
```

## API Endpoints (for production)
- `GET /api/traffic` - Fetch all traffic data
- Falls back to static file if API unavailable

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Regenerate traffic data
python data-simulator/generate_traffic.py
```

## Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Performance Notes
- All calculations use React useMemo for optimization
- Chart renders efficiently with Chart.js
- CSV export handles large datasets (tested up to 1000+ records)
- Map markers use clustering for better performance (future enhancement)

## Next Steps
1. Test all new features in your local environment
2. Verify data generation includes ISP providers
3. Test CSV export with different filters
4. Check responsive design on mobile devices
5. Deploy to production when ready

## Support
For issues or questions, please check:
- CHANGELOG_v1.1.0.md for detailed changes
- README.md for general project information
- DEPLOYMENT.md for deployment instructions

---

**Version 1.1.0** - Enhanced with ISP tracking, real-time metrics, analytics, and export capabilities
