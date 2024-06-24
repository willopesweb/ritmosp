import React from 'react'
import ReactDOM from 'react-dom/client'
import { CarProvider } from './context/CarsContext';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarProvider>
      <App />
    </CarProvider>
  </React.StrictMode>,
)
