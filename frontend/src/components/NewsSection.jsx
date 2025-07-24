import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const newsList = [
  {
    title: 'Anunciado curso sobre el legado de Jose Gregorio Hernandez',
    date: '2025-04-05',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-27-2048x1365.jpg',
  },
  {
    title: 'Conmemorada la historia del Dr. Jose Gregorio Hernandez',
    date: '2025-03-20',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-25-2048x1365.jpg',
  },
  {
    title: 'Nuevo libro explora la obra y vida del Dr. José Gregorio Hernandez',
    date: '2023-02-15',
    img: 'https://media.elestimulo.com/uploads/2021/04/EE-JOSE-GREGORIO-EN-BLANCO-Y-NEGRO-DANIELH-21-2048x1365.jpg',
  },
];

export default function NewsSection() {
  const [filter] = useState('Recientes');
  const navigate = useNavigate();

  return (
    <section className="news-section" id="noticias">
      <div className="news-header">
        <h2 className="news-title">Noticias</h2>
        <select className="news-filter" value={filter} readOnly>
          <option>Recientes</option>
        </select>
      </div>
      <div className="news-list">
        {newsList.map((news, idx) => (
          <div
            className="news-card"
            key={idx}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/noticia/${idx}`)}
          >
            <img src={news.img} alt={news.title} className="news-img" />
            <div className="news-info">
              <div className="news-card-title">{news.title}</div>
              <div className="news-date">{news.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 