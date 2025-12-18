import express, {type Request, type Response} from 'express';
import { exec } from 'child_process'; //excute .py script
import cors from 'cors'; //interaction between nextjs and express
import fs from 'fs';
import type { Coordinate, DataModel, RouteResponse, OptimalParameters, OptimizeRequest } from './types.js';


const app = express();
const PORT = 8080;


//middleware
app.use(cors());
app.use(express.json());



function calculateOptimalParameters(
    numberOfCordinates:number,
    numberOfVehicles:number,range:number
):OptimalParameters{
    const areaRadius:number = range * 111000 //approx km conversion ex: 0.05 ~~ 5.5km
    const deliveriesPerVehicle:number = Math.ceil(numberOfCordinates/numberOfVehicles);

    //calc feasible max distance
    const maxDistancePerVehicle:number = Math.max(4000,
        Math.min(15000,(areaRadius/numberOfVehicles) * deliveriesPerVehicle * 2)
    
    );
    return { maxDistancePerVehicle };

}


function randomCordinateGenerator(
    numberOfCordinates:number,
    fixed_location:Coordinate,
    range:number):Coordinate[] {

    const cords = [fixed_location]; //for now only the fixed location in the res

    for (let i = 0; i < numberOfCordinates; i++) {
        
        const angle = Math.random() * 2 * Math.PI; //0 to 360 radious
        const distance = Math.random() * range;

        const lat = fixed_location.lat + distance * Math.cos(angle); // 
        const lng = fixed_location.lng + distance * Math.sin(angle);
        cords.push({lat,lng});  
    }
    return cords
}






//@desc : find the optimal route and sends the results to nextjs ui
//@route : /optimize
app.post('/optimize',(req:Request<{},{},OptimizeRequest>,res:Response) =>{
    const {
         numberOfCordinates,
         numberOfVehicles,
         range
    } = req.body
    
    //validation
    if (!numberOfCordinates || !numberOfVehicles || !range){
        return res.status(400).json({ error : 'missing  req parameters'});
    }
    //non negetive validation
    if (numberOfCordinates <= 0 || numberOfVehicles <= 0 || range <= 0) {
        return res.status(400).json({ error: 'Parameters must be positive numbers' });
    }
    

    //pune location rn
    const fixed_location : Coordinate  = {
        lat:18.49476,
        lng:73.890154
    };

    
    const {maxDistancePerVehicle} = calculateOptimalParameters(numberOfCordinates,numberOfVehicles,range); //6km for now : needs to be more dynamic like distance based for devices

    const diliveryPoints = randomCordinateGenerator(numberOfCordinates,fixed_location,range);

    //organing it better:not using for now
    const final_res : DataModel = {
        coordinates: diliveryPoints,
        numberOfVehicles: numberOfVehicles,
        maxDistancePerVehicle:maxDistancePerVehicle,
    };


    const pythonProces = exec('venv/bin/python route_solver.py',(error,stdout,stderr) =>{
        if(error){
            console.error(`Python error: ${error.message}`);
            return res.status(500).json({ 
                error: 'Route optimization failed', 
                details: error.message 
            });
        }
        if (stderr) {
            console.error(`Python stderr: ${stderr}`);
            return res.status(500).json({ 
                error: 'Python script error', 
                details: stderr 
            });
        }

        try {
            const routeData: RouteResponse = JSON.parse(stdout);
            return res.json(routeData);
        } catch (parseError) {
            const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error';
            return res.status(500).json({ 
                error: 'Failed to parse Python output', 
                details: errorMessage 
            });
        }
    });
    pythonProces.stdin?.write(JSON.stringify(final_res));
    pythonProces.stdin?.end();

});

app.listen(PORT,() => {
    console.log(`app running on sever ${PORT}`);
})


