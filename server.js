import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, 'data', 'products.json');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

// Endpoint para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      const products = JSON.parse(data);
      const product = products.find(p => p.id === parseInt(req.params.id));
      res.json(product);
    }
  });
});

// Endpoint para obtener productos por categoría
app.get('/categories/:category', (req, res) => {
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer el archivo de productos' });
    } else {
      const products = JSON.parse(data);
      const categoryProducts = products.filter(p => p.category === req.params.category);
      res.json(categoryProducts);
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
