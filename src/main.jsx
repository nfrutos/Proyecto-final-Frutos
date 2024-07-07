// Importa los módulos necesarios de React
import React from 'react';
// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';
// Importa el componente principal de la aplicación
import App from './App';
// Importa los estilos globales de la aplicación
import './index.css';

// Renderiza la aplicación en el elemento con el id 'root' en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode es una herramienta para detectar problemas potenciales en la aplicación
  <React.StrictMode>
    {/* Renderiza el componente App */}
    <App />
  </React.StrictMode>
);
