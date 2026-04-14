import type { Airplane, FilterOptions, SearchSuggestion } from '../types/airplane';

export function searchAirplanes(airplanes: Airplane[], query: string): Airplane[] {
  if (!query.trim()) return airplanes;
  
  const searchTerm = query.toLowerCase();
  
  return airplanes.filter(airplane => {
    const searchableText = [
      airplane.name,
      airplane.manufacturer,
      airplane.model,
      airplane.type,
      airplane.description,
      ...airplane.features,
      ...airplane.variants,
      ...airplane.operators
    ].join(' ').toLowerCase();
    
    return searchableText.includes(searchTerm);
  });
}

export function filterAirplanes(airplanes: Airplane[], filters: FilterOptions): Airplane[] {
  return airplanes.filter(airplane => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true;
      
      switch (key) {
        case 'manufacturer':
          return airplane.manufacturer === value;
        case 'type':
          return airplane.type === value;
        case 'passengerRange':
          return checkPassengerRange(airplane.specifications.capacity.passengers, value);
        case 'rangeCategory':
          return getRangeCategory(airplane.specifications.performance.range) === value;
        case 'status':
          return airplane.status === value;
        case 'searchQuery':
          return searchAirplanes([airplane], value).length > 0;
        default:
          return true;
      }
    });
  });
}

export function getSearchSuggestions(airplanes: Airplane[], query: string): SearchSuggestion[] {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const suggestions: SearchSuggestion[] = [];
  
  // Add exact matches first
  airplanes.forEach(airplane => {
    if (airplane.name.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        id: airplane.id,
        name: airplane.name,
        manufacturer: airplane.manufacturer,
        model: airplane.model
      });
    }
  });
  
  // Add partial matches
  airplanes.forEach(airplane => {
    if (airplane.manufacturer.toLowerCase().includes(searchTerm) ||
        airplane.model.toLowerCase().includes(searchTerm)) {
      if (!suggestions.some(s => s.id === airplane.id)) {
        suggestions.push({
          id: airplane.id,
          name: airplane.name,
          manufacturer: airplane.manufacturer,
          model: airplane.model
        });
      }
    }
  });
  
  return suggestions.slice(0, 5); // Limit to 5 suggestions
}

export function getRangeCategory(range: number): string {
  if (range < 3000) return 'short-haul';
  if (range < 6000) return 'medium-haul';
  if (range < 12000) return 'long-haul';
  return 'ultra-long-haul';
}

function checkPassengerRange(passengers: number, range: string): boolean {
  const [min, max] = range.split('-').map(Number);
  return passengers >= min && passengers <= max;
}

export function getUniqueManufacturers(airplanes: Airplane[]): string[] {
  const manufacturers = new Set(airplanes.map(a => a.manufacturer));
  return Array.from(manufacturers).sort();
}

export function getPassengerRanges(): { label: string; value: string }[] {
  return [
    { label: 'All Sizes', value: 'all' },
    { label: 'Business Jets (0-50)', value: '0-50' },
    { label: 'Regional (50-100)', value: '50-100' },
    { label: 'Narrow-body (100-200)', value: '100-200' },
    { label: 'Small Wide-body (200-300)', value: '200-300' },
    { label: 'Large Wide-body (300+)', value: '300-1000' }
  ];
}

export function getRangeCategories(): { label: string; value: string }[] {
  return [
    { label: 'All Ranges', value: 'all' },
    { label: 'Short-haul (0-3,000 km)', value: 'short-haul' },
    { label: 'Medium-haul (3,000-6,000 km)', value: 'medium-haul' },
    { label: 'Long-haul (6,000-12,000 km)', value: 'long-haul' },
    { label: 'Ultra-long-haul (12,000+ km)', value: 'ultra-long-haul' }
  ];
}

export function getAircraftTypes(): { label: string; value: string }[] {
  return [
    { label: 'All Types', value: 'all' },
    { label: 'Narrow-body', value: 'Narrow-body' },
    { label: 'Wide-body', value: 'Wide-body' },
    { label: 'Regional', value: 'Regional' },
    { label: 'Business Jet', value: 'Business Jet' }
  ];
}

export function getStatusOptions(): { label: string; value: string }[] {
  return [
    { label: 'All Status', value: 'all' },
    { label: 'In Production', value: 'In Production' },
    { label: 'Out of Production', value: 'Out of Production' },
    { label: 'Development', value: 'Development' }
  ];
}