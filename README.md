# 🎮 Block Shooter V4

> **Juego Arcade HTML5** - Destruye bloques, evita enemigos y recolecta power-ups en esta versión mejorada del clásico juego de arcade.

[![Versión](https://img.shields.io/badge/versión-4.0.0-brightgreen)](https://github.com/tecnovirtualzone-collab/block-shooter-v4)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](https://github.com/tecnovirtualzone-collab/block-shooter-v4/blob/main/LICENSE)
[![Estado](https://img.shields.io/badge/estado-completo-success)](https://github.com/tecnovirtualzone-collab/block-shooter-v4)
[![FPS](https://img.shields.io/badge/FPS-60-blue)](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
[![Responsive](https://img.shields.io/badge/responsive-sí-brightgreen)](https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries)

---

## 🎯 Descripción

Block Shooter V4 es un juego arcade HTML5 completamente responsive que desafía al jugador a destruir bloques mientras evita enemigos y recolecta power-ups para mejorar sus habilidades. La versión 4.0.0 incluye:

✅ **Motor de juego optimizado** con FPS controlado
✅ **Sistema de audio avanzado** usando Howler.js
✅ **Efectos visuales dinámicos** con partículas
✅ **Controles multiplataforma** (teclado, mouse, táctil, gamepad)
✅ **Sistema de puntuación y records** guardados en localStorage
✅ **Power-ups innovadores** (Multi Shot, Laser, Shield, Time Slow)
✅ **Diseño UI/UX moderno** con animaciones suaves
✅ **Documentación completa** (manual técnico, guía de usuario, referencia de API)
✅ **Responsive Design** para móviles y tablets
✅ **Soporte para gamepad** (opcional)

---

## 🚀 Demo en Vivo

🔗 **URL de despliegue:** [https://block-shooter-v4.easypanel.host](https://block-shooter-v4.easypanel.host) *(Configurar EasyPanel para obtener URL real)*

---

## 📱 Capturas de Pantalla

### Pantalla Principal
![Pantalla Principal](assets/images/screenshots/main-menu.png)

### Juego en Acción
![Juego](assets/images/screenshots/gameplay.png)

### Power-ups
![Power-ups](assets/images/screenshots/powerups.png)

### Pantalla de Victoria
![Victoria](assets/images/screenshots/victory.png)

---

## 📦 Características

### 🎮 Gameplay
- **10 niveles progresivos** con dificultad creciente
- **4 tipos de bloques:** Normal, Resistente, Enemigo, Power-up
- **Sistema de vidas** (3 vidas por partida)
- **Multiplicadores de puntuación** por combos
- **Sistema de logros** (opcional)

### 🎨 Interfaz
- **Diseño moderno** con gradientes y animaciones
- **HUD informativo** (nivel, puntuación, vidas, mejor puntuación)
- **Menús interactivos** con efectos hover
- **Transiciones suaves** entre pantallas
- **Responsive Design** para todos los dispositivos

### 🔊 Audio
- **Música de fondo** adaptativa según la pantalla
- **Efectos de sonido** para todas las acciones
- **Control de volumen** configurable
- **Soporte para múltiples formatos** (MP3)

### ⌨️ Controles
- **Teclado:** Flechas o WASD
- **Mouse:** Movimiento y clic
- **Táctil:** Botones virtuales
- **Gamepad:** Soporte opcional

### 🎯 Power-ups
| Icono | Tipo | Efecto | Duración |
|-------|------|--------|----------|
| ⚡ | Multi Shot | Dispara 3 proyectiles | 8 segundos |
| ✦ | Laser | Disparo continuo | 8 segundos |
| 🛡 | Shield | Protección temporal | 8 segundos |
| ⏳ | Time Slow | Enemigos más lentos | 8 segundos |

### 📊 Sistema de Records
- **Mejor puntuación** guardada en localStorage
- **Top 10 records** con fecha y puntuación
- **Sincronización automática** con el mismo navegador

---

## 🏗️ Arquitectura

```
block-shooter-v4/
├── index.html          # Estructura principal
├── style.css           # Estilos y diseño
├── game.js             # Lógica principal del juego
├── docs/               # Documentación completa
│   ├── technical-manual.md
│   ├── user-guide.md
│   └── api-reference.md
└── assets/             # Recursos
    ├── images/
    │   ├── sprites/
    │   ├── backgrounds/
    │   ├── ui/
    │   └── particles/
    ├── audio/
    │   ├── music/
    │   └── sfx/
    └── fonts/
```

---

## 📋 Requisitos

### Hardware
| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **Procesador** | 1GHz | 2GHz+ |
| **Memoria RAM** | 2GB | 4GB+ |
| **Espacio en disco** | 50MB | 100MB+ |
| **Resolución** | 800x600 | 1920x1080 |

### Software
- **Navegador:** Chrome 80+, Firefox 75+, Edge 80+, Safari 13+
- **Sistema operativo:** Windows 7+, macOS 10.12+, Linux, Android 5.0+, iOS 10.0+
- **Conexión a internet:** Solo para carga inicial de recursos

---

## 🚀 Instalación y Despliegue

### 📥 Descargar el Proyecto

```bash
# Clonar repositorio
git clone https://github.com/tecnovirtualzone-collab/block-shooter-v4.git
cd block-shooter-v4
```

### 🌐 Despliegue en EasyPanel

1. **Subir código a GitHub** (si no lo has hecho)
2. **Crear aplicación en EasyPanel**
   - Ve a [EasyPanel](https://easypanel.io)
   - Inicia sesión
   - Ve a "Applications" → "New Application"
   - Selecciona "GitHub" como fuente
   - Autoriza EasyPanel para acceder a tu repositorio
3. **Configurar aplicación**
   - **Nombre:** `block-shooter-v4`
   - **Rama:** `main`
   - **Tipo:** Aplicación estática (sin Dockerfile necesario)
   - **Dominio:** EasyPanel asignará automáticamente
   - **Variables de entorno (opcional):**
     ```
     GAME_VERSION: 4.0.0
     API_URL: https://api.tudominio.com
     ANALYTICS_ID: UA-XXXXX-Y
     ```
4. **Desplegar**
   - Haz clic en "Deploy"
   - Espera 1-2 minutos
   - Verifica en la URL asignada

5. **Configurar SSL (opcional)**
   - En EasyPanel, ve a la pestaña "SSL"
   - Selecciona "Let's Encrypt"
   - EasyPanel generará y configurará el certificado automáticamente

### 🌍 Alternativas de Despliegue

#### GitHub Pages
```bash
# Crear rama gh-pages
git checkout -b gh-pages

# Subir cambios
git push origin gh-pages

# Configurar GitHub Pages en settings del repositorio
```

#### Netlify
1. Sube el código a GitHub
2. Crea un nuevo sitio en [Netlify](https://www.netlify.com/)
3. Conecta tu repositorio
4. Configura build settings (no se necesita build para HTML5 puro)
5. Despliega

#### Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

---

## 🎮 Cómo Jugar

### Controles

| Dispositivo | Controles |
|-------------|----------|
| **Teclado** | ← → (flechas) o A D para mover, ESPACIO para disparar |
| **Mouse** | Mueve el ratón para controlar la plataforma, clic para disparar |
| **Móvil** | Botones táctiles: Izquierdo (←), Derecho (→), Central (disparar) |

### Objetivo
Destruye todos los bloques en cada nivel para avanzar. Cuantos más bloques destruyas, más puntos obtendrás. ¡Completa todos los niveles para ganar!

### Estrategia
1. **Posiciónate bien:** Mantén la plataforma centrada
2. **Destruye power-ups primero:** Te dan ventajas importantes
3. **Evita enemigos:** Chocar con ellos cuesta vidas
4. **Usa power-ups estratégicamente:** El láser es excelente para niveles difíciles

---

## 📖 Documentación

Block Shooter V4 incluye documentación completa para desarrolladores y usuarios:

### 📚 Para Usuarios
- **[Guía de Usuario](docs/user-guide.md)** - Cómo jugar, controles, consejos
- **[FAQ](docs/user-guide.md#-solución-de-problemas)** - Solución de problemas comunes

### 🔧 Para Desarrolladores
- **[Manual Técnico](docs/technical-manual.md)** - Arquitectura, clases, configuración
- **[Referencia de API](docs/api-reference.md)** - Documentación de todas las clases y métodos
- **[Guía de Contribución](docs/technical-manual.md#-guía-de-contribución)** - Cómo contribuir al proyecto

### 📖 Para Todos
- **README.md** (este archivo) - Información general
- **Changelog** - Historial de cambios

---

## 🛠️ Desarrollo y Contribución

### 🔧 Configuración de Desarrollo

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/tecnovirtualzone-collab/block-shooter-v4.git
   cd block-shooter-v4
   ```

2. **Editor recomendado**
   - **Visual Studio Code** con extensiones:
     - ES7 React/Redux/React-Native snippets
     - Live Server
     - Prettier - Code formatter
     - ESLint
     - GitLens

3. **Abrir proyecto**
   - Abre la carpeta `block-shooter-v4` en VS Code
   - Usa **Live Server** para probar localmente

### 📝 Convenciones de Código

- **Nomenclatura:** camelCase para variables/métodos, PascalCase para clases
- **Indentación:** 4 espacios
- **Punto y coma:** Obligatorio
- **Comillas:** Comillas simples ('')
- **Longitud de línea:** Máximo 80 caracteres
- **Comentarios:** JSDoc para documentación

### 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Hacer fork del repositorio**
2. **Crear nueva rama**
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Implementar cambios**
4. **Probar cambios** en diferentes navegadores
5. **Enviar Pull Request**
   - Describe claramente los cambios
   - Incluye capturas de pantalla si aplica
   - Menciona issues relacionados (si los hay)

### 🐛 Reportar Bugs

Si encuentras un bug:

1. **Verifica el issue tracker** en GitHub
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir
   - Navegador y sistema operativo
   - Capturas de pantalla (si aplica)
   - Console logs (F12 → Console)

### 💡 Sugerir Mejoras

Para sugerir nuevas características:

1. **Abre un issue** en GitHub
2. **Selecciona "Feature request"**
3. **Describe tu idea** en detalle
4. **Explica por qué sería útil**

---

## 📊 Estadísticas

### Métricas del Juego
- **Niveles:** 10 niveles progresivos
- **Bloques:** Más de 1000 combinaciones posibles
- **Power-ups:** 4 tipos diferentes
- **Enemigos:** 3 tipos de comportamiento
- **Puntuación máxima:** Ilimitada
- **FPS objetivo:** 60 FPS
- **Tiempo de carga:** < 2 segundos
- **Uso de memoria:** < 100MB

### Compatibilidad
| Navegador | Soporte | Notas |
|-----------|---------|-------|
| **Chrome** | ✅ Completo | Recomendado |
| **Firefox** | ✅ Completo | Funciona bien |
| **Edge** | ✅ Completo | Basado en Chromium |
| **Safari** | ✅ Completo | Soporte completo |
| **Opera** | ✅ Completo | Funciona |
| **Internet Explorer** | ❌ No soportado | Usa Edge o Chrome |

| Dispositivo | Soporte | Notas |
|-------------|---------|-------|
| **Desktop** | ✅ Completo | Todos los navegadores modernos |
| **Móvil (Android)** | ✅ Completo | Chrome, Firefox, Edge |
| **Móvil (iOS)** | ✅ Completo | Safari |
| **Tablet** | ✅ Completo | Optimizado |

---

## 🎨 Personalización

### Cambiar Colores
Edita `style.css`:

```css
:root {
    --primary-color: #00ffff;  /* Cian */
    --secondary-color: #ff00ff; /* Magenta */
    --background-color: #0a0a1a; /* Azul oscuro */
    --text-color: #ffffff; /* Blanco */
}
```

### Añadir Nuevos Power-ups
1. **Edita `game.js`:**
   ```javascript
   // Añade nuevo power-up en la clase PowerUp
   this.colors.newPowerUp = '#color';
   this.icons.newPowerUp = '🔥';
   
   // Añade lógica en la clase Player
   this.powerUps.newPowerUp = false;
   ```

2. **Añade sonido:**
   ```javascript
   // En AudioSystem
   this.sounds.sfx.newPowerUp = new Howl({
       src: ['assets/audio/sfx/new_powerup.mp3'],
       volume: 0.9
   });
   ```

3. **Genera power-ups:**
   ```javascript
   // En Level.generateLevel()
   const isNewPowerUp = Math.random() < 0.05;
   if (isNewPowerUp) {
       this.powerUps.push(new PowerUp(this.game, x - 15, y, 'newPowerUp'));
   }
   ```

### Añadir Nuevos Niveles
```javascript
// Crear nivel personalizado
game.level = new Level(game, 11); // Nivel 11

// Configurar nivel manualmente
const customLevel = new Level(game, 1);
customLevel.blocks = [];

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

## 🔧 Dependencias

Block Shooter V4 utiliza las siguientes librerías externas (incluidas vía CDN):

### Librerías Principales
- **[Howler.js v2.2.3](https://howlerjs.com/)** - Sistema de audio avanzado
- **[GSAP v3.12.2](https://greensock.com/gsap/)** - Animaciones suaves
- **[Font Awesome v6.4.0](https://fontawesome.com/)** - Iconos
- **[Google Fonts](https://fonts.google.com/)** - Tipografías

### CDN Utilizados
```html
<!-- Howler.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

---

## 📜 Licencia

Block Shooter V4 se distribuye bajo la **Licencia MIT**.

```
Copyright (c) 2026 Tecnología Virtual Zone

Permiso se hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Soporte

### Contacto
- **Email:** soporte@tecnologiavirtual.zone
- **GitHub Issues:** [https://github.com/tecnovirtualzone-collab/block-shooter-v4/issues](https://github.com/tecnovirtualzone-collab/block-shooter-v4/issues)
- **GitHub Discussions:** [https://github.com/tecnovirtualzone-collab/block-shooter-v4/discussions](https://github.com/tecnovirtualzone-collab/block-shooter-v4/discussions)

### Reportar Problemas
Si encuentras un problema:

1. **Verifica que no esté reportado** en los issues
2. **Crea un nuevo issue** con:
   - Título claro y descriptivo
   - Pasos para reproducir el problema
   - Navegador y sistema operativo
   - Capturas de pantalla (si aplica)
   - Console logs (F12 → Console → Errors)

### Solicitar Características
Para sugerir nuevas características:

1. **Abre un issue** en GitHub
2. **Selecciona "Feature request"**
3. **Describe tu idea** en detalle
4. **Explica por qué sería útil**

---

## 📚 Recursos Adicionales

### Tutoriales
- [MDN Web Docs - Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
- [MDN Web Docs - Game Development](https://developer.mozilla.org/es/docs/Games)
- [JavaScript Game Development (Udemy)](https://www.udemy.com/topic/javascript-game-development/)
- [HTML5 Game Development (MDN)](https://developer.mozilla.org/es/docs/Games/Tutorials)

### Herramientas
- **Editores de código:** [VS Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/)
- **Editores de imágenes:** [Aseprite](https://www.aseprite.org/), [GIMP](https://www.gimp.org/), [Photoshop](https://www.adobe.com/products/photoshop.html)
- **Editores de audio:** [Audacity](https://www.audacityteam.org/), [FL Studio](https://www.image-line.com/)
- **Control de versiones:** [Git](https://git-scm.com/), [GitHub Desktop](https://desktop.github.com/)

### Librerías Relacionadas
- **[Phaser.js](https://phaser.io/)** - Motor de juegos HTML5
- **[Three.js](https://threejs.org/)** - Gráficos 3D
- **[Socket.io](https://socket.io/)** - Multiplayer en tiempo real
- **[Firebase](https://firebase.google.com/)** - Almacenamiento en la nube

---

## 🎉 Agradecimientos

Block Shooter V4 no sería posible sin:

- **Tecnología Virtual Zone** - Desarrollo y diseño
- **Cómoler.js** - Sistema de audio
- **GSAP** - Animaciones
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías
- **MDN Web Docs** - Documentación y tutoriales
- **GitHub** - Hosting y colaboración
- **EasyPanel** - Despliegue fácil

---

## 📅 Historial de Versiones

| Versión | Fecha       | Cambios Principales |
|---------|-------------|---------------------|
| v1.0.0  | 2024-01-15  | Versión inicial     |
| v2.0.0  | 2024-03-20  | Sistema de power-ups |
| v3.0.0  | 2025-01-10  | Rediseño UI/UX      |
| v4.0.0  | 2026-04-13  | Versión mejorada con todas las características |

---

## 🚀 Futuras Mejoras

Estas son algunas ideas para futuras versiones:

- [ ] **Sistema de guardado en la nube** usando Firebase o similar
- [ ] **Multiplayer en tiempo real** con WebSocket
- [ ] **Editor de niveles** para crear niveles personalizados
- [ ] **Skin customizable** para personalizar la apariencia
- [ ] **Sistema de logros en línea** con Google Play Games
- [ ] **Integración con redes sociales** para compartir puntuaciones
- [ ] **Soporte para gamepad avanzado** con mapeo de botones
- [ ] **Modo historia** con narrativa y personajes
- [ ] **Sistema de monedas** para desbloquear contenido
- [ ] **Tienda de power-ups** para comprar mejoras

---

## 📌 Checklist de Verificación

Antes de desplegar una nueva versión:

- [ ] ✅ Todos los niveles funcionan correctamente
- [ ] ✅ Los power-ups tienen efectos visibles
- [ ] ✅ El audio se reproduce sin problemas
- [ ] ✅ Los controles responden en todos los dispositivos
- [ ] ✅ La interfaz es responsive
- [ ] ✅ Los records se guardan correctamente
- [ ] ✅ No hay errores en la consola (F12)
- [ ] ✅ El juego tiene buen rendimiento (FPS > 50)
- [ ] ✅ La documentación está actualizada
- [ ] ✅ Se han probado diferentes navegadores
- [ ] ✅ Se han probado diferentes dispositivos
- [ ] ✅ El README.md está actualizado

---

## 🎯 Conclusión

Block Shooter V4 es un juego completo, bien documentado y fácil de extender. Con su arquitectura modular y API bien definida, es ideal para:

- **Aprender desarrollo de juegos HTML5**
- **Extender con nuevas características**
- **Personalizar apariencia y gameplay**
- **Integrar con otros sistemas** (analytics, multiplayer, etc.)
- **Contribuir a proyectos de código abierto**

**¡Gracias por jugar Block Shooter V4!** 🎮✨

---

## 📧 Newsletter

¿Quieres estar al tanto de las actualizaciones?

🔗 **Suscríbete:** [https://tecnologiavirtual.zone/newsletter](https://tecnologiavirtual.zone/newsletter)

---

*Última actualización: 13 de Abril de 2026*
*Versión: 4.0.0*
*Desarrollado por: Tecnología Virtual Zone*
*Licencia: MIT*