import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface OptimizeRequest {
  numberOfCordinates: number;
  numberOfVehicles: number;
  range: number;
}

export async function POST(request:NextRequest) {
    try{
            //parse
            const body : OptimizeRequest = await request.json();

            //validate
            if(!body.numberOfCordinates || !body.numberOfVehicles || !body.range){
                return NextResponse.json(
                    {error:'Missing params'},
                    {status: 400}
                );
            }

            //forword req
            const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

            const response = await fetch(`${backendUrl}/optimize`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            //validation
            if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.error || 'Backend optimization failed' },
                { status: response.status }
            );
            }

            //return res
            const data = await response.json();
            return NextResponse.json(data);
            
        }
        catch (err){
            console.error('Apu route error ',err);
            return NextResponse.json(
                {err: 'internal server error'},
                {status:500}
            );
        }
    }
    