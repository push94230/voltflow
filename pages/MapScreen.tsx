
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fetchStations } from '../services/mockApi';
import { Station, ConnectorStatus } from '../types';

declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void;
  }
}

const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, stations, setStations } = useApp();
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstance = useRef<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    window.gm_authFailure = () => setMapError(true);

    const loadInitialData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => console.log("Location access denied")
        );
      }
      const data = await fetchStations();
      setStations(data);
      setLoading(false);
    };
    loadInitialData();
  }, [setStations]);

  useEffect(() => {
    if (!loading && mapRef.current && !mapError && window.google?.maps) {
      const center = userLocation || { lat: 28.5800, lng: 77.2000 };
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        clickableIcons: false,
        styles: [
          { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
          { "featureType": "transit", "stylers": [{ "visibility": "simplified" }] }
        ]
      });
      googleMapInstance.current = map;

      stations.forEach(station => {
        const bestStatus = station.connectors.some(c => c.status === 'AVAILABLE') ? 'AVAILABLE' : 
                          station.connectors.some(c => c.status === 'BUSY') ? 'BUSY' : 'OFFLINE';
        const color = bestStatus === 'AVAILABLE' ? '#10b981' : bestStatus === 'BUSY' ? '#f59e0b' : '#9ca3af';
        
        const marker = new window.google.maps.Marker({
          position: { lat: station.latitude, lng: station.longitude },
          map,
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#fff',
            scale: 1.5,
            anchor: new window.google.maps.Point(12, 24)
          }
        });
        marker.addListener('click', () => navigate(`/station/${station.id}`));
      });
    }
  }, [loading, stations, navigate, mapError, userLocation]);

  const sortedStations = [...stations].sort((a, b) => {
    if (!userLocation) return 0;
    return calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude) - 
           calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
  });

  return (
    <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
      {/* Search Header */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl flex items-center p-3 border border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input type="text" placeholder="Search 150+ chargers nearby..." className="flex-1 outline-none text-sm font-medium" />
        </div>
      </div>

      <div ref={mapRef} className="flex-1 bg-gray-50 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        )}

        {(mapError || !window.google?.maps) && !loading && (
          <div className="absolute inset-0 flex flex-col p-4 pt-24 bg-gray-50 overflow-y-auto pb-32">
            <div className="bg-blue-600 text-white p-5 rounded-3xl mb-6 shadow-lg shadow-blue-100">
              <h3 className="font-bold text-lg mb-1">VoltFlow Discovery</h3>
              <p className="text-xs opacity-80 font-medium">Showing the most reliable chargers across major metros.</p>
            </div>
            
            <div className="space-y-4">
              {sortedStations.map(s => (
                <div key={s.id} onClick={() => navigate(`/station/${s.id}`)} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 active:scale-95 transition-all flex items-center">
                  <div className="bg-gray-50 p-3 rounded-2xl mr-4">
                    <div className={`w-3 h-3 rounded-full ${s.connectors.some(c => c.status === 'AVAILABLE') ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 truncate">{s.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase truncate">{s.operator} • {s.address}</div>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-sm font-black text-blue-600">₹{s.pricePerKwh}</div>
                    <div className="text-[9px] text-gray-400 uppercase font-black">/kWh</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wallet Bar */}
      <div className="bg-white p-4 border-t border-gray-100 flex items-center justify-between shadow-2xl safe-area-bottom z-40">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Unified Balance</div>
            <div className="font-black text-gray-800 text-xl leading-none">₹{user.walletBalance.toFixed(0)}</div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200">
          Recharge
        </button>
      </div>
    </div>
  );
};

export default MapScreen;
