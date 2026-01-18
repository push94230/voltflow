
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-8 bg-white">
      <button onClick={() => navigate('/welcome')} className="self-start mb-12 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      
      <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-8">Sign in to start charging your EV anywhere.</p>

      <div className="space-y-4 mb-auto">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase">Phone Number</label>
          <input 
            type="text" 
            placeholder="+91 98765 43210" 
            disabled
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => navigate('/map')}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md transition-colors hover:bg-blue-700"
        >
          Continue in Demo Mode
        </button>
        <p className="text-center text-xs text-gray-400 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
