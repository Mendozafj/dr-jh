import React from 'react';
import drJGH from '../assets/dr-jh.jpg';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Cátedra Dr. José Gregorio Hernandez</h1>
          <p className="hero-phrase">"La medicina no es sólo una ciencia, sino también un arte. Requiere no sólo conocimiento, sino también compasión y un corazón dispuesto a servir."</p>
        </div>
        <div className="hero-image-container">
          <img src={drJGH} alt="Dr. José Gregorio Hernández" className="hero-image" />
        </div>
      </div>
    </section>
  );
} 