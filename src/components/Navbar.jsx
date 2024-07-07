// Módulos necesarios de React
import React from 'react';
// Importo los estilos de Bootstrap para la barra de navegación
import 'bootstrap/dist/css/bootstrap.min.css';
// Importo los estilos personalizados para la barra de navegación
import './../components/Navbar.css';
// Importo el componente CartWidget
import CartWidget from './CartWidget';

// Defino el componente Navbar
const Navbar = () => {
  // Renderiza la barra de navegación
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Botón para colapsar la barra de navegación en pantallas pequeñas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Contenido colapsable de la barra de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Enlaces de navegación */}
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Sucursales</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Trabaja con nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">Contacto</a>
            </li>
          </ul>
        </div>
        {/* Indexa el componente CartWidget */}
        <CartWidget />
      </div>
    </nav>
  );
};

// Exporta el componente Navbar para que pueda ser utilizado en otros archivos
export default Navbar;
