import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet.heat'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const MapView = ({ data, showHeatmap }) => {
  const mapRef = useRef(null)
  const heatLayerRef = useRef(null)

  // Center on Manolo Fortich, Bukidnon
  const center = [8.3667, 124.8667]

  useEffect(() => {
    if (!mapRef.current || !data.length) return

    const map = mapRef.current

    // Remove existing heatmap layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }

    // Add heatmap if enabled
    if (showHeatmap && window.L.heatLayer) {
      const heatData = data.map(item => [
        item.latitude,
        item.longitude,
        0.5 // intensity
      ])
      
      heatLayerRef.current = window.L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 13,
        gradient: {
          0.0: 'blue',
          0.5: 'lime',
          0.7: 'yellow',
          1.0: 'red'
        }
      }).addTo(map)
    }

    return () => {
      if (heatLayerRef.current && map) {
        map.removeLayer(heatLayerRef.current)
      }
    }
  }, [data, showHeatmap])

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {data.map((item, index) => (
        <Marker key={index} position={[item.latitude, item.longitude]}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold text-nbsc-blue mb-2">{item.barangay}</h3>
              <p><strong>IP:</strong> {item.ip_address}</p>
              <p><strong>Location:</strong> {item.address}</p>
              <p><strong>Coordinates:</strong></p>
              <p className="text-xs">Lat: {item.latitude.toFixed(6)}</p>
              <p className="text-xs">Lng: {item.longitude.toFixed(6)}</p>
              <p className="mt-2"><strong>Timestamp:</strong></p>
              <p className="text-xs">{new Date(item.timestamp).toLocaleString()}</p>
            </div>
          </Popup>
          <Circle
            center={[item.latitude, item.longitude]}
            radius={100}
            pathOptions={{ 
              color: '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: 0.2
            }}
          />
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapView
