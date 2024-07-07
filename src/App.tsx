import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import './assets/scss/styles.scss';
import Footer from './components/Footer/Footer';
import { useCars } from './context/CarsContext';
import Modal from './components/Modal/Modal';
import { Lojas } from './lojas';
import Icon from './components/Icon';


function App() {
  const { email, whatsapp, setEmail, setWhatsapp } = useCars();
  const [showInitialModal, setShowInitialModal] = useState(false);

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
          <ul className="l-selectAddress">
            {Lojas.map(loja => (
              <li key={loja.name} onClick={() => { handleInitialModalClick(loja.phone, loja.email) }}>
                <Icon icon="location" size="20" />
                {loja.name}
              </li>
            ))}
          </ul>
        </Modal>
      )}
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
