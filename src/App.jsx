import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartProvider } from './context/CartContext';
import './App.css';

// Componente principal de la aplicación
const App = () => {
  return (
    // Proveedor del contexto del carrito que envuelve toda la aplicación
    <CartProvider>
      {/* Configuración del router con basename */}
      <Router basename="/PreEntrega1Frutos">
        {/* Barra de navegación */}
        <Navbar />
        {/* Definición de rutas */}
        <Routes>
          {/* Ruta para el listado de productos */}
          <Route path="/" element={<ItemListContainer greeting="Productos" />} />
          {/* Ruta para productos por categoría */}
          <Route path="/category/:id" element={<ItemListContainer />} />
          {/* Ruta para el detalle de un producto */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
