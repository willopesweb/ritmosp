import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createAdsetApiRequest, fetchCars } from '../api/adsetApi';
import { CarInterface, BrandInterface } from '../types';
import { Lojas } from '../lojas';

interface CarContextProps {
  cars: CarInterface[];
  brands: BrandInterface[];
  loading: boolean;
  error: string | null;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const carRequests = Lojas.map(loja => fetchCarsByCNPJ(loja.cnpj));
        const allCarsResponses = await Promise.all(carRequests);

        const successfulResponses = allCarsResponses.filter(cars => cars.length > 0);
        if (successfulResponses.length > 0) {
          const mergedCars = successfulResponses.flat();
          setCars(mergedCars);
          setBrands(extractBrandsAndModels(mergedCars)); // Atualiza o estado brands
          setError(null); // Reset error if we have successful responses
        } else {
          setError('Nenhum carro encontrado.');
        }
      } catch (error) {
        setError('Erro ao buscar carros. Verifique sua conexão com a internet.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllCars();
  }, []);

  const fetchCarsByCNPJ = async (cnpj: string): Promise<CarInterface[]> => {
    try {
      const request = createAdsetApiRequest(cnpj);
      const fetchedCars = await fetchCars(request);
      return fetchedCars;
    } catch (error) {
      console.error(`Erro ao buscar carros para o CNPJ ${cnpj}:`, error);
      return [];
    }
  }

  const extractBrandsAndModels = (cars: CarInterface[]): BrandInterface[] => {
    const brandMap: { [key: string]: Set<string> } = {};

    cars.forEach(car => {
      if (!brandMap[car.Marca]) {
        brandMap[car.Marca] = new Set();
      }
      brandMap[car.Marca].add(car.Modelo);
    });

    return Object.entries(brandMap).map(([brand, modelosSet]) => ({
      brand,
      models: Array.from(modelosSet),
    }));
  }

  return (
    <CarContext.Provider value={{ cars, brands, loading, error }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCars = (): CarContextProps => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
