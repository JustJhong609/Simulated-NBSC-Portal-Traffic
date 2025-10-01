import { useMemo } from 'react'

const StatisticsPanel = ({ data, allData }) => {
  const statistics = useMemo(() => {
    if (!data.length) return { 
      total: 0, 
      barangays: {}, 
      topBarangay: null, 
      activeNow: 0,
      peakHour: null,
      previousTotal: 0,
      percentageChange: 0
    }

    const barangayCounts = {}
    const hourCounts = {}
    const now = new Date()
    let activeCount = 0

    data.forEach(item => {
      // Count by barangay
      barangayCounts[item.barangay] = (barangayCounts[item.barangay] || 0) + 1
      
      // Count active now (last 10 minutes)
      const itemDate = new Date(item.timestamp)
      const diffMinutes = (now - itemDate) / (1000 * 60)
      if (diffMinutes <= 10) {
        activeCount++
      }

      // Count by hour for peak detection
      const hour = itemDate.getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })

    // Find peak hour
    let peakHour = null
    let maxHourCount = 0
    Object.entries(hourCounts).forEach(([hour, count]) => {
      if (count > maxHourCount) {
        maxHourCount = count
        peakHour = {
          hour: parseInt(hour),
          count: count
        }
      }
    })

    // Calculate trend (compare with data from double the time period ago)
    let previousTotal = 0
    let percentageChange = 0
    if (allData && allData.length > 0) {
      // Get the time range of current filtered data
      const currentOldest = new Date(data[0]?.timestamp || now)
      const currentNewest = new Date(data[data.length - 1]?.timestamp || now)
      const timeRangeDiff = currentNewest - currentOldest
      
      // Count items in the previous period (same duration, but earlier)
      const previousPeriodStart = new Date(currentOldest - timeRangeDiff)
      const previousPeriodEnd = currentOldest
      
      previousTotal = allData.filter(item => {
        const itemDate = new Date(item.timestamp)
        return itemDate >= previousPeriodStart && itemDate < previousPeriodEnd
      }).length

      if (previousTotal > 0) {
        percentageChange = ((data.length - previousTotal) / previousTotal) * 100
      } else if (data.length > 0) {
        percentageChange = 100
      }
    }

    const sortedBarangays = Object.entries(barangayCounts)
      .sort(([, a], [, b]) => b - a)

    return {
      total: data.length,
      barangays: barangayCounts,
      topBarangay: sortedBarangays[0] || null,
      uniqueBarangays: Object.keys(barangayCounts).length,
      recentVisit: data[data.length - 1],
      activeNow: activeCount,
      peakHour: peakHour,
      percentageChange: percentageChange.toFixed(1)
    }
  }, [data, allData])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Visitors */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Visitors</p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-3xl font-bold text-nbsc-blue">{statistics.total}</p>
              {statistics.percentageChange !== 0 && (
                <span className={`text-sm font-semibold flex items-center ${
                  parseFloat(statistics.percentageChange) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(statistics.percentageChange) > 0 ? '↑' : '↓'}
                  {Math.abs(statistics.percentageChange)}%
                </span>
              )}
            </div>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-nbsc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Now */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Now</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{statistics.activeNow}</p>
            <p className="text-xs text-gray-500 mt-1">Last 10 minutes</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Peak Traffic Hour */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-gray-500 text-sm font-medium">Peak Hour</p>
            <p className="text-xl font-bold text-orange-600 mt-2">
              {statistics.peakHour 
                ? `${statistics.peakHour.hour}:00 - ${statistics.peakHour.hour + 1}:00`
                : 'N/A'
              }
            </p>
            <p className="text-sm text-gray-600">
              {statistics.peakHour ? `${statistics.peakHour.count} visits` : ''}
            </p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Latest Visit */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-gray-500 text-sm font-medium">Latest Visit</p>
            <p className="text-xl font-bold text-purple-600 mt-2 truncate">
              {statistics.recentVisit ? statistics.recentVisit.barangay : 'N/A'}
            </p>
            <p className="text-xs text-gray-600">
              {statistics.recentVisit 
                ? new Date(statistics.recentVisit.timestamp).toLocaleTimeString()
                : ''
              }
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPanel
