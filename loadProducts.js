import { collection, addDoc } from 'firebase/firestore';
import { db } from './backend/firebase/firebaseConfig.js';

// Array de objetos que representa los productos a cargar en Firestore
const products = [
  {
    title: "Jean clásico azul",
    description: "Jean azul de corte clásico para hombre.",
    price: 49.99,
    stock: 50,
    category: "Jeans",
    gender: "Hombre",
    image: "image_url_here",
    colors: ["Azul"],
    sizes: ["28", "30", "32", "34", "36"],
    brand: "Levi's",
    rating: 4.7
  },
  {
    title: "Camiseta básica blanca",
    description: "Camiseta de algodón 100% con corte regular para hombre.",
    price: 19.99,
    stock: 100,
    category: "Camisetas",
    gender: "Hombre",
    image: "image_url_here",
    colors: ["Blanco", "Negro", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    brand: "Tales",
    rating: 4.5
  },
  {
    title: "Buzo con capucha gris",
    description: "Buzo con capucha de algodón suave para hombre.",
    price: 39.99,
    stock: 30,
    category: "Buzzo",
    gender: "Hombre",
    image: "image_url_here",
    colors: ["Gris", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    brand: "Nike",
    rating: 4.8
  },
  {
    title: "Zapatillas deportivas negras",
    description: "Zapatillas deportivas para hombre, ideales para correr.",
    price: 89.99,
    stock: 20,
    category: "Zapatillas",
    gender: "Hombre",
    image: "image_url_here",
    colors: ["Negro", "Blanco"],
    sizes: ["40", "41", "42", "43", "44"],
    brand: "Adidas",
    rating: 4.9
  },
  {
    title: "Jean ajustado negro para mujer",
    description: "Jean ajustado de color negro para mujer.",
    price: 49.99,
    stock: 50,
    category: "Jeans",
    gender: "Mujer",
    image: "image_url_here",
    colors: ["Negro"],
    sizes: ["26", "28", "30", "32"],
    brand: "Zara",
    rating: 4.6
  },
  {
    title: "Camiseta estampada para mujer",
    description: "Camiseta de algodón con estampado floral para mujer.",
    price: 24.99,
    stock: 80,
    category: "Camisetas",
    gender: "Mujer",
    image: "image_url_here",
    colors: ["Blanco", "Rosa"],
    sizes: ["S", "M", "L"],
    brand: "H&M",
    rating: 4.7
  },
  {
    title: "Buzo con capucha rosado para mujer",
    description: "Buzo con capucha y bolsillo canguro, ideal para el invierno.",
    price: 39.99,
    stock: 35,
    category: "Buzzo",
    gender: "Mujer",
    image: "image_url_here",
    colors: ["Rosa", "Gris"],
    sizes: ["S", "M", "L"],
    brand: "Puma",
    rating: 4.5
  },
  {
    title: "Zapatillas casuales blancas para mujer",
    description: "Zapatillas casuales blancas, cómodas para uso diario.",
    price: 79.99,
    stock: 25,
    category: "Zapatillas",
    gender: "Mujer",
    image: "image_url_here",
    colors: ["Blanco"],
    sizes: ["36", "37", "38", "39", "40"],
    brand: "Converse",
    rating: 4.8
  }
];

// Función asincrónica para cargar los productos en Firestore
const loadProductsToFirestore = async () => {
  // Obtiene la referencia a la colección 'products' en Firestore
  const productsCollection = collection(db, 'products');

  try {
    // Itera sobre cada producto en el array
    for (const product of products) {
      // Añade el producto a la colección en Firestore
      await addDoc(productsCollection, product);
      console.log(`Producto agregado: ${product.title}`);
    }
    console.log("Todos los productos fueron cargados.");
  } catch (error) {
    // Maneja cualquier error que ocurra durante la carga de productos
    console.error("Error al cargar los productos: ", error);
  }
};

// Llama a la función para cargar los productos en Firestore
loadProductsToFirestore();
