# 📚 Referencia de API - Block Shooter V4

## 🔧 Introducción

Esta documentación describe la API pública de Block Shooter V4, permitiendo a desarrolladores extender y personalizar el juego.

---

## 🏗️ Clases Principales

### `Game`
Clase principal que inicializa y maneja el ciclo de vida del juego.

#### Propiedades Públicas

```javascript
{
    canvas: HTMLCanvasElement,      // Elemento canvas del juego
    ctx: CanvasRenderingContext2D, // Contexto 2D del canvas
    audio: AudioSystem,             // Sistema de audio
    particleSystem: ParticleSystem, // Sistema de partículas
    input: InputSystem,             // Sistema de entrada
    scoreSystem: ScoreSystem,       // Sistema de puntuación
    player: Player,                 // Instancia del jugador
    level: Level,                   // Instancia del nivel actual
    projectiles: Projectile[],      // Array de proyectiles activos
    state: string                   // Estado actual del juego (loading, menu, playing, paused, gameOver, victory)
}
```

#### Métodos Públicos

```javascript
/**
 * Inicializa el juego y muestra pantalla de carga
 * @memberof Game
 */
initGame()

/**
 * Inicia una nueva partida
 * @memberof Game
 */
startGame()

/**
 * Pausa el juego
 * @memberof Game
 */
pauseGame()

/**
 * Reanuda el juego desde pausa
 * @memberof Game
 */
resumeGame()

/**
 * Reinicia la partida actual
 * @memberof Game
 */
restartGame()

/**
 * Muestra una pantalla específica
 * @param {string} screenId - ID de la pantalla (main-menu, game-container, etc.)
 * @memberof Game
 */
showScreen(screenId)

/**
 * Dispara un proyectil desde la posición del jugador
 * @memberof Game
 */
shoot()

/**
 * Destruye recursos y limpia el juego
 * @memberof Game
 */
destroy()
```

#### Ejemplo de Uso

```javascript
// Inicializar juego
const game = new Game();

// Escuchar eventos
window.game = game;

// Controlar el juego desde consola
window.game.startGame();
window.game.pauseGame();
window.game.resumeGame();
```

---

### `AudioSystem`
Sistema de gestión de audio y música.

#### Propiedades Públicas

```javascript
{
    volume: number,  // Volumen actual (0-100)
    sounds: Object   // Objeto con todos los sonidos cargados
}
```

#### Métodos Públicos

```javascript
/**
 * Reproducir música de fondo
 * @param {string} type - Tipo de música (menu, game, victory, gameOver)
 * @memberof AudioSystem
 */
playMusic(type)

/**
 * Reproducir efecto de sonido
 * @param {string} sound - Tipo de sonido (shoot, hit, powerup, destroy, button, levelComplete)
 * @memberof AudioSystem
 */
playSFX(sound)

/**
 * Configurar volumen global
 * @param {number} volume - Volumen (0-100)
 * @memberof AudioSystem
 */
setVolume(volume)
```

#### Ejemplo de Uso

```javascript
// Reproducir música de menú
game.audio.playMusic('menu');

// Reproducir sonido de disparo
game.audio.playSFX('shoot');

// Ajustar volumen
game.audio.setVolume(80);
```

---

### `ParticleSystem`
Sistema de creación y gestión de partículas.

#### Métodos Públicos

```javascript
/**
 * Crear una nueva partícula
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 * @param {string} color - Color en formato hex (ej: '#00ffff')
 * @param {Object} velocity - Vector de velocidad {x, y}
 * @param {number} size - Tamaño de la partícula
 * @memberof ParticleSystem
 */
createParticle(x, y, color, velocity, size)

/**
 * Limpiar todas las partículas
 * @memberof ParticleSystem
 */
clear()
```

#### Ejemplo de Uso

```javascript
// Crear efecto de explosión
game.particleSystem.createParticle(
    player.x + player.width / 2,
    player.y + player.height / 2,
    '#ff0000',
    { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
    10
);

// Limpiar partículas
game.particleSystem.clear();
```

---

### `InputSystem`
Sistema de gestión de entrada de usuario.

#### Propiedades Públicas

```javascript
{
    keys: Object,          // Estado de las teclas presionadas
    touchControls: Object  // Estado de los controles táctiles
}
```

#### Métodos Públicos

```javascript
/**
 * Actualizar estado de entrada
 * @memberof InputSystem
 */
update()
```

#### Ejemplo de Uso

```javascript
// Verificar si una tecla está presionada
game.input.keys['ArrowLeft']

// Actualizar controles
game.input.update();
```

---

### `ScoreSystem`
Sistema de gestión de puntuación, niveles y records.

#### Propiedades Públicas

```javascript
{
    score: number,         // Puntuación actual
    level: number,         // Nivel actual
    lives: number,         // Vidas restantes
    bestScore: number,     // Mejor puntuación guardada
    records: Array         // Array de records [{score, date}, ...]
}
```

#### Métodos Públicos

```javascript
/**
 * Añadir puntos a la puntuación
 * @param {number} points - Puntos a añadir
 * @memberof ScoreSystem
 */
addScore(points)

/**
 * Avanzar al siguiente nivel
 * @memberof ScoreSystem
 */
nextLevel()

/**
 * Perder una vida
 * @returns {boolean} - True si quedan vidas, false si game over
 * @memberof ScoreSystem
 */
loseLife()

/**
 * Reiniciar puntuación y niveles
 * @memberof ScoreSystem
 */
reset()

/**
 * Cargar records desde localStorage
 * @returns {Array} - Array de records
 * @memberof ScoreSystem
 */
loadRecords()

/**
 * Guardar records en localStorage
 * @memberof ScoreSystem
 */
saveRecords()
```

#### Ejemplo de Uso

```javascript
// Añadir puntos
game.scoreSystem.addScore(100);

// Avanzar de nivel
game.scoreSystem.nextLevel();

// Ver puntuación actual
console.log('Puntuación:', game.scoreSystem.score);
console.log('Nivel:', game.scoreSystem.level);
console.log('Vidas:', game.scoreSystem.lives);
console.log('Mejor puntuación:', game.scoreSystem.bestScore);
```

---

### `Player`
Representa al jugador y sus propiedades.

#### Propiedades Públicas

```javascript
{
    x: number,              // Posición X
    y: number,              // Posición Y
    width: number,          // Ancho
    height: number,         // Alto
    speed: number,          // Velocidad de movimiento
    color: string,          // Color
    lives: number,          // Vidas restantes
    invincible: boolean,    // ¿Invencible?
    powerUps: Object       // Power-ups activos
}
```

#### Métodos Públicos

```javascript
/**
 * Actualizar estado del jugador
 * @memberof Player
 */
update()

/**
 * Dibujar jugador en canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D
 * @memberof Player
 */
draw(ctx)

/**
 * Activar un power-up
 * @param {string} type - Tipo de power-up (multiShot, laser, shield, timeSlow)
 * @param {number} duration - Duración en frames
 * @memberof Player
 */
activatePowerUp(type, duration)

/**
 * Recibir daño
 * @returns {boolean} - True si el daño fue recibido, false si ya estaba invencible
 * @memberof Player
 */
takeDamage()
```

#### Ejemplo de Uso

```javascript
// Mover jugador (desde InputSystem)
if (game.keys['ArrowLeft']) {
    game.player.x -= game.player.speed;
}

// Activar power-up
game.player.activatePowerUp('multiShot', 500);

// Verificar vidas
game.player.lives
```

---

### `Level`
Maneja la generación y actualización de niveles.

#### Propiedades Públicas

```javascript
{
    number: number,         // Número de nivel
    blocks: Block[],        // Array de bloques
    enemies: Block[],       // Array de enemigos
    powerUps: PowerUp[],    // Array de power-ups
    completed: boolean      // ¿Nivel completado?
}
```

#### Métodos Públicos

```javascript
/**
 * Generar nivel proceduralmente
 * @memberof Level
 */
generateLevel()

/**
 * Actualizar estado del nivel
 * @memberof Level
 */
update()

/**
 * Dibujar nivel en canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D
 * @memberof Level
 */
draw(ctx)

/**
 * Crear un power-up en posición específica
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 * @memberof Level
 */
spawnPowerUp(x, y)
```

#### Ejemplo de Uso

```javascript
// Crear nuevo nivel
game.level = new Level(game, 1);

// Ver bloques en el nivel
console.log('Bloques:', game.level.blocks.length);
console.log('Enemigos:', game.level.enemies.length);
console.log('Power-ups:', game.level.powerUps.length);
```

---

### `Block`
Representa un bloque en el juego.

#### Propiedades Públicas

```javascript
{
    x: number,              // Posición X
    y: number,              // Posición Y
    width: number,          // Ancho
    height: number,         // Alto
    color: string,          // Color
    type: string,          // Tipo (normal, resistant, enemy, powerup)
    hitsRequired: number,   // Impactos necesarios para destruir
    currentHits: number     // Impactos recibidos
}
```

#### Métodos Públicos

```javascript
/**
 * Actualizar estado del bloque
 * @memberof Block
 */
update()

/**
 * Dibujar bloque en canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D
 * @memberof Block
 */
draw(ctx)

/**
 * Recibir impacto
 * @returns {boolean} - True si el bloque fue destruido
 * @memberof Block
 */
hit()

/**
 * Destruir bloque (genera partículas y efectos)
 * @memberof Block
 */
destroy()
```

#### Ejemplo de Uso

```javascript
// Crear bloque
game.level.blocks.push(new Block(
    game,
    100, 100, 50, 30,
    '#ff0000', 'normal'
));

// Destruir bloque
game.level.blocks[0].hit();
```

---

### `Projectile`
Representa un proyectil disparado por el jugador.

#### Propiedades Públicas

```javascript
{
    x: number,              // Posición X
    y: number,              // Posición Y
    width: number,          // Ancho
    height: number,         // Alto
    color: string,          // Color
    speed: number,          // Velocidad
    isLaser: boolean,       // ¿Es un láser?
    active: boolean         // ¿El proyectil está activo?
}
```

#### Métodos Públicos

```javascript
/**
 * Actualizar estado del proyectil
 * @memberof Projectile
 */
update()

/**
 * Dibujar proyectil en canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D
 * @memberof Projectile
 */
draw(ctx)

/**
 * Verificar colisión con bloques
 * @param {Block[]} blocks - Array de bloques
 * @returns {number} - Índice del bloque colisionado o -1
 * @memberof Projectile
 */
checkCollision(blocks)
```

#### Ejemplo de Uso

```javascript
// Crear proyectil
game.projectiles.push(new Projectile(
    game,
    game.player.x + game.player.width / 2 - 3,
    game.player.y - 20,
    6, 20, '#00ffff', 10
));

// Verificar colisiones
const blockIndex = game.projectiles[0].checkCollision(game.level.blocks);
if (blockIndex !== -1) {
    game.level.blocks[blockIndex].hit();
    game.projectiles[0].active = false;
}
```

---

### `PowerUp`
Representa un power-up que puede ser recogido por el jugador.

#### Propiedades Públicas

```javascript
{
    x: number,              // Posición X
    y: number,              // Posición Y
    width: number,          // Ancho
    height: number,         // Alto
    type: string,          // Tipo (multiShot, laser, shield, timeSlow)
    speed: number,          // Velocidad de caída
    active: boolean         // ¿El power-up está activo?
}
```

#### Métodos Públicos

```javascript
/**
 * Actualizar estado del power-up
 * @memberof PowerUp
 */
update()

/**
 * Dibujar power-up en canvas
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D
 * @memberof PowerUp
 */
draw(ctx)

/**
 * Verificar colisión con jugador
 * @param {Player} player - Instancia del jugador
 * @returns {boolean} - True si hay colisión
 * @memberof PowerUp
 */
checkCollision(player)
```

#### Ejemplo de Uso

```javascript
// Crear power-up
game.level.powerUps.push(new PowerUp(
    game,
    200, 50, 'multiShot'
));

// Verificar colisión con jugador
if (game.level.powerUps[0].checkCollision(game.player)) {
    game.player.activatePowerUp('multiShot', 500);
    game.level.powerUps.splice(0, 1);
}
```

---

## 🎛️ Configuración Global

### `GameConfig`
Configuración global del juego.

```javascript
const GameConfig = {
    width: 800,              // Ancho del canvas
    height: 600,             // Alto del canvas
    gravity: 0.2,            // Gravedad
    friction: 0.98,          // Fricción
    targetFPS: 60,           // FPS objetivo
    maxParticles: 100,       // Máximo de partículas
    version: '4.0.0'         // Versión del juego
};
```

#### Ejemplo de Modificación

```javascript
// Modificar configuración antes de inicializar el juego
GameConfig.targetFPS = 30; // Para dispositivos más lentos
GameConfig.maxParticles = 50; // Para mejor rendimiento
```

---

## 📡 Eventos y Comunicación

### Eventos del DOM

El juego emite eventos personalizados que puedes escuchar:

```javascript
// Escuchar evento de game over
document.addEventListener('gameOver', (e) => {
    console.log('Game Over! Puntuación:', e.detail.score);
});

// Escuchar evento de victoria
document.addEventListener('victory', (e) => {
    console.log('¡Victoria! Nivel:', e.detail.level);
});

// Escuchar evento de puntuación
document.addEventListener('scoreUpdate', (e) => {
    console.log('Puntuación actualizada:', e.detail.score);
});

// Escuchar evento de nivel completado
document.addEventListener('levelComplete', (e) => {
    console.log('Nivel completado:', e.detail.level);
});
```

### Personalización de Eventos

Puedes extender el juego añadiendo tus propios eventos:

```javascript
// En game.js, añade:
const event = new CustomEvent('customEvent', {
    detail: { customData: 'valor' }
});
document.dispatchEvent(event);

// Escuchar evento personalizado
document.addEventListener('customEvent', (e) => {
    console.log('Evento personalizado:', e.detail);
});
```

---

## 🔄 Extensión del Juego

### Añadir Nuevos Power-ups

1. **Modificar `PowerUp` class:**
   ```javascript
   // Añade nuevo tipo en el constructor
   this.colors.newPowerUp = '#color';
   this.icons.newPowerUp = '🔥';
   
   // Añade lógica en Player
   this.powerUps.newPowerUp = false;
   ```

2. **Añadir sonido:**
   ```javascript
   // En AudioSystem
   this.sounds.sfx.newPowerUp = new Howl({
       src: ['assets/audio/sfx/new_powerup.mp3'],
       volume: 0.9
   });
   ```

3. **Generar power-ups:**
   ```javascript
   // En Level.generateLevel()
   const isNewPowerUp = Math.random() < 0.05;
   if (isNewPowerUp) {
       this.powerUps.push(new PowerUp(this.game, x - 15, y, 'newPowerUp'));
   }
   ```

4. **Añadir efecto:**
   ```javascript
   // En Player.activatePowerUp()
   case 'newPowerUp':
       // Lógica del nuevo power-up
       break;
   ```

### Añadir Nuevos Tipos de Bloques

1. **Modificar `Block` class:**
   ```javascript
   // Añade nuevo tipo en el constructor
   this.types.newBlock = {
       color: '#color',
       hitsRequired: 3,
       speed: 0
   };
   ```

2. **Generar bloques:**
   ```javascript
   // En Level.generateLevel()
   const isNewBlock = Math.random() < 0.1;
   if (isNewBlock) {
       this.blocks.push(new Block(
           this.game, x, y, width, height,
           '#color', 'newBlock'
       ));
   }
   ```

### Añadir Nuevos Niveles

```javascript
// Crear nivel personalizado
game.level = new Level(game, 11); // Nivel 11

// Configurar nivel manualmente
const customLevel = new Level(game, 1);
customLevel.blocks = [];
customLevel.enemies = [];
customLevel.powerUps = [];

// Añadir bloques personalizados
for (let i = 0; i < 20; i++) {
    customLevel.blocks.push(new Block(
        game, 
        Math.random() * 700, 
        50 + Math.random() * 200,
        40, 30,
        '#' + Math.floor(Math.random()*16777215).toString(16),
        'normal'
    ));
}

game.level = customLevel;
```

---

## 📊 Almacenamiento

### localStorage API

El juego utiliza `localStorage` para guardar:

- **Mejor puntuación:** `blockShooterBestScore`
- **Records:** `blockShooterRecords` (array de objetos)

#### Ejemplo de Uso

```javascript
// Guardar puntuación
game.scoreSystem.addScore(1000);
localStorage.setItem('blockShooterBestScore', game.scoreSystem.bestScore.toString());

// Guardar records
localStorage.setItem('blockShooterRecords', JSON.stringify(game.scoreSystem.records));

// Cargar datos
const bestScore = localStorage.getItem('blockShooterBestScore');
const records = JSON.parse(localStorage.getItem('blockShooterRecords')) || [];
```

---

## 🎨 Personalización Visual

### CSS Variables

Puedes personalizar el aspecto del juego editando `style.css`:

```css
:root {
    --primary-color: #00ffff;  /* Cian */
    --secondary-color: #ff00ff; /* Magenta */
    --background-color: #0a0a1a; /* Azul oscuro */
    --text-color: #ffffff; /* Blanco */
    --button-color: linear-gradient(135deg, #00ffff, #0088ff);
    --button-hover: linear-gradient(135deg, #00ffff, #00aaff);
}

/* Tipografía */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&display=swap');
```

### HTML Structure

Puedes modificar la estructura HTML en `index.html`:

```html
<!-- Añadir nuevos botones -->
<button id="nuevoBoton" class="menu-btn">🆕 NUEVA OPCIÓN</button>

<!-- Añadir nuevas pantallas -->
<div id="nueva-pantalla" class="screen">
    <div class="menu-content">
        <h2 class="screen-title">NUEVA PANTALLA</h2>
        <!-- Contenido -->
    </div>
</div>

<!-- Conectar eventos -->
document.getElementById('nuevoBoton').addEventListener('click', () => {
    game.showScreen('nueva-pantalla');
});
```

---

## 🔧 Depuración

### Console API

Puedes usar la consola del navegador para depurar:

```javascript
// Ver estado del juego
console.log('Estado:', game.state);
console.log('Puntuación:', game.scoreSystem.score);
console.log('Nivel:', game.scoreSystem.level);
console.log('Vidas:', game.player.lives);

// Ver bloques
console.log('Bloques:', game.level.blocks.length);
console.log('Enemigos:', game.level.enemies.length);

// Ver proyectiles
console.log('Proyectiles:', game.projectiles.length);

// Ver power-ups
console.log('Power-ups:', game.level.powerUps.length);

// Controlar el juego
window.game.startGame();
window.game.pauseGame();
window.game.resumeGame();
```

### Debug Mode

Puedes añadir un modo debug para mostrar información adicional:

```javascript
// Añadir en game.js
const debugMode = true;

if (debugMode) {
    // Mostrar FPS
    let fps = 0;
    let lastFpsUpdate = 0;
    
    this.gameLoop = (timestamp) => {
        // ... código existente ...
        
        // Calcular FPS
        fps++;
        if (timestamp - lastFpsUpdate >= 1000) {
            console.log(`FPS: ${fps}`);
            fps = 0;
            lastFpsUpdate = timestamp;
        }
    };
}
```

---

## 📱 Integración con Otros Sistemas

### Google Analytics

Puedes integrar Google Analytics para rastrear estadísticas:

```javascript
// Añadir en index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Rastrear eventos
    document.addEventListener('gameOver', (e) => {
        gtag('event', 'game_over', {
            'score': e.detail.score,
            'level': e.detail.level
        });
    });

    document.addEventListener('victory', (e) => {
        gtag('event', 'victory', {
            'level': e.detail.level,
            'score': e.detail.score
        });
    });
</script>
```

### WebSocket para Multiplayer

Puedes añadir soporte multiplayer usando WebSocket:

```javascript
// Cliente WebSocket
const socket = new WebSocket('wss://tu-servidor.com/game');

// Enviar eventos
socket.onopen = () => {
    socket.send(JSON.stringify({
        type: 'game_start',
        playerId: 'jugador1',
        level: game.scoreSystem.level
    }));
};

// Recibir eventos
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'player_joined') {
        console.log('Nuevo jugador:', data.playerId);
    }
};
```

---

## 🚀 Despliegue y Hosting

### EasyPanel

Para desplegar en EasyPanel:

1. **Subir código a GitHub**
2. **Crear aplicación en EasyPanel**
   - Seleccionar "GitHub" como fuente
   - Autorizar EasyPanel
   - Seleccionar repositorio `block-shooter-v4`
3. **Configurar aplicación**
   - Nombre: `block-shooter-v4`
   - Rama: `main`
   - Tipo: Aplicación estática
4. **Variables de entorno** (opcional)
   ```
   GAME_VERSION: 4.0.0
   API_URL: https://api.tudominio.com
   ANALYTICS_ID: UA-XXXXX-Y
   ```
5. **Desplegar**

### GitHub Pages

Alternativa para hosting estático:

```bash
# Crear rama gh-pages
git checkout -b gh-pages

# Subir cambios
git push origin gh-pages

# Configurar GitHub Pages en settings
```

### Netlify

Para desplegar en Netlify:

1. **Subir código a GitHub**
2. **Crear nuevo sitio en Netlify**
3. **Conectar repositorio**
4. **Configurar build settings**
5. **Desplegar**

---

## 📝 Convenciones de Código

### Estándares

- **Nomenclatura:** camelCase para variables y métodos, PascalCase para clases
- **Comentarios:** JSDoc para documentación
- **Indentación:** 4 espacios
- **Punto y coma:** Obligatorio
- **Comillas:** Comillas simples ('')
- **Longitud de línea:** Máximo 80 caracteres

### Ejemplo de Código Bien Documentado

```javascript
/**
 * Sistema de audio del juego
 * @class AudioSystem
 */
class AudioSystem {
    /**
     * Crear instancia del sistema de audio
     * @memberof AudioSystem
     */
    constructor() {
        /**
         * Objeto con todos los sonidos cargados
         * @type {Object}
         */
        this.sounds = {};
        
        /**
         * Volumen actual (0-100)
         * @type {number}
         */
        this.volume = 70;
        
        this.loadSounds();
    }
    
    /**
     * Cargar todos los sonidos
     * @private
     * @memberof AudioSystem
     */
    loadSounds() {
        // Implementación
    }
}
```

---

## 🔄 Migración de Versiones

### De v3.x a v4.0

Cambios principales:

1. **Nueva arquitectura:** Sistema de clases modular
2. **Power-ups mejorados:** 4 tipos diferentes
3. **Sistema de audio:** Howler.js en lugar de Web Audio API
4. **Controles táctiles:** Soporte completo para móviles
5. **Documentación:** Manual técnico, guía de usuario y referencia de API

#### Pasos de migración:

1. **Actualizar código:** Reemplazar llamadas a funciones antiguas
2. **Reorganizar assets:** Asegurar estructura de carpetas correcta
3. **Probar funcionalidad:** Verificar que todo funciona correctamente
4. **Actualizar documentación:** Asegurar que los docs reflejan los cambios

---

## 📞 Soporte y Comunidad

### Reportar Issues

Si encuentras un problema:

1. **Verifica el issue tracker:** https://github.com/tecnovirtualzone-collab/block-shooter-v4/issues
2. **Crea un nuevo issue:** Incluyendo:
   - Descripción del problema
   - Pasos para reproducirlo
   - Navegador y sistema operativo
   - Capturas de pantalla (si aplica)
   - Console logs

### Contribuir

Para contribuir al proyecto:

1. **Hacer fork del repositorio**
2. **Crear nueva rama:** `git checkout -b feature/nueva-caracteristica`
3. **Implementar cambios**
4. **Probar cambios**
5. **Enviar Pull Request**

### Discusiones

- **GitHub Discussions:** https://github.com/tecnovirtualzone-collab/block-shooter-v4/discussions
- **Foro de desarrolladores:** https://forum.tecnologiavirtual.zone

---

## 📚 Recursos Adicionales

### Librerías Recomendadas

- **Phaser.js:** Motor de juegos HTML5 (para proyectos más grandes)
- **Three.js:** Gráficos 3D (si quieres llevar el juego a 3D)
- **Socket.io:** Multiplayer en tiempo real
- **Firebase:** Almacenamiento en la nube y autenticación

### Tutoriales

- [MDN Game Development](https://developer.mozilla.org/es/docs/Games)
- [JavaScript Game Development](https://www.udemy.com/topic/javascript-game-development/)
- [HTML5 Canvas Tutorial](https://www.w3schools.com/graphics/canvas_intro.asp)

### Herramientas

- **Editores de código:** VS Code, Sublime Text, Atom
- **Editores de imágenes:** Aseprite, GIMP, Photoshop
- **Editores de audio:** Audacity, FL Studio
- **Control de versiones:** Git, GitHub Desktop

---

## 🎉 Conclusión

Block Shooter V4 proporciona una API completa y bien documentada que permite:

- ✅ **Extender funcionalidad** con nuevos power-ups, bloques y niveles
- ✅ **Personalizar apariencia** mediante CSS y variables
- ✅ **Integrar con otros sistemas** (analytics, multiplayer, etc.)
- ✅ **Depurar y optimizar** el rendimiento
- ✅ **Contribuir al proyecto** con pull requests

**¡Explora la API y lleva Block Shooter V4 al siguiente nivel!** 🚀

---

*Última actualización: 2026-04-13*
*Versión: 4.0.0*
*Desarrollado por: Tecnología Virtual Zone*