import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import { CarInterface } from '../types';
import Loading from '../components/Loading/Loading';
import Icon from '../components/Icon';
import Button from '../components/Button/Button';
import { formatParamURL } from '../utils';


const CarPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading, error } = useCars();
  const [featuredPhoto, setFeaturedPhoto] = useState("");
  const car = cars ? cars.find((car: CarInterface) => formatParamURL(`${car.Modelo}${car.Versao}`) === id) : null;

  if (loading) {
    return <main>
      <div className="l-home__content">
        <Loading />
      </div>
    </main>;
  }


  if (error || !car) {
    return <main>
      <div className="l-home__content">
        {error ? error : "Carro não encontrado."}
      </div>
    </main>;
  }

  return (
    <main>
      <section className="l-car__content">
        <header className="l-car__header">
          <h1>{car.Modelo} {car.Versao} </h1>
        </header>
        <div className="l-car__info">
          <ul className="l-car__details">
            <li>
              <Icon icon="calendar" size="20" />
              {car.AnoFabricacao}/{car.AnoModelo}
            </li>
            <li>
              <Icon icon="star" size="20" />
              {car.Cor}
            </li>
            <li>
              <Icon icon="tachometer" size="20" />
              {car.Km.toLocaleString('pt-BR')} KM
            </li>
            <li>
              <Icon icon="location" size="20" />
              {car.Loja}
            </li>
            <li className="l-car__price">
              <span className="only">Por apenas</span>
              <b>{car.Preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
              <span className="interested">Interessado?</span>
              <Button link={true} href="#" target="_blank" label="Fale com um consultor">
                <Icon icon="whatsapp" size="40" />
              </Button>
            </li>
          </ul>
          <div className="l-car__photos">
            <div className="l-car__main-photo">
              <img src={featuredPhoto === "" && car.Fotos.length > 0 ? car.Fotos[0] : featuredPhoto} alt={`${car.Modelo} ${car.Versao}`} />
            </div>
            <ul className="l-car__photos-list">
              {car.Fotos.length > 0 && car.Fotos.map(photo => (
                <li key={photo} onClick={() => setFeaturedPhoto(photo)}><img height="100" width="100" loading="lazy" src={photo} /></li>
              ))}
            </ul>
          </div>
        </div>

        <article className="l-car__optionals">
          <h2 className="l-car__optionals-title">
            Opcionais
          </h2>
          <p>{car.Opcionais}</p>
        </article>
      </section>
    </main>
  );
}

export default CarPage;
