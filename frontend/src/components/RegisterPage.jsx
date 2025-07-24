import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/auth/register';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNombreValid = nombre.trim().length > 3;
  const isTelefonoValid = /^\+?\d{10,15}$/.test(telefono);
  const isFechaValid = Boolean(Date.parse(fechaNacimiento));
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isNombreValid && isTelefonoValid && isFechaValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre, telefono, fechaNacimiento, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Registrarse</h1>
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
        />
        <input
          className="login-input"
          type="text"
          placeholder="Nombre y apellido"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, nombre: true }))}
        />
        <input
          className="login-input"
          type="tel"
          placeholder="Número de teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, telefono: true }))}
        />
        <input
          className="login-input"
          type="date"
          placeholder="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, fechaNacimiento: true }))}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
        />
        {error && <div style={{ color: 'red', marginBottom: '0.5rem', fontSize: '1rem' }}>{error}</div>}
        <button
          className="login-btn"
          type="submit"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
} 