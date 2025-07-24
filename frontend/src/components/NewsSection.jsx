import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/news';

export default function NewsSection() {
  const [filter] = useState('Recientes');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNewsList(data);
        } else {
          setError('Error al cargar noticias');
        }
      })
      .catch(() => setError('Error de conexión'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="news-section" id="noticias">
      <div className="news-header">
        <h2 className="news-title">Noticias</h2>
        <select className="news-filter" value={filter} readOnly>
          <option>Recientes</option>
        </select>
      </div>
      <div className="news-list">
        {loading ? (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.1rem', color: '#7B7B7B' }}>Cargando noticias...</div>
        ) : error ? (
          <div style={{ width: '100%', textAlign: 'center', color: 'red' }}>{error}</div>
        ) : newsList.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.1rem', color: '#7B7B7B' }}>No hay noticias creadas</div>
        ) : (
          newsList.map((news, idx) => (
            <div
              className="news-card"
              key={news._id || idx}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/noticia/${news._id || idx}`)}
            >
              <img src={news.image} alt={news.title} className="news-img" />
              <div className="news-info">
                <div className="news-card-title">{news.title}</div>
                <div className="news-date">{news.date ? new Date(news.date).toLocaleDateString() : ''}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
} 