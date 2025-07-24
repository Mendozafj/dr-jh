import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/news';

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setNoticia(data);
        } else {
          setError('Noticia no encontrada');
        }
      })
      .catch(() => setError('Noticia no encontrada'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="noticia-detalle-container"><div style={{fontSize:'1.2rem', color:'#7B7B7B'}}>Cargando...</div></div>;
  }
  if (error) {
    return <div className="noticia-detalle-container"><div style={{fontSize:'1.2rem', color:'red'}}>{error}</div></div>;
  }

  return (
    <div className="noticia-detalle-container">
      <img
        className="noticia-detalle-img"
        src={noticia.image}
        alt={noticia.title}
      />
      <h1 className="noticia-detalle-title">{noticia.title}</h1>
      <p className="noticia-detalle-desc">{noticia.description}</p>
      <div className="noticia-detalle-meta">
        Por {noticia.author || 'Anónimo'} | {noticia.date ? new Date(noticia.date).toLocaleDateString() : ''}
      </div>
    </div>
  );
} 