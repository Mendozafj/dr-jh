import React, { useState, useRef } from 'react';

export default function CrearNoticia() {
  const [imagen, setImagen] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [touched, setTouched] = useState({ imagen: false, titulo: false, descripcion: false });
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

  return (
    <div className="crear-noticia-container">
      <form className="crear-noticia-form" onSubmit={e => e.preventDefault()}>
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
        <div className="crear-noticia-btn-row">
          <button
            className="crear-noticia-btn"
            type="submit"
            disabled={!isFormValid}
          >
            Publicar Noticia
          </button>
        </div>
      </form>
    </div>
  );
} 