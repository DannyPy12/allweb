import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/lod.png';
import { useAuth } from '../contexts/AuthContext';
import hidroponiaImg from '../assets/hidroponia.jpg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password, rememberMe);
      console.log('Login successful');
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000); // Espera 3 segundos antes de navegar a la página de inicio
    } catch (error: any) {
      console.error('Login failed', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="custom-body">
      <div className="water"></div>
      <div className="login-container">
        <div className="left-side">
          <img src={logo} alt="Only Water Logo" className="logo" />
          {showSuccessMessage ? (
            <div className="success-message-large">
              <p>Inicio de sesión con éxito!</p>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Recuérdame</label>
              </div>
              <div className="form-group">
                <a href="/forgot-password" className="forgot-password">¿Olvidó su contraseña?</a>
              </div>
              <button type="submit" className="login-btn">
                Iniciar sesión
              </button>
            </form>
          )}
        </div>
        <div className="right-side">
          <img src={hidroponiaImg} alt="Hidroponía" className="background-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
