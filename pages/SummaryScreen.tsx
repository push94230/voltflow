
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { resetSession } = useApp();

  // For demo, we use some static high values since the user might stop early
  const finalEnergy = 34.21;
  const finalCost = 632.88;
  const txId = "VF-" + Math.random().toString(36).substring(7).toUpperCase();

  const handleDone = () => {
    resetSession();
    navigate('/map');
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Charging Done</h2>
        <p className="text-gray-500 mb-12">Session ended successfully</p>

        <div className="w-full space-y-4">
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 font-medium">Total Energy</span>
            <span className="font-bold text-gray-800">{finalEnergy} kWh</span>
          </div>
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 font-medium">Total Cost</span>
            <span className="font-bold text-blue-600">₹{finalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-gray-500 font-medium">Tx ID</span>
            <span className="font-mono text-sm text-gray-800">{txId}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 safe-area-bottom">
        <button 
          className="w-full bg-blue-50 text-blue-700 font-bold py-4 rounded-xl shadow-sm"
        >
          Download Receipt
        </button>
        <button 
          onClick={handleDone}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl active:scale-95 transition-all"
        >
          Back to Map
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
