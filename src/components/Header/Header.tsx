import React, { useState, useEffect } from 'react';
import './Header.scss';
import './Backtotop.scss';
import logo from "../../assets/img/logo.png";
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Social from '../Social/Social';
import About from '../About/About';
import { useCars } from '../../context/CarsContext';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isAboutBoxActive, setIsAboutBoxActive] = useState(false);
  const [isBackToTopActive, setIsBackToTopActive] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsBackToTopActive(true);
      setIsHeaderFixed(true);
    } else {
      setIsBackToTopActive(false);
      setIsHeaderFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { whatsapp } = useCars();

  return (
    <>
      <header className={`${isHeaderFixed ? "l-header__fixed-margin" : ""}`}>
        <div className={`l-header__top-header ${isHeaderFixed ? "l-header__top-header--is-header-fixed" : ""}`}>
          <div className="l-header__top-header-content">
            <div>
              <a className="info" href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=Olá, vim através da página de seminovos`}
                title="Fale conosco no Whatsapp" target="_blank" rel="nofollow">
                <Icon icon="whatsapp" size="20" />
                {whatsapp}
              </a>
              <span className="info">
                <Icon icon="clock" size="20" />
                Segunda à sexta: 8:00 - 18:00 | Sábados: 08:00 - 13:00
              </span>
            </div>
            <div className="l-header__social">
              Siga-nos nas redes sociais:
              <Social />
            </div>
          </div>
        </div>
        <div className={`l-header ${isHeaderFixed ? "l-header--is-fixed" : ""}`}>
          <div className='l-header__content' >
            <div className="l-header__logo">
              <Link to="/seminovos">
                <img width="150" src={logo} alt="Ritmo SP" />
              </Link>
            </div>
            <nav className={isMobileMenuActive ? 'l-header__menu is-active' : 'l-header__menu'} aria-label="Menu principal"
            >
              <span className="l-header__menu-item" onClick={() => setIsAboutBoxActive(true)}>Quem Somos</span>
              <a href="https://www.ritmosp.com.br/#carros" className="l-header__menu-item">Carros</a>
              <a href="https://www.ritmosp.com.br/#suvs" className="l-header__menu-item">SUVS</a>
              <a href="https://www.ritmosp.com.br/#picapes" className="l-header__menu-item">Picapes</a>
              <a href="https://www.ritmosp.com.br/#esportivos" className="l-header__menu-item">Esportivos</a>
              <a href="https://www.ritmosp.com.br/#eletricos" className="l-header__menu-item">Elétricos</a>
              <a href="https://www.ritmosp.com.br/seminovos" className="l-header__menu-item">Seminovos</a>
            </nav>
            <div className={'l-header__buttons'}>
              <div onClick={() => setIsMobileMenuActive(!isMobileMenuActive)} >
                <Icon size={30} icon="menu" className={isMobileMenuActive ? 'is-active' : ''} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <About active={isAboutBoxActive} setActive={setIsAboutBoxActive} />
      <span className={`c-backtotop ${isBackToTopActive ? 'is-active' : ''}`} onClick={handleBackToTop}>
        <Icon icon="arrow-up" size="20" />
      </span>
    </>
  )
}

export default Header