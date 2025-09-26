import React, { useState, useEffect, useRef } from 'react';
import './JuegoLimites.css';

function JuegoLimites() {
  // Variables del juego
  const [playerX, setPlayerX] = useState(1);
  const [playerYOffset, setPlayerYOffset] = useState(0);
  const [targetX, setTargetX] = useState(2);
  const [limitValue, setLimitValue] = useState(4);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentFunction, setCurrentFunction] = useState('');
  const [obstacles, setObstacles] = useState([]);
  const [gameActive, setGameActive] = useState(true);
  const [scale, setScale] = useState(30);
  const [graphOffsetX, setGraphOffsetX] = useState(0);
  const [graphOffsetY, setGraphOffsetY] = useState(0);
  const [manualZoom, setManualZoom] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [dodging, setDodging] = useState(false);
  const [obstacleBlocking, setObstacleBlocking] = useState(false);
  const [nearObstacle, setNearObstacle] = useState(false);
  const [message, setMessage] = useState('¡Acerca a tu personaje al objetivo!');
  const [messageClass, setMessageClass] = useState('');
  const [progress, setProgress] = useState(0);
  const [showStepByStep, setShowStepByStep] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [viewRange, setViewRange] = useState({ minX: -5, maxX: 5, minY: -5, maxY: 10 });

  const canvasRef = useRef(null);

  // Lista de ejercicios por nivel (completa)
  const levels = [
    // Nivel 1: Definición de límites
    [
      { 
        func: 'quadratic', 
        target: 2, 
        limit: 4, 
        start: 1, 
        formula: 'f(x) = x²',
        viewRange: { minX: -1, maxX: 4, minY: 0, maxY: 8 },
        steps: [
          "Para la función f(x) = x², queremos encontrar el límite cuando x se acerca a 2.",
          "Evaluamos la función en valores cercanos a 2:",
          "f(1.9) = (1.9)² = 3.61",
          "f(1.99) = (1.99)² = 3.9601", 
          "f(2.01) = (2.01)² = 4.0401",
          "f(2.1) = (2.1)² = 4.41",
          "A medida que x se acerca a 2, f(x) se acerca a 4.",
          "Por lo tanto, el límite cuando x → 2 es 4."
        ]
      },
      { 
        func: 'linear', 
        target: 3, 
        limit: 6, 
        start: 1, 
        formula: 'f(x) = 2x',
        viewRange: { minX: 0, maxX: 5, minY: 0, maxY: 10 },
        steps: [
          "Para la función lineal f(x) = 2x, queremos encontrar el límite cuando x se acerca a 3.",
          "En funciones lineales, el límite es simplemente el valor de la función en ese punto.",
          "Evaluamos: f(3) = 2 * 3 = 6.",
          "Podemos verificar con valores cercanos:",
          "f(2.9) = 2 * 2.9 = 5.8",
          "f(3.1) = 2 * 3.1 = 6.2",
          "A medida que x se acerca a 3, f(x) se acerca a 6.",
          "Por lo tanto, el límite cuando x → 3 es 6."
        ]
      },
      { 
        func: 'constant', 
        target: 5, 
        limit: 4, 
        start: 2, 
        formula: 'f(x) = 4',
        viewRange: { minX: 1, maxX: 7, minY: 2, maxY: 6 },
        steps: [
          "Para la función constante f(x) = 4, queremos encontrar el límite cuando x se acerca a 5.",
          "En funciones constantes, el valor de la función es el mismo para cualquier x.",
          "Por lo tanto, no importa a qué valor se acerque x, f(x) siempre será 4.",
          "f(4.9) = 4, f(5) = 4, f(5.1) = 4",
          "El límite de una función constante es siempre igual a la constante.",
          "Por lo tanto, el límite cuando x → 5 es 4."
        ]
      }
    ],
    // Nivel 2: Límites laterales y existencia
    [
      { 
        func: 'piecewise1', 
        target: 2, 
        limit: 3, 
        start: 1, 
        formula: 'f(x) = { x+1 si x<2; 5-x si x≥2 }',
        viewRange: { minX: 0, maxX: 4, minY: 0, maxY: 6 },
        steps: [
          "Para esta función definida por partes, queremos encontrar el límite cuando x se acerca a 2.",
          "Calculamos el límite por la izquierda: lim(x→2⁻) f(x) = lim(x→2⁻) (x+1) = 2+1 = 3",
          "Calculamos el límite por la derecha: lim(x→2⁺) f(x) = lim(x→2⁺) (5-x) = 5-2 = 3",
          "Como ambos límites laterales existen y son iguales a 3,",
          "el límite cuando x → 2 existe y es igual a 3."
        ]
      },
      { 
        func: 'piecewise2', 
        target: 1, 
        limit: 'No existe', 
        start: 0, 
        formula: 'f(x) = { x² si x<1; x+2 si x≥1 }',
        viewRange: { minX: -0.5, maxX: 2.5, minY: 0, maxY: 5 },
        steps: [
          "Para esta función definida por partes, queremos encontrar el límite cuando x se acerca a 1.",
          "Calculamos el límite por la izquierda: lim(x→1⁻) f(x) = lim(x→1⁻) x² = 1",
          "Calculamos el límite por la derecha: lim(x→1⁺) f(x) = lim(x→1⁺) (x+2) = 3",
          "Como los límites laterales son diferentes (1 ≠ 3),",
          "el límite cuando x → 1 no existe."
        ]
      },
      { 
        func: 'absolute', 
        target: 0, 
        limit: 'No existe', 
        start: -0.5, 
        formula: 'f(x) = |x|/x',
        viewRange: { minX: -2, maxX: 2, minY: -2, maxY: 2 },
        steps: [
          "Para la función f(x) = |x|/x, queremos encontrar el límite cuando x se acerca a 0.",
          "Calculamos el límite por la izquierda: lim(x→0⁻) |x|/x = lim(x→0⁻) (-x)/x = -1",
          "Calculamos el límite por la derecha: lim(x→0⁺) |x|/x = lim(x→0⁺) x/x = 1",
          "Como los límites laterales son diferentes (-1 ≠ 1),",
          "el límite cuando x → 0 no existe."
        ]
      }
    ],
    // Nivel 3: Propiedades de los límites
    [
      { 
        func: 'sum', 
        target: 2, 
        limit: 7, 
        start: 1, 
        formula: 'f(x) = x² + 2x - 1',
        viewRange: { minX: 0, maxX: 4, minY: 0, maxY: 12 },
        steps: [
          "Para la función f(x) = x² + 2x - 1, queremos encontrar el límite cuando x se acerca a 2.",
          "Aplicamos las propiedades de los límites:",
          "lim(x→2) [x² + 2x - 1] = lim(x→2) x² + lim(x→2) 2x - lim(x→2) 1",
          "= (lim(x→2) x)² + 2·lim(x→2) x - lim(x→2) 1",
          "= (2)² + 2·2 - 1 = 4 + 4 - 1 = 7",
          "Por lo tanto, el límite cuando x → 2 es 7."
        ]
      },
      { 
        func: 'product', 
        target: 3, 
        limit: 8, 
        start: 2, 
        formula: 'f(x) = (x+1)(x-1)',
        viewRange: { minX: 1, maxX: 5, minY: -2, maxY: 12 },
        steps: [
          "Para la función f(x) = (x+1)(x-1), queremos encontrar el límite cuando x se acerca a 3.",
          "Aplicamos las propiedades de los límites:",
          "lim(x→3) [(x+1)(x-1)] = lim(x→3) (x+1) · lim(x→3) (x-1)",
          "= [lim(x→3) x + lim(x→3) 1] · [lim(x→3) x - lim(x→3) 1]",
          "= (3 + 1) · (3 - 1) = 4 · 2 = 8",
          "También podemos simplificar: (x+1)(x-1) = x² - 1",
          "lim(x→3) (x² - 1) = 3² - 1 = 9 - 1 = 8",
          "Por lo tanto, el límite cuando x → 3 es 8."
        ]
      },
      { 
        func: 'composite', 
        target: 2, 
        limit: 3, 
        start: 1, 
        formula: 'f(x) = √(x²+5)',
        viewRange: { minX: 0, maxX: 4, minY: 2, maxY: 5 },
        steps: [
          "Para la función f(x) = √(x²+5), queremos encontrar el límite cuando x se acerca a 2.",
          "Aplicamos las propiedades de los límites:",
          "lim(x→2) √(x²+5) = √[lim(x→2) (x²+5)]",
          "= √[lim(x→2) x² + lim(x→2) 5] = √[2² + 5] = √[4 + 5] = √9 = 3",
          "Por lo tanto, el límite cuando x → 2 es 3."
        ]
      }
    ],
    // Nivel 4: Límites trigonométricos
    [
      { 
        func: 'sinc', 
        target: 0, 
        limit: 1, 
        start: -0.5, 
        formula: 'f(x) = sin(x)/x',
        viewRange: { minX: -2, maxX: 2, minY: -0.5, maxY: 1.5 },
        steps: [
          "Para la función f(x) = sin(x)/x, queremos encontrar el límite cuando x se acerca a 0.",
          "Este es un límite trigonométrico fundamental.",
          "Aplicamos la regla de L'Hôpital (ya que es una indeterminación 0/0):",
          "Derivamos numerador y denominador: cos(x)/1",
          "Evaluamos el límite: lim(x→0) cos(x) = cos(0) = 1.",
          "Por lo tanto, el límite cuando x → 0 es 1."
        ]
      },
      { 
        func: 'trig1', 
        target: 0, 
        limit: 0.5, 
        start: -0.5, 
        formula: 'f(x) = (1 - cos(x))/x²',
        viewRange: { minX: -2, maxX: 2, minY: 0, maxY: 1 },
        steps: [
          "Para la función f(x) = (1 - cos(x))/x², queremos encontrar el límite cuando x se acerca a 0.",
          "Usamos la identidad trigonométrica: 1 - cos(x) = 2sin²(x/2)",
          "Reescribimos la función: 2sin²(x/2)/x² = (1/2)[sin(x/2)/(x/2)]²",
          "Sabemos que lim(u→0) sin(u)/u = 1, donde u = x/2.",
          "Por lo tanto, el límite es (1/2) * 1² = 1/2 = 0.5.",
          "También se puede resolver con la regla de L'Hôpital dos veces."
        ]
      },
      { 
        func: 'trig2', 
        target: 0, 
        limit: 1, 
        start: -0.5, 
        formula: 'f(x) = tan(x)/x',
        viewRange: { minX: -1.5, maxX: 1.5, minY: -2, maxY: 2 },
        steps: [
          "Para la función f(x) = tan(x)/x, queremos encontrar el límite cuando x se acerca a 0.",
          "Reescribimos tan(x) como sin(x)/cos(x):",
          "f(x) = tan(x)/x = [sin(x)/cos(x)]/x = sin(x)/(x·cos(x))",
          "Aplicamos propiedades de límites:",
          "lim(x→0) sin(x)/(x·cos(x)) = [lim(x→0) sin(x)/x] · [lim(x→0) 1/cos(x)]",
          "= 1 · 1/cos(0) = 1 · 1/1 = 1",
          "Por lo tanto, el límite cuando x → 0 es 1."
        ]
      }
    ]
  ];

  // Calcular el valor de la función en x
  const calculateFunction = (x) => {
    switch(currentFunction) {
      case 'quadratic':
        return x * x;
      case 'linear':
        return 2 * x;
      case 'constant':
        return 4;
      case 'piecewise1':
        return x < 2 ? x + 1 : 5 - x;
      case 'piecewise2':
        return x < 1 ? x * x : x + 2;
      case 'absolute':
        return x === 0 ? undefined : Math.abs(x) / x;
      case 'sum':
        return x * x + 2 * x - 1;
      case 'product':
        return (x + 1) * (x - 1);
      case 'composite':
        return Math.sqrt(x * x + 5);
      case 'sinc':
        return x === 0 ? 1 : Math.sin(x) / x;
      case 'trig1':
        return x === 0 ? 0.5 : (1 - Math.cos(x)) / (x * x);
      case 'trig2':
        return x === 0 ? 1 : Math.tan(x) / x;
      default:
        return x * x;
    }
  };

  // Función para obtener el rango de valores Y para una función en un rango X específico
  const getFunctionRange = (minX, maxX, samples = 100) => {
    let minY = Infinity;
    let maxY = -Infinity;
    
    for (let i = 0; i <= samples; i++) {
      const x = minX + (maxX - minX) * i / samples;
      const y = calculateFunction(x);
      
      if (y !== undefined && !isNaN(y) && isFinite(y)) {
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
    
    // Añadir un margen del 10%
    const margin = (maxY - minY) * 0.1;
    return {
      minY: minY - margin,
      maxY: maxY + margin
    };
  };

  // Calcular escala automática basada en el rango de vista
  const calculateAutoScale = (canvas) => {
    if (!canvas || !currentExercise) return 30;
    
    const range = currentExercise.viewRange || viewRange;
    const scaleX = (canvas.width * 0.8) / (range.maxX - range.minX);
    const scaleY = (canvas.height * 0.8) / (range.maxY - range.minY);
    
    // Usar la escala menor para mantener las proporciones
    const baseScale = Math.min(scaleX, scaleY);
    
    // Aplicar factor de zoom manual si está activo
    return manualZoom ? baseScale * zoomFactor : baseScale;
  };

  // Comprobar si hay obstáculos bloqueando el camino
  const checkForBlockingObstacles = (playerPosition) => {
    let blocking = false;
    
    // Comprobar si hay obstáculos entre el jugador y el objetivo
    for (const obstacle of obstacles) {
      if ((playerPosition < targetX && obstacle > playerPosition && obstacle < targetX) ||
          (playerPosition > targetX && obstacle < playerPosition && obstacle > targetX)) {
        
        // Si el obstáculo está cerca de la línea de camino
        if (Math.abs(obstacle - playerPosition) < 0.5) {
          blocking = true;
          break;
        }
      }
    }
    
    setObstacleBlocking(blocking);
    
    // Actualizar mensaje y mostrar botón de esquivar
    if (blocking && !dodging) {
      setMessage('¡Obstáculo detectado! Usa el botón para esquivar.');
      setMessageClass('warning');
    } else if (!blocking && !dodging && !nearObstacle) {
      setMessage('¡Acerca a tu personaje al objetivo!');
      setMessageClass('');
    }
  };

  // Comprobar si estamos cerca de un obstáculo
  const checkNearObstacle = (playerPosition) => {
    let near = false;
    
    for (const obstacle of obstacles) {
      if (Math.abs(playerPosition - obstacle) < 0.2 && Math.abs(playerYOffset) < 0.1) {
        near = true;
        setMessage('¡Cuidado! Estás cerca de un obstáculo.');
        setMessageClass('danger');
        break;
      }
    }
    
    setNearObstacle(near);
    
    // Si no estamos cerca de un obstáculo y no hay un obstáculo bloqueando, restaurar mensaje normal
    if (!near && !obstacleBlocking && !dodging) {
      setMessage('¡Acerca a tu personaje al objetivo!');
      setMessageClass('');
    }
  };

  // Comprobar si hemos esquivado exitosamente
  const checkDodgeSuccess = () => {
    // Si nos hemos movido lo suficiente verticalmente, desactivar el modo de esquiva
    if (Math.abs(playerYOffset) > 0.8) {
      resetDodge();
    }
  };

  // Resetear el modo de esquiva
  const resetDodge = () => {
    setDodging(false);
    setPlayerYOffset(0);
    checkForBlockingObstacles(playerX);
    checkNearObstacle(playerX);
  };

  // Activar modo de esquiva
  const dodgeObstacle = () => {
    setDodging(true);
    setMessage('¡Modo de esquiva! Usa las flechas arriba/abajo para esquivar.');
    setMessageClass('warning');
  };

  // Mover al jugador
  const movePlayer = (deltaX, deltaY) => {
    if (!gameActive) return;
    
    const newPlayerX = playerX + deltaX;
    setPlayerX(newPlayerX);
    
    // Si estamos esquivando, permitir movimiento vertical
    if (dodging) {
      const newYOffset = playerYOffset + deltaY * 2;
      const clampedYOffset = Math.max(-1, Math.min(1, newYOffset));
      setPlayerYOffset(clampedYOffset);
      
      // Comprobar si hemos esquivado exitosamente
      checkDodgeSuccess();
    }
    
    // Comprobar obstáculos
    checkForBlockingObstacles(newPlayerX);
    checkNearObstacle(newPlayerX);
    
    // Comprobar si el jugador ha llegado al objetivo
    if (Math.abs(newPlayerX - targetX) < 0.05 && !dodging) {
      winGame();
      return;
    }
    
    // Comprobar colisiones con obstáculos
    for (const obstacle of obstacles) {
      if (Math.abs(newPlayerX - obstacle) < 0.05 && Math.abs(playerYOffset) < 0.1) {
        loseGame();
        return;
      }
    }
    
    // Actualizar progreso
    const newProgress = Math.min(100, 100 - Math.abs(newPlayerX - targetX) * 50);
    setProgress(newProgress);
  };

  // Configurar ejercicio
  const setupExercise = () => {
    setGameActive(true);
    setMessage('¡Acerca a tu personaje al objetivo!');
    setMessageClass('');
    setProgress(0);
    setDodging(false);
    setPlayerYOffset(0);
    setObstacleBlocking(false);
    setNearObstacle(false);
    setShowStepByStep(false);
    
    // Seleccionar un ejercicio aleatorio del nivel actual
    const levelExercises = levels[currentLevel - 1];
    const exerciseIndex = Math.floor(Math.random() * levelExercises.length);
    const exercise = levelExercises[exerciseIndex];
    
    setCurrentExercise(exercise);
    setCurrentFunction(exercise.func);
    setTargetX(exercise.target);
    setLimitValue(exercise.limit);
    setPlayerX(exercise.start);
    
    // Configurar el rango de vista
    if (exercise.viewRange) {
      setViewRange(exercise.viewRange);
    } else {
      // Rango automático si no está especificado
      const autoRange = getFunctionRange(exercise.target - 2, exercise.target + 2);
      setViewRange({
        minX: exercise.target - 2,
        maxX: exercise.target + 2,
        minY: autoRange.minY,
        maxY: autoRange.maxY
      });
    }
    
    // Generar obstáculos dentro del rango de vista
    const range = exercise.viewRange || viewRange;
    const newObstacles = [];
    const numObstacles = 3 + Math.floor(currentLevel / 2);
    
    for (let i = 0; i < numObstacles; i++) {
      let obstacleX;
      let attempts = 0;
      do {
        obstacleX = range.minX + Math.random() * (range.maxX - range.minX);
        attempts++;
      } while (
        (Math.abs(obstacleX - exercise.target) < 0.5 || 
         Math.abs(obstacleX - exercise.start) < 0.3) && 
        attempts < 20
      );
      
      if (attempts < 20) {
        newObstacles.push(obstacleX);
      }
    }
    setObstacles(newObstacles);
    
    // Resetear desplazamientos y zoom
    setGraphOffsetX(0);
    setGraphOffsetY(0);
    setManualZoom(false);
    setZoomFactor(1);
    setManualZoom(false);
    setZoomFactor(1);
  };

  // Ganar el juego
  const winGame = () => {
    setGameActive(false);
    setMessage('¡Correcto! Has encontrado el límite.');
    setMessageClass('success');
    setPoints(points + 10);
    setProgress(100);
    setShowStepByStep(true);
  };

  // Perder el juego
  const loseGame = () => {
    setGameActive(false);
    setMessage('¡Cuidado! Has chocado con un valor incorrecto.');
    setMessageClass('failure');
    
    setTimeout(() => {
      restartExercise();
    }, 2000);
  };

  // Reiniciar ejercicio
  const restartExercise = () => {
    setAttempts(attempts + 1);
    
    if (currentExercise) {
      setPlayerX(currentExercise.start);
    }
    
    setGameActive(true);
    setMessage('¡Acerca a tu personaje al objetivo!');
    setMessageClass('');
    setProgress(0);
    setDodging(false);
    setPlayerYOffset(0);
    setObstacleBlocking(false);
    setNearObstacle(false);
    setShowStepByStep(false);
    setGraphOffsetX(0);
    setGraphOffsetY(0);
  };

  // Avanzar al siguiente nivel
  const nextLevel = () => {
    if (currentLevel < 4) {
      setCurrentLevel(currentLevel + 1);
      setupExercise();
    }
  };

  // Dibujar el juego (mejorado para adaptarse a diferentes rangos)
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentExercise) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Usar el rango de vista del ejercicio actual
    const range = currentExercise.viewRange || viewRange;
    
    // Calcular escala automática
    const autoScale = calculateAutoScale(canvas);
    
    // Calcular origen centrado en el canvas considerando el rango
    const centerX = (range.minX + range.maxX) / 2;
    const centerY = (range.minY + range.maxY) / 2;
    
    const originX = canvas.width / 2 - centerX * autoScale + graphOffsetX;
    const originY = canvas.height / 2 + centerY * autoScale + graphOffsetY;
    
    // Dibujar ejes coordenados
    ctx.beginPath();
    ctx.strokeStyle = '#8c9eff';
    ctx.lineWidth = 2;
    
    // Eje X
    const axisY = originY;
    if (axisY >= 0 && axisY <= canvas.height) {
      ctx.moveTo(0, axisY);
      ctx.lineTo(canvas.width, axisY);
    }
    
    // Eje Y
    const axisX = originX;
    if (axisX >= 0 && axisX <= canvas.width) {
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, canvas.height);
    }
    
    ctx.stroke();
    
    // Dibujar marcas en los ejes (adaptadas al rango)
    ctx.fillStyle = '#8c9eff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Determinar el intervalo de marcas basado en el rango
    const rangeX = range.maxX - range.minX;
    const rangeY = range.maxY - range.minY;
    
    const stepX = rangeX <= 2 ? 0.5 : (rangeX <= 5 ? 1 : Math.ceil(rangeX / 10));
    const stepY = rangeY <= 2 ? 0.5 : (rangeY <= 5 ? 1 : Math.ceil(rangeY / 10));
    
    // Marcas en el eje X
    for (let i = Math.ceil(range.minX / stepX) * stepX; i <= range.maxX; i += stepX) {
      if (Math.abs(i) < 0.001) continue; // Skip zero
      
      const xPos = originX + i * autoScale;
      if (xPos > 0 && xPos < canvas.width && axisY >= 0 && axisY <= canvas.height) {
        ctx.beginPath();
        ctx.moveTo(xPos, axisY - 5);
        ctx.lineTo(xPos, axisY + 5);
        ctx.stroke();
        ctx.fillText(i.toFixed(1), xPos, axisY + 15);
      }
    }
    
    // Marcas en el eje Y
    for (let i = Math.ceil(range.minY / stepY) * stepY; i <= range.maxY; i += stepY) {
      if (Math.abs(i) < 0.001) continue; // Skip zero
      
      const yPos = originY - i * autoScale;
      if (yPos > 0 && yPos < canvas.height && axisX >= 0 && axisX <= canvas.width) {
        ctx.beginPath();
        ctx.moveTo(axisX - 5, yPos);
        ctx.lineTo(axisX + 5, yPos);
        ctx.stroke();
        ctx.fillText(i.toFixed(1), axisX - 15, yPos);
      }
    }
    
    // Dibujar origen
    if (axisX >= 0 && axisX <= canvas.width && axisY >= 0 && axisY <= canvas.height) {
      ctx.fillText("0", axisX - 10, axisY + 15);
    }
    
    // Dibujar la función
    ctx.beginPath();
    ctx.strokeStyle = '#40c4ff';
    ctx.lineWidth = 3;
    
    let isFirstPoint = true;
    const step = (range.maxX - range.minX) / canvas.width;
    
    for (let x = range.minX; x <= range.maxX; x += step) {
      const y = calculateFunction(x);
      
      if (y === undefined || !isFinite(y)) {
        isFirstPoint = true;
        continue;
      }
      
      const canvasX = originX + x * autoScale;
      const canvasY = originY - y * autoScale;
      
      // Solo dibujar si está dentro del canvas
      if (canvasX >= 0 && canvasX <= canvas.width && canvasY >= 0 && canvasY <= canvas.height) {
        if (isFirstPoint) {
          ctx.moveTo(canvasX, canvasY);
          isFirstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
    }
    
    ctx.stroke();
    
    // Dibujar obstáculos (adaptados al nuevo sistema de coordenadas)
    for (const obstacle of obstacles) {
      const y = calculateFunction(obstacle);
      if (y === undefined || !isFinite(y)) continue;
      
      const x = originX + obstacle * autoScale;
      const yPos = originY - y * autoScale;
      
      // Solo dibujar si está dentro del área visible
      if (x >= -20 && x <= canvas.width + 20 && yPos >= -20 && yPos <= canvas.height + 20) {
        // Sombra
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.arc(x, yPos, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Obstáculo
        ctx.beginPath();
        ctx.fillStyle = '#ff5252';
        ctx.arc(x, yPos, 12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#d50000';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Efecto de resplandor
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 82, 82, 0.5)';
        ctx.lineWidth = 2;
        ctx.arc(x, yPos, 18, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    // Dibujar objetivo (adaptado al nuevo sistema)
    const targetY = calculateFunction(targetX);
    if (targetY !== undefined && isFinite(targetY)) {
      const targetCanvasX = originX + targetX * autoScale;
      const targetCanvasY = originY - targetY * autoScale;
      
      // Solo dibujar si está dentro o cerca del área visible
      if (targetCanvasX >= -50 && targetCanvasX <= canvas.width + 50 &&
          targetCanvasY >= -50 && targetCanvasY <= canvas.height + 50) {
        
        // Sombra
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 230, 118, 0.3)';
        ctx.arc(targetCanvasX, targetCanvasY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Objetivo
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 230, 118, 0.7)';
        ctx.arc(targetCanvasX, targetCanvasY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#00e676';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Efecto de resplandor
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 230, 118, 0.5)';
        ctx.lineWidth = 2;
        ctx.arc(targetCanvasX, targetCanvasY, 25, 0, Math.PI * 2);
        ctx.stroke();
        
        // Dibujar símbolo de objetivo
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.moveTo(targetCanvasX - 10, targetCanvasY);
        ctx.lineTo(targetCanvasX + 10, targetCanvasY);
        ctx.moveTo(targetCanvasX, targetCanvasY - 10);
        ctx.lineTo(targetCanvasX, targetCanvasY + 10);
        ctx.stroke();
      }
    }
    
    // Dibujar punto del jugador (adaptado al nuevo sistema)
    const baseY = calculateFunction(playerX);
    if (baseY !== undefined && isFinite(baseY)) {
      const playerCanvasX = originX + playerX * autoScale;
      const playerCanvasY = originY - (baseY + playerYOffset) * autoScale;
      
      // Sombra
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 229, 255, 0.3)';
      ctx.arc(playerCanvasX, playerCanvasY, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Dibujar personaje (avatar)
      ctx.beginPath();
      ctx.fillStyle = dodging ? '#ff9800' : '#00e5ff';
      ctx.arc(playerCanvasX, playerCanvasY, 12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = dodging ? '#ff6d00' : '#00b0ff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Dibujar cara del personaje
      ctx.beginPath();
      ctx.fillStyle = '#006064';
      ctx.arc(playerCanvasX - 4, playerCanvasY - 3, 2, 0, Math.PI * 2); // Ojo izquierdo
      ctx.arc(playerCanvasX + 4, playerCanvasY - 3, 2, 0, Math.PI * 2); // Ojo derecho
      ctx.fill();
      
      ctx.beginPath();
      ctx.strokeStyle = '#006064';
      ctx.lineWidth = 1.5;
      
      if (dodging) {
        // Cara de concentración al esquivar
        ctx.moveTo(playerCanvasX - 4, playerCanvasY + 3);
        ctx.lineTo(playerCanvasX + 4, playerCanvasY + 3);
      } else {
        // Sonrisa normal
        ctx.arc(playerCanvasX, playerCanvasY + 2, 4, 0.2, Math.PI - 0.2, false);
      }
      ctx.stroke();
      
      // Dibujar línea hasta la función base si estamos esquivando
      if (dodging) {
        const baseCanvasY = originY - baseY * autoScale;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 152, 0, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.moveTo(playerCanvasX, playerCanvasY);
        ctx.lineTo(playerCanvasX, baseCanvasY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Dibujar línea hasta el eje X
      if (axisY >= 0 && axisY <= canvas.height) {
        ctx.beginPath();
        ctx.strokeStyle = dodging ? 'rgba(255, 152, 0, 0.5)' : 'rgba(0, 229, 255, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.moveTo(playerCanvasX, playerCanvasY);
        ctx.lineTo(playerCanvasX, axisY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Mostrar coordenadas con fondo para mejor legibilidad
      const coordY = Math.max(axisY, 30);
      ctx.fillStyle = '#1a2035';
      ctx.fillRect(playerCanvasX - 40, coordY + 15, 80, 20);
      ctx.fillRect(playerCanvasX - 40, playerCanvasY - 35, 80, 20);
      
      ctx.fillStyle = dodging ? '#ff9800' : '#00e5ff';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(`x = ${playerX.toFixed(2)}`, playerCanvasX, coordY + 28);
      ctx.fillText(`f(x) = ${baseY.toFixed(2)}`, playerCanvasX, playerCanvasY - 22);
      
      // Mostrar desplazamiento si estamos esquivando
      if (dodging) {
        ctx.fillStyle = '#1a2035';
        ctx.fillRect(playerCanvasX - 40, playerCanvasY - 60, 80, 20);
        
        ctx.fillStyle = '#ff9800';
        ctx.fillText(`Δy = ${playerYOffset.toFixed(2)}`, playerCanvasX, playerCanvasY - 47);
      }
    }
    
    // Dibujar información del rango en una esquina
    ctx.fillStyle = 'rgba(26, 32, 53, 0.8)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = '#8c9eff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Rango X: [${range.minX}, ${range.maxX}]`, 15, 30);
    ctx.fillText(`Rango Y: [${range.minY.toFixed(1)}, ${range.maxY.toFixed(1)}]`, 15, 45);
    ctx.fillText(`Escala: ${autoScale.toFixed(0)}`, 15, 60);
    ctx.fillText(`Zoom: ${manualZoom ? (zoomFactor * 100).toFixed(0) + '%' : 'Auto'}`, 15, 75);
  };

  // Redimensionar canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGame();
    }
  };

  // Función para ajustar el zoom manualmente
  const adjustZoom = (factor) => {
    setManualZoom(true);
    setZoomFactor(prevZoom => Math.max(0.1, Math.min(5, prevZoom * factor)));
  };

  // Función para resetear la vista
  const resetView = () => {
    setManualZoom(false);
    setZoomFactor(1);
    setGraphOffsetX(0);
    setGraphOffsetY(0);
    if (currentExercise && currentExercise.viewRange) {
      setViewRange(currentExercise.viewRange);
    }
  };

  // Efectos
  useEffect(() => {
    setupExercise();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [currentLevel]);

  useEffect(() => {
    resizeCanvas();
  }, []);

  useEffect(() => {
    drawGame();
  }, [playerX, playerYOffset, targetX, viewRange, graphOffsetX, graphOffsetY, dodging, obstacles, currentFunction, currentExercise, manualZoom, zoomFactor]);

  // Comprobar obstáculos cuando cambia la posición del jugador
  useEffect(() => {
    if (gameActive) {
      checkForBlockingObstacles(playerX);
      checkNearObstacle(playerX);
    }
  }, [playerX, playerYOffset, gameActive]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">MathQuest: Aventura en Límites</h1>
        <p className="game-subtitle">Domina los límites matemáticos a través de 4 niveles desafiantes</p>
        <div className="level-indicator">
          {[1, 2, 3, 4].map(level => (
            <div 
              key={level}
              className={`level-badge ${level === currentLevel ? 'active' : ''}`}
            >
              Nivel {level}: {
                level === 1 ? 'Definición' :
                level === 2 ? 'Límites Laterales' :
                level === 3 ? 'Propiedades' : 'Trigonométricos'
              }
            </div>
          ))}
        </div>
      </div>
      
      <div className="game-content">
        <div className="graph-section">
          <div className="graph-container">
            <canvas ref={canvasRef}></canvas>
            
            {/* Controles de zoom superpuestos */}
            <div className="zoom-controls-overlay">
              <button className="zoom-btn-overlay zoom-in" onClick={() => adjustZoom(1.2)}>
                +
              </button>
              <button className="zoom-btn-overlay zoom-out" onClick={() => adjustZoom(0.8)}>
                −
              </button>
              <button className="zoom-btn-overlay zoom-reset" onClick={resetView}>
                ⌂
              </button>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
          </div>
          
          <div className="messages">
            <p className={messageClass}>{message}</p>
          </div>

          {showStepByStep && currentExercise && (
            <div className="step-by-step show">
              <h3>Paso a Paso: Explicación del Límite</h3>
              <div>
                {currentExercise.steps.map((step, index) => (
                  <div key={index} className="step">
                    <span className="step-number">{index + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="controls-section">
          <div className="control-panel">
            <div className="direction-buttons">
              <button 
                className="dir-btn" 
                style={{gridColumn: 2, gridRow: 1}}
                onClick={() => movePlayer(0, 0.05)}
              >
                ↑
              </button>
              <button 
                className="dir-btn" 
                style={{gridColumn: 1, gridRow: 2}}
                onClick={() => movePlayer(-0.05, 0)}
              >
                ←
              </button>
              <button 
                className="dir-btn" 
                style={{gridColumn: 2, gridRow: 2}}
                onClick={() => {setDodging(false); setPlayerYOffset(0);}}
              >
                •
              </button>
              <button 
                className="dir-btn" 
                style={{gridColumn: 3, gridRow: 2}}
                onClick={() => movePlayer(0.05, 0)}
              >
                →
              </button>
              <button 
                className="dir-btn" 
                style={{gridColumn: 2, gridRow: 3}}
                onClick={() => movePlayer(0, -0.05)}
              >
                ↓
              </button>
            </div>
            
            <div style={{marginTop: '15px', textAlign: 'center'}}>
              <button 
                style={{
                  background: '#ff9800', 
                  display: obstacleBlocking && !dodging ? 'block' : 'none'
                }}
                onClick={dodgeObstacle}
              >
                Esquivar Obstáculo
              </button>
            </div>
            
            <div className="function-display">
              <h3>Función actual</h3>
              <div style={{background:'#283593', padding:'12px', borderRadius:'8px', margin:'8px 0', textAlign:'center'}}>
                {currentExercise ? currentExercise.formula : 'f(x) = x²'}
              </div>
            </div>
            
            <button onClick={restartExercise}>Reiniciar Ejercicio</button>
            <button 
              className="next-exercise-btn"
              style={{display: showStepByStep ? 'block' : 'none'}}
              onClick={setupExercise}
            >
              Siguiente Ejercicio
            </button>
            <button 
              style={{
                background: 'linear-gradient(135deg, #ff4081, #f50057)',
                display: showStepByStep && currentLevel < 4 ? 'block' : 'none'
              }}
              onClick={nextLevel}
            >
              Siguiente Nivel
            </button>
          </div>
          
          <div className="player-card">
            <div className="player-avatar">Σ</div>
            <h3>Math Explorer</h3>
            <div className="player-stats">
              <div className="stat">
                <div className="stat-value">{currentLevel}</div>
                <div className="stat-label">Nivel</div>
              </div>
              <div className="stat">
                <div className="stat-value">{points}</div>
                <div className="stat-label">Puntos</div>
              </div>
              <div className="stat">
                <div className="stat-value">{attempts}</div>
                <div className="stat-label">Intentos</div>
              </div>
            </div>
          </div>
          
          <div className="game-info">
            <div className="limit-display">
              <h3>Límite por encontrar</h3>
              <p>Cuando x → <span>{targetX}</span>, f(x) → <span>{limitValue}</span></p>
            </div>
            
            <div className="instructions">
              <h3>Instrucciones</h3>
              <p>Usa los botones para mover a tu personaje a lo largo de la función.</p>
              <p>Acércate al objetivo (círculo verde) para encontrar el límite.</p>
              <p>¡Evita los obstáculos rojos que representan valores incorrectos!</p>
              <p>Si un obstáculo bloquea tu camino, usa el botón "Esquivar Obstáculo".</p>
              <p>Usa los botones +, - y Reset para ajustar la vista de la gráfica.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuegoLimites;