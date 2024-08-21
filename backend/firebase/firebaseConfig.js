import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBzPzyiiJ8F6WYnx9aCdfcO8c-Us-Dx3do",
  authDomain: "proyecto-final-react-94ad3.firebaseapp.com",
  projectId: "proyecto-final-react-94ad3",
  storageBucket: "proyecto-final-react-94ad3.appspot.com",
  messagingSenderId: "997967879809",
  appId: "1:997967879809:web:048c8477c5a99d2a367780",
  measurementId: "G-P0Q83Q6HMD"
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Inicializa Firestore para la base de datos
const db = getFirestore(app);

// Inicializa Google Analytics solo si está en un entorno de navegador
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      // Si el navegador soporta Analytics, se inicializa
      const analytics = getAnalytics(app);
    }
  }).catch((error) => {
    // Manejo de errores durante la inicialización de Analytics
    console.error("Analytics initialization error:", error);
  });
}

// Exporta la configuración de Firebase y la instancia de Firestore para su uso en otras partes de la aplicación
export { firebaseConfig, db };
