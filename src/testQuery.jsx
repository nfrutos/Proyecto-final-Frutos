import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Función para ejecutar una consulta de prueba en Firestore
export const testQuery = async () => {
  // Obtiene una instancia de Firestore
  const db = getFirestore();

  // Define una consulta para obtener productos de la colección 'products'
  // que sean de la categoría "Jeans" y del género "Hombre"
  const q = query(
    collection(db, 'products'),
    where('gender', '==', 'Hombre'),
    where('category', '==', 'Jeans')
  );

  try {
    console.log("Ejecutando consulta...");

    // Ejecuta la consulta y obtiene los documentos resultantes
    const querySnapshot = await getDocs(q);

    // Mapea los documentos obtenidos para extraer los datos de cada producto
    const products = querySnapshot.docs.map(doc => doc.data());

    // Muestra los productos encontrados en la consola
    console.log("Productos encontrados:", products);
  } catch (error) {
    // Muestra un mensaje de error si ocurre algún problema al ejecutar la consulta
    console.error("Error ejecutando la consulta:", error);
  }
};
