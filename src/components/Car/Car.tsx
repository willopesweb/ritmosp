import React from 'react';
import { Link } from 'react-router-dom';
import { CarInterface } from '../../types';
import "./Car.scss";
import Icon from '../Icon';
import Button from '../Button/Button';
import { formatParamURL } from '../../utils';
import Image from '../Image/Image';

interface CarProps {
  key: string | number;
  car: CarInterface
}

const Car = ({ car }: CarProps) => {

  const link = formatParamURL(`${car.Modelo}${car.Versao}`);

  return (
    <article className="c-car">
      <Link to={`carro/${link}`}>
        <header className="c-car__header">
          <i className="c-car__brand">{car.Marca}</i>
          <span className="c-car__year">{car.AnoFabricacao}/{car.AnoModelo}</span>
        </header>
        <Image
          containerClass="c-car__photo"
          height="100"
          src={car.Fotos[0]}
          alt={`${car.Modelo} ${car.Versao}`}
        />
        <div className="c-car__title">
          <h1>{car.Modelo} {car.Versao}</h1>
        </div>

        <div className="c-car__info">
          <span>
            <Icon icon="tachometer" size="20" />
            {car.Km && car.Km.toLocaleString('pt-BR')} KM
          </span>
          <span>
            <Icon icon="cog" size="20" />
            {car.Combustivel}
          </span>
        </div>

        <div className="c-car__content">
          <div>
            Por Apenas:
            <span className="c-car__price">{car.Preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="c-car__address">
            <Icon icon="location" size="40" />
            <span>{car.Loja}</span>
          </div>

        </div>
      </Link>
      <footer className="c-car__footer">
        <Button link={true} href="#" target="_blank" label="Fale com um consultor">
          <Icon icon="whatsapp" size="20" />
        </Button>
      </footer>
    </article>
  )
}

export default Car