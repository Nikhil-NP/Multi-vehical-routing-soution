'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

interface DepotPickerProps {
    lat: number;
    lng: number;
    onLocationSelect: (lat: number, lng: number) => void;
}

// Custom red marker icon for depot
const depotIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function LocationMarker({ lat, lng, onLocationSelect }: DepotPickerProps) {
    const [position, setPosition] = useState<L.LatLng>(new L.LatLng(lat, lng));

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return <Marker position={position} icon={depotIcon} />;
}

export default function DepotPicker({ lat, lng, onLocationSelect }: DepotPickerProps) {
    return (
        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
            <MapContainer
                center={[lat, lng]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker lat={lat} lng={lng} onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
}
