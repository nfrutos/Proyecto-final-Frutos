// Módulos necesarios de React
import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../backend/firebase/firebaseConfig'; // Importa la configuración de Firebase

// Creo el contexto para el carrito
export const CartContext = createContext();

// Defino el proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado para los productos del carrito
  const [cartItems, setCartItems] = useState([]);

  // Cargar productos desde Firestore al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsWithCount = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        count: 0 // Agrega el campo 'count' inicializado en 0
      }));
      setCartItems(productsWithCount);
    };

    fetchProducts();
  }, []);

  // Función para agregar productos al carrito
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      let updatedItems;

      if (itemIndex >= 0) {
        // El producto ya está en el carrito, se actualiza la cantidad
        const updatedItem = {
          ...prevItems[itemIndex],
          count: prevItems[itemIndex].count + quantity <= product.stock
            ? prevItems[itemIndex].count + quantity
            : prevItems[itemIndex].count
        };
        updatedItems = [...prevItems];
        updatedItems[itemIndex] = updatedItem;
      } else {
        // El producto no está en el carrito, se agrega
        const newItem = { ...product, count: quantity };
        updatedItems = [...prevItems, newItem];
      }

      return updatedItems;
    });
  };

  // Función para remover productos del carrito
  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      return prevItems.map(product => {
        if (product.id === id && product.count > 0) {
          return { ...product, count: product.count - 1 };
        }
        return product;
      });
    });
  };

  // Calcula el total de productos en el carrito
  const totalCount = cartItems.reduce((sum, product) => sum + product.count, 0);

  // Calcula el monto total del carrito
  const totalAmount = cartItems.reduce((acc, product) => acc + product.price * product.count, 0);

  // Le doy el contexto del carrito a los componentes hijos
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalCount, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
