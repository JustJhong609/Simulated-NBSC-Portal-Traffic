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

const BarangayBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return { labels: [], datasets: [] }

    // Count visits by barangay
    const barangayCounts = {}
    data.forEach(item => {
      barangayCounts[item.barangay] = (barangayCounts[item.barangay] || 0) + 1
    })

    // Sort and get top 10
    const sortedBarangays = Object.entries(barangayCounts)
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
  }, [data])

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
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 Barangays - Traffic Distribution</h3>
      <div style={{ height: '350px' }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  )
}

export default BarangayBarChart
