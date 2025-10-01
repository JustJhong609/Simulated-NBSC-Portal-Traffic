import express from 'express'
import { getTrafficData, enrichWithGeolocation } from '../services/trafficService.js'

const router = express.Router()

// Get all traffic data
router.get('/', async (req, res) => {
  try {
    const data = await getTrafficData()
    res.json(data)
  } catch (error) {
    console.error('Error fetching traffic data:', error)
    res.status(500).json({ error: 'Failed to fetch traffic data' })
  }
})

// Enrich a single IP with geolocation
router.post('/enrich', async (req, res) => {
  try {
    const { ip } = req.body
    if (!ip) {
      return res.status(400).json({ error: 'IP address is required' })
    }
    
    const enrichedData = await enrichWithGeolocation(ip)
    res.json(enrichedData)
  } catch (error) {
    console.error('Error enriching IP:', error)
    res.status(500).json({ error: 'Failed to enrich IP data' })
  }
})

export default router
