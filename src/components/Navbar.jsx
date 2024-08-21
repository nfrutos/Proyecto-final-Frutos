import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../components/Navbar.css';
import CartWidget from './CartWidget';
import { CartContext } from '../context/CartContext';
import hombre from './../assets/hombre.jpg';
import mujer from './../assets/mujer.jpg';
import bannerInicio from './../assets/bannerInicio.jpg';

// Componente Navbar para la navegación y presentación de banners según la categoría seleccionada
const Navbar = () => {
  const { totalAmount } = useContext(CartContext); // Obtiene el monto total del carrito desde el contexto
  const [bannerImages, setBannerImages] = useState([]); // Estado para almacenar las imágenes del banner
  const [isDropdownOpen, setIsDropdownOpen] = useState({ hombre: false, mujer: false }); // Estado para controlar la apertura de los menús desplegables
  const navigate = useNavigate(); // Hook para la navegación programática
  const location = useLocation(); // Hook para obtener la ubicación actual

  // Actualiza las imágenes del banner según la ruta actual
  useEffect(() => {
    if (location.pathname === '/') {
      setBannerImages([bannerInicio]);
    } else if (location.pathname.includes('/category/hombre')) {
      setBannerImages([hombre]);
    } else if (location.pathname.includes('/category/mujer')) {
      setBannerImages([mujer]);
    }
  }, [location.pathname]); // Ejecuta el efecto cuando cambia la ruta

  // Maneja la navegación al hacer clic en una categoría o subcategoría
  const handleCategoryClick = (gender, subcategory) => {
    if (subcategory) {
      navigate(`/category/${gender}/${subcategory}`);
    } else {
      navigate(`/category/${gender}`);
    }
  };

  // Abre el menú desplegable cuando se pasa el mouse sobre él
  const handleMouseEnter = (gender) => {
    setIsDropdownOpen((prev) => ({ ...prev, [gender]: true }));
  };

  // Cierra el menú desplegable cuando se retira el mouse de él
  const handleMouseLeave = (gender) => {
    setIsDropdownOpen((prev) => ({ ...prev, [gender]: false }));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
              </li>
              {/* Menú desplegable para Hombre */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter('hombre')}
                onMouseLeave={() => handleMouseLeave('hombre')}
              >
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                >
                  Hombre
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen.hombre ? 'show' : ''}`}>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('hombre')}>Todos</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('hombre', 'jeans')}>Jeans</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('hombre', 'zapatillas')}>Zapatillas</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('hombre', 'buzzo')}>Buzzo</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('hombre', 'camisetas')}>Camisetas</button></li>
                </ul>
              </li>
              {/* Menú desplegable para Mujer */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter('mujer')}
                onMouseLeave={() => handleMouseLeave('mujer')}
              >
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                >
                  Mujer
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen.mujer ? 'show' : ''}`}>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('mujer')}>Todos</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('mujer', 'jeans')}>Jeans</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('mujer', 'zapatillas')}>Zapatillas</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('mujer', 'buzzo')}>Buzzo</button></li>
                  <li><button className="dropdown-item" onClick={() => handleCategoryClick('mujer', 'camisetas')}>Camisetas</button></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <CartWidget />
            <span className="ms-2 text-light">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </nav>
      
      {/* Renderizar el carrusel con el banner correspondiente */}
      {bannerImages.length > 0 && (
        <Carousel interval={3000} controls={true} indicators={true}>
          {bannerImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} className="d-block w-100" alt={`Banner ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Navbar;
