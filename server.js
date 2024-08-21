import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Inicializa la aplicación Express
const app = express();
// Define el puerto en el que correrá el servidor
const PORT = 5000;

// Aplica middleware CORS para permitir solicitudes desde otros dominios
app.use(cors());
// Aplica middleware para parsear cuerpos JSON en las solicitudes
app.use(express.json());

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio del archivo actual
const __dirname = path.dirname(__filename);

// Define la ruta al archivo JSON que contiene los productos
const productsPath = path.join(__dirname, 'data', 'products.json');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  // Lee el archivo de productos
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      // Retorna un error si no se puede leer el archivo
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      // Parsear los datos del archivo y enviarlos en la respuesta
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

// Endpoint para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  // Lee el archivo de productos
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      // Retorna un error si no se puede leer el archivo
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      // Parsear los datos y buscar el producto por ID
      const products = JSON.parse(data);
      const product = products.find(p => p.id === parseInt(req.params.id));
      // Retorna el producto encontrado
      res.json(product);
    }
  });
});

// Endpoint para obtener productos por categoría
app.get('/categories/:category', (req, res) => {
  // Lee el archivo de productos
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      // Retorna un error si no se puede leer el archivo
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      // Parsear los datos y filtrar los productos por categoría
      const products = JSON.parse(data);
      const categoryProducts = products.filter(p => p.category === req.params.category);
      // Retorna los productos filtrados
      res.json(categoryProducts);
    }
  });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
