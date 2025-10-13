import { useMemo } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const DevicePlatformBreakdown = ({ data }) => {
  const { deviceData, browserData } = useMemo(() => {
    if (!data.length) return { deviceData: null, browserData: null }

    // Count devices
    const deviceCounts = {}
    const browserCounts = {}
    
    data.forEach(item => {
      if (item.device) {
        deviceCounts[item.device] = (deviceCounts[item.device] || 0) + 1
      }
      if (item.browser) {
        browserCounts[item.browser] = (browserCounts[item.browser] || 0) + 1
      }
    })

    // Device chart data
    const deviceLabels = Object.keys(deviceCounts)
    const deviceValues = Object.values(deviceCounts)
    const deviceColors = {
      'Mobile': 'rgba(59, 130, 246, 0.8)',
      'Desktop': 'rgba(16, 185, 129, 0.8)',
      'Tablet': 'rgba(245, 158, 11, 0.8)'
    }

    const deviceChartData = {
      labels: deviceLabels,
      datasets: [{
        data: deviceValues,
        backgroundColor: deviceLabels.map(label => deviceColors[label] || 'rgba(156, 163, 175, 0.8)'),
        borderColor: deviceLabels.map(label => 
          deviceColors[label]?.replace('0.8', '1') || 'rgba(156, 163, 175, 1)'
        ),
        borderWidth: 2
      }]
    }

    // Browser chart data
    const browserLabels = Object.keys(browserCounts).slice(0, 7)
    const browserValues = Object.values(browserCounts).slice(0, 7)
    const browserColors = [
      'rgba(239, 68, 68, 0.8)',
      'rgba(251, 146, 60, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(14, 165, 233, 0.8)'
    ]

    const browserChartData = {
      labels: browserLabels,
      datasets: [{
        data: browserValues,
        backgroundColor: browserColors,
        borderColor: browserColors.map(c => c.replace('0.8', '1')),
        borderWidth: 2
      }]
    }

    return {
      deviceData: deviceChartData,
      browserData: browserChartData
    }
  }, [data])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }

  if (!deviceData || !browserData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Breakdown</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            No data available
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browser Distribution</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            No data available
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Device Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Device Breakdown</h3>
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div style={{ height: '280px' }}>
          <Pie data={deviceData} options={options} />
        </div>
      </div>

      {/* Browser Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Browser Distribution</h3>
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </div>
        <div style={{ height: '280px' }}>
          <Pie data={browserData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default DevicePlatformBreakdown
