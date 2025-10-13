import { useMemo } from 'react'

const EngagementMetrics = ({ data }) => {
  const metrics = useMemo(() => {
    if (!data.length) return {
      avgDuration: 0,
      avgPages: 0,
      totalSessions: 0,
      bounceRate: 0
    }

    let totalDuration = 0
    let totalPages = 0
    let singlePageVisits = 0

    data.forEach(item => {
      if (item.session_duration) {
        totalDuration += item.session_duration
      }
      if (item.pages_viewed) {
        totalPages += item.pages_viewed
        if (item.pages_viewed === 1) {
          singlePageVisits++
        }
      }
    })

    const avgDuration = totalDuration / data.length
    const avgPages = totalPages / data.length
    const bounceRate = (singlePageVisits / data.length) * 100

    // Format duration to mm:ss
    const minutes = Math.floor(avgDuration / 60)
    const seconds = Math.floor(avgDuration % 60)
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`

    return {
      avgDuration: formattedDuration,
      avgDurationSeconds: avgDuration,
      avgPages: avgPages.toFixed(1),
      totalSessions: data.length,
      bounceRate: bounceRate.toFixed(1)
    }
  }, [data])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Average Session Duration */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Avg. Session Duration</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{metrics.avgDuration}</p>
            <p className="text-xs text-gray-500 mt-1">minutes:seconds</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Average Pages Per Visit */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Avg. Pages/Visit</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{metrics.avgPages}</p>
            <p className="text-xs text-gray-500 mt-1">pages per session</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Total Sessions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Sessions</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{metrics.totalSessions}</p>
            <p className="text-xs text-gray-500 mt-1">tracked sessions</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bounce Rate */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Bounce Rate</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{metrics.bounceRate}%</p>
            <p className="text-xs text-gray-500 mt-1">single page visits</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EngagementMetrics
