// Importa los módulos necesarios de React
import React from 'react';
// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';
// Importa el componente principal de la aplicación
import App from './App';
// Importa Bootstrap para los estilos
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa los estilos globales de la aplicación
import './index.css';

// Importa la configuración de Firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../backend/firebase/firebaseConfig';

// Inicializa Firebase con la configuración proporcionada
initializeApp(firebaseConfig);

// Renderiza la aplicación en el elemento con el id 'root' en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
