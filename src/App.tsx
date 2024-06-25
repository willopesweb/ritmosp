import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import './assets/scss/styles.scss';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carro/:id" element={<CarPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
