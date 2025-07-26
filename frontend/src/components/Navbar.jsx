import React from 'react';
import { useNavigate } from 'react-router-dom';

function getUserRole() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('**** payload ****', payload);
    return payload.rol;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userRole = getUserRole();

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

  const handleCrearNoticia = () => {
    navigate('/crear-noticia');
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
        {isLoggedIn && userRole === 'admin' && (
          <button className="navbar-login" type="button" onClick={handleCrearNoticia} style={{ background: '#4A90E2', color: '#fff' }}>
            Crear noticia
          </button>
        )}
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