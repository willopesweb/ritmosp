import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import { CarInterface } from '../types';
import Loading from '../components/Loading/Loading';
import Icon from '../components/Icon';
import Button from '../components/Button/Button';
import { formatParamURL, formatPhoneNumber } from '../utils';
import Image from '../components/Image/Image';
import Car from '../components/Car/Car';
import Form from '../components/Form/Form';


const CarPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading, error, loja } = useCars();
  const [filteredCars, setFilteredCars] = useState<CarInterface[]>([]);
  const [featuredPhoto, setFeaturedPhoto] = useState("");
  const car = cars ? cars.find((car: CarInterface) => formatParamURL(`${car.Modelo}${car.Versao}`) === id) : null;

  useEffect(() => {
    if (car) {
      const relatedCars = cars.filter((relatedCar) => relatedCar.Marca === car.Marca && relatedCar.Id !== car.Id);
      setFilteredCars(relatedCars);
    }
  }, [car, cars]);

  useEffect(() => {
    if (car && car.Fotos.length > 0) setFeaturedPhoto(car.Fotos[0]);
  }, [car]);

  if (loading) {
    return <main>
      <div className="l-page__content">
        <Loading />
      </div>
    </main>;
  }

  if (error || !car) {
    return <main>
      <div className="l-page__content">
        {error ? error : "Carro não encontrado."}
      </div>
    </main>;
  }

  return (
    <main className="l-car">
      <section className="l-car__content">
        <header className="l-car__header">
          <h1>{car.Modelo} {car.Versao} </h1>
        </header>
        <div className="l-car__info">
          <div className="l-car__photos">
            <Image
              containerClass="l-car__main-photo"
              src={featuredPhoto === "" && car.Fotos.length > 0 ? car.Fotos[0] : featuredPhoto}
              alt={`${car.Modelo} ${car.Versao}`}
            />
            <div className="l-car__photos-list">
              <ul>
                {car.Fotos.length > 0 && car.Fotos.map(photo => (
                  <li className={featuredPhoto === photo ? "is-active" : ""} key={photo} onClick={() => setFeaturedPhoto(photo)}>
                    <Image
                      height="100"
                      width="100"
                      loading="lazy"
                      src={photo} />
                  </li>
                ))}
              </ul>
            </div>
            <ul className="l-car__details">
              <li>
                <Icon icon="calendar" size="30" />
                <div>
                  <span>Ano/Modelo</span>
                  <p>{car.AnoFabricacao}/{car.AnoModelo}</p>
                </div>
              </li>
              <li>
                <Icon icon="star" size="30" />
                <div>
                  <span>Cor</span>
                  <p>{car.Cor}</p>
                </div>
              </li>
              <li>
                <Icon icon="tachometer" size="30" />
                <div>
                  <span>Quilometragem</span>
                  <p>{car.Km && car.Km.toLocaleString('pt-BR')} KM</p>
                </div>
              </li>
              <li>
                <Icon icon="cog" size="30" />
                <div>
                  <span>Combustível</span>
                  <p>{car.Combustivel}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="l-car__main">
            <div className="l-car__price">
              <div className="l-car__address">
                <Icon icon="location" size="30" />
                <p>{car.Loja}</p>
              </div>
              <span className="only">Por apenas</span>
              <b>{car.Preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>

              <Button link={true} href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(loja?.phone as string)}&text=Olá, tenho interesse no carro ${car.Modelo}${car.Versao}`} target="_blank" label="Fale com um consultor">
                <Icon icon="whatsapp" size="40" />
              </Button>
            </div>
            <section className="l-car__form">
              <h2 className="l-car__form-title">Solicitar proposta</h2>
              <Form vehicle={`${car.Modelo} ${car.Versao}`} />
            </section>
          </div>
        </div>
      </section>
      {car.Opcionais && car.Opcionais.length > 0 && (
        <article className="l-car__optionals">
          <div className="l-car__optionals-content">
            <h2 className="l-car__optionals-title">
              Opcionais
            </h2>
            <ul className="l-car__optionals-list">{car.Opcionais.split(", ").map(optional => (
              <li key={optional}>{optional}</li>
            ))}</ul>
          </div>
        </article>
      )}


      {filteredCars && filteredCars.length > 0 && (
        <section className="l-car__related">
          <h2 className="l-car__related-title">Veículos relacionados</h2>
          <div className="l-car__related-content">
            {filteredCars.slice(0, 6).map((relatedCar) => (
              <Car key={relatedCar.Id} car={relatedCar} />
            ))
            }
          </div>
        </section>
      )}

    </main>
  );
}

export default CarPage;
