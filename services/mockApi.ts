
import { Station } from '../types';

export const mockStations: Station[] = [
  // DELHI NCR
  {
    id: "st-001",
    name: "Tata Power EZ - Mall of India",
    operator: "Tata Power",
    address: "Sector 18, Noida, Uttar Pradesh",
    latitude: 28.5677,
    longitude: 77.3213,
    pricePerKwh: 18.5,
    connectors: [
      { type: "CCS2", powerKW: 60, status: "AVAILABLE" },
      { type: "CCS2", powerKW: 25, status: "BUSY" }
    ]
  },
  {
    id: "st-002",
    name: "Jio-bp pulse - CyberHub",
    operator: "Jio-bp",
    address: "DLF Cyber City, Gurgaon, Haryana",
    latitude: 28.4951,
    longitude: 77.0878,
    pricePerKwh: 21.0,
    connectors: [
      { type: "CCS2", powerKW: 120, status: "AVAILABLE" },
      { type: "Type2", powerKW: 22, status: "AVAILABLE" }
    ]
  },
  // BENGALURU
  {
    id: "st-006",
    name: "Zeon Charging - Indiranagar",
    operator: "Zeon",
    address: "100 Feet Rd, Bengaluru, Karnataka",
    latitude: 12.9716,
    longitude: 77.6412,
    pricePerKwh: 22.0,
    connectors: [{ type: "CCS2", powerKW: 50, status: "AVAILABLE" }]
  },
  // MUMBAI
  {
    id: "st-009",
    name: "Adani Gas EV - BKC",
    operator: "Adani",
    address: "Bandra Kurla Complex, Mumbai",
    latitude: 19.0607,
    longitude: 72.8633,
    pricePerKwh: 20.0,
    connectors: [{ type: "CCS2", powerKW: 60, status: "AVAILABLE" }]
  },
  // CHENNAI
  {
    id: "st-014",
    name: "Relux Charging - T.Nagar",
    operator: "Relux",
    address: "G N Chetty Rd, Chennai, Tamil Nadu",
    latitude: 13.0418,
    longitude: 80.2341,
    pricePerKwh: 19.0,
    connectors: [{ type: "CCS2", powerKW: 30, status: "AVAILABLE" }]
  },
  // KOCHI
  {
    id: "st-016",
    name: "KSEB - Marine Drive",
    operator: "KSEB",
    address: "Shanmugham Rd, Kochi, Kerala",
    latitude: 9.9796,
    longitude: 76.2764,
    pricePerKwh: 15.5,
    connectors: [{ type: "CCS2", powerKW: 60, status: "AVAILABLE" }]
  },
  // KOLKATA
  {
    id: "st-018",
    name: "West Bengal SEB - Salt Lake",
    operator: "WBSEDCL",
    address: "Sector V, Bidhannagar, Kolkata",
    latitude: 22.5735,
    longitude: 88.4331,
    pricePerKwh: 16.5,
    connectors: [{ type: "CCS2", powerKW: 50, status: "AVAILABLE" }]
  },
  // CENTRAL INDIA (Indore/Bhopal/Raipur)
  {
    id: "st-020",
    name: "Indore Smart City - Vijay Nagar",
    operator: "ISCDL",
    address: "AB Road, Indore, Madhya Pradesh",
    latitude: 22.7533,
    longitude: 75.8937,
    pricePerKwh: 14.0,
    connectors: [{ type: "CCS2", powerKW: 30, status: "AVAILABLE" }]
  },
  {
    id: "st-022",
    name: "Magneto Mall Charging",
    operator: "Statiq",
    address: "GE Road, Raipur, Chhattisgarh",
    latitude: 21.2400,
    longitude: 81.6700,
    pricePerKwh: 18.0,
    connectors: [{ type: "CCS2", powerKW: 50, status: "AVAILABLE" }]
  },
  {
    id: "st-023",
    name: "VIP Road Hub",
    operator: "Tata Power",
    address: "VIP Road, Raipur, Chhattisgarh",
    latitude: 21.2150,
    longitude: 81.7100,
    pricePerKwh: 19.5,
    connectors: [{ type: "CCS2", powerKW: 30, status: "AVAILABLE" }]
  },
  // GUJARAT (Ahmedabad/Surat)
  {
    id: "st-024",
    name: "Riverfront Charging Station",
    operator: "AMC",
    address: "Sabarmati Riverfront, Ahmedabad, Gujarat",
    latitude: 23.0225,
    longitude: 72.5714,
    pricePerKwh: 15.0,
    connectors: [{ type: "CCS2", powerKW: 60, status: "AVAILABLE" }]
  },
  {
    id: "st-025",
    name: "Jio-bp pulse - Dumas Road",
    operator: "Jio-bp",
    address: "Magdalla, Surat, Gujarat",
    latitude: 21.1702,
    longitude: 72.8311,
    pricePerKwh: 21.5,
    connectors: [{ type: "CCS2", powerKW: 120, status: "AVAILABLE" }]
  },
  {
    id: "st-026",
    name: "Shell Recharge - SG Highway",
    operator: "Shell",
    address: "Bodakdev, Ahmedabad, Gujarat",
    latitude: 23.0400,
    longitude: 72.5100,
    pricePerKwh: 24.0,
    connectors: [{ type: "CCS2", powerKW: 60, status: "BUSY" }]
  },
  // RAJASTHAN (Jaipur/Udaipur)
  {
    id: "st-027",
    name: "World Trade Park Mall",
    operator: "REIL",
    address: "Malviya Nagar, Jaipur, Rajasthan",
    latitude: 26.8500,
    longitude: 75.8000,
    pricePerKwh: 16.0,
    connectors: [{ type: "CCS2", powerKW: 50, status: "AVAILABLE" }]
  },
  {
    id: "st-028",
    name: "Fateh Sagar Lake Hub",
    operator: "Statiq",
    address: "Fateh Sagar, Udaipur, Rajasthan",
    latitude: 24.6000,
    longitude: 73.6800,
    pricePerKwh: 19.0,
    connectors: [{ type: "CCS2", powerKW: 30, status: "AVAILABLE" }]
  },
  {
    id: "st-029",
    name: "Fortum - Mansarovar",
    operator: "Fortum",
    address: "Mansarovar Sector 10, Jaipur",
    latitude: 26.8600,
    longitude: 75.7600,
    pricePerKwh: 21.0,
    connectors: [{ type: "CCS2", powerKW: 60, status: "AVAILABLE" }]
  }
];

export const fetchStations = async (): Promise<Station[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockStations;
};

export const fetchStationById = async (id: string): Promise<Station | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockStations.find(s => s.id === id);
};
