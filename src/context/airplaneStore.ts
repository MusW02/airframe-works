import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { Airplane, FilterOptions } from '../types/airplane';
import airplaneData from '../data/airplanes.json';

export interface AirplaneState {
  airplanes: Airplane[];
  filters: FilterOptions;
  selectedAirplane: Airplane | null;
  loading: boolean;
}

export type AirplaneAction =
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_SELECTED_AIRPLANE'; payload: Airplane | null }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean };

export const initialState: AirplaneState = {
  airplanes: airplaneData as Airplane[],
  filters: {},
  selectedAirplane: null,
  loading: false,
};

export function airplaneReducer(state: AirplaneState, action: AirplaneAction): AirplaneState {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_SELECTED_AIRPLANE':
      return {
        ...state,
        selectedAirplane: action.payload,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {},
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export const AirplaneContext = createContext<{
  state: AirplaneState;
  dispatch: Dispatch<AirplaneAction>;
} | null>(null);

export function useAirplane() {
  const context = useContext(AirplaneContext);
  if (!context) {
    throw new Error('useAirplane must be used within an AirplaneProvider');
  }
  return context;
}