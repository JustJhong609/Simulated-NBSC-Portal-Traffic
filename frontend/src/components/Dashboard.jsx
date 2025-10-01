import { useState, useEffect } from 'react'
import MapView from './MapView'
import StatisticsPanel from './StatisticsPanel'
import TimeFilter from './TimeFilter'
import axios from 'axios'

const Dashboard = () => {
  const [trafficData, setTrafficData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState('all')
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [showMarkers, setShowMarkers] = useState(true)

  useEffect(() => {
    fetchTrafficData()
  }, [])

  useEffect(() => {
    filterDataByTime()
  }, [trafficData, timeRange])

  const fetchTrafficData = async () => {
    try {
      setLoading(true)
      
      // Try API first (works on Vercel and local development)
      try {
        const response = await axios.get('/api/traffic')
        setTrafficData(response.data)
        setError(null)
      } catch (apiError) {
        console.log('API not available, loading from static file...')
        // Fallback to static file
        const response = await fetch('/data/simulated_traffic.json')
        
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`)
        }
        
        const data = await response.json()
        setTrafficData(data)
        setError(null)
      }
    } catch (err) {
      setError('Failed to fetch traffic data: ' + err.message)
      console.error('Error fetching traffic data:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterDataByTime = () => {
    if (timeRange === 'all') {
      setFilteredData(trafficData)
      return
    }

    const now = new Date()
    const filtered = trafficData.filter(item => {
      const itemDate = new Date(item.timestamp)
      const diffHours = (now - itemDate) / (1000 * 60 * 60)

      switch (timeRange) {
        case '1h':
          return diffHours <= 1
        case '24h':
          return diffHours <= 24
        case '7d':
          return diffHours <= 168
        default:
          return true
      }
    })
    setFilteredData(filtered)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nbsc-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading traffic data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center justify-between">
        <TimeFilter timeRange={timeRange} setTimeRange={setTimeRange} />
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">Show Markers</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">Show Heatmap</span>
          </label>
          <button
            onClick={fetchTrafficData}
            className="px-4 py-2 bg-nbsc-blue text-white rounded hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      <StatisticsPanel data={filteredData} />

      {/* Map */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Traffic Map</h2>
        <div className="map-container">
          <MapView data={filteredData} showHeatmap={showHeatmap} showMarkers={showMarkers} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
