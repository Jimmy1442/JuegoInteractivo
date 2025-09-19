import React, { useState } from "react";
import './Login.css';


function Login({ onRecuperarClick, onLogin }) {
  // Usuario y contraseña de ejemplo prellenados
  const [email, setEmail] = useState('jimmy');
  const [password, setPassword] = useState('root');

  const handleLogin = () => {
    // Validación básica
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Credenciales de ejemplo: usuario "jimmy", contraseña "root"
    if (email === 'jimmy' && password === 'root') {
      const userData = {
        email: email,
        name: 'Jimmy',
        role: 'student'
      };

      if (onLogin) {
        onLogin(userData);
      } else {
        alert('Login simulado exitoso: ' + JSON.stringify(userData));
      }
    } else {
      alert('Credenciales incorrectas. Prueba con usuario: "jimmy" y contraseña: "root"');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo Matemático */}
        <div className="logo-container">
          <div className="logo-icon">
            <div className="math-symbol">
              <span className="lim-text">lim</span>
              <span className="arrow">→</span>
              <span className="infinity">∞</span>
            </div>
          </div>

          <h1 className="logo-title">LimCont</h1>
          <p className="logo-subtitle">Límites y Continuidad</p>
        </div>

        {/* Email */}
        <div className="input-group">
          <div className="input-label">
            <span>📧</span>
            <span>Correo / Usuario</span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="usuario o email"
            className="input-field"
          />
        </div>

        {/* Contraseña */}
        <div className="input-group">
          <div className="input-label">
            <span>🔒</span>
            <span>Contraseña</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tu contraseña segura"
            className="input-field"
          />
        </div>

        {/* ¿Olvidaste contraseña? */}
        <div className="forgot-password">
          <button type="button" onClick={onRecuperarClick}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón Login */}
        <button type="button" onClick={handleLogin} className="login-button">
          Iniciar Sesión
        </button>

      </div>
    </div>
  );
}

export default Login;
