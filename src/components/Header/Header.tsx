import React, { useState } from 'react';
import './Header.scss';
import logo from "../../assets/img/logo.png";
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Social from '../Social/Social';
import About from '../About/About';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isAboutBoxActive, setIsAboutBoxActive] = useState(false);

  return (
    <>
      <header className='l-header'>
        <div className='l-header__content' >
          <div className="l-header__logo">
            <Link to="/">
              <img width="150" src={logo} alt="Ritmo SP" />
            </Link>
          </div>
          <nav className={isMobileMenuActive ? 'l-header__menu is-active' : 'l-header__menu'} aria-label="Menu principal"
          >
            <span className="l-header__menu-item" onClick={() => setIsAboutBoxActive(true)}>Quem Somos</span>
            <a href="https://www.ritmosp.com.br/" className="l-header__menu-item">Novos</a>
            <div className="l-header__social">
              <Social />
            </div>

          </nav>
          <div className={'l-header__buttons'}>
            <div onClick={() => setIsMobileMenuActive(!isMobileMenuActive)} >
              <Icon size={30} icon="menu" className={isMobileMenuActive ? 'is-active' : ''} />
            </div>
          </div>
        </div>
      </header>
      <About active={isAboutBoxActive} setActive={setIsAboutBoxActive} />
    </>
  )
}

export default Header