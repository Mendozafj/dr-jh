import React, { useState, useRef } from 'react';

const API_URL = 'http://localhost:4000/api/news';

export default function CrearNoticia() {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [touched, setTouched] = useState({ imagen: false, titulo: false, descripcion: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();

  const isTituloValid = titulo.trim().length > 5;
  const isDescripcionValid = descripcion.trim().length > 10;
  const isImagenValid = !!imagen;
  const isFormValid = isTituloValid && isDescripcionValid && isImagenValid;

  const handleImagenChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagen(file);
    } else {
      setImagen(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // Subir imagen a un servicio real sería ideal, pero aquí la convertimos a base64 para el ejemplo
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const imageBase64 = await toBase64(imagen);
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: titulo,
          description: descripcion,
          image: imageBase64
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Noticia publicada correctamente');
        setTitulo('');
        setDescripcion('');
        setImagen(null);
      } else {
        setError(data.error || 'Error al publicar noticia');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-noticia-container">
      <form className="crear-noticia-form" onSubmit={handleSubmit}>
        <h1 className="crear-noticia-title">Crear Nueva Noticia</h1>
        <label className="crear-noticia-label">Imagen Principal</label>
        <div
          className={`crear-noticia-img-input${isImagenValid ? ' has-img' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          {imagen ? (
            <img
              src={URL.createObjectURL(imagen)}
              alt="preview"
              className="crear-noticia-img-preview"
            />
          ) : (
            <span className="crear-noticia-img-placeholder">Haz clic para subir una imagen</span>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImagenChange}
            onBlur={() => setTouched(t => ({ ...t, imagen: true }))}
          />
        </div>
        <label className="crear-noticia-label">Título</label>
        <input
          className="crear-noticia-input"
          type="text"
          placeholder="Ingresa el título de la noticia"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, titulo: true }))}
        />
        <label className="crear-noticia-label">Descripción</label>
        <textarea
          className="crear-noticia-textarea"
          placeholder=""
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, descripcion: true }))}
        />
        {error && <div style={{ color: 'red', marginBottom: '0.5rem', fontSize: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '0.5rem', fontSize: '1rem' }}>{success}</div>}
        <div className="crear-noticia-btn-row">
          <button
            className="crear-noticia-btn"
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Publicando...' : 'Publicar Noticia'}
          </button>
        </div>
      </form>
    </div>
  );
} 