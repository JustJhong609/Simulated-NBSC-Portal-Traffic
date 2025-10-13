const HeatmapLegend = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Heatmap Intensity Legend
      </h4>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-4 rounded" style={{ background: 'linear-gradient(to right, blue, lime, yellow, red)' }}></div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Low
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Medium
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Very High
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Colors indicate visitor density in each area. Warmer colors (yellow/red) show higher traffic concentration.
        </p>
      </div>
    </div>
  )
}

export default HeatmapLegend
