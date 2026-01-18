
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">VoltFlow</h1>
      <p className="text-xl opacity-90 mb-12 leading-relaxed">
        All EV Chargers.<br />One App. One Payment.
      </p>
      <button 
        onClick={() => navigate('/login')}
        className="w-full bg-white text-blue-700 font-bold py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-colors transform active:scale-95"
      >
        Continue
      </button>
      <p className="mt-8 text-sm opacity-60">Demo Version 1.0.0</p>
    </div>
  );
};

export default WelcomeScreen;
