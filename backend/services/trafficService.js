import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_KEY = process.env.BIGDATACLOUD_API_KEY

// Get traffic data from simulated file
export async function getTrafficData() {
  try {
    const dataPath = path.join(__dirname, '../../data/simulated_traffic.json')
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading traffic data:', error)
    // Return sample data if file doesn't exist yet
    return generateSampleData()
  }
}

// Enrich IP with BigDataCloud API
export async function enrichWithGeolocation(ip) {
  try {
    // IP Geolocation API
    const geoResponse = await axios.get(
      `https://api.bigdatacloud.net/data/ip-geolocation?ip=${ip}&key=${API_KEY}`
    )
    
    const { latitude, longitude } = geoResponse.data.location
    
    // Reverse Geocoding API
    const addressResponse = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    )
    
    return {
      ip,
      latitude,
      longitude,
      city: addressResponse.data.city || addressResponse.data.locality,
      address: addressResponse.data.localityInfo?.administrative?.[3]?.name || 
               addressResponse.data.locality,
      country: addressResponse.data.countryName,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error enriching IP:', error)
    throw error
  }
}

// Generate sample data for initial testing
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
