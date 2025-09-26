import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import RecuperarContra from "./Pages/RecuperarContra";
import MenuPrincipalEst from "./Pages/MenuPrincipalEst";
import MisCursos from "./Pages/MisCursos";
import LayoutEstudiante from "./Pages/LayoutEstudiante";
import Foro from "./Pages/Foro";
import ModuloLimitesIntro from "./Pages/ModuloLimitesIntro";
import JuegoLimites from "./Pages/JuegoLimites"; // Importar el juego

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas sin layout */}
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/recuperar" element={<RecuperarContraWrapper />} />

        {/* Rutas con layout fijo */}
        <Route path="/" element={<LayoutEstudianteWrapper />}>
          <Route path="menu" element={<MenuPrincipalEst />} />
          <Route
            path="mis-cursos"
            element={<MisCursosWrapper />} // Wrapper para manejar navegación
          />
          <Route path="foro" element={<Foro />} />

          {/* Rutas para el curso de límites */}
          <Route path="curso/limites" element={<ModuloLimitesIntroWrapper />} />
          <Route path="curso/limites/juego" element={<JuegoLimites />} />
        </Route>
      </Routes>
    </Router>
  );
}

/* Wrappers de lógica */
function LoginWrapper() {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    console.log("Usuario logueado:", userData);
    navigate("/menu");
  };

  const handleRecuperar = () => {
    navigate("/recuperar");
  };

  return <Login onLogin={handleLogin} onRecuperarClick={handleRecuperar} />;
}

function RecuperarContraWrapper() {
  const navigate = useNavigate();
  return <RecuperarContra onBackToLogin={() => navigate("/")} />;
}

function LayoutEstudianteWrapper() {
  const navigate = useNavigate();
  return (
    <LayoutEstudiante onLogout={() => navigate("/")}>
      {/* React Router inyecta las páginas aquí */}
    </LayoutEstudiante>
  );
}

/* Wrapper de MisCursos con navegación al módulo de límites */
function MisCursosWrapper() {
  const navigate = useNavigate();

  const handleNavigateToCourse = (courseId) => {
    if (courseId === 1) {
      navigate("/curso/limites"); // Redirige al módulo de límites
    }
    // En el futuro puedes manejar otros cursos aquí
  };

  return <MisCursos onNavigateToCourse={handleNavigateToCourse} />;
}

/* Wrapper para ModuloLimitesIntro con navegación al juego */
function ModuloLimitesIntroWrapper() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/curso/limites/juego"); // Navegar al juego
  };

  return <ModuloLimitesIntro onStartGame={handleStartGame} />;
}

export default App;