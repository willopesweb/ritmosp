import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCars } from '../api/adsetApi';
import { CarInterface, BrandInterface, LojaInterface } from '../types';
import { fetchLojas } from '../api/wordpressApi';

interface CarContextProps {
  cars: CarInterface[];
  brands: BrandInterface[];
  loading: boolean;
  error: string | null;
  loja: LojaInterface | null;
  setLoja: (loja: LojaInterface) => void;
  lojas: LojaInterface[];
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [lojas, setLojas] = useState<LojaInterface[]>([]);
  const [loja, setLoja] = useState<LojaInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRequests, lojasData] = await Promise.all([fetchCarsJSON(), fetchLojas()]);

        const successfulResponses = carRequests.filter(cars => cars.length > 0);
        if (successfulResponses.length > 0) {
          const mergedCars = successfulResponses.flat();
          setCars(mergedCars);
          setBrands(extractBrandsAndModels(mergedCars));
          setError(null);
        } else {
          setError('Nenhum carro encontrado.');
        }

        setLojas(lojasData);
      } catch (error) {
        setError('Erro ao buscar dados. Verifique sua conexão com a internet.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const fetchCarsJSON = async (): Promise<Array<CarInterface[]>> => {
    try {
      const fetchedCars = await fetchCars();
      return fetchedCars;
    } catch (error) {
      console.error(`Erro ao buscar carros`, error);
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
    <CarContext.Provider value={{ cars, brands, loading, error, loja, setLoja, lojas }}>
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
