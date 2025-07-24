import React from 'react';

export default function NoticiaDetalle() {
  return (
    <div className="noticia-detalle-container">
      <img
        className="noticia-detalle-img"
        src="https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-21-2048x1365.jpg"
        alt="Avances en la Investigación sobre Enfermedades Tropicales"
      />
      <h1 className="noticia-detalle-title">Avances en la Investigación sobre Enfermedades Tropicales</h1>
      <p className="noticia-detalle-desc">
        La Cátedra Dr. José Gregorio Hernandez ha publicado un nuevo estudio que detalla los avances en la investigación sobre enfermedades tropicales. El estudio destaca la importancia de la colaboración internacional y el uso de nuevas tecnologías para el desarrollo de tratamientos más efectivos. Los resultados muestran un progreso significativo en la comprensión de estas enfermedades y abren nuevas vías para la prevención y el tratamiento.
      </p>
      <div className="noticia-detalle-meta">
        Por Dra. Sofía Ramírez | 15 de Julio de 2025
      </div>
    </div>
  );
} 