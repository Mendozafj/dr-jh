import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import NewsSection from './components/NewsSection';
import TestimoniosSection from './components/TestimoniosSection';
import NoticiaDetalle from './components/NoticiaDetalle';

function Landing() {
  return (
    <>
      <Hero />
      <InfoSection />
      <NewsSection />
      <TestimoniosSection />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/noticia/:id" element={<NoticiaDetalle />} />
        </Routes>
        <footer className="footer">
          &copy; 2025 Cátedra Dr. José Gregorio Hernández, Todos los derechos reservados
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
