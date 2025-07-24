import React, { useState } from 'react';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length >= 6;

  const isFormValid = emailIsValid && passwordIsValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Lógica de autenticación aquí
    }
  };

  return (
    <>
        <div className="noticia-detalle-container">
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem' }}>Iniciar Sesión</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: 'white',
          }}
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            style={{
              padding: '1rem',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
            }}
          />
          {touched.email && !emailIsValid && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>Ingresa un correo válido.</span>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            style={{
              padding: '1rem',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
            }}
          />
          {touched.password && !passwordIsValid && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>La contraseña debe tener al menos 6 caracteres.</span>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              background: '#4a90e2',
              color: 'white',
              fontWeight: 'bold',
              padding: '1rem',
              borderRadius: 8,
              border: 'none',
              fontSize: '1rem',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              opacity: isFormValid ? 1 : 0.6,
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        </div>
    </>
  );
};

export default LoginPage;