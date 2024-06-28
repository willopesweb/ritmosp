import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createAdsetApiRequest, fetchCars } from '../api/adsetApi';
import { CarInterface } from '../types';
import { Lojas } from '../lojas';

interface CarContextProps {
  cars: CarInterface[];
  loading: boolean;
  error: string | null;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const carRequests = Lojas.map(loja => getCars(loja.cnpj));
        const allCarsResponses = await Promise.all(carRequests);

        const successfulResponses = allCarsResponses.filter(cars => cars.length > 0);
        if (successfulResponses.length > 0) {
          const mergedCars = successfulResponses.flat();
          setCars(mergedCars);
          setError(null); // Reset error if we have successful responses
        } else {
          setError('Erro ao buscar carros.');
        }
      } catch (error) {
        setError('Erro ao buscar carros.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllCars();
  }, []);

  const getCars = async (cnpj: string) => {
    try {
      const request = createAdsetApiRequest(cnpj);
      const fetchedCars = await fetchCars(request);
      return fetchedCars;
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      return [];
    }
  }

  return (
    <CarContext.Provider value={{ cars, loading, error }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCars = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
