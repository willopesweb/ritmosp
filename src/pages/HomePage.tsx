import React from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../context/CarsContext';

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
          <ul>
            {cars.map((car) => (
              <li key={car.Id}>
                <Link to={`/carro/${car.Id}`}>{car.Modelo}</Link>
              </li>
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
