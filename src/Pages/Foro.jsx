// Foro.js
import React, { useState } from 'react';
import './Foro.css';

function Foro() {
  const [posts] = useState([
    {
      id: 1,
      author: 'Carlos Mendoza',
      role: 'Estudiante',
      avatar: 'C',
      avatarColor: '#e91e63',
      title: '¿Cómo resolver límites indeterminados 0/0?',
      content: 'Tengo dificultades para entender cómo aplicar la regla de L\'Hôpital en límites que resultan en formas indeterminadas. ¿Podrían ayudarme con algunos ejemplos prácticos?',
      tags: ['límites', 'regla-lhopital', 'indeterminados'],
      responses: 7,
      timestamp: 'Hace 2 horas'
    },
    {
      id: 2,
      author: 'Dr. Roberto Sánchez',
      role: 'Profesor',
      avatar: 'Dr.R',
      avatarColor: '#3f51b5',
      title: 'Teorema del Valor Intermedio: Aplicaciones Prácticas',
      content: 'Les comparto algunos ejercicios adicionales sobre el Teorema del Valor Intermedio con aplicaciones en problemas reales. Incluye casos donde debemos demostrar la existencia de raíces...',
      tags: ['continuidad', 'teoremas', 'ejercicios', 'profesor'],
      responses: 15,
      timestamp: 'Hace 5 horas'
    }
  ]);

  const handleNewQuestion = () => {
    // Lógica para crear nueva pregunta
    alert('Función para crear nueva pregunta');
  };

  const handleRespond = (postId) => {
    // Lógica para responder a un post
    alert(`Responder al post ${postId}`);
  };

  return (
    <div className="foro-container">
      {/* Header del Foro */}
      <div className="foro-header">
        <div className="foro-info">
          <div className="foro-icon">💬</div>
          <div className="foro-description">
            <h2>Foro de Discusión</h2>
            <p>
              Participa en discusiones académicas, comparte dudas y colabora con
              tus compañeros y profesores en el aprendizaje de Análisis
              Matemático.
            </p>
          </div>
        </div>
        <button className="new-question-btn" onClick={handleNewQuestion}>
          ✏️ Nueva Pregunta
        </button>
      </div>

      {/* Lista de Posts */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Header del Post */}
            <div className="post-header">
              <div className="author-info">
                <div 
                  className="author-avatar"
                  style={{ backgroundColor: post.avatarColor }}
                >
                  {post.avatar}
                </div>
                <div className="author-details">
                  <div className="author-name">{post.author}</div>
                  <div className="author-role">{post.role}</div>
                </div>
              </div>
              <div className="post-timestamp">{post.timestamp}</div>
            </div>

            {/* Contenido del Post */}
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-text">{post.content}</p>
              
              {/* Tags */}
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer del Post */}
            <div className="post-footer">
              <div className="responses-count">
                💬 {post.responses} respuestas
              </div>
              <button 
                className="respond-btn"
                onClick={() => handleRespond(post.id)}
              >
                💬 Responder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foro;