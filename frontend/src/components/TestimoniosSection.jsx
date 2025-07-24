import React from 'react';
import TestimoniosCRUD from './TestimoniosCRUD';

export default function TestimoniosSection() {
  return (
    <section className="testimonios-section" id="testimonios">
      <h2 className="testimonios-title">Testimonios</h2>
      <div className="testimonios-content">
        <div className="testimonios-form-card">
          <TestimoniosCRUD />
        </div>
      </div>
    </section>
  );
} 