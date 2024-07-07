// Módulos necesarios de React
import React, { useContext } from 'react';
// Importo el contexto del carrito
import { CartContext } from '../context/CartContext';

// Defino el componente ProductList
const ProductList = () => {
  // Utilizo el contexto del carrito para obtener los productos y las funciones para agregar y quitar productos del carrito
  const { products, addToCart, removeFromCart } = useContext(CartContext);

  // Renderiza la lista de productos
  return (
    <div className="product-list">
      {/* Mapeo sobre el array de productos para crear un elemento para cada producto */}
      {products.map((product) => (
        // Cada producto tiene un key único basado en su id
        <div key={product.id} className="product">
          {/* Refleja el nombre del producto */}
          <h3>{product.name}</h3>
          {/* Refleja la cantidad de stock disponible */}
          <p>Stock: {product.stock}</p>
          {/* Refleja la cantidad de este producto que está en el carrito */}
          <p>En carrito: {product.count}</p>
          {/* Botón para agregar el producto al carrito */}
          <button
            className='btn btn-outline-info' 
            onClick={() => addToCart(product.id)}
            // Deshabilita el botón si la cantidad en el carrito es igual o mayor al stock disponible
            disabled={product.count >= product.stock}
          >
            Agregar al carrito
          </button>
          {/* Botón para quitar el producto del carrito */}
          <button
            className='btn btn-outline-warning' 
            onClick={() => removeFromCart(product.id)}
            // Deshabilita el botón si no hay unidades de este producto en el carrito
            disabled={product.count === 0}
          >
            Quitar del carrito
          </button>
        </div>
      ))}
    </div>
  );
};

// Exporta el componente ProductList para que pueda ser utilizado en otros archivos
export default ProductList;
