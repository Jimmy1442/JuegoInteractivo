// LayoutEstudiante.js
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Al inicio del archivo LayoutEstudiante.js
import './LayoutEstudiante.css';

function LayoutEstudiante({ onLogout }) {
  const [activeTab, setActiveTab] = useState('inicio');
  const navigate = useNavigate();
  const location = useLocation();

  // Datos del estudiante
  const studentData = {
    name: 'Jimmy',
    currentDate: 'Martes, 10 de Agosto 2025 • 2:30 PM',
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Determinar la pestaña activa basada en la ruta actual
  React.useEffect(() => {
    if (location.pathname === '/menu') setActiveTab('inicio');
    if (location.pathname === '/mis-cursos') setActiveTab('cursos');
    // Agrega más condiciones para otras rutas si es necesario
  }, [location.pathname]);

  const handleNavigation = (path, tab) => {
    navigate(path);
    setActiveTab(tab);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <div className="logo-icon">
              <div className="math-symbol">
                <span className="lim-text">lim</span>
                <span className="arrow">→</span>
                <span className="infinity">∞</span>
              </div>
            </div>
            <h1 className="logo-title">LimCont</h1>
          </div>

          {/* Usuario y fecha */}
          <div className="user-info">
            <div className="user-details">
              <div
                className="user-welcome"
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                ¡Bienvenida, {studentData.name}!
              </div>
              <div
                className="user-date"
                style={{
                  maxWidth: '150px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {studentData.currentDate}
              </div>
            </div>
            <div
              className="user-avatar"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              👤
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Este menú permanecerá en todas las páginas */}
      <div className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-tabs">
            <button
              onClick={() => handleNavigation('/menu', 'inicio')}
              className={`nav-tab ${activeTab === 'inicio' ? 'active' : ''}`}
              style={{
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              🏠 Inicios
            </button>
            
            <button
              onClick={() => handleNavigation('/mis-cursos', 'cursos')}
              className={`nav-tab ${activeTab === 'cursos' ? 'active' : ''}`}
              style={{
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              📚 Mis Cursos
            </button>
            
            <button
              onClick={() => handleNavigation('/foro', 'foro')}
              className={`nav-tab ${activeTab === 'foro' ? 'active' : ''}`}
              style={{
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              💬 Foro
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal que cambiará según la ruta */}
      <div className="dashboard-main">
          <Outlet />
      </div>
    </div>
  );
}

export default LayoutEstudiante;