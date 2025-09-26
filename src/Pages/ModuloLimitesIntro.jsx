import React from "react";
import "./ModuloLimitesIntro.css";

function ModuloLimitesIntro({ onStartGame }) { // Recibir la función de navegación
  return (
    <div className="limites-container">
      {/* Título principal */}
      <h2 className="limites-title">📘 ¿Qué son los Límites?</h2>
      <p className="limites-subtitle">
        Una introducción paso a paso al concepto más importante del cálculo
      </p>

      {/* Bienvenida */}
      <div className="limites-section welcome">
        <h3>✨ Bienvenido al mundo de los límites</h3>
        <p>
          Los límites son una de las ideas más poderosas en matemáticas. 
          Te permiten entender qué pasa cuando algo se acerca a un valor, 
          incluso si nunca llega exactamente ahí.
        </p>
        <p>
          En esta lección interactiva, no solo aprenderás la teoría, sino que 
          experimentarás con límites de forma visual y práctica.
        </p>
      </div>

      {/* Razón de los videos */}
      <div className="limites-section videos-intro">
        <h3>🎯 ¿Por qué ver estos videos primero?</h3>
        <p>
          Los límites son un concepto fundamental que necesita una base sólida 
          de comprensión. Estos videos te ayudarán a:
        </p>
        <ul>
          <li>Visualizar el concepto intuitivo de límite</li>
          <li>Entender la notación matemática</li>
          <li>Ver ejemplos paso a paso</li>
          <li>Prepararte para la experiencia interactiva</li>
        </ul>
      </div>

      {/* Videos fundamentales */}
      <div className="limites-section videos">
        <h3>🎥 Videos Fundamentales sobre Límites</h3>
        <div className="video-grid">
          <div className="video-card">▶️ Conceptualización de Límite</div>
          <div className="video-card">▶️ Definición de Límite</div>
          <div className="video-card">▶️ Límites Laterales</div>
          <div className="video-card">▶️ Propiedades de los Límites</div>
          <div className="video-card">▶️ Límites Trigonométricos</div>
        </div>
      </div>

      {/* Punto clave */}
      <div className="limites-section key-point">
        <h3>💡 Punto clave para recordar</h3>
        <p>
          El límite <b>NO depende</b> de qué pasa exactamente en el punto{" "}
          <i>x = a</i>. Solo importa qué pasa cuando nos acercamos a ese punto.
        </p>
      </div>

      {/* Botón actualizado */}
      <div className="limites-action">
        <button className="explore-btn" onClick={onStartGame}>
          🎮 ¡Jugar MathQuest: Límites!
        </button>
      </div>
    </div>
  );
}

export default ModuloLimitesIntro;