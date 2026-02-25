import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertTriangle, Navigation, Info } from 'lucide-react';

// Fix for default Leaflet icon not showing correctly in React
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

// Create custom icons for disaster markers
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

const userIcon = createCustomIcon('#2563eb'); // Blue
const dangerIcon = createCustomIcon('#ef4444'); // Red
const warningIcon = createCustomIcon('#f59e0b'); // Amber

// Component to dynamically change map view
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function RiskMap() {
    const [userLocation, setUserLocation] = useState(null);
    const [geoError, setGeoError] = useState('');

    // Default to a central location (e.g., center of US)
    const defaultCenter = [39.8283, -98.5795];

    // Sample disaster data
    const sampleDisasters = [
        { id: 1, type: 'Wildfire', location: [34.0522, -118.2437], severity: 'high', desc: 'Active fire expanding NW. Evacuation orders in place.' }, // LA
        { id: 2, type: 'Flood Warning', location: [29.7604, -95.3698], severity: 'medium', desc: 'River levels rising safely but monitor conditions.' }, // Houston
        { id: 3, type: 'Hurricane Track', location: [25.7617, -80.1918], severity: 'high', desc: 'Category 3 expected landfall within 48h.' }, // Miami
        { id: 4, type: 'Earthquake', location: [37.7749, -122.4194], severity: 'medium', desc: 'Magnitude 4.2 recorded. Minor structural damage.' }, // SF
    ];

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    setGeoError('Location access denied. Displaying default view.');
                    console.error("Error getting location: ", error);
                }
            );
        } else {
            setGeoError('Geolocation is not supported by your browser.');
        }
    }, []);

    const currentCenter = userLocation || defaultCenter;

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MapPin className="h-8 w-8 text-primary-600" />
                        Global Climate Risk Map
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Real-time simulation of environmental hazards and warnings.</p>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="h-3 w-3 rounded-full bg-blue-600 border border-white"></div>
                        <span className="text-slate-700 dark:text-slate-300">You</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="h-3 w-3 rounded-full bg-red-500 border border-white"></div>
                        <span className="text-slate-700 dark:text-slate-300">Critical</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="h-3 w-3 rounded-full bg-amber-500 border border-white"></div>
                        <span className="text-slate-700 dark:text-slate-300">Warning</span>
                    </div>
                </div>
            </div>

            {geoError && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2 text-amber-800 dark:text-amber-300 text-sm">
                    <Info className="h-4 w-4 shrink-0" />
                    {geoError}
                </div>
            )}

            <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative z-0">
                <MapContainer
                    center={currentCenter}
                    zoom={userLocation ? 10 : 4}
                    className="h-full w-full"
                    zoomControl={false}
                >
                    {/* Light/Dark mode tile layers would ideally be switched based on theme, but standard OSM is used here for simplicity and reliability */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <ChangeView center={currentCenter} zoom={userLocation ? 6 : 4} />

                    {/* User Location Marker */}
                    {userLocation && (
                        <Marker position={userLocation} icon={userIcon}>
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-slate-900">Your Location</h3>
                                    <p className="text-sm text-slate-600 mt-1">Status: Safe</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {/* Disaster Markers */}
                    {sampleDisasters.map((disaster) => (
                        <Marker
                            key={disaster.id}
                            position={disaster.location}
                            icon={disaster.severity === 'high' ? dangerIcon : warningIcon}
                        >
                            <Popup>
                                <div className="p-1 max-w-[200px]">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <AlertTriangle className={`h-4 w-4 ${disaster.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                                        <h3 className="font-bold text-slate-900">{disaster.type}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2">{disaster.desc}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Floating locate button */}
                <button
                    onClick={() => {
                        if (userLocation) {
                            // This is handled by React state, but we could trigger Map `flyTo` here
                            // For simplicity, changing the center state would re-render. Since we use `ChangeView`, 
                            // it automatically flies to `currentCenter`.
                            setUserLocation([...userLocation]);
                        }
                    }}
                    className="absolute bottom-6 right-6 z-[1000] bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    title="Go to my location"
                >
                    <Navigation className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
