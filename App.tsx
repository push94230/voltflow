
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import MapScreen from './pages/MapScreen';
import StationDetails from './pages/StationDetails';
import PaymentScreen from './pages/PaymentScreen';
import ChargingScreen from './pages/ChargingScreen';
import SummaryScreen from './pages/SummaryScreen';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="max-w-md mx-auto h-screen bg-white shadow-xl relative overflow-hidden flex flex-col">
          <Routes>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/station/:id" element={<StationDetails />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/charging" element={<ChargingScreen />} />
            <Route path="/summary" element={<SummaryScreen />} />
            <Route path="/" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
