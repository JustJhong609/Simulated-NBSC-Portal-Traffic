# 🗺️ NBSC Portal Traffic Dashboard

**IP Geolocation and Reverse Geocoding Dashboard for Simulated NBSC Portal Traffic**

A data visualization prototype using BigDataCloud APIs to display simulated visitor traffic for Northern Bukidnon State College (NBSC) online portal, focused on Manolo Fortich, Bukidnon.

## 🌐 Live Demo

**[View Live Dashboard](https://JustJhong609.github.io/Simulated-NBSC-Portal-Traffic/)**

---

## 📋 Project Overview

### Title
IP Geolocation and Reverse Geocoding Dashboard for Simulated NBSC Portal Traffic  
*(A Data Visualization Prototype using BigDataCloud APIs)*

### Scope
- Simulates visitor traffic data for the NBSC online portal
- Focused exclusively on users located within **Manolo Fortich, Bukidnon**
- Utilizes mock datasets of IP addresses and coordinates for various barangays
- Integrates BigDataCloud's IP Geolocation and Reverse Geocoding APIs
- Interactive dashboard featuring:
  - Real-time world map centered on Bukidnon region
  - Heatmaps of visitor concentration
  - Drill-down details (click on region → view geolocation and address)
  - Time-based filters (Last Hour, 24 Hours, 7 Days, All Time)
  - Statistics panel with key metrics

### Limitations
- Uses **simulated/mock data** instead of actual NBSC portal traffic
- Restricted to Manolo Fortich municipality only
- Accuracy depends on BigDataCloud API
- No authentication or user privacy management
- **For demonstration purposes only** — not for production deployment

---

## 🎯 Objectives

### Primary Objective
Design and develop a prototype dashboard that visualizes simulated IP-based traffic for the NBSC online portal using BigDataCloud APIs.

### Specific Objectives
1. Generate mock traffic datasets localized to Manolo Fortich barangays
2. Apply IP Geolocation and Reverse Geocoding for location identification
3. Build interactive map and heatmap to represent visitor distribution
4. Enable region drill-down with detailed address and geolocation info
5. Demonstrate potential of data visualization for digital service monitoring

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Mapping**: Leaflet.js with React-Leaflet
- **Heatmap**: Leaflet.heat plugin
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Backend
- **Server**: Node.js with Express
- **API Integration**: BigDataCloud APIs
- **Environment**: dotenv for configuration

### Data Simulation
- **Language**: Python 3
- **Libraries**: Built-in JSON, datetime (optional: Pandas, Faker)

### External APIs
- **BigDataCloud**: IP Geolocation & Reverse Geocoding API
- API Key: `bdc_a7726c310b0d4a08be3452e8808f5b5e`

---

## 📁 Project Structure

```
Simulated-NBSC-Portal-Traffic/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── StatisticsPanel.jsx
│   │   │   └── TimeFilter.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                  # Express API server
│   ├── routes/
│   │   └── traffic.js
│   ├── services/
│   │   └── trafficService.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── data-simulator/           # Python traffic generator
│   ├── generate_traffic.py
│   └── requirements.txt
├── data/                     # Generated data files
│   └── simulated_traffic.json
├── package.json              # Root package.json
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ (for data simulation)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/JustJhong609/Simulated-NBSC-Portal-Traffic.git
cd Simulated-NBSC-Portal-Traffic
```

### Step 2: Install Dependencies
```bash
# Install all dependencies (root, frontend, backend)
npm run install:all
```

### Step 3: Generate Simulated Data
```bash
# Run Python script to generate traffic data
npm run simulate

# Or manually:
cd data-simulator
python3 generate_traffic.py
cd ..
```

This creates `data/simulated_traffic.json` with 150 sample records.

### Step 4: Configure Environment
The `.env` file in `/backend/` is already configured with:
```env
PORT=5000
BIGDATACLOUD_API_KEY=bdc_a7726c310b0d4a08be3452e8808f5b5e
```

### Step 5: Run the Application
```bash
# Start both frontend and backend concurrently
npm run dev
```

**OR** run separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Step 6: Access the Dashboard
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/traffic

---

## 🚀 Deployment to GitHub Pages

### Quick Deploy
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Automated Deployment
Every push to the `main` branch automatically deploys via GitHub Actions.

### Important Notes
- The live site uses **static data** from `simulated_traffic.json`
- Backend API is not available on GitHub Pages (static hosting only)
- For full functionality with live backend, see [DEPLOYMENT.md](DEPLOYMENT.md)

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

---

## 🎨 Features

### 1. Interactive Map
- Centered on Manolo Fortich, Bukidnon
- OpenStreetMap tiles
- Clickable markers for each visitor
- Circle overlays showing approximate locations

### 2. Heatmap Layer
- Toggle on/off via checkbox
- Color-coded intensity (blue → green → yellow → red)
- Shows visitor concentration hotspots

### 3. Statistics Panel
- **Total Visitors**: Overall count
- **Unique Barangays**: Number of barangays with traffic
- **Top Barangay**: Most visited location
- **Latest Visit**: Most recent activity
- **Top 5 Barangays**: Bar chart with visit counts

### 4. Time Filters
- All Time
- Last Hour
- Last 24 Hours
- Last 7 Days

### 5. Marker Details (Popup)
- Barangay name
- IP address
- Full address
- GPS coordinates (latitude/longitude)
- Timestamp

---

## 🧪 Data Simulation

The Python script `generate_traffic.py` creates realistic traffic data:

### Included Barangays
- Poblacion
- Dalirig
- San Miguel
- Dahilayan
- Lindaban
- Tankulan
- Maluko
- Mambatangan
- Kalugmanan
- Sankanan

### Data Fields
```json
{
  "ip_address": "192.168.X.X",
  "barangay": "Poblacion",
  "latitude": 8.3667,
  "longitude": 124.8667,
  "address": "Poblacion, Manolo Fortich, Bukidnon, Philippines",
  "timestamp": "2025-10-01T10:30:45.123Z"
}
```

### Regenerate Data
```bash
npm run simulate
```

---

## 🔌 API Endpoints

### Backend Routes

#### GET `/api/traffic`
Fetch all simulated traffic data
```bash
curl http://localhost:5000/api/traffic
```

#### POST `/api/traffic/enrich`
Enrich an IP address with geolocation
```bash
curl -X POST http://localhost:5000/api/traffic/enrich \
  -H "Content-Type: application/json" \
  -d '{"ip": "8.8.8.8"}'
```

#### GET `/api/health`
Health check endpoint
```bash
curl http://localhost:5000/api/health
```

---

## 📊 BigDataCloud API Integration

### IP Geolocation API
```
GET https://api.bigdatacloud.net/data/ip-geolocation?ip={IP}&key={API_KEY}
```

### Reverse Geocoding API
```
GET https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={LAT}&longitude={LNG}
```

---

## 🎯 Goals

1. Provide NBSC with a conceptual framework for monitoring portal usage
2. Highlight location-based analytics for resource allocation
3. Support internet infrastructure planning strategies
4. Demonstrate API integration and data visualization capabilities
5. Serve as proof-of-concept for academic projects

---

## 🚧 Future Enhancements

- [ ] Real-time data updates via WebSockets
- [ ] Export data as CSV/PDF reports
- [ ] User authentication and admin panel
- [ ] Historical trend analysis graphs
- [ ] Mobile-responsive design improvements
- [ ] Integration with actual NBSC portal logs
- [ ] Advanced filtering (by barangay, IP range, etc.)
- [ ] Dark mode toggle

---

## 📝 License

MIT License - Feel free to use this project for educational purposes.

---

## 👨‍💻 Developer

**Northern Bukidnon State College**  
Data Visualization Prototype Project

---

## 🙏 Acknowledgments

- **BigDataCloud** for providing free geolocation APIs
- **Leaflet.js** for excellent mapping library
- **OpenStreetMap** contributors for map tiles
- **NBSC** for project inspiration

---

## 📞 Support

For questions or issues, please create an issue in the GitHub repository.

---

**Built with ❤️ for NBSC Digital Innovation**