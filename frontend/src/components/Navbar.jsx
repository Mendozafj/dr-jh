import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout: eliminar token y recargar
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo" role="img" aria-label="logo">🩺</span>
        <span className="navbar-title">Cátedra Dr. JH</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#testimonios">Testimonios</a></li>
        <li><a href="#noticias">Noticias</a></li>
      </ul>
      <button className="navbar-login" type="button" onClick={handleAuthClick}>
        {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </button>
    </nav>
  );
} 