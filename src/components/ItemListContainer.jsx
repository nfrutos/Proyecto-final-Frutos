// Módulo necesario de React
import React from 'react';

// Defino el componente ItemListContainer
// Este componente recibe una prop llamada 'greeting'
const ItemListContainer = ({ greeting }) => {
  // Renderiza el componente
  return (
    <div className="item-list-container">
      {/* Refleja el mensaje de saludo que se pasa como prop */}
      <h2>{greeting}</h2>
    </div>
  );
};

// Exportamos el componente ItemListContainer para que pueda ser utilizado en otros archivos
export default ItemListContainer;
