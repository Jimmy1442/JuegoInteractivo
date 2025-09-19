// App.js
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
import Foro from "./Pages/Foro"; // Importa el componente Foro

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
          <Route path="mis-cursos" element={<MisCursos />} />
          <Route path="foro" element={<Foro />} /> {/* Ruta para el foro */}
        </Route>
      </Routes>
    </Router>
  );
}

// Wrappers de lógica
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

export default App;