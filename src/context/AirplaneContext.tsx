import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { AirplaneContext, airplaneReducer, initialState } from './airplaneStore';

interface AirplaneProviderProps {
  children: ReactNode;
}

export function AirplaneProvider({ children }: AirplaneProviderProps) {
  const [state, dispatch] = useReducer(airplaneReducer, initialState);

  return (
    <AirplaneContext.Provider value={{ state, dispatch }}>
      {children}
    </AirplaneContext.Provider>
  );
}
