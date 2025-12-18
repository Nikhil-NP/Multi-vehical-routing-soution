export interface Coordinate{
    lat:number;
    lng:number;
}

export interface OptimizeRequest {
    numberOfCordinates: number;
    numberOfVehicles: number;
    range: number;
    depot?: {
        lat: number;
        lng: number;
    };
}

export interface OptimalParameters {
    maxDistancePerVehicle: number;
}

export interface DataModel {
    coordinates: Coordinate[];
    numberOfVehicles: number;
    maxDistancePerVehicle: number;
}

export interface RouteResponse {
    routes: number[][];
    coordinates: Coordinate[];
}
