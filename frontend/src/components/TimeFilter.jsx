const TimeFilter = ({ timeRange, setTimeRange }) => {
  const filters = [
    { value: 'all', label: 'All Time' },
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
  ]

  return (
    <div className="flex gap-2">
      <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
        Time Range:
      </span>
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => setTimeRange(filter.value)}
          className={`px-4 py-2 rounded transition ${
            timeRange === filter.value
              ? 'bg-nbsc-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TimeFilter
