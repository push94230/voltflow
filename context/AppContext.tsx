
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserState, Station, Connector } from '../types';

interface AppContextType {
  user: UserState;
  stations: Station[];
  setStations: (stations: Station[]) => void;
  selectStation: (stationId: string | null) => void;
  selectConnector: (connector: Connector | null) => void;
  startCharging: () => void;
  stopCharging: () => void;
  updateWallet: (amount: number) => void;
  resetSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [user, setUser] = useState<UserState>({
    walletBalance: 450,
    currentStationId: null,
    selectedConnector: null,
    chargingSession: null,
  });

  const selectStation = (stationId: string | null) => {
    setUser(prev => ({ ...prev, currentStationId: stationId }));
  };

  const selectConnector = (connector: Connector | null) => {
    setUser(prev => ({ ...prev, selectedConnector: connector }));
  };

  const startCharging = () => {
    setUser(prev => ({
      ...prev,
      chargingSession: {
        startTime: Date.now(),
        energyDelivered: 0,
        totalCost: 0
      }
    }));
  };

  const stopCharging = () => {
    // Keep the session for summary screen
  };

  const updateWallet = (amount: number) => {
    setUser(prev => ({ ...prev, walletBalance: prev.walletBalance - amount }));
  };

  const resetSession = () => {
    setUser(prev => ({
      ...prev,
      currentStationId: null,
      selectedConnector: null,
      chargingSession: null
    }));
  };

  return (
    <AppContext.Provider value={{ 
      user, stations, setStations, selectStation, selectConnector, 
      startCharging, stopCharging, updateWallet, resetSession 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
