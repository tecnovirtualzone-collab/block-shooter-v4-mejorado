// ============================================
// BLOCK SHOOTER V4 - Motor del Juego (Versión Corregida)
// ============================================

// ===== CONFIGURACIÓN GLOBAL =====
const GameConfig = {
    width: 800,
    height: 600,
    gravity: 0.2,
    friction: 0.98,
    targetFPS: 60,
    maxParticles: 100,
    version: '4.0.0'
};

// ===== SISTEMA DE AUDIO (Corregido para interacción del usuario) =====
class AudioSystem {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.volume = 0.7;
        this.hasUserInteracted = false;
        this.loadSounds();
    }

    loadSounds() {
        // Música
        this.sounds.music = {
            menu: new Howl({
                src: ['assets/audio/music/menu.mp3'],
                loop: true,
                volume: 0.5,
                preload: true,
                onplay: () => console.log('🎵 Música de menú reproducida.')
            }),
            game: new Howl({
                src: ['assets/audio/music/game.mp3'],
                loop: true,
                volume: 0.5,
                preload: true,
                onplay: () => console.log('🎵 Música de juego reproducida.')
            }),
            victory: new Howl({
                src: ['assets/audio/music/victory.mp3'],
                loop: false,
                volume: 0.7,
                preload: true,
                onplay: () => console.log('🎉 Música de victoria reproducida.')
            }),
            gameOver: new Howl({
                src: ['assets/audio/music/gameover.mp3'],
                loop: false,
                volume: 0.7,
                preload: true,
                onplay: () => console.log('💀 Música de game over reproducida.')
            })
        };

        // Efectos de sonido
        this.sounds.sfx = {
            shoot: new Howl({
                src: ['assets/audio/sfx/shoot.mp3'],
                volume: 0.8,
                onplay: () => console.log('🔫 Sonido de disparo reproducido.')
            }),
            hit: new Howl({
                src: ['assets/audio/sfx/hit.mp3'],
                volume: 0.7,
                onplay: () => console.log('🎯 Sonido de impacto reproducido.')
            }),
            powerup: new Howl({
                src: ['assets/audio/sfx/powerup.mp3'],
                volume: 0.9,
                onplay: () => console.log('⚡ Sonido de power-up reproducido.')
            }),
            destroy: new Howl({
                src: ['assets/audio/sfx/destroy.mp3'],
                volume: 0.8,
                onplay: () => console.log('💥 Sonido de destrucción reproducido.')
            }),
            button: new Howl({
                src: ['assets/audio/sfx/button.mp3'],
                volume: 0.6,
                onplay: () => console.log('🖱️ Sonido de botón reproducido.')
            }),
            levelComplete: new Howl({
                src: ['assets/audio/sfx/level_complete.mp3'],
                volume: 0.8,
                onplay: () => console.log('🏆 Sonido de nivel completado reproducido.')
            })
        };
    }

    enableAudio() {
        if (!this.hasUserInteracted) {
            this.hasUserInteracted = true;
            console.log('✅ AudioContext habilitado por interacción del usuario.');
            
            // Inicializar el sistema de audio
            Object.values(this.sounds.music).forEach(music => {
                music.volume(this.volume * 0.5);
            });
            
            Object.values(this.sounds.sfx).forEach(sfx => {
                sfx.volume(this.volume);
            });
        }
    }

    playMusic(type) {
        if (!this.hasUserInteracted) {
            console.log('⚠️ AudioContext no permitido. Esperando interacción del usuario...');
            alert('⚠️ Por favor, haz clic o toca la pantalla para habilitar el audio y comenzar el juego.');
            return;
        }

        if (this.music) {
            this.music.stop();
        }
        this.music = this.sounds.music[type];
        this.music.volume(this.volume * 0.5);
        this.music.play();
    }

    playSFX(sound) {
        if (!this.hasUserInteracted) {
            console.log('⚠️ AudioContext no permitido. Esperando interacción del usuario...');
            return;
        }

        this.sounds.sfx[sound].volume(this.volume);
        this.sounds.sfx[sound].play();
    }

    setVolume(volume) {
        this.volume = volume / 100;
        
        if (this.hasUserInteracted) {
            if (this.music) {
                this.music.volume(this.volume * 0.5);
            }
            Object.values(this.sounds.sfx).forEach(sound => {
                sound.volume(this.volume);
            });
        }
    }
}

// ===== SISTEMA DE PARTÍCULAS =====
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-container');
    }

    createParticle(x, y, color = '#00ffff', velocity = { x: 0, y: 0 }, size = 5) {
        if (this.particles.length >= GameConfig.maxParticles) {
            this.particles.shift();
        }

        const particle = {
            x: x,
            y: y,
            size: size,
            color: color,
            velocity: velocity,
            alpha: 1,
            life: 100,
            maxLife: 100
        };

        this.particles.push(particle);
        this.renderParticle(particle);
    }

    renderParticle(particle) {
        if (!this.container) {
            console.error('⚠️ Contenedor de partículas no encontrado.');
            return;
        }

        const element = document.createElement('div');
        element.className = 'particle';
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.backgroundColor = particle.color;
        element.style.opacity = particle.alpha;
        this.container.appendChild(element);

        // Animación
        const animate = () => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.alpha = particle.life / particle.maxLife;
            particle.life--;

            element.style.left = `${particle.x}px`;
            element.style.top = `${particle.y}px`;
            element.style.opacity = particle.alpha;

            if (particle.life <= 0) {
                element.remove();
                return false;
            }
            return true;
        };

        this.animateParticle(element, animate);
    }

    animateParticle(element, animate) {
        const startTime = Date.now();
        const update = () => {
            if (!animate()) {
                return;
            }
            const elapsed = Date.now() - startTime;
            if (elapsed < 1000) {
                requestAnimationFrame(update);
            } else {
                element.remove();
            }
        };
        requestAnimationFrame(update);
    }

    clear() {
        this.particles = [];
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ===== ENTIDADES DEL JUEGO (Mejoradas con verificaciones) =====
class Player {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 20;
        this.x = GameConfig.width / 2 - this.width / 2;
        this.y = GameConfig.height - 50;
        this.speed = 8;
        this.color = '#00ffff';
        this.lives = 3;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.powerUps = {
            multiShot: false,
            laser: false,
            shield: false,
            timeSlow: false
        };
        this.powerUpTimer = 0;
    }

    update() {
        // Movimiento
        if (this.game && this.game.input && this.game.input.keys) {
            if (this.game.input.keys.ArrowLeft || this.game.input.keys.KeyA) {
                this.x -= this.speed;
            }
            if (this.game.input.keys.ArrowRight || this.game.input.keys.KeyD) {
                this.x += this.speed;
            }
        }

        // Límites
        this.x = Math.max(0, Math.min(GameConfig.width - this.width, this.x));

        // Power-ups temporales
        if (this.powerUps.timeSlow) {
            this.powerUpTimer--;
            if (this.powerUpTimer <= 0) {
                this.powerUps.timeSlow = false;
            }
        }

        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }

    draw(ctx) {
        if (!ctx) {
            console.error('⚠️ Contexto del canvas no definido.');
            return;
        }

        ctx.fillStyle = this.invincible ? 'rgba(0, 255, 255, 0.5)' : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dibujar power-ups activos
        if (this.powerUps.multiShot) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            ctx.fillRect(this.x - 10, this.y - 20, this.width + 20, 10);
        }

        if (this.powerUps.shield) {
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y - 10, 20, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    activatePowerUp(type, duration = 500) {
        this.powerUps[type] = true;
        this.powerUpTimer = duration;

        // Efecto visual
        if (this.game && this.game.particleSystem) {
            this.game.particleSystem.createParticle(
                this.x + this.width / 2,
                this.y,
                '#ffff00',
                { x: (Math.random() - 0.5) * 2, y: -2 },
                8
            );
        }

        if (this.game && this.game.audio) {
            this.game.audio.playSFX('powerup');
        }
    }

    takeDamage() {
        if (this.invincible || this.lives <= 0) return false;

        this.lives--;
        this.invincible = true;
        this.invincibleTimer = 60;

        // Efecto visual
        if (this.game && this.game.particleSystem) {
            this.game.particleSystem.createParticle(
                this.x + this.width / 2,
                this.y + this.height / 2,
                '#ff0000',
                { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 },
                10
            );
        }

        if (this.game && this.game.audio) {
            this.game.audio.playSFX('destroy');
        }

        return true;
    }
}

// ===== CLASE PRINCIPAL DEL JUEGO (Corregida con verificaciones) =====
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        
        if (!this.canvas) {
            console.error('⚠️ Error: No se encontró el elemento canvas con id "gameCanvas".');
            alert('❌ Error crítico: El juego no puede iniciarse porque el canvas no está disponible.');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        if (!this.ctx) {
            console.error('⚠️ Error: WebGL/Canvas no está disponible en este navegador.');
            alert('❌ Error crítico: Tu navegador no soporta WebGL/Canvas. Usa Chrome, Firefox, Edge o Safari.');
            return;
        }
        
        this.audio = new AudioSystem();
        this.particleSystem = new ParticleSystem();
        this.input = new InputSystem(this);
        this.scoreSystem = new ScoreSystem();
        this.player = new Player(this);
        this.level = null;
        this.projectiles = [];
        this.state = 'loading';
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrameId = null;
        
        this.setupEventListeners();
        this.initGame();
    }

    setupEventListeners() {
        // Botones del menú
        const startGameBtn = document.getElementById('startGameBtn');
        const controlsBtn = document.getElementById('controlsBtn');
        const recordsBtn = document.getElementById('recordsBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const creditsBtn = document.getElementById('creditsBtn');
        
        // Botones de controles
        const backFromControlsBtn = document.getElementById('backFromControlsBtn');
        
        // Botones de records
        const backFromRecordsBtn = document.getElementById('backFromRecordsBtn');
        
        // Botones de ajustes
        const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        
        // Botones de créditos
        const backFromCreditsBtn = document.getElementById('backFromCreditsBtn');
        
        // Botones de juego
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeGameBtn = document.getElementById('resumeGameBtn');
        const restartGameBtn = document.getElementById('restartGameBtn');
        const quitGameBtn = document.getElementById('quitGameBtn');
        
        // Pantalla de game over
        const restartAfterGameOverBtn = document.getElementById('restartAfterGameOverBtn');
        const backToMenuAfterGameOverBtn = document.getElementById('backToMenuAfterGameOverBtn');
        
        // Pantalla de victoria
        const restartAfterVictoryBtn = document.getElementById('restartAfterVictoryBtn');
        const backToMenuAfterVictoryBtn = document.getElementById('backToMenuAfterVictoryBtn');
        
        // Verificar que los elementos existen
        if (!startGameBtn || !controlsBtn || !recordsBtn || !settingsBtn || !creditsBtn) {
            console.error('⚠️ Error: Uno o más botones del menú no están disponibles.');
            return;
        }

        // Botones del menú
        startGameBtn.addEventListener('click', () => this.startGame());
        controlsBtn.addEventListener('click', () => this.showScreen('controls-screen'));
        recordsBtn.addEventListener('click', () => this.showRecords());
        settingsBtn.addEventListener('click', () => this.showScreen('settings-screen'));
        creditsBtn.addEventListener('click', () => this.showScreen('credits-screen'));
        
        // Botones de controles
        if (backFromControlsBtn) {
            backFromControlsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        // Botones de records
        if (backFromRecordsBtn) {
            backFromRecordsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        // Botones de ajustes
        if (backFromSettingsBtn) {
            backFromSettingsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = parseInt(e.target.value);
                document.getElementById('volumeValue').textContent = `${volume}%`;
                this.audio.setVolume(volume);
            });
        }
        
        // Botones de créditos
        if (backFromCreditsBtn) {
            backFromCreditsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        // Botones de juego
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseGame());
        }
        
        if (resumeGameBtn) {
            resumeGameBtn.addEventListener('click', () => this.resumeGame());
        }
        
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', () => this.restartGame());
        }
        
        if (quitGameBtn) {
            quitGameBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        // Pantalla de game over
        if (restartAfterGameOverBtn) {
            restartAfterGameOverBtn.addEventListener('click', () => this.startGame());
        }
        
        if (backToMenuAfterGameOverBtn) {
            backToMenuAfterGameOverBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
        
        // Pantalla de victoria
        if (restartAfterVictoryBtn) {
            restartAfterVictoryBtn.addEventListener('click', () => this.startGame());
        }
        
        if (backToMenuAfterVictoryBtn) {
            backToMenuAfterVictoryBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
    }

    initGame() {
        this.showScreen('loading-screen');
        this.preloadAssets();
    }

    preloadAssets() {
        // Simular carga de assets
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.showScreen('main-menu');
                this.audio.playMusic('menu');
            }
            const loadingProgress = document.getElementById('loadingProgress');
            const loadingText = document.getElementById('loadingText');
            
            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }
            if (loadingText) {
                loadingText.textContent = `Cargando... ${Math.floor(progress)}%`;
            }
        }, 100);
    }

    showScreen(screenId) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar pantalla específica
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }

        // Controlar audio según pantalla
        if (screenId === 'main-menu') {
            this.audio.playMusic('menu');
        } else if (screenId === 'game-container') {
            this.audio.playMusic('game');
        }
    }

    startGame() {
        this.scoreSystem.reset();
        this.player = new Player(this);
        this.level = new Level(this, 1);
        this.projectiles = [];
        this.state = 'playing';
        this.showScreen('game-container');
        this.audio.playSFX('button');
        this.gameLoop(0);
    }

    pauseGame() {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.showScreen('pause-screen');
            
            const pauseLevel = document.getElementById('pauseLevel');
            const pauseScore = document.getElementById('pauseScore');
            
            if (pauseLevel && this.scoreSystem) {
                pauseLevel.textContent = this.scoreSystem.level;
            }
            if (pauseScore && this.scoreSystem) {
                pauseScore.textContent = this.scoreSystem.score;
            }
        }
    }

    resumeGame() {
        this.state = 'playing';
        this.showScreen('game-container');
        this.audio.playSFX('button');
    }

    restartGame() {
        this.startGame();
        this.audio.playSFX('button');
    }

    showRecords() {
        const recordsList = document.getElementById('recordsList');
        
        if (!recordsList) {
            console.error('⚠️ Error: Elemento recordsList no encontrado.');
            return;
        }
        
        recordsList.innerHTML = '';

        if (this.scoreSystem.records.length === 0) {
            recordsList.innerHTML = '<p>No hay records aún. ¡Sé el primero!</p>';
        } else {
            this.scoreSystem.records.forEach((record, index) => {
                const recordElement = document.createElement('div');
                recordElement.style.margin = '10px 0';
                recordElement.style.padding = '10px';
                recordElement.style.background = 'rgba(20, 20, 40, 0.6)';
                recordElement.style.borderRadius = '10px';
                recordElement.innerHTML = `
                    <strong>${index + 1}. ${record.score} puntos</strong><br>
                    <small>${new Date(record.date).toLocaleDateString()}</small>
                `;
                recordsList.appendChild(recordElement);
            });
        }

        this.showScreen('records-screen');
        this.audio.playSFX('button');
    }

    update() {
        // Verificar que el juego esté definido
        if (!this) {
            console.error('⚠️ Error: game no está definido.');
            return;
        }
        
        // Actualizar entrada
        if (this.input) {
            this.input.update();
        }
        
        // Actualizar jugador
        if (this.player) {
            this.player.update();
        }
        
        // Actualizar nivel
        if (this.level) {
            this.level.update();
        }
        
        // Actualizar proyectiles
        if (Array.isArray(this.projectiles)) {
            this.projectiles = this.projectiles.filter(projectile => {
                if (projectile && typeof projectile.update === 'function') {
                    projectile.update();
                }
                return projectile && projectile.active === true;
            });
        }
    }

    gameLoop(timestamp) {
        if (!this || !this.state) {
            console.error('⚠️ Error: game o game.state no están definidos.');
            return;
        }
        
        if (!this.lastTime) this.lastTime = timestamp;
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Control de FPS
        if (this.deltaTime < 1000 / GameConfig.targetFPS) {
            this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
            return;
        }

        this.update();
        this.render();

        this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
    }

    render() {
        // Verificar que el contexto esté definido
        if (!this || !this.ctx) {
            console.error('⚠️ Error: Contexto del canvas no está definido.');
            return;
        }
        
        // Limpiar canvas
        this.ctx.clearRect(0, 0, GameConfig.width, GameConfig.height);

        // Dibujar fondo
        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
        this.ctx.fillRect(0, 0, GameConfig.width, GameConfig.height);

        // Dibujar nivel
        if (this.level) {
            this.level.draw(this.ctx);
        }

        // Dibujar jugador
        if (this.player) {
            this.player.draw(this.ctx);
        }

        // Dibujar proyectiles
        if (Array.isArray(this.projectiles)) {
            this.projectiles.forEach(projectile => {
                if (projectile && typeof projectile.draw === 'function') {
                    projectile.draw(this.ctx);
                }
            });
        }
    }

    destroy() {
        // Limpiar recursos
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.particleSystem) {
            this.particleSystem.clear();
        }
        if (this.audio && this.audio.music) {
            this.audio.music.stop();
        }
    }
}

// ===== SISTEMA DE ENTRADA (Corregido para evitar errores de propiedades) =====
class InputSystem {
    constructor(game) {
        this.keys = {};
        this.touchControls = {
            left: false,
            right: false,
            shoot: false
        };
        this.game = game;
        this.hasUserInteracted = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Detectar interacción del usuario para habilitar audio y controles
        const enableUserInteraction = () => {
            if (!this.hasUserInteracted) {
                this.hasUserInteracted = true;
                console.log('✅ Interacción del usuario detectada. Controles y audio habilitados.');
                
                // Mostrar mensaje al usuario (opcional)
                alert('🎮 ¡Listo! Ahora puedes jugar. Usa los controles o teclas para moverte y disparar.');
                
                // Eliminar el listener después de la primera interacción
                document.removeEventListener('click', enableUserInteraction);
                document.removeEventListener('keydown', enableUserInteraction);
                document.removeEventListener('touchstart', enableUserInteraction);
            }
        };

        // Teclado (con verificaciones)
        window.addEventListener('keydown', (e) => {
            enableUserInteraction();
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Mouse (con verificaciones)
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => {
                enableUserInteraction();
                if (this.game && this.game.state === 'playing' && this.game.player) {
                    const rect = canvas.getBoundingClientRect();
                    this.game.player.x = e.clientX - rect.left - this.game.player.width / 2;
                }
            });

            canvas.addEventListener('click', () => {
                enableUserInteraction();
                if (this.game && this.game.state === 'playing') {
                    this.game.shoot();
                }
            });
        }

        // Controles táctiles (con verificaciones)
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const shootBtn = document.getElementById('shootBtn');

        if (leftBtn) {
            leftBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                enableUserInteraction();
                this.touchControls.left = true;
            });

            leftBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchControls.left = false;
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                enableUserInteraction();
                this.touchControls.right = true;
            });

            rightBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchControls.right = false;
            });
        }

        if (shootBtn) {
            shootBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                enableUserInteraction();
                this.touchControls.shoot = true;
            });

            shootBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchControls.shoot = false;
            });
        }

        // Escuchar clics en cualquier parte de la página para habilitar controles y audio
        document.addEventListener('click', enableUserInteraction);
        document.addEventListener('keydown', enableUserInteraction);
        document.addEventListener('touchstart', enableUserInteraction);
    }

    update() {
        // Verificar que el juego esté definido
        if (!this.game) {
            console.error('⚠️ Error: game no está definido en InputSystem.');
            return;
        }
        
        // Actualizar controles táctiles
        if (this.touchControls) {
            if (this.touchControls.left) {
                this.game.player.x -= this.game.player.speed;
            }
            if (this.touchControls.right) {
                this.game.player.x += this.game.player.speed;
            }
            if (this.touchControls.shoot) {
                this.game.shoot();
                this.touchControls.shoot = false; // Evitar disparos múltiples
            }
        }
    }
}

// ===== INICIALIZACIÓN (Corregida para evitar errores) =====
window.addEventListener('load', () => {
    // Detectar dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const mobileControls = document.getElementById('mobileControls');
        if (mobileControls) {
            mobileControls.style.display = 'flex';
        }
    }

    // Verificar si el canvas existe antes de iniciar el juego
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Error: No se encontró el elemento canvas con id "gameCanvas".');
        alert('Error: El juego no puede iniciarse porque el canvas no está disponible.');
        return;
    }

    // Verificar si WebGL está disponible
    const ctx = canvas.getContext('webgl');
    if (!ctx) {
        console.error('Error: WebGL no está disponible en este navegador.');
        alert('Error: Tu navegador no soporta WebGL. Por favor, usa Chrome, Firefox, Edge o Safari.');
        return;
    }

    // Iniciar juego
    window.game = new Game();
});

// Manejar errores
window.addEventListener('error', (e) => {
    console.error('Error en el juego:', e.error);
    alert('❌ Se detectó un error en el juego. Revisa la consola (F12) para más detalles.');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Rechazo no manejado:', e.reason);
    alert('❌ El juego encontró un problema crítico. Contacta al desarrollador.');
});