import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/news';

function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}

export default function NewsSection() {
  const [filter] = useState('Recientes');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const logged = isLoggedIn();

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const fetchNews = () => {
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta noticia?')) return;
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNewsList(newsList.filter(n => n._id !== id));
        setSuccess('Noticia eliminada');
      } else {
        setError(data.error || 'Error al eliminar noticia');
      }
    } catch {
      setError('Error de conexión');
    }
  };

  return (
    <section className="news-section" id="noticias">
      <div className="news-header">
        <h2 className="news-title">Noticias</h2>
        <select className="news-filter" value={filter} readOnly>
          <option>Recientes</option>
        </select>
      </div>
      {error && <div style={{ width: '100%', textAlign: 'center', color: 'red' }}>{error}</div>}
      {success && <div style={{ width: '100%', textAlign: 'center', color: 'green' }}>{success}</div>}
      <div className="news-list">
        {loading ? (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.1rem', color: '#7B7B7B' }}>Cargando noticias...</div>
        ) : newsList.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '1.1rem', color: '#7B7B7B' }}>No hay noticias creadas</div>
        ) : (
          newsList.map((news, idx) => (
            <div
              className="news-card"
              key={news._id || idx}
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={e => {
                if (e.target.classList.contains('news-delete-btn')) return;
                navigate(`/noticia/${news._id || idx}`);
              }}
            >
              <img src={news.image} alt={news.title} className="news-img" />
              <div className="news-info">
                <div className="news-card-title">{news.title}</div>
                <div className="news-date">{news.date ? new Date(news.date).toLocaleDateString() : ''}</div>
              </div>
              {logged && (
                <button
                  className="news-delete-btn"
                  style={{ position: 'absolute', top: 8, right: 8, background: '#fa5252', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.95rem' }}
                  onClick={e => { e.stopPropagation(); handleDelete(news._id); }}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
} 