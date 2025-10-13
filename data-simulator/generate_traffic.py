#!/usr/bin/env python3
"""
Traffic Data Generator for NBSC Portal
Generates simulated traffic data for Manolo Fortich barangays
"""

import json
import random
from datetime import datetime, timedelta
from pathlib import Path

# Barangays in Manolo Fortich with approximate coordinates
BARANGAYS = [
    {"name": "Poblacion", "lat": 8.3667, "lng": 124.8667},
    {"name": "Dalirig", "lat": 8.3750, "lng": 124.8750},
    {"name": "San Miguel", "lat": 8.3500, "lng": 124.8500},
    {"name": "Dahilayan", "lat": 8.3900, "lng": 124.9000},
    {"name": "Lindaban", "lat": 8.3550, "lng": 124.8600},
    {"name": "Tankulan", "lat": 8.3800, "lng": 124.8800},
    {"name": "Maluko", "lat": 8.3600, "lng": 124.8700},
    {"name": "Mambatangan", "lat": 8.3700, "lng": 124.8900},
    {"name": "Kalugmanan", "lat": 8.3450, "lng": 124.8550},
    {"name": "Sankanan", "lat": 8.3850, "lng": 124.8650}
]

# Philippine ISP Providers
ISP_PROVIDERS = [
    'PLDT', 
    'Globe Telecom', 
    'Converge ICT', 
    'Sky Broadband', 
    'DITO Telecommunity', 
    'Starlink', 
    'Eastern Communications', 
    'RISE', 
    'Asian Vision', 
    'Infinivan', 
    'Air Cable', 
    'Cablelink', 
    'Bayan Telecommunications'
]

# Device Types
DEVICES = ['Mobile', 'Desktop', 'Tablet']
DEVICE_WEIGHTS = [0.60, 0.30, 0.10]  # 60% mobile, 30% desktop, 10% tablet

# Browser Types
BROWSERS = [
    'Chrome',
    'Firefox', 
    'Safari',
    'Edge',
    'Opera',
    'Samsung Internet',
    'UC Browser'
]
BROWSER_WEIGHTS = [0.45, 0.15, 0.20, 0.10, 0.03, 0.05, 0.02]

def generate_random_ip():
    """Generate a random local IP address"""
    return f"192.168.{random.randint(1, 255)}.{random.randint(1, 255)}"

def add_coordinate_variance(lat, lng, variance=0.02):
    """Add small random variance to coordinates"""
    return (
        lat + (random.random() - 0.5) * variance,
        lng + (random.random() - 0.5) * variance
    )

def generate_traffic_data(num_records=100, days_back=7):
    """Generate simulated traffic data"""
    data = []
    now = datetime.now()
    
    for _ in range(num_records):
        barangay = random.choice(BARANGAYS)
        lat, lng = add_coordinate_variance(barangay["lat"], barangay["lng"])
        
        # Generate random timestamp within the last N days
        hours_back = random.random() * days_back * 24
        timestamp = now - timedelta(hours=hours_back)
        
        # Generate device and browser
        device = random.choices(DEVICES, weights=DEVICE_WEIGHTS, k=1)[0]
        browser = random.choices(BROWSERS, weights=BROWSER_WEIGHTS, k=1)[0]
        
        # Generate engagement metrics
        # Session duration: 30 seconds to 30 minutes (in seconds)
        session_duration = random.randint(30, 1800)
        
        # Pages viewed: 1 to 15 pages
        pages_viewed = random.randint(1, 15)
        
        record = {
            "ip_address": generate_random_ip(),
            "isp_provider": random.choice(ISP_PROVIDERS),
            "device": device,
            "browser": browser,
            "barangay": barangay["name"],
            "latitude": round(lat, 6),
            "longitude": round(lng, 6),
            "address": f"{barangay['name']}, Manolo Fortich, Bukidnon, Philippines",
            "timestamp": timestamp.isoformat(),
            "session_duration": session_duration,
            "pages_viewed": pages_viewed
        }
        data.append(record)
    
    # Sort by timestamp
    data.sort(key=lambda x: x["timestamp"])
    return data

def main():
    """Main function to generate and save traffic data"""
    print("🔄 Generating simulated NBSC portal traffic data...")
    
    # Generate data
    traffic_data = generate_traffic_data(num_records=150, days_back=7)
    
    # Ensure data directory exists
    data_dir = Path(__file__).parent.parent / "data"
    data_dir.mkdir(exist_ok=True)
    
    # Save to JSON file
    output_file = data_dir / "simulated_traffic.json"
    with open(output_file, "w") as f:
        json.dump(traffic_data, f, indent=2)
    
    print(f"✅ Generated {len(traffic_data)} traffic records")
    print(f"📁 Saved to: {output_file}")
    
    # Print statistics
    barangay_counts = {}
    for record in traffic_data:
        barangay = record["barangay"]
        barangay_counts[barangay] = barangay_counts.get(barangay, 0) + 1
    
    print("\n📊 Traffic Distribution by Barangay:")
    for barangay, count in sorted(barangay_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"   {barangay}: {count} visits")

if __name__ == "__main__":
    main()
