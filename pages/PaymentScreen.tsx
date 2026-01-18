
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateWallet, startCharging } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated estimated cost based on average session (30kWh)
  const estimatedCost = 540.00;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      startCharging();
      navigate('/charging');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
      <button onClick={() => navigate(-1)} className="mb-6 self-start p-2 hover:bg-gray-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <h2 className="text-2xl font-bold mb-6">Confirm Payment</h2>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Wallet Balance</span>
          <span className="font-bold">₹{user.walletBalance.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Estimated (30kWh)</span>
          <span className="font-bold text-blue-600">₹{estimatedCost.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 mb-6"></div>
        <p className="text-xs text-gray-400 italic leading-relaxed text-center">
          Note: You only pay for the actual energy delivered. Final amount will be deducted after the session.
        </p>
      </div>

      <div className="space-y-4 mb-auto">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Payment Method</label>
        
        <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800">VoltFlow Wallet</span>
          </div>
          <div className="w-5 h-5 rounded-full border-4 border-blue-600 bg-blue-600"></div>
        </div>

        <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between opacity-50 grayscale">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-black italic text-purple-600">UPI</span>
            </div>
            <span className="font-medium">Google Pay / PhonePe</span>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
        </div>
      </div>

      <button 
        onClick={handlePay}
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Authorizing...</span>
          </>
        ) : (
          <span>Authorize Session</span>
        )}
      </button>
    </div>
  );
};

export default PaymentScreen;
