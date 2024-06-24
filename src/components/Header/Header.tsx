import { useState } from 'react';
import './Header.scss';
import { ReactSVG } from 'react-svg';
import Logo from "./logo.svg";
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(true);

  return (
    <header className='l-header'>
      <div className='l-header__content' >

        <ReactSVG
          src={Logo}
          fallback={() => <span>Error!</span>}
          beforeInjection={(svg) => {
            svg.classList.add('l-header__logo')
          }} />
        <div className={isMobileSearchActive ? 'l-header__search is-active' : 'l-header__search'}>
          <SearchBar />
        </div>
        <nav className={isMobileMenuActive ? 'l-header__menu is-active' : 'l-header__menu'} aria-label="Menu principal"
        >
          <NavLink to="/" end aria-current="page" className='l-header__menu-item'>
            <Icon size={20} icon="favorite" />Início
          </NavLink>
          <NavLink to="/favorites" aria-current="page" className='l-header__menu-item'>
            <Icon size={20} icon="star" />Favoritos</NavLink>
        </nav>
        <div className={'l-header__buttons'}>
          <div onClick={() => setIsMobileSearchActive(!isMobileSearchActive)} >
            <Icon size={30} icon="search" className={isMobileSearchActive ? 'is-active' : ''} />
          </div>

          <div onClick={() => setIsMobileMenuActive(!isMobileMenuActive)} >
            <Icon size={30} icon="menu" className={isMobileMenuActive ? 'is-active' : ''} />
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header