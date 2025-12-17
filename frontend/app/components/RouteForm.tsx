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
    const [range, setRange] = useState(0.05);


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
        <div className="bg-white p-6 rounded-lg shadow-md">
            < h2 className="text-2xl font-bold mb-4">Route Optimizer</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Number of Dilivary Points
                    </label>
                    <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="2"
                    value={numberOfCordinates}
                    onChange={(e) => setNumberOfCordinates(Number(e.target.value))}
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Number of Vehicles
                    </label>
                    <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="4"
                    value={numberOfVehicles}
                    onChange={(e) => setNumberOfVehicles(Number(e.target.value))}
                    min="1"
                    max="10"
                    required
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium mb-2">
                        Range(KM)
                    </label>
                    <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md"
                    min="0.01"
                    max="0.5"
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}                    
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        0.05 ≈ 5.5km radius
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                   {isLoading ? 'optimiing...' : 'optimize Routes'}

                </button>
            </form>
        </div>
    );
}
