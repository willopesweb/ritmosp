import React from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import { CarInterface } from '../types';
const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cars } = useCars();
  const car = cars.find((car: CarInterface) => car.Id === Number(id));

  if (!car) {
    return <div>Carro não encontrado.</div>;
  }

  return (
    <div>
      <h1>{car.Modelo}</h1>
      <p>ID: {car.Id}</p>
      {/* Outros detalhes do carro */}
    </div>
  );
}

export default CarDetails;
