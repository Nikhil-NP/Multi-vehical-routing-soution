# Multi-Vehicle Delivery Route Optimizer (MDRS)

A full-stack web application that optimizes delivery routes for multiple vehicles using Google OR-Tools and visualizes them on an interactive map.

## Features

- **Smart Route Optimization**: Uses Google OR-Tools constraint solver with Vehicle Routing Problem (VRP) algorithms
- **Interactive Map Interface**: Pick depot locations and visualize optimized routes with Leaflet.js
- **Real-time Calculation**: Generate and display optimal routes within seconds
- **Dynamic Depot Selection**: Choose any location worldwide as your distribution center
- **Multi-Vehicle Support**: Optimize routes for multiple delivery vehicles simultaneously
- **Distance Constraints**: Set delivery radius and vehicle capacity limits

## Tech Stack

### Backend
- **Node.js** with Express.js and TypeScript
- **Python 3** with Google OR-Tools
- **Haversine formula** for accurate geographical distance calculations

### Frontend
- **Next.js 14+** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Leaflet.js** for interactive maps
- **React-Leaflet** for map components




## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install Python dependencies:
```bash
pip install ortools
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
BACKEND_URL=http://localhost:8080
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Set Parameters**:
   - Number of delivery points (1-50)
   - Number of vehicles (1-10)
   - Delivery range in kilometers

2. **Choose Depot Location**:
   - Click "Pick on Map" to select a location visually
   - Or manually enter latitude/longitude coordinates

3. **Optimize Routes**:
   - Click "Optimize Routes" button
   - Wait for the algorithm to calculate optimal paths (5-10 seconds)

4. **View Results**:
   - See color-coded routes on the map
   - Red marker indicates depot location
   - Blue markers show delivery points
   - Each vehicle has a unique route color

## Algorithm Details

### Optimization Strategy
- **First Solution**: `PARALLEL_CHEAPEST_INSERTION` - Builds routes by inserting deliveries where they add the least cost
- **Local Search**: `GUIDED_LOCAL_SEARCH` - Escapes local optima using penalty-based guidance
- **Time Limit**: 30 seconds for balance between solution quality and responsiveness

### Constraints
- All vehicles must return to the depot
- Distance limits per vehicle (dynamically calculated)
- Load balancing across vehicles
- Minimum distance traveled (primary objective)

### Distance Calculation
Uses the Haversine formula for accurate great-circle distances between GPS coordinates:
```
d = 2R × arcsin(√(sin²(Δφ/2) + cos φ1 × cos φ2 × sin²(Δλ/2)))
```
Where R = 6371 km (Earth's radius)



## License

MIT License - see LICENSE file for details

## Author

**Nikhil-NP**
- GitHub: [@Nikhil-NP](https://github.com/Nikhil-NP)

## Acknowledgments

- Google OR-Tools for the optimization engine
- OpenStreetMap for map tiles
- Leaflet.js for mapping library
