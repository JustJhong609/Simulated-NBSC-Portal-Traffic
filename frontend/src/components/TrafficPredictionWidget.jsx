import { useMemo } from 'react'

const TrafficPredictionWidget = ({ data }) => {
  // Helper function to calculate variance - MUST be defined before useMemo
  const calculateVariance = (dataPoints) => {
    if (dataPoints.length < 2) return 0
    
    // Group by hour and calculate variance
    const hourCounts = {}
    dataPoints.forEach(item => {
      const hour = new Date(item.timestamp).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    
    const counts = Object.values(hourCounts)
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length
    const variance = counts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / counts.length
    
    return Math.sqrt(variance) / mean // Coefficient of variation
  }

  const prediction = useMemo(() => {
    if (!data.length || data.length < 10) {
      return {
        nextHour: 0,
        nextDay: 0,
        trend: 'stable',
        confidence: 0
      }
    }

    // Simple linear regression for prediction
    const now = new Date()
    const last24Hours = data.filter(item => {
      const itemDate = new Date(item.timestamp)
      const diffHours = (now - itemDate) / (1000 * 60 * 60)
      return diffHours <= 24
    })

    const last7Days = data.filter(item => {
      const itemDate = new Date(item.timestamp)
      const diffHours = (now - itemDate) / (1000 * 60 * 60)
      return diffHours <= 168
    })

    // Calculate hourly average for last 24 hours
    const hourlyAvg = last24Hours.length / 24

    // Calculate daily average for last 7 days
    const dailyAvg = last7Days.length / 7

    // Determine trend
    const recentHours = data.filter(item => {
      const itemDate = new Date(item.timestamp)
      const diffHours = (now - itemDate) / (1000 * 60 * 60)
      return diffHours <= 6
    }).length

    const previousHours = data.filter(item => {
      const itemDate = new Date(item.timestamp)
      const diffHours = (now - itemDate) / (1000 * 60 * 60)
      return diffHours > 6 && diffHours <= 12
    }).length

    let trend = 'stable'
    if (recentHours > previousHours * 1.2) {
      trend = 'increasing'
    } else if (recentHours < previousHours * 0.8) {
      trend = 'decreasing'
    }

    // Calculate confidence based on data consistency
    const variance = calculateVariance(last24Hours)
    const confidence = Math.max(60, Math.min(95, 100 - variance * 10))

    // Predict next hour and day
    let nextHourPrediction = Math.round(hourlyAvg)
    let nextDayPrediction = Math.round(dailyAvg)

    // Adjust based on trend
    if (trend === 'increasing') {
      nextHourPrediction = Math.round(hourlyAvg * 1.15)
      nextDayPrediction = Math.round(dailyAvg * 1.10)
    } else if (trend === 'decreasing') {
      nextHourPrediction = Math.round(hourlyAvg * 0.85)
      nextDayPrediction = Math.round(dailyAvg * 0.90)
    }

    return {
      nextHour: nextHourPrediction,
      nextDay: nextDayPrediction,
      trend,
      confidence: Math.round(confidence)
    }
  }, [data])

  const getTrendIcon = () => {
    if (prediction.trend === 'increasing') {
      return (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    } else if (prediction.trend === 'decreasing') {
      return (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    } else {
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  }

  const getTrendColor = () => {
    if (prediction.trend === 'increasing') return 'text-green-600'
    if (prediction.trend === 'decreasing') return 'text-red-600'
    return 'text-blue-600'
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg border-2 border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">AI Traffic Prediction</h3>
            <p className="text-xs text-gray-600">Powered by predictive analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Next Hour</p>
          <p className="text-2xl font-bold text-purple-600">{prediction.nextHour}</p>
          <p className="text-xs text-gray-600">expected visitors</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Next 24 Hours</p>
          <p className="text-2xl font-bold text-blue-600">{prediction.nextDay}</p>
          <p className="text-xs text-gray-600">expected visitors</p>
        </div>
      </div>

      <div className="bg-white bg-opacity-60 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Traffic Trend:</span>
          <span className={`text-sm font-bold ${getTrendColor()} capitalize`}>
            {prediction.trend}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Confidence Level:</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gray-700">{prediction.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 italic">
        * Predictions based on historical traffic patterns and current trends
      </div>
    </div>
  )
}

export default TrafficPredictionWidget
