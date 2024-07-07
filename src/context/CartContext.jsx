// Módulos necesarios de React
import React, { createContext, useState } from 'react';

// Creo el contexto para el carrito
export const CartContext = createContext();

// Defino el proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado inicial de los productos con sus respectivos stocks y cantidades en el carrito
  const initialProducts = [
    { id: 1, name: 'Producto 1', stock: 5, count: 0 },
    { id: 2, name: 'Producto 2', stock: 3, count: 0 },
    { id: 3, name: 'Producto 3', stock: 8, count: 0 },
    { id: 4, name: 'Producto 4', stock: 2, count: 0 },
  ];

  // Estado para los productos del carrito
  const [products, setProducts] = useState(initialProducts);

  // Función para agregar productos al carrito
  const addToCart = (id) => {
    setProducts(products.map(product => {
      // Si el producto existe y la cantidad en el carrito es menor que el stock incrementamos la cantidad en el carrito
      if (product.id === id && product.count < product.stock) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    }));
  };

  // Función para remover productos del carrito
  const removeFromCart = (id) => {
    setProducts(products.map(product => {
      // Si el producto existe y la cantidad en el carrito es mayor que 0 decrementamos la cantidad en el carrito
      if (product.id === id && product.count > 0) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    }));
  };

  // Le doy el contexto del carrito a los componentes hijos
  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
