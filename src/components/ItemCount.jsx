import React, { useState, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const ItemCount = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    if (count < product.stock) {
      setCount(count + 1);
    }
  };

  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, count);
  };

  return (
    <div>
      <ButtonGroup>
        <Button variant="secondary" onClick={handleSubtract}>-</Button>
        <Button variant="light" disabled>{count}</Button>
        <Button variant="secondary" onClick={handleAdd}>+</Button>
      </ButtonGroup>
      <Button variant="primary" className="mt-2" onClick={handleAddToCart}>
        Agregar al carrito
      </Button>
    </div>
  );
};

export default ItemCount;
