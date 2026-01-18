
export type ConnectorStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';
export type ConnectorType = 'CCS2' | 'Type2' | 'CHAdeMO';

export interface Connector {
  type: ConnectorType;
  powerKW: number;
  status: ConnectorStatus;
}

export interface Station {
  id: string;
  name: string;
  operator: string;
  address: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
  pricePerKwh: number;
}

export interface UserState {
  walletBalance: number;
  currentStationId: string | null;
  selectedConnector: Connector | null;
  chargingSession: {
    startTime: number;
    energyDelivered: number;
    totalCost: number;
  } | null;
}
