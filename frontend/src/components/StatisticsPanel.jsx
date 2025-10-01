import { useMemo } from 'react'

const StatisticsPanel = ({ data }) => {
  const statistics = useMemo(() => {
    if (!data.length) return { total: 0, barangays: {}, topBarangay: null }

    const barangayCounts = {}
    data.forEach(item => {
      barangayCounts[item.barangay] = (barangayCounts[item.barangay] || 0) + 1
    })

    const sortedBarangays = Object.entries(barangayCounts)
      .sort(([, a], [, b]) => b - a)

    return {
      total: data.length,
      barangays: barangayCounts,
      topBarangay: sortedBarangays[0] || null,
      uniqueBarangays: Object.keys(barangayCounts).length,
      recentVisit: data[data.length - 1]
    }
  }, [data])

  const topBarangays = useMemo(() => {
    return Object.entries(statistics.barangays)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }, [statistics.barangays])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Visitors */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Visitors</p>
            <p className="text-3xl font-bold text-nbsc-blue mt-2">{statistics.total}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-nbsc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Unique Barangays */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Unique Barangays</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{statistics.uniqueBarangays}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Top Barangay */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-gray-500 text-sm font-medium">Top Barangay</p>
            <p className="text-xl font-bold text-purple-600 mt-2 truncate">
              {statistics.topBarangay ? statistics.topBarangay[0] : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              {statistics.topBarangay ? `${statistics.topBarangay[1]} visits` : ''}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Visit */}
      <div className="stat-card bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-gray-500 text-sm font-medium">Latest Visit</p>
            <p className="text-xl font-bold text-orange-600 mt-2 truncate">
              {statistics.recentVisit ? statistics.recentVisit.barangay : 'N/A'}
            </p>
            <p className="text-xs text-gray-600">
              {statistics.recentVisit 
                ? new Date(statistics.recentVisit.timestamp).toLocaleTimeString()
                : ''
              }
            </p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Top 5 Barangays List */}
      <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Barangays by Visits</h3>
        <div className="space-y-3">
          {topBarangays.map(([barangay, count], index) => (
            <div key={barangay} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-nbsc-blue text-white font-bold text-sm">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-700">{barangay}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-nbsc-blue h-2 rounded-full"
                    style={{ width: `${(count / statistics.total) * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-gray-900 w-16 text-right">{count} visits</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatisticsPanel
