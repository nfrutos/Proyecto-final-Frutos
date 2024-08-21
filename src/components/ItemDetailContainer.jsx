import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../backend/firebase/firebaseConfig';

// Componente ItemDetailContainer para mostrar los detalles de un producto específico
const ItemDetailContainer = () => {
  // Obtiene el ID del producto desde los parámetros de la URL
  const { id } = useParams();
  
  // Estado local para almacenar los detalles del producto
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Función asíncrona para obtener los detalles del producto desde Firestore
    const fetchItem = async () => {
      const docRef = doc(db, 'products', id); // Referencia al documento específico en Firestore
      const docSnap = await getDoc(docRef); // Obtiene el documento

      // Verifica si el documento existe y actualiza el estado con los datos del producto
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!"); // Maneja el caso en que el documento no existe
      }
    };

    // Llama a la función para obtener el producto al cargar el componente
    fetchItem();
  }, [id]); // Dependencia del efecto: se ejecuta cada vez que el ID cambia

  return (
    <div className="item-detail-container">
      <h2>Detalle del Producto</h2>
      {/* Muestra los detalles del producto si se ha cargado, o un mensaje de carga si no */}
      {item ? (
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <img src={item.image} alt={item.title} />
          <p><strong>Precio:</strong> ${item.price}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
