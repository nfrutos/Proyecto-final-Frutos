import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../components/Navbar.css';
import CartWidget from './CartWidget';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalAmount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/vehículos">Vehículos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/electrónica">Electrónica</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/ropa">Ropa</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <CartWidget />
          <span className="ms-2 text-light">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
