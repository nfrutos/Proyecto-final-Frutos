import React, { useState, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente ItemCount para manejar la selección de cantidad y agregar productos al carrito
const ItemCount = ({ product }) => {
  // Accede a la función addToCart del contexto del carrito
  const { addToCart } = useContext(CartContext);
  
  // Estado local para manejar la cantidad seleccionada de un producto
  const [count, setCount] = useState(1);

  // Incrementa la cantidad, asegurándose de no exceder el stock disponible
  const handleAdd = () => {
    if (count < product.stock) {
      setCount(count + 1);
    }
  };

  // Decrementa la cantidad, asegurándose de no bajar de 1
  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Maneja la adición del producto al carrito y muestra una notificación
  const handleAddToCart = () => {
    addToCart(product, count);
    // Muestra una notificación de éxito usando react-toastify
    toast.success(`${count} ${product.title} agregado(s) al carrito`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      {/* Botones para incrementar o decrementar la cantidad */}
      <ButtonGroup>
        <Button variant="secondary" onClick={handleSubtract}>-</Button>
        <Button variant="light" disabled>{count}</Button>
        <Button variant="secondary" onClick={handleAdd}>+</Button>
      </ButtonGroup>
      {/* Botón para agregar el producto al carrito */}
      <Button variant="primary" className="mt-2" onClick={handleAddToCart}>
        Agregar al carrito
      </Button>
    </div>
  );
};

export default ItemCount;
