import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarangayAnalytics = ({ data }) => {
  const statistics = useMemo(() => {
    if (!data.length) return { 
      total: 0, 
      barangays: {},
      topBarangays: []
    }

    const barangayCounts = {}
    data.forEach(item => {
      barangayCounts[item.barangay] = (barangayCounts[item.barangay] || 0) + 1
    })

    const topBarangays = Object.entries(barangayCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return {
      total: data.length,
      barangays: barangayCounts,
      topBarangays: topBarangays
    }
  }, [data])

  const chartData = useMemo(() => {
    if (!data.length) return { labels: [], datasets: [] }

    // Sort and get top 10
    const sortedBarangays = Object.entries(statistics.barangays)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    const labels = sortedBarangays.map(([barangay]) => barangay)
    const values = sortedBarangays.map(([, count]) => count)

    return {
      labels,
      datasets: [
        {
          label: 'Number of Visits',
          data: values,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    }
  }, [data, statistics.barangays])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Visits: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Number of Visits'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Barangay'
        }
      }
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Pane - Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 Barangays - Traffic Distribution</h3>
        <div style={{ height: '350px' }}>
          <Bar options={options} data={chartData} />
        </div>
      </div>

      {/* Right Pane - Top 5 List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Barangays by Visits</h3>
        <div className="space-y-4 mt-8">
          {statistics.topBarangays.map(([barangay, count], index) => (
            <div key={barangay} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-nbsc-blue text-white font-bold text-sm">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-700 text-lg">{barangay}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-nbsc-blue h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(count / statistics.total) * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-gray-900 w-20 text-right text-lg">{count} visits</span>
              </div>
            </div>
          ))}
        </div>
        {statistics.topBarangays.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default BarangayAnalytics
