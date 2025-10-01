import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <header className="bg-nbsc-blue text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">NBSC Portal Traffic Dashboard</h1>
          <p className="text-sm mt-1 text-gray-200">
            IP Geolocation & Reverse Geocoding - Manolo Fortich, Bukidnon
          </p>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
