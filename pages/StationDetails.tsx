
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fetchStationById } from '../services/mockApi';
import { Station, Connector } from '../types';

const StationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectStation, selectConnector } = useApp();
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocalConnector, setSelectedLocalConnector] = useState<Connector | null>(null);

  useEffect(() => {
    if (id) {
      fetchStationById(id).then(data => {
        if (data) setStation(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="animate-pulse flex flex-col items-center w-full">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-12"></div>
        <div className="h-32 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  if (!station) return <div>Station not found</div>;

  const handleStartCharging = () => {
    if (selectedLocalConnector) {
      selectStation(station.id);
      selectConnector(selectedLocalConnector);
      navigate('/payment');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full">
      {/* Header Image Area */}
      <div className="h-48 bg-blue-700 relative flex items-end p-6">
        <button 
          onClick={() => navigate('/map')} 
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="text-white">
          <h2 className="text-2xl font-bold leading-tight">{station.name}</h2>
          <p className="text-sm opacity-80">{station.operator} • {station.address}</p>
        </div>
      </div>

      <div className="flex-1 p-4 -mt-4 bg-gray-50 rounded-t-3xl overflow-y-auto">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase block">Charging Cost</span>
            <span className="text-xl font-bold text-blue-600">₹{station.pricePerKwh}/kWh</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 font-bold uppercase block">Avg. Wait</span>
            <span className="text-lg font-medium text-gray-700">~15 mins</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 px-1">Select Connector</h3>
        <div className="space-y-3 mb-24">
          {station.connectors.map((c, i) => (
            <div 
              key={i}
              onClick={() => c.status === 'AVAILABLE' && setSelectedLocalConnector(c)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                c.status !== 'AVAILABLE' ? 'opacity-50 grayscale bg-gray-100 border-transparent cursor-not-allowed' :
                selectedLocalConnector === c ? 'border-blue-600 bg-blue-50' : 'border-white bg-white shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${selectedLocalConnector === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{c.type}</div>
                    <div className="text-sm text-gray-500 font-medium">{c.powerKW}kW Fast Charging</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                  c.status === 'AVAILABLE' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                }`}>
                  {c.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistent Call-to-Action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <button 
          onClick={handleStartCharging}
          disabled={!selectedLocalConnector}
          className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${
            selectedLocalConnector ? 'bg-blue-600 text-white active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedLocalConnector ? 'Confirm Selection' : 'Choose a Connector'}
        </button>
      </div>
    </div>
  );
};

export default StationDetails;
