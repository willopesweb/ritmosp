import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import './assets/scss/styles.scss';
import Footer from './components/Footer/Footer';
import { useCars } from './context/CarsContext';
import Modal from './components/Modal/Modal';
import { Lojas } from './lojas';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { email, whatsapp, setEmail, setWhatsapp } = useCars();
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!email || !whatsapp) setShowInitialModal(true)
  }, []);

  function handleInitialModalClick(phone: string, email: string) {
    setWhatsapp(phone);
    setEmail(email);
    setShowInitialModal(false);
  }

  return (
    <BrowserRouter>
      {showInitialModal && (
        <Modal title="Selecione a unidade mais próxima a você:">
          <div className="l-selectAddress">
            <span className="l-selectAddress__button" onClick={() => setShowOptions(!showOptions)}>
              Selecionar
            </span>
            <ul className={`l-selectAddress__list ${showOptions ? "is-visible" : ""}`}>
              {Lojas.map(loja => (
                <li key={loja.name} onClick={() => { handleInitialModalClick(loja.phone, loja.email) }}>
                  {loja.name}
                </li>
              ))}
            </ul>
          </div>

        </Modal>
      )}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/seminovos" element={<HomePage />} />
        <Route path="/seminovos/carro/:id" element={<CarPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
