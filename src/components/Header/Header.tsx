import React, { useState } from 'react';
import './Header.scss';
import { ReactSVG } from 'react-svg';
import logo from "../../assets/img/logo.png";
import { Link, NavLink } from 'react-router-dom';
import Icon from '../Icon';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
    <header className='l-header'>
      <div className='l-header__content' >
        <div className="l-header__logo">
          <Link to="/">
            <img width="150" src={logo} alt="Ritmo SP" />
          </Link>
        </div>
        <nav className={isMobileMenuActive ? 'l-header__menu is-active' : 'l-header__menu'} aria-label="Menu principal"
        >
          <a href="#" className="l-header__menu-item">Quem Somos</a>
          <a href="https://www.ritmosp.com.br/" className="l-header__menu-item">Novos</a>

        </nav>
        <div className={'l-header__buttons'}>
          <div onClick={() => setIsMobileMenuActive(!isMobileMenuActive)} >
            <Icon size={30} icon="menu" className={isMobileMenuActive ? 'is-active' : ''} />
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header