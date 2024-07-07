// Módulos necesarios de React
import React, { useContext } from 'react';
// Importa el contexto del carrito
import { CartContext } from '../context/CartContext';
// Importa la imagen del carrito
import myImage from './../assets/carrito.png';

// Defino componente CartWidget
const CartWidget = () => {
  // Contexto del carrito
  const { products } = useContext(CartContext);

  // Calcula la cantidad total de productos en el carrito
  const totalCount = products.reduce((sum, product) => sum + product.count, 0);

  // Renderiza el widget del carrito
  return (
    <div className="cart-widget">
      {/* Refleja la imagen del carrito */}
      <img src={myImage} alt="Cart Icon" />
      {/* Refleja la cantidad total de productos en el carrito */}
      <span className="cart-count">{totalCount}</span>
    </div>
  );
};

// Exporta el componente CartWidget para que pueda ser utilizado en otros archivos
export default CartWidget;
