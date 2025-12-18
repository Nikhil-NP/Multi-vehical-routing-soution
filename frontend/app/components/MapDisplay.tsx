'use client';

import {MapContainer, Polyline, TileLayer, Popup, Marker} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


//not using leaflet default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize:[25,41],
    iconAnchor:[12,41],
})

// Depot icon (red/different color)
const DepotIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Delivery point icon (blue)
const DeliveryIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

//types
interface Coordinate {
    lat:number;
    lng:number;
}

interface MapDisplayProps {
    routes :number[][];
    coordinates : Coordinate[];
}

const ROUTE_COLORS = [
    '#EF4444', // red
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // orange
  '#8B5CF6', // purple
  '#EC4899', // pink
];

export default function MapDisplay({ routes,coordinates}:MapDisplayProps){
    const center : [number,number] = [coordinates[0].lat,coordinates[0].lng];

    return (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
            <MapContainer
                center={center}
                zoom={11}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                {/*map title */}
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/*route as polylines */}
                {routes.map((route,vehicleIndex) => {
                    const routeCoordinates: [number,number][] = route.map(
                        (pointIndex) => [
                            coordinates[pointIndex].lat,
                            coordinates[pointIndex].lng,
                        ]
                    );
                    return (
                        <Polyline
                            key={vehicleIndex}
                            positions={routeCoordinates}
                            pathOptions={{
                                color:ROUTE_COLORS[vehicleIndex % ROUTE_COLORS.length],
                                weight:4,
                                opacity: 0.7,

                                }}
                        />
                    );
                })}

                {/* markers for all points */}
                {coordinates.map((coord, index) => (
                <Marker 
                    key={index} 
                    position={[coord.lat, coord.lng]}
                    icon={index === 0 ? DepotIcon : DeliveryIcon}
                >
                    <Popup>
                        <div className="text-sm">
                            <strong>{index === 0 ? '🏢 Depot' : `📦 Delivery ${index}`}</strong>
                            <br />
                            Lat: {coord.lat.toFixed(5)}
                            <br />
                            Lng: {coord.lng.toFixed(5)}
                        </div>
                    </Popup>    
                </Marker>
                ))}
            </MapContainer>
        </div>
    )
}