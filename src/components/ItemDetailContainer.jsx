import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setItem(response.data);
    };

    fetchItem();
  }, [id]);

  return (
    <div className="item-detail-container">
      <h2>Detalle del Producto</h2>
      {item ? (
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Stock: {item.stock}</p>
          <img src={item.image} alt={item.name} />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
