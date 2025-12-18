'use client';


import { Route } from "next";
import { useState } from "react";


//typesafe form format
interface RouteFormData {
    numberOfCordinates : number;
    numberOfVehicles : number;
    range : number;
}


//props pass function to parent after submission
interface RouteFormProps{
    onOptimize : (data :RouteFormData) => void;
    isLoading?:boolean;
}



export default function RouteForm({onOptimize,isLoading= false}:RouteFormProps){

    //state of inputs
    const [numberOfCordinates,setNumberOfCordinates] = useState(8);
    const [numberOfVehicles, setNumberOfVehicles] = useState(3);
    const [range, setRange] = useState(5); // Default 5 km


    //handle submission
    const handleSubmit = (e :React.FormEvent) => {
        e.preventDefault(); //prevents reload

        //to parent
        onOptimize({
            numberOfCordinates,
            numberOfVehicles,
            range,
        });
    }


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">⚙️</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Route Optimizer
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📦 Number of Delivery Points
                    </label>
                    <input
                    type="number"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-400 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 8"
                    value={numberOfCordinates}
                    onChange={(e) => setNumberOfCordinates(Number(e.target.value))}
                    min="1"
                    max="50"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🚐 Number of Vehicles
                    </label>
                    <input
                    type="number"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-400 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 3"
                    value={numberOfVehicles}
                    onChange={(e) => setNumberOfVehicles(Number(e.target.value))}
                    min="1"
                    max="10"
                    required
                    />
                </div>


                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📏 Range (kms)
                    </label>
                    <input
                    type="number"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none placeholder:text-gray-400 text-gray-400 font-medium"
                    placeholder="eg,. 3"
                    min="1"
                    max="50"
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    required                    
                    />
                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1.5 rounded-md">
                        💡 Delivery radius around depot
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                   {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Optimizing...
                    </span>
                   ) : (
                    '🚀 Optimize Routes'
                   )}

                </button>
            </form>
        </div>
    );
}
