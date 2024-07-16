import React from 'react';
import Icon from '../Icon';
import "./Footer.scss"
import Social from '../Social/Social';
import { ReactSVG } from 'react-svg';
import LogoDiv from "../../assets/img/div.svg";
import { useCars } from '../../context/CarsContext';

const Footer = () => {
  const year = new Date().getFullYear();
  const { lojas } = useCars();
  return (
    <footer>
      <div className="l-footer">
        <div className="l-footer__content">
          {lojas.map(loja => (
            <div key={loja.name} className="l-footer__loja">
              <h1 className="l-footer__loja-title">{loja.name}</h1>
              <a href={`tel:${loja.phone.replace(/[^\d]/g, '')}`} className="l-footer__loja-info">
                <Icon icon="phone" className="l-footer__icon" size="20" />
                {loja.phone}
              </a>
              <div className="l-footer__loja-info">
                <Icon icon="clock" className="l-footer__icon" size="20" />

                <ul>
                  {loja.open.map((horario) => (<li key={horario}>{horario}
                  </li>))}
                </ul>
              </div>

              <span className="l-footer__loja-info">
                <Icon icon="location" className="l-footer__icon" size="20" />
                {loja.address}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="l-footer__subfooter">
        <div className="l-footer__subfooter-content">
          <p>© Copyright {year} Todos direitos Reservados - RitmoSP.</p>
          <div className="l-footer__social">
            <Social />
          </div>
          <div className="l-footer__div">
            <a href="https://divpropaganda.com.br/" target="_blank">
              <ReactSVG src={LogoDiv} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer