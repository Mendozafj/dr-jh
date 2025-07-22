import './App.css';
import TestimoniosCRUD from './components/TestimoniosCRUD';
import drJGH from './assets/dr-jh.jpg';

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <div className="header-actions" style={{textAlign: 'right', marginRight: '2rem', fontSize: '1rem'}}>
          <span style={{color: '#7B7B7B'}}>Deja tu testimonio</span>
        </div>
        <h1 className="header-title">Cátedra Dr. José Gregorio Hernández</h1>
        <p className="header-subtitle">
          Un espacio de fe, ciencia y humanidad inspirado<br />
          en el legado del Venerable Médico de los pobres.
        </p>
        <div className="phrases-row">
          <span className="phrase">‘La caridad bien entendida comienza en el corazón.’</span>
          <img src={drJGH} alt="Dr. José Gregorio Hernández" className="main-image" />
          <span className="phrase">‘Dios y la ciencia pueden ir de la mano para curar no solo el cuerpo, sino también el alma.’</span>
        </div>
      </header>
      <section className="form-section">
        <h2 className="form-title">Tu Testimonio</h2>
        <TestimoniosCRUD />
      </section>
      <footer className="footer">
        &copy; 2023 Cátedra Dr. José Gregorio Hernández, Todos los derechos reservados
      </footer>
    </div>
  );
}

export default App;
