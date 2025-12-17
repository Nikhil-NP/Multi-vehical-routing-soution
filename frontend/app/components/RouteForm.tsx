'use client';


import { useState } from "react";


export default function RouteForm(){
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            < h2 className="text-2xl font-bold mb-4">Route Optimizer</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Number of Dilivary Points
                    </label>
                    <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="2"
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
                    placeholder="8"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Optimal Route Generator

                </button>

            </form>


        </div>
    )

}
