import { useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const VisitorsOverTimeChart = ({ data }) => {
  const [granularity, setGranularity] = useState('hourly') // hourly, daily, weekly

  const chartData = useMemo(() => {
    if (!data.length) return { labels: [], datasets: [] }

    const timeCounts = {}
    
    data.forEach(item => {
      const date = new Date(item.timestamp)
      let timeKey

      if (granularity === 'hourly') {
        // Group by hour
        timeKey = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`
      } else if (granularity === 'daily') {
        // Group by day
        timeKey = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      } else if (granularity === 'weekly') {
        // Group by week
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        timeKey = `Week of ${weekStart.getMonth() + 1}/${weekStart.getDate()}`
      }

      timeCounts[timeKey] = (timeCounts[timeKey] || 0) + 1
    })

    // Sort by time
    const sortedEntries = Object.entries(timeCounts).sort((a, b) => {
      return new Date(a[0]) - new Date(b[0])
    })

    // Take last 24 hours, 7 days, or 4 weeks depending on granularity
    let limit
    if (granularity === 'hourly') limit = 24
    else if (granularity === 'daily') limit = 7
    else limit = 4

    const limitedEntries = sortedEntries.slice(-limit)

    const labels = limitedEntries.map(([time]) => time)
    const values = limitedEntries.map(([, count]) => count)

    return {
      labels,
      datasets: [
        {
          label: 'Visitors',
          data: values,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    }
  }, [data, granularity])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `Visitors: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Number of Visitors'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Visitors Over Time</h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setGranularity('hourly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              granularity === 'hourly'
                ? 'bg-nbsc-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hourly
          </button>
          <button
            onClick={() => setGranularity('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              granularity === 'daily'
                ? 'bg-nbsc-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setGranularity('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              granularity === 'weekly'
                ? 'bg-nbsc-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
      
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default VisitorsOverTimeChart
