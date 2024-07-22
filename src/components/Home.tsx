import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/lod.png';
import { useAuth } from '../contexts/AuthContext';
import PhChart from './phAgua';
import HumidityChart from './humedad';
import TempChart from './temperatura';

const Home: React.FC = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlanta, setSelectedPlanta] = useState(1);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout successful'); // Notificación de cierre de sesión en consola
      setShowLogoutMessage(true);
      setTimeout(() => {
        navigate('/');
      }, 3000); // Espera 3 segundos antes de navegar a la página de inicio
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handlePlantaChange = (planta: number) => {
    setSelectedPlanta(planta);
  };

  return (
    <>
      <header className="main-header">
        <img src={logo} alt="Only Water Logo" className="logo" />
        <nav>
          <ul>
            <li><button onClick={handleLogout} className="logout-button">Cerrar Sesión</button></li>
            <li><button onClick={() => handlePlantaChange(1)} className="plant-button">Planta 1</button></li>
            <li><button onClick={() => handlePlantaChange(2)} className="plant-button">Planta 2</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="welcome" className="section">
        </section>
        <section id="ph-chart" className="section">
          <div className="chart-container">
            <PhChart planta={selectedPlanta} />
          </div>
        </section>
        <section id="humidity-chart" className="section">
          <div className="chart-container">
            <HumidityChart planta={selectedPlanta} />
          </div>
        </section>
        <section id="temp-chart" className="section">
          <div className="chart-container">
            <TempChart planta={selectedPlanta} />
          </div>
        </section>
        {showLogoutMessage && (
          <div className="logout-message">
            <p>Cierre de sesión exitoso!</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
