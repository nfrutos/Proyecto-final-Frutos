import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../backend/firebase/firebaseConfig';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

// Componente ItemListContainer para mostrar una lista de productos filtrados por género y categoría
const ItemListContainer = ({ greeting }) => {
  const { id, subcategory } = useParams(); // Obtiene los parámetros de la URL (id y subcategoría)
  const [items, setItems] = useState([]); // Estado local para almacenar los productos obtenidos
  const { addToCart } = useContext(CartContext); // Obtiene la función addToCart desde el contexto del carrito

  useEffect(() => {
    // Función asíncrona para obtener los productos desde Firestore según los filtros aplicados
    const fetchItems = async () => {
      const productsCollection = collection(db, 'products'); // Referencia a la colección de productos en Firestore
      let q;

      // Filtra los productos por género y subcategoría si ambos están presentes
      if (subcategory) {
        q = query(productsCollection, where("gender", "==", id), where("category", "==", subcategory));
      } 
      // Filtra solo por género si solo está presente el id
      else if (id) {
        q = query(productsCollection, where("gender", "==", id));
      } 
      // Si no hay filtros, obtiene todos los productos
      else {
        q = productsCollection;
      }

      const productsSnapshot = await getDocs(q); // Realiza la consulta a Firestore y obtiene los productos
      const productList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(productList); // Actualiza el estado con la lista de productos obtenidos
    };

    fetchItems(); // Llama a la función para obtener los productos al cargar el componente
  }, [id, subcategory]); // Dependencias del efecto: se ejecuta cada vez que cambian el id o la subcategoría

  // Maneja la acción de agregar un producto al carrito y muestra una notificación
  const handleAddToCart = (product, quantity) => {
    console.log(`Producto: ${product.title}, Cantidad: ${quantity}`); // Log de depuración
  
    addToCart(product, quantity); // Agrega el producto al carrito
  
    console.log("Mostrando notificación"); // Log de depuración
  
    // Muestra una notificación utilizando Toastify
    toast.success(`${quantity} ${product.title} agregado(s) al carrito`, {
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
    <Container className="my-4">
      <h2>{greeting}</h2>
      <Row>
        {/* Renderiza la lista de productos si hay elementos en el estado items */}
        {items.length > 0 ? (
          items.map(item => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text><strong>Precio:</strong> ${item.price}</Card.Text>
                  {/* Renderiza el componente ItemCount para manejar la cantidad y agregar al carrito */}
                  <ItemCount product={item} onAddToCart={(quantity) => handleAddToCart(item, quantity)} />
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Cargando categorías.</p> // Muestra un mensaje mientras se cargan los productos
        )}
      </Row>
    </Container>
  );
};

export default ItemListContainer;
