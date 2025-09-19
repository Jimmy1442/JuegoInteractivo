// MenuPrincipalEst.js
import React from 'react';
import './MenuPrincipalEst.css';

function MenuPrincipalEst() {
  // Datos del estudiante para las estadísticas
  const studentData = {
    exercisesCompleted: 47,
    studyTime: '1h',
  };

  return (
    <div className="dashboard-main-content">
      {/* Left Content - Course Section */}
      <div className="main-content">
        <h2 className="content-title">Límites y continuidad</h2>
        <p className="content-description">
          Domina los conceptos de límites y continuidad a tu propio ritmo.
        </p>

        {/* Formula Card */}
        <div className="formula-card">
          <div className="formula-expression">
            <span className="formula-lim">lim</span>{' '}
            <span className="formula-function">f(x)</span> ={' '}
            <span className="formula-result">L</span>
          </div>
          <div className="formula-label">Límite</div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-button study">📖 Empezar Curso</button>
        </div>
      </div>

      {/* Right Sidebar - Stats */}
      <div className="dashboard-sidebar">
        {/* Exercises Completed Card */}
        <div className="stat-card exercises">
          <div className="stat-number blue">{studentData.exercisesCompleted}</div>
          <div className="stat-label">Ejercicios Completados</div>
        </div>

        {/* Study Time Card */}
        <div className="stat-card time">
          <div className="stat-number purple">{studentData.studyTime}</div>
          <div className="stat-label">Tiempo de Estudio</div>
        </div>
      </div>
    </div>
  );
}

export default MenuPrincipalEst;
