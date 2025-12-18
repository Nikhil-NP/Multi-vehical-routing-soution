'use client';


import dynamic from "next/dynamic";
import { useState } from "react";
import RouteForm from "./components/RouteForm";
const MapDisplay = dynamic(
  () => import('./components/MapDisplay'),
  {ssr:false}
)
//types
interface RouteFormData {
    numberOfCordinates : number;
    numberOfVehicles : number;
    range : number;
}

interface Coordinate {
  lat:number;
  lng:number;
}

interface RouteResponse{
  routes: number[][];
  coordinates: Coordinate[];
}


export default function Home() {

  const [loading,setLoading] = useState(false);
  const [routes,setRoutes] = useState<RouteResponse|null>(null);
  const [error, setError] = useState<string | null>(null);

  //fn gets passed to routeForm 
  const handleOptimize = async (data: RouteFormData) => {
    setLoading(true);
    setError(null);


    try{
    //nextjs api call
    const response = await fetch('/api/optimize',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok){
      throw new Error('fetch failed on api/optimize');
    }

    const result:RouteResponse = await response.json();
    setRoutes(result);

  }
  catch(err){
    setError(err instanceof Error ? err.message : 'An error occurred');
    console.error('Optimization error:', err);
  }
  finally{
    setLoading(false);
  }

};




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">


        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            🚚 Multi-Vehicle Route Optimizer
          </h1>
          <p className="text-gray-700 text-lg font-medium">
            Powered by <span className="text-blue-600 font-semibold">Google OR-Tools</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Form */}
          <div className="lg:col-span-1">
            <RouteForm onOptimize={handleOptimize} isLoading={loading} />
          </div>

          {/* Right side - Results */}
          <div className="lg:col-span-2">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-4 shadow-sm">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <strong className="font-bold">Error:</strong>
                    <p className="mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="bg-white p-10 rounded-xl shadow-lg text-center border border-blue-100">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-blue-50"></div>
                  </div>
                </div>
                <p className="text-gray-700 font-medium text-lg">Optimizing routes...</p>
                <p className="text-gray-500 text-sm mt-2">Calculating best delivery paths</p>
              </div>
            )}


            {/* Results */}
            {routes && !loading && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">📍</span>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Optimized Routes
                  </h2>
                </div>
                
                {/* Map Display */}
                <MapDisplay routes={routes.routes} coordinates={routes.coordinates} />

                {/* Route details */}
                <div className="space-y-3 mt-6">
                  {routes.routes.map((route, index) => {
                    const colors = [
                      'border-red-500 bg-red-50',
                      'border-blue-500 bg-blue-50',
                      'border-green-500 bg-green-50',
                      'border-orange-500 bg-orange-50',
                      'border-purple-500 bg-purple-50',
                      'border-pink-500 bg-pink-50',
                    ];
                    return (
                      <div 
                        key={index} 
                        className={`border-l-4 ${colors[index % colors.length]} pl-4 py-3 rounded-r-lg transition-all hover:shadow-md`}
                      >
                        <h3 className="font-bold text-lg text-gray-800">🚐 Vehicle {index + 1}</h3>
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          Stops: <span className="font-mono">{route.join(' → ')}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {route.length - 1} delivery points
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Initial state */}
            {!routes && !loading && !error && (
              <div className="bg-gradient-to-br from-white to-blue-50 p-12 rounded-xl shadow-lg text-center border-2 border-dashed border-blue-200">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-700 text-lg font-medium">
                  Enter parameters and click "Optimize Routes"
                </p>
                <p className="text-gray-500 mt-2">
                  to see the optimized delivery paths
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Made by{' '}
            <a 
              href="https://github.com/Nikhil-NP" 
              target="_blank"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Nikhil-NP
            </a>
          </p>
        </footer>

      </div>
    </div>
  );
}
