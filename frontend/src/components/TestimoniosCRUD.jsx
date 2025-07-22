import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'testimonios';

function getInitialTestimonios() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export default function TestimoniosCRUD() {
  const [testimonios, setTestimonios] = useState(getInitialTestimonios());
  const [form, setForm] = useState({ nombre: '', mensaje: '', id: null });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonios));
  }, [testimonios]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.mensaje.trim()) return;
    if (editando) {
      setTestimonios(testimonios.map(t => t.id === form.id ? { ...t, nombre: form.nombre, mensaje: form.mensaje } : t));
      setEditando(false);
    } else {
      setTestimonios([
        ...testimonios,
        {
          id: Date.now(),
          nombre: form.nombre,
          mensaje: form.mensaje,
          fecha: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        }
      ]);
    }
    setForm({ nombre: '', mensaje: '', id: null });
  };

  const handleEdit = (testimonio) => {
    setForm({ nombre: testimonio.nombre, mensaje: testimonio.mensaje, id: testimonio.id });
    setEditando(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este testimonio?')) {
      setTestimonios(testimonios.filter(t => t.id !== id));
    }
  };

  return (
    <div className="testimonios-crud">
      <form className="crud-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          maxLength={40}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Escribe tu testimonio..."
          value={form.mensaje}
          onChange={handleChange}
          maxLength={250}
          required
        />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
        {editando && (
          <button type="button" className="cancel-btn" onClick={() => { setEditando(false); setForm({ nombre: '', mensaje: '', id: null }); }}>
            Cancelar
          </button>
        )}
      </form>
      <div className="testimonios-list">
        {testimonios.length === 0 ? (
          <p className="no-testimonios">Aún no hay testimonios. ¡Sé el primero en compartir!</p>
        ) : (
          testimonios.map((t) => (
            <div className="testimonio-card" key={t.id}>
              <div className="testimonio-header">
                <span className="testimonio-nombre">{t.nombre}</span>
                <span className="testimonio-fecha">{t.fecha}</span>
              </div>
              <p className="testimonio-mensaje">{t.mensaje}</p>
              <div className="testimonio-actions">
                <button onClick={() => handleEdit(t)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(t.id)} className="delete-btn">Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 