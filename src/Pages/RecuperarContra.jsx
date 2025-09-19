import React, { useState } from "react";
import './RecuperarContra.css';

function RecuperarContra({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      console.log('Reset password for:', email);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="forgot-container">
        <div className="forgot-card">
          {/* Logo */}
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

          {/* Mensaje de éxito */}
          <div className="success-message">
            <div className="success-icon">✉️</div>
            <h2>¡Correo Enviado!</h2>
            <p>Hemos enviado las instrucciones para restablecer tu contraseña a:</p>
            <strong>{email}</strong>
            <p className="instruction">
              Revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
          </div>

          {/* Volver al Login */}
          <button onClick={onBackToLogin} className="back-button">
            ← Volver al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        
        {/* Logo */}
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

        {/* Header */}
        <div className="forgot-header">
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla.
          </p>
        </div>

        {/* Email Input */}
        <div className="input-group">
          <div className="input-label">
            <span>📧</span>
            <span>Correo Electrónico</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@ejemplo.com"
            className="input-field"
          />
        </div>

        {/* Botón Enviar */}
        <button onClick={handleSubmit} className="reset-button">
          Enviar Instrucciones
        </button>

        {/* Volver al Login */}
        <div className="back-to-login">
          <button onClick={onBackToLogin}>
            ← Volver al Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default RecuperarContra;
