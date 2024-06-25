import React from 'react';
import Icon from '../Icon';
import "./Footer.scss"
import { Lojas } from '../../lojas';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="l-footer">
        <div className="l-footer__content">
          {Lojas.map(loja => (
            <div key={loja.cnpj} className="l-footer__loja">
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
          © Copyright {year} Todos direitos Reservados - RitmoSP.
        </div>
      </div>
    </footer>
  )
}

export default Footer