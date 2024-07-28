import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';

// Componente que muestra la lista de productos de una categoría específica
const ItemListContainer = ({ greeting }) => {
  const { id } = useParams(); // Obtiene el parámetro de la URL
  const [items, setItems] = useState([]); // Estado para los productos
  const { products } = useContext(CartContext); // Accede al contexto del carrito

  // useEffect para cargar los productos cuando el componente se monta o el id cambia
  useEffect(() => {
    const fetchItems = async () => {
      let url = 'http://localhost:5000/products';
      if (id) {
        url = `http://localhost:5000/categories/${id}`;
      }
      const response = await axios.get(url);
      setItems(response.data);
    };

    fetchItems();
  }, [id]);

  return (
    <Container className="my-4">
      <h2>{greeting}</h2>
      <Row>
        {items.map(item => {
          // Busca el producto en el contexto del carrito o usa el producto del estado local
          const product = products.find(p => p.id === item.id) || { ...item, count: 0 };
          return (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text><strong>Stock:</strong> {item.stock}</Card.Text>
                  <Card.Text><strong>Precio:</strong> ${item.price}</Card.Text>
                  <ItemCount product={product} />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ItemListContainer;
