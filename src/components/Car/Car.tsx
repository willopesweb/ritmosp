import React from 'react'
import { Link } from 'react-router-dom';
import { CarInterface } from '../../types';
import "./Car.scss";

interface CarProps {
  key: string | number;
  car: CarInterface
}

const Car = ({ car }: CarProps) => {
  return (
    <article className="c-car">
      <Link to={`/carro/${car.Id}`}>{car.Modelo}</Link>
    </article>
  )
}

export default Car