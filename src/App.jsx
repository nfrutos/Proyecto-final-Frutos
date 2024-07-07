// Módulos necesarios de React
import React from 'react';
// Importo el componente Navbar
import Navbar from './components/Navbar';
// Importo el componente ItemListContainer
import ItemListContainer from './components/ItemListContainer';
// Importo el componente ProductList
import ProductList from './components/ProductList';
// Importo el proveedor del contexto del carrito
import { CartProvider } from './context/CartContext';
// Importo los estilos de la aplicación
import './App.css';

// Defino el componente principal de la aplicación
const App = () => {
  // Renderiza el componente principal
  return (
    // Indexo la aplicación en el CartProvider para que todos los componentes hijos puedan acceder al contexto del carrito
    <CartProvider>
      <div>
        {/* Renderiza la barra de navegación */}
        <Navbar />
        {/* Renderiza el contenedor de la lista de ítems con una prop 'greeting' */}
        <ItemListContainer greeting="Productos" />
        {/* Renderiza la lista de productos */}
        <ProductList />
      </div>
    </CartProvider>
  );
};

// Exporta el componente App para que pueda ser utilizado en otros archivos
export default App;
