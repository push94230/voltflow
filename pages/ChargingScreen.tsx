
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ChargingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, stopCharging } = useApp();
  const [stats, setStats] = useState({
    timeElapsed: 0,
    energy: 0,
    cost: 0,
    power: 58.4 // Dynamic power variation
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newEnergy = prev.energy + (prev.power / 3600); // Simple 1-second increment
        const newCost = newEnergy * 18.5; // Fixed mock rate for demo
        return {
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
          energy: newEnergy,
          cost: newCost,
          power: 58 + (Math.random() * 2 - 1) // Simulate power fluctuations
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    stopCharging();
    navigate('/summary');
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 items-center">
      <div className="mt-12 mb-12 relative flex items-center justify-center">
        {/* Animated concentric rings */}
        <div className="absolute w-64 h-64 border-[16px] border-blue-100 rounded-full"></div>
        <div 
          className="absolute w-64 h-64 border-[16px] border-blue-600 rounded-full animate-pulse border-t-transparent"
          style={{ transform: `rotate(${stats.timeElapsed * 10}deg)` }}
        ></div>
        <div className="z-10 text-center">
          <span className="text-sm font-bold text-blue-600 block mb-1">CHARGING</span>
          <span className="text-5xl font-black text-gray-800">{Math.round((stats.energy / 40) * 100)}%</span>
          <span className="text-xs text-gray-400 block mt-2">Target: 80%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Time</span>
          <span className="text-2xl font-bold text-gray-800 font-mono">{formatTime(stats.timeElapsed)}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Power</span>
          <span className="text-2xl font-bold text-gray-800">{stats.power.toFixed(1)} <span className="text-xs">kW</span></span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Energy</span>
          <span className="text-2xl font-bold text-gray-800">{stats.energy.toFixed(2)} <span className="text-xs">kWh</span></span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Cost</span>
          <span className="text-2xl font-bold text-blue-600">₹{stats.cost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex-1"></div>

      <button 
        onClick={handleStop}
        className="w-full bg-red-100 text-red-600 font-bold py-4 rounded-2xl transition-all active:scale-95 border-2 border-red-200"
      >
        Stop Charging
      </button>
    </div>
  );
};

export default ChargingScreen;
