import React from 'react';

export default function Navbar() {
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
      <button className="navbar-login" type="button">Iniciar Sesión</button>
    </nav>
  );
} 