export type AircraftType = 'Narrow-body' | 'Wide-body' | 'Regional' | 'Business Jet';
export type ProductionStatus = 'In Production' | 'Out of Production' | 'Development';

export interface AirplaneSpecifications {
  capacity: {
    passengers: number;
    crew: number;
  };
  dimensions: {
    length: number; // meters
    wingspan: number; // meters
    height: number; // meters
  };
  performance: {
    range: number; // km
    cruiseSpeed: number; // km/h
    maxSpeed: number; // km/h
  };
  weights: {
    empty: number; // kg
    maxTakeoff: number; // kg
  };
}

export interface Airplane {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  type: AircraftType;
  firstFlight: string;
  introduction: string;
  status: ProductionStatus;
  
  specifications: AirplaneSpecifications;
  
  images: string[];
  thumbnails: string[];
  threeDModel?: string; // GLTF/GLB file path
  
  variants: string[];
  operators: string[];
  description: string;
  features: string[];
}

export interface FilterOptions {
  manufacturer?: string;
  type?: AircraftType;
  passengerRange?: string;
  rangeCategory?: string;
  status?: ProductionStatus;
  searchQuery?: string;
}

export interface SearchSuggestion {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
}