import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // Read the simulated traffic data
    const dataPath = path.join(process.cwd(), 'data', 'simulated_traffic.json')
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      // Return sample data if file doesn't exist
      return res.status(200).json(generateSampleData())
    }

    const data = fs.readFileSync(dataPath, 'utf-8')
    const trafficData = JSON.parse(data)
    
    res.status(200).json(trafficData)
  } catch (error) {
    console.error('Error reading traffic data:', error)
    // Return sample data as fallback
    res.status(200).json(generateSampleData())
  }
}

// Generate sample data if file doesn't exist
function generateSampleData() {
  const barangays = [
    { name: 'Poblacion', lat: 8.3667, lng: 124.8667 },
    { name: 'Dalirig', lat: 8.3750, lng: 124.8750 },
    { name: 'San Miguel', lat: 8.3500, lng: 124.8500 },
    { name: 'Dahilayan', lat: 8.3900, lng: 124.9000 },
    { name: 'Lindaban', lat: 8.3550, lng: 124.8600 }
  ]
  
  const data = []
  const now = new Date()
  
  for (let i = 0; i < 50; i++) {
    const barangay = barangays[Math.floor(Math.random() * barangays.length)]
    const timestamp = new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000)
    
    data.push({
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      barangay: barangay.name,
      latitude: barangay.lat + (Math.random() - 0.5) * 0.02,
      longitude: barangay.lng + (Math.random() - 0.5) * 0.02,
      address: `${barangay.name}, Manolo Fortich, Bukidnon, Philippines`,
      timestamp: timestamp.toISOString()
    })
  }
  
  return data
}
