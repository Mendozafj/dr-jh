import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api/testimonios';

function getUserIdFromToken() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
}

export default function TestimoniosCRUD() {
  const [testimonios, setTestimonios] = useState([]);
  const [form, setForm] = useState({ mensaje: '', id: null });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = getUserIdFromToken();
  const isLoggedIn = Boolean(userId);

  // Cargar testimonios
  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTestimonios(Array.isArray(data) ? data : []))
      .catch(() => setError('Error al cargar testimonios'))
      .finally(() => setLoading(false));
  }, []);

  // Crear o editar testimonio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.mensaje.trim()) return;
    const token = localStorage.getItem('token');
    try {
      let res, data;
      if (editando) {
        res = await fetch(`${API_URL}/${form.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ mensaje: form.mensaje })
        });
        data = await res.json();
        if (res.ok) {
          setTestimonios(testimonios.map(t => t._id === form.id ? { ...t, mensaje: form.mensaje } : t));
          setEditando(false);
          setForm({ mensaje: '', id: null });
          setSuccess('Testimonio actualizado');
        } else {
          setError(data.error || 'Error al actualizar');
        }
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ mensaje: form.mensaje })
        });
        data = await res.json();
        if (res.ok) {
          // Recargar testimonios
          const nuevos = await fetch(API_URL).then(r => r.json());
          setTestimonios(Array.isArray(nuevos) ? nuevos : testimonios);
          setForm({ mensaje: '', id: null });
          setSuccess('Testimonio publicado');
        } else {
          setError(data.error || 'Error al publicar');
        }
      }
    } catch {
      setError('Error de conexión');
    }
  };

  // Editar
  const handleEdit = (testimonio) => {
    setForm({ mensaje: testimonio.mensaje, id: testimonio._id });
    setEditando(true);
    setSuccess('');
    setError('');
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este testimonio?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setTestimonios(testimonios.filter(t => t._id !== id));
        setSuccess('Testimonio eliminado');
      } else {
        setError(data.error || 'Error al eliminar');
      }
    } catch {
      setError('Error de conexión');
    }
  };

  return (
    <div className="testimonios-crud">
      {isLoggedIn && (
        <form className="crud-form" onSubmit={handleSubmit}>
          <textarea
            name="mensaje"
            placeholder="Escribe tu testimonio..."
            value={form.mensaje}
            onChange={e => setForm({ ...form, mensaje: e.target.value })}
            maxLength={250}
            required
          />
          <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
          {editando && (
            <button type="button" className="cancel-btn" onClick={() => { setEditando(false); setForm({ mensaje: '', id: null }); }}>
              Cancelar
            </button>
          )}
        </form>
      )}
      {!isLoggedIn && (
        <div style={{ color: '#7B7B7B', textAlign: 'center', marginBottom: '1.5rem' }}>
          Debes iniciar sesión para publicar un testimonio.
        </div>
      )}
      {error && <div style={{ color: 'red', marginBottom: '0.5rem', fontSize: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '0.5rem', fontSize: '1rem' }}>{success}</div>}
      <div className="testimonios-list">
        {loading ? (
          <div style={{ color: '#7B7B7B', textAlign: 'center' }}>Cargando testimonios...</div>
        ) : testimonios.length === 0 ? (
          <div style={{ color: '#7B7B7B', textAlign: 'center' }}>No hay testimonios aún.</div>
        ) : (
          testimonios.map((t) => (
            <div className="testimonio-card" key={t._id}>
              <div className="testimonio-header">
                <span className="testimonio-nombre">{t.autor?.nombre || 'Anónimo'}</span>
                <span className="testimonio-fecha">{t.fecha ? new Date(t.fecha).toLocaleDateString() : ''}</span>
              </div>
              <p className="testimonio-mensaje">{t.mensaje}</p>
              {isLoggedIn && t.autor && t.autor._id === userId && (
                <div className="testimonio-actions">
                  <button onClick={() => handleEdit(t)} className="edit-btn">Editar</button>
                  <button onClick={() => handleDelete(t._id)} className="delete-btn">Eliminar</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 