import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import NewsSection from './components/NewsSection';
import TestimoniosSection from './components/TestimoniosSection';
import NoticiaDetalle from './components/NoticiaDetalle';
import LoginPage from './components/LoginPage';
import CrearNoticia from './components/CrearNoticia';
import RegisterPage from './components/RegisterPage';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/crear-noticia" element={<CrearNoticia />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <footer className="footer">
          &copy; 2025 Cátedra Dr. José Gregorio Hernández, Todos los derechos reservados
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
