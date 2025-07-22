import './App.css';
import TestimoniosCRUD from './components/TestimoniosCRUD';
import drJGH from './assets/dr-jh.jpg';

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <h1>Cátedra Dr. José Gregorio Hernández</h1>
        <p className="subtitle">Inspirando valores y ciencia</p>
      </header>
      <section className="welcome-section">
        <img src={drJGH} alt="Dr. José Gregorio Hernández" className="main-image" />
        <div className="welcome-text">
          <h2>Bienvenido a la Cátedra</h2>
          <p>
            Un espacio dedicado a la vida, obra y valores del Dr. José Gregorio Hernández. Aquí podrás conocer más sobre su legado y compartir tus testimonios.
          </p>
          <blockquote className="frase-jgh">
            "La caridad es la ciencia más grande del mundo."
            <span className="autor-frase">- Dr. José Gregorio Hernández</span>
          </blockquote>
        </div>
      </section>
      <section className="testimonios-section">
        <h2>Testimonios</h2>
        <TestimoniosCRUD />
      </section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cátedra Dr. José Gregorio Hernández</p>
      </footer>
    </div>
  );
}

export default App;
