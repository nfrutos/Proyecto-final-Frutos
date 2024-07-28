// Módulos necesarios de React
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creo el contexto para el carrito
export const CartContext = createContext();

// Defino el proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado para los productos del carrito
  const [products, setProducts] = useState([]);

  // Cargar productos desde el archivo JSON al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/products');
      const productsWithCount = response.data.map(product => ({
        ...product,
        count: 0
      }));
      setProducts(productsWithCount);
    };

    fetchProducts();
  }, []);

  // Función para agregar productos al carrito
  const addToCart = (id, quantity) => {
    setProducts(products.map(product => {
      if (product.id === id && product.count + quantity <= product.stock) {
        return { ...product, count: product.count + quantity };
      }
      return product;
    }));
  };

  // Función para remover productos del carrito
  const removeFromCart = (id) => {
    setProducts(products.map(product => {
      if (product.id === id && product.count > 0) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    }));
  };

  // Calcula el total de productos en el carrito
  const totalCount = products.reduce((sum, product) => sum + product.count, 0);

  // Calcula el monto total del carrito
  const totalAmount = products.reduce((acc, product) => acc + product.price * product.count, 0);

  // Le doy el contexto del carrito a los componentes hijos
  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart, totalCount, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
