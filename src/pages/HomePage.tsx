import React from 'react';
import { useCars } from '../context/CarsContext';
import Car from '../components/Car/Car';

const Home = () => {
  const { cars, loading, error } = useCars();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main >
      <div className="l-home__content">
        {cars.length > 0 ? (

          <ul className="l-home__cars">
            {cars.map((car) => (
              <Car key={car.Id} car={car} />
            ))}
          </ul>
        ) : (
          <div>Nenhum carro encontrado.</div>
        )}
      </div>
    </main>
  );
}

export default Home;
