import React from 'react';

const infoRows = [
  {
    title: 'Cátedra',
    text: 'El Dr. José Gregorio Hernández nace en Isnotú, estado Trujillo. Estudia primeras letras en su pueblo natal y se traslada luego a Caracas, para estudiar en el Colegio Villegas, graduándose de Bachiller en Filosofía en 1884. Estudia Medicina, graduándose en 1888. Presentó tesis en: La doctrina de Laveran y la Fiebre Tifoidea en Caracas, ambos relacionados con enfermedades bacterianas, campo en el cual centrará su profesión médica.',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-27-2048x1365.jpg',
  },
  {
    title: 'Fundador de la Bacteriología',
    text: 'Es considerado Fundador de la Bacteriología en Venezuela. Luego se traslada a su tierra natal para hacer medicina rural, donde recibe la noticia de que fue becado para estudiar en París, estudios de Microscopía, Bacteriología, Histología y Fisiología Experimental. Regresa a Europa en 1911 y funda el Instituto de Medicina Experimental, el Laboratorio del Hospital Vargas y varias cátedras de medicina.',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-25-2048x1365.jpg',
  },
  {
    title: 'Docencia y legado',
    text: 'Perfecciona el uso del microscopio. En 1904 ingresa como Individuo de Número a la Academia Nacional de Medicina como uno de sus Fundadores. En 1909 renuncia a sus labores en Venezuela y se traslada a Italia, para ingresar al monasterio de la Cartuja, como Fray Marcelo. Su condición física lo hace regresar a sus actividades profesionales, docentes y académicas, en Venezuela.',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-21-2048x1365.jpg',
  },
];

export default function InfoSection() {
  return (
    <section className="info-section">
      {infoRows.map((row, idx) => (
        <div className={`info-row${idx % 2 === 1 ? ' reverse' : ''}`} key={row.title}>
          <div className="info-img-container">
            <img src={row.img} alt={row.title} className="info-img" />
          </div>
          <div className="info-text">
            <h2 className="info-title">{row.title}</h2>
            <p className="info-body">{row.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
} 