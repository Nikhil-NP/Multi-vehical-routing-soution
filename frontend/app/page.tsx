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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">


        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚚 Multi-Vehicle Delivery Route Optimizer
          </h1>
          <p className="text-gray-600">
            Powered by Google OR-Tools
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Optimizing routes...</p>
              </div>
            )}


            {/* Results */}
            {routes && !loading && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Optimized Routes</h2>
                
                {/* Placeholder for map - we'll add MapDisplay component in Step 6 */}
                <MapDisplay routes={routes.routes} coordinates={routes.coordinates} />

                {/* Route details */}
                <div className="space-y-3">
                  {routes.routes.map((route, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold">Vehicle {index + 1}</h3>
                      <p className="text-sm text-gray-600">
                        Stops: {route.join(' → ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Initial state */}
            {!routes && !loading && !error && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500">
                  Enter parameters and click "Optimize Routes" to see results
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Made by{' '}
            <a 
              href="https://github.com/Nikhil-NP" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Nikhil-NP
            </a>
          </p>
        </footer>

      </div>
    </div>
  );
}
