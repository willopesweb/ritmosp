import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import './assets/scss/styles.scss';
import Footer from './components/Footer/Footer';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {

  return (
    <BrowserRouter>
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
