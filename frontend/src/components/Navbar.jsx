import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" style={{ cursor: 'pointer' }} onClick={handleLogoClick}>
        <span className="navbar-logo" role="img" aria-label="logo">🩺</span>
        <span className="navbar-title">Cátedra Dr. JH</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#testimonios">Testimonios</a></li>
        <li><a href="#noticias">Noticias</a></li>
      </ul>
      <div style={{ display: 'flex', gap: '0.7rem' }}>
        {!isLoggedIn && (
          <button className="navbar-login" type="button" onClick={handleRegisterClick} style={{ background: '#fff', color: '#4A90E2', border: '1.5px solid #4A90E2' }}>
            Registrarse
          </button>
        )}
        <button className="navbar-login" type="button" onClick={handleAuthClick}>
          {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>
      </div>
    </nav>
  );
} 