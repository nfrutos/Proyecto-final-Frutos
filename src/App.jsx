import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify'; // Importar el contenedor de Toastify para las notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de Toastify
import './App.css'; // Importar los estilos globales de la aplicación

// Componente principal de la aplicación
const App = () => {
  return (
    // Proveedor del contexto del carrito para toda la aplicación
    <CartProvider>
      {/* Configuración del Router para manejar las rutas de la aplicación */}
      <Router basename="/PreEntrega1Frutos">
        {/* Navbar está siempre visible en todas las rutas */}
        <Navbar />
        {/* Definición de las rutas principales de la aplicación */}
        <Routes>
          {/* Ruta para el listado de productos */}
          <Route path="/" element={<ItemListContainer greeting="Productos" />} />
          {/* Ruta para el listado de productos por categoría */}
          <Route path="/category/:id" element={<ItemListContainer greeting="Productos por Categoría" />} />
          {/* Ruta para el listado de productos por subcategoría */}
          <Route path="/category/:id/:subcategory" element={<ItemListContainer greeting="Productos por Subcategoría" />} />
          {/* Ruta para el detalle de un producto específico */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
        {/* Contenedor para las notificaciones Toastify */}
        <ToastContainer /> 
      </Router>
    </CartProvider>
  );
};

export default App;
