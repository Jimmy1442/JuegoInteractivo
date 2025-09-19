  import React, { useState } from "react";
  import "./MisCursos.css";

  function MisCursos({ onNavigateToCourse }) {
    const [activeCourse, setActiveCourse] = useState(null);


    // Datos de los cursos
    const courses = [
      {
        id: 1,
        title: "LÍMITES DE FUNCIONES REALES",
        description:
          "Domina el concepto fundamental de límites en funciones reales. Este curso te llevará desde la definición básica hasta las propiedades avanzadas y límites trigonométricos.",
        topics: [
          "Definición de Límites",
          "Límites laterales y existencia del límite",
          "Propiedades de los límites",
          "Límites trigonométricos",
        ],
      },
      {
        id: 2,
        title: "CONTINUIDAD",
        description:
          "Explora el concepto de continuidad en funciones reales. Aprende sobre continuidad puntual, teoremas fundamentales y continuidad en diferentes tipos de intervalos.",
        topics: [
          "Continuidad puntual",
          "Teoremas de continuidad en un punto",
          "Continuidad en un intervalo abierto",
          "Continuidad en un intervalo cerrado",
        ],
      },
    ];

    const toggleCourse = (courseId) => {
      setActiveCourse(activeCourse === courseId ? null : courseId);
    };

    const handleStartCourse = (courseId) => {
      if (onNavigateToCourse) {
        onNavigateToCourse(courseId);
      }
    };

    return (
      <div className="mis-cursos-container">
        {/* Main Content */}
        <div className="dashboard-main">
          {/* Left Content - Course Section */}
          <div className="main-content">
            <h2 className="content-title">Mis Cursos</h2>
            <p className="content-description">
              Domina los conceptos de límites y continuidad a tu propio ritmo.
            </p>

            {/* Courses List */}
            <div className="courses-container">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <div className="course-number">{course.id}.</div>
                    <h3 className="course-title">{course.title}</h3>
                    <button
                      className="course-toggle"
                      onClick={() => toggleCourse(course.id)}
                    >
                      {activeCourse === course.id ? "▲" : "▼"}
                    </button>
                  </div>
                  <p className="course-description">{course.description}</p>

                  {activeCourse === course.id && (
                    <div className="course-content">
                      <div className="content-label">Contenido del Curso</div>
                      <ul className="topics-list">
                        {course.topics.map((topic, index) => (
                          <li key={index} className="topic-item">
                            <input
                              type="checkbox"
                              id={`topic-${course.id}-${index}`}
                            />
                            <label htmlFor={`topic-${course.id}-${index}`}>
                              {topic}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="start-course-btn"
                        onClick={() => handleStartCourse(course.id)}
                      >
                        Iniciar con el curso
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="dashboard-sidebar">
          </div>
        </div>
      </div>
    );
  }

  export default MisCursos;
