// ============================================
// BLOCK SHOOTER V4 - Motor del Juego (Versión 2D - Compatible con todos los navegadores)
// Versión mejorada para funcionar SIN WebGL/Three.js
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

// ===== SISTEMA DE AUDIO (Mejorado para interacción del usuario) =====
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
            
            Object.values(this.sounds.sfx).forEach(sound => {
                sound.volume(this.volume);
            });
        }
    }

    playMusic(type) {
        if (this.music) {
            this.music.stop();
        }
        this.music = this.sounds.music[type];
        this.music.volume(this.volume * 0.5);
        this.music.play();
    }

    playSFX(sound) {
        if (this.hasUserInteracted && this.sounds.sfx[sound]) {
            try {
                this.sounds.sfx[sound].volume(this.volume);
                this.sounds.sfx[sound].play();
            } catch (e) {
                console.error('⚠️ Error al reproducir sonido:', e.message);
            }
        }
    }

    setVolume(volume) {
        this.volume = volume / 100;
        if (this.music) {
            this.music.volume(this.volume * 0.5);
        }
        Object.values(this.sounds.sfx).forEach(sound => {
            sound.volume(this.volume);
        });
    }
}

// ===== SISTEMA DE PARTÍCULAS (Canvas 2D) =====
class ParticleSystem {
    constructor(game) {
        this.game = game;
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
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.position = 'absolute';
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.backgroundColor = particle.color;
        element.style.opacity = particle.alpha;
        element.style.borderRadius = '50%';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '5';
        
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

// ===== ENTIDADES DEL JUEGO (Canvas 2D) =====
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
        if (this.game.keys.ArrowLeft || this.game.keys.KeyA) {
            this.x -= this.speed;
        }
        if (this.game.keys.ArrowRight || this.game.keys.KeyD) {
            this.x += this.speed;
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
        this.game.particleSystem.createParticle(
            this.x + this.width / 2,
            this.y,
            '#ffff00',
            { x: (Math.random() - 0.5) * 2, y: -2 },
            8
        );

        this.game.audio.playSFX('powerup');
    }

    takeDamage() {
        if (this.invincible || this.lives <= 0) return false;

        this.lives--;
        this.invincible = true;
        this.invincibleTimer = 60;

        // Efecto visual
        this.game.particleSystem.createParticle(
            this.x + this.width / 2,
            this.y + this.height / 2,
            '#ff0000',
            { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 },
            10
        );

        return true;
    }
}

class Block {
    constructor(game, x, y, width, height, color, type = 'normal') {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type; // normal, resistant, enemy, powerup
        this.hitsRequired = type === 'resistant' ? 2 : 1;
        this.currentHits = 0;
        this.speed = type === 'enemy' ? 1 : 0;
        this.direction = 1;
    }

    update() {
        // Movimiento de enemigos
        if (this.type === 'enemy') {
            this.x += this.speed * this.direction;

            // Cambiar dirección al llegar a los bordes
            if (this.x <= 0 || this.x + this.width >= GameConfig.width) {
                this.direction *= -1;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dibujar bordes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Dibujar hits requeridos para bloques resistentes
        if (this.type === 'resistant') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${this.hitsRequired - this.currentHits}`, 
                        this.x + this.width / 2, this.y + this.height / 2 + 5);
        }
    }

    hit() {
        this.currentHits++;

        // Efecto visual
        this.game.particleSystem.createParticle(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.color,
            { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 },
            8
        );

        this.game.audio.playSFX('hit');

        if (this.currentHits >= this.hitsRequired) {
            this.destroy();
            return true;
        }
        return false;
    }

    destroy() {
        // Efecto de destrucción
        for (let i = 0; i < 30; i++) {
            this.game.particleSystem.createParticle(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.color,
                { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
                Math.random() * 8 + 3
            );
        }

        this.game.audio.playSFX('destroy');

        // Si es power-up, generar power-up
        if (this.type === 'powerup') {
            const powerUpTypes = ['multiShot', 'laser', 'shield', 'timeSlow'];
            const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            this.game.spawnPowerUp(this.x + this.width / 2, this.y);
        }
    }
}

class Projectile {
    constructor(game, x, y, width, height, color, speed, isLaser = false) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.isLaser = isLaser;
        this.active = true;
    }

    update() {
        this.y -= this.speed;

        // Desactivar si sale de pantalla
        if (this.y + this.height < 0) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.isLaser) {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            ctx.stroke();
        }
    }

    checkCollision(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (this.x < block.x + block.width &&
                this.x + this.width > block.x &&
                this.y < block.y + block.height &&
                this.y + this.height > block.y) {

                return i; // Índice del bloque colisionado
            }
        }
        return -1;
    }
}

class PowerUp {
    constructor(game, x, y, type) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = type;
        this.speed = 2;
        this.active = true;
        this.colors = {
            multiShot: '#ffff00',
            laser: '#ff00ff',
            shield: '#00ff00',
            timeSlow: '#00ffff'
        };
    }

    update() {
        this.y += this.speed;

        // Desactivar si sale de pantalla
        if (this.y > GameConfig.height) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.colors[this.type];
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Icono según tipo
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const icons = {
            multiShot: '⚡',
            laser: '✦',
            shield: '🛡',
            timeSlow: '⏳'
        };

        ctx.fillText(icons[this.type], this.x + this.width / 2, this.y + this.height / 2);
    }

    checkCollision(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }
}

// ===== NIVELES =====
class Level {
    constructor(game, levelNumber) {
        this.game = game;
        this.number = levelNumber;
        this.blocks = [];
        this.enemies = [];
        this.powerUps = [];
        this.completed = false;
        this.blockRows = Math.min(4 + Math.floor(levelNumber / 3), 8);
        this.blocksPerRow = 8;
        this.generateLevel();
    }

    generateLevel() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const blockWidth = (GameConfig.width - 40) / this.blocksPerRow;
        const blockHeight = 30;

        // Generar bloques
        for (let row = 0; row < this.blockRows; row++) {
            for (let col = 0; col < this.blocksPerRow; col++) {
                // Espacio para el jugador
                if (row === this.blockRows - 1 && (col === Math.floor(this.blocksPerRow / 2) || col === Math.floor(this.blocksPerRow / 2) - 1)) {
                    continue;
                }

                const x = 20 + col * blockWidth;
                const y = 50 + row * blockHeight;

                // Probabilidad de bloques resistentes
                const isResistant = Math.random() < 0.3 && this.number > 2;
                const isEnemy = Math.random() < 0.1 && this.number > 3;
                const isPowerUp = Math.random() < 0.05 && this.number > 4;

                let type = 'normal';
                if (isResistant) type = 'resistant';
                if (isEnemy) type = 'enemy';
                if (isPowerUp) type = 'powerup';

                const color = colors[Math.floor(Math.random() * colors.length)];
                this.blocks.push(new Block(this.game, x, y, blockWidth - 2, blockHeight - 2, color, type));
            }
        }

        // Generar enemigos
        if (this.number > 3) {
            for (let i = 0; i < Math.min(this.number - 2, 5); i++) {
                const x = Math.random() * (GameConfig.width - 100) + 50;
                const y = Math.random() * 100 + 50;
                this.enemies.push(new Block(this.game, x, y, 40, 20, '#ff0000', 'enemy'));
            }
        }
    }

    update() {
        // Actualizar bloques
        this.blocks.forEach(block => block.update());
        
        // Actualizar enemigos
        this.enemies.forEach(enemy => enemy.update());

        // Actualizar power-ups
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.update();
            return powerUp.active;
        });

        // Verificar si el nivel está completado
        if (this.blocks.length === 0 && this.enemies.length === 0) {
            this.completed = true;
        }
    }

    draw(ctx) {
        // Dibujar bloques
        this.blocks.forEach(block => block.draw(ctx));
        
        // Dibujar enemigos
        this.enemies.forEach(enemy => enemy.draw(ctx));

        // Dibujar power-ups
        this.powerUps.forEach(powerUp => powerUp.draw(ctx));
    }

    spawnPowerUp(x, y) {
        const types = ['multiShot', 'laser', 'shield', 'timeSlow'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        this.powerUps.push(new PowerUp(this.game, x - 15, y, randomType));
    }
}

// ===== SISTEMA DE PUNTUACIÓN =====
class ScoreSystem {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.bestScore = this.loadBestScore();
        this.records = this.loadRecords();
    }

    addScore(points) {
        this.score += points;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.saveBestScore();
        }
    }

    nextLevel() {
        this.level++;
        this.saveRecords();
    }

    loseLife() {
        this.lives--;
        return this.lives > 0;
    }

    reset() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
    }

    loadBestScore() {
        const saved = localStorage.getItem('blockShooterBestScore');
        return saved ? parseInt(saved) : 0;
    }

    saveBestScore() {
        localStorage.setItem('blockShooterBestScore', this.bestScore.toString());
    }

    addRecord(score) {
        const date = new Date().toISOString();
        this.records.push({ score, date });
        this.records.sort((a, b) => b.score - a.score);
        this.records = this.records.slice(0, 10);
        this.saveRecords();
    }

    loadRecords() {
        const saved = localStorage.getItem('blockShooterRecords');
        return saved ? JSON.parse(saved) : [];
    }

    saveRecords() {
        localStorage.setItem('blockShooterRecords', JSON.stringify(this.records));
    }
}

// ===== SISTEMA DE ENTRADA =====
class InputSystem {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.touchControls = {
            left: false,
            right: false,
            shoot: false
        };
        this.hasUserInteracted = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Detectar interacción del usuario para habilitar audio
        const enableAudioContext = () => {
            if (!this.hasUserInteracted) {
                this.hasUserInteracted = true;
                console.log('✅ AudioContext habilitado por interacción del usuario.');
                
                // Inicializar el sistema de audio
                if (this.game && this.game.audio) {
                    this.game.audio.enableAudio();
                }
                
                // Eliminar el listener después de la primera interacción
                document.removeEventListener('click', enableAudioContext);
                document.removeEventListener('keydown', enableAudioContext);
                document.removeEventListener('touchstart', enableAudioContext);
            }
        };

        // Teclado - Asegurar que this.keys esté inicializado
        if (!this.keys) {
            this.keys = {};
        }

        window.addEventListener('keydown', (e) => {
            enableAudioContext();
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Mouse
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => {
                if (this.game && this.game.state === 'playing') {
                    const rect = canvas.getBoundingClientRect();
                    this.game.player.x = e.clientX - rect.left - this.game.player.width / 2;
                }
            });

            canvas.addEventListener('click', () => {
                enableAudioContext();
                if (this.game && this.game.state === 'playing') {
                    this.game.shoot();
                }
            });
        }

        // Controles táctiles
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const shootBtn = document.getElementById('shootBtn');

        if (leftBtn) {
            leftBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                enableAudioContext();
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
                enableAudioContext();
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
                enableAudioContext();
                this.touchControls.shoot = true;
            });

            shootBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchControls.shoot = false;
            });
        }

        // Escuchar clics en cualquier parte de la página para habilitar audio
        document.addEventListener('click', enableAudioContext);
        document.addEventListener('keydown', enableAudioContext);
        document.addEventListener('touchstart', enableAudioContext);
    }

    update() {
        // Actualizar controles táctiles
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

// ===== CLASE PRINCIPAL DEL JUEGO (Canvas 2D) =====
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('❌ Error: No se encontró el elemento canvas con id "gameCanvas".');
            this.showError('No se pudo cargar el juego: El canvas no está disponible.');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('❌ Error: No se pudo obtener el contexto 2D del canvas.');
            this.showError('Tu navegador no soporta Canvas 2D. Usa Chrome, Firefox, Edge o Safari.');
            return;
        }
        
        this.audio = new AudioSystem();
        this.particleSystem = new ParticleSystem(this);
        this.input = new InputSystem(this);
        this.scoreSystem = new ScoreSystem();
        this.player = new Player(this);
        this.level = null;
        this.projectiles = [];
        this.state = 'loading'; // loading, menu, playing, paused, gameOver, victory
        this.lastTime = 0;
        this.deltaTime = 0;
        this.animationFrameId = null;
        
        this.setupEventListeners();
        this.initGame();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <h2>❌ Error crítico</h2>
            <p>${message}</p>
            <p>💡 Recomendación: Usa Chrome, Firefox, Edge o Safari.</p>
        `;
        document.body.appendChild(errorDiv);
    }

    setupEventListeners() {
        // Botones del menú
        const startGameBtn = document.getElementById('startGameBtn');
        const controlsBtn = document.getElementById('controlsBtn');
        const recordsBtn = document.getElementById('recordsBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const creditsBtn = document.getElementById('creditsBtn');
        
        if (startGameBtn) startGameBtn.addEventListener('click', () => this.startGame());
        if (controlsBtn) controlsBtn.addEventListener('click', () => this.showScreen('controls-screen'));
        if (recordsBtn) recordsBtn.addEventListener('click', () => this.showRecords());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showScreen('settings-screen'));
        if (creditsBtn) creditsBtn.addEventListener('click', () => this.showScreen('credits-screen'));
        
        // Botones de controles
        const backFromControlsBtn = document.getElementById('backFromControlsBtn');
        if (backFromControlsBtn) backFromControlsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        // Botones de records
        const backFromRecordsBtn = document.getElementById('backFromRecordsBtn');
        if (backFromRecordsBtn) backFromRecordsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        // Botones de ajustes
        const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
        if (backFromSettingsBtn) backFromSettingsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = parseInt(e.target.value);
                document.getElementById('volumeValue').textContent = `${volume}%`;
                this.audio.setVolume(volume);
            });
        }
        
        // Botones de créditos
        const backFromCreditsBtn = document.getElementById('backFromCreditsBtn');
        if (backFromCreditsBtn) backFromCreditsBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        // Botones de juego
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeGameBtn = document.getElementById('resumeGameBtn');
        const restartGameBtn = document.getElementById('restartGameBtn');
        const quitGameBtn = document.getElementById('quitGameBtn');
        
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseGame());
        if (resumeGameBtn) resumeGameBtn.addEventListener('click', () => this.resumeGame());
        if (restartGameBtn) restartGameBtn.addEventListener('click', () => this.restartGame());
        if (quitGameBtn) quitGameBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        // Pantalla de game over
        const restartAfterGameOverBtn = document.getElementById('restartAfterGameOverBtn');
        const backToMenuAfterGameOverBtn = document.getElementById('backToMenuAfterGameOverBtn');
        
        if (restartAfterGameOverBtn) restartAfterGameOverBtn.addEventListener('click', () => this.startGame());
        if (backToMenuAfterGameOverBtn) backToMenuAfterGameOverBtn.addEventListener('click', () => this.showScreen('main-menu'));
        
        // Pantalla de victoria
        const restartAfterVictoryBtn = document.getElementById('restartAfterVictoryBtn');
        const backToMenuAfterVictoryBtn = document.getElementById('backToMenuAfterVictoryBtn');
        
        if (restartAfterVictoryBtn) restartAfterVictoryBtn.addEventListener('click', () => this.startGame());
        if (backToMenuAfterVictoryBtn) backToMenuAfterVictoryBtn.addEventListener('click', () => this.showScreen('main-menu'));
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
            const progressElement = document.getElementById('loadingProgress');
            if (progressElement) {
                progressElement.style.width = `${progress}%`;
            }
            const loadingText = document.getElementById('loadingText');
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
            if (pauseLevel) pauseLevel.textContent = this.scoreSystem.level;
            if (pauseScore) pauseScore.textContent = this.scoreSystem.score;
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
        if (recordsList) {
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
        }

        this.showScreen('records-screen');
        this.audio.playSFX('button');
    }

    shoot() {
        if (this.state !== 'playing') return;

        if (this.player.powerUps.multiShot) {
            // Disparo múltiple
            this.projectiles.push(new Projectile(this, this.player.x, this.player.y - 20, 8, 20, '#ffff00', 10));
            this.projectiles.push(new Projectile(this, this.player.x + 20, this.player.y - 20, 8, 20, '#ffff00', 10));
            this.projectiles.push(new Projectile(this, this.player.x - 20, this.player.y - 20, 8, 20, '#ffff00', 10));
        } else if (this.player.powerUps.laser) {
            // Disparo láser
            this.projectiles.push(new Projectile(this, this.player.x + this.player.width / 2 - 3, this.player.y - 20, 6, 400, '#ff00ff', 15, true));
        } else {
            // Disparo normal
            this.projectiles.push(new Projectile(this, this.player.x + this.player.width / 2 - 3, this.player.y - 20, 6, 20, '#00ffff', 10));
        }

        this.audio.playSFX('shoot');
    }

    spawnPowerUp(x, y) {
        const types = ['multiShot', 'laser', 'shield', 'timeSlow'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        if (this.level) {
            this.level.powerUps.push(new PowerUp(this, x - 15, y, randomType));
        }
    }

    update() {
        if (this.state !== 'playing') return;

        // Verificar que el sistema de entrada esté definido
        if (!this.input) {
            console.error('⚠️ Error: El sistema de entrada (InputSystem) no está definido.');
            return;
        }

        // Verificar que this.keys esté inicializado
        if (!this.keys) {
            console.error('⚠️ Error: this.keys no está inicializado en el sistema de entrada.');
            this.keys = {};
        }

        // Actualizar entrada
        this.input.update();

        // Actualizar jugador
        this.player.update();

        // Actualizar nivel
        if (this.level) {
            this.level.update();
        }

        // Actualizar proyectiles
        this.projectiles = this.projectiles.filter(projectile => {
            if (projectile) {
                projectile.update();
            }
            return projectile && projectile.active === true;
        });

        // Verificar colisiones de proyectiles con bloques
        if (this.level && this.level.blocks) {
            this.projectiles.forEach((projectile, pIndex) => {
                const blockIndex = projectile.checkCollision(this.level.blocks);
                if (blockIndex !== -1) {
                    const block = this.level.blocks[blockIndex];
                    const destroyed = block.hit();

                    if (destroyed) {
                        this.level.blocks.splice(blockIndex, 1);
                        this.scoreSystem.addScore(10 * this.scoreSystem.level);
                    }

                    projectile.active = false;
                }

                // Verificar colisiones con enemigos
                if (this.level.enemies) {
                    this.level.enemies.forEach((enemy, eIndex) => {
                        if (projectile && projectile.x < enemy.x + enemy.width &&
                            projectile.x + projectile.width > enemy.x &&
                            projectile.y < enemy.y + enemy.height &&
                            projectile.y + projectile.height > enemy.y) {

                            enemy.hit();
                            if (enemy.currentHits >= enemy.hitsRequired) {
                                this.level.enemies.splice(eIndex, 1);
                                this.scoreSystem.addScore(50 * this.scoreSystem.level);
                            }

                            projectile.active = false;
                        }
                    });
                }
            });
        }

        // Verificar colisiones de power-ups con jugador
        if (this.level && this.level.powerUps) {
            this.level.powerUps.forEach((powerUp, index) => {
                if (powerUp && powerUp.checkCollision(this.player)) {
                    this.player.activatePowerUp(powerUp.type);
                    this.level.powerUps.splice(index, 1);
                    this.scoreSystem.addScore(100);
                }
            });
        }

        // Verificar colisiones de bloques/enemigos con jugador
        if (this.level && this.level.blocks) {
            this.level.blocks.forEach(block => {
                if (block.type === 'enemy' || block.y + block.height >= this.player.y) {
                    if (this.player.x < block.x + block.width &&
                        this.player.x + this.player.width > block.x &&
                        this.player.y < block.y + block.height &&
                        this.player.y + this.player.height > block.y) {

                        if (block.type === 'enemy') {
                            if (this.player.takeDamage()) {
                                // Eliminar bloque enemigo
                                const index = this.level.blocks.indexOf(block);
                                if (index !== -1) {
                                    this.level.blocks.splice(index, 1);
                                }
                            }
                        } else if (this.player.takeDamage()) {
                            // Eliminar bloque normal
                            const index = this.level.blocks.indexOf(block);
                            if (index !== -1) {
                                this.level.blocks.splice(index, 1);
                            }
                        }
                    }
                }
            });
        }

        // Verificar si el jugador ha perdido todas las vidas
        if (this.player.lives <= 0) {
            this.gameOver();
        }

        // Verificar si el nivel está completado
        if (this.level && this.level.completed) {
            this.levelComplete();
        }

        // Actualizar HUD
        const levelDisplay = document.getElementById('levelDisplay');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const livesDisplay = document.getElementById('livesDisplay');
        const bestScoreDisplay = document.getElementById('bestScoreDisplay');
        
        if (levelDisplay) levelDisplay.textContent = this.scoreSystem.level;
        if (scoreDisplay) scoreDisplay.textContent = this.scoreSystem.score;
        if (livesDisplay) livesDisplay.textContent = this.player.lives;
        if (bestScoreDisplay) bestScoreDisplay.textContent = this.scoreSystem.bestScore;
    }

    levelComplete() {
        this.audio.playSFX('levelComplete');
        this.scoreSystem.nextLevel();
        this.level = new Level(this, this.scoreSystem.level);
        this.player = new Player(this);

        // Mostrar mensaje de nivel completado
        setTimeout(() => {
            if (this.scoreSystem.level >= 10) {
                this.victory();
            }
        }, 1000);
    }

    gameOver() {
        this.state = 'gameOver';
        this.audio.playMusic('gameOver');
        const finalLevel = document.getElementById('finalLevel');
        const finalScore = document.getElementById('finalScore');
        
        if (finalLevel) finalLevel.textContent = this.scoreSystem.level;
        if (finalScore) finalScore.textContent = this.scoreSystem.score;
        
        // Verificar si batió algún record
        const recordsBeaten = this.scoreSystem.records.filter(r => r.score < this.scoreSystem.score).length;
        const recordsBeatenDisplay = document.getElementById('recordsBeaten');
        if (recordsBeatenDisplay) recordsBeatenDisplay.textContent = recordsBeaten;
        
        this.scoreSystem.addRecord(this.scoreSystem.score);
        this.showScreen('game-over-screen');
    }

    victory() {
        this.state = 'victory';
        this.audio.playMusic('victory');
        const victoryLevel = document.getElementById('victoryLevel');
        const victoryScore = document.getElementById('victoryScore');
        
        if (victoryLevel) victoryLevel.textContent = this.scoreSystem.level;
        if (victoryScore) victoryScore.textContent = this.scoreSystem.score;
        
        this.scoreSystem.addRecord(this.scoreSystem.score);
        this.showScreen('victory-screen');
    }

    gameLoop(timestamp) {
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
        this.projectiles.forEach(projectile => {
            if (projectile) {
                projectile.draw(this.ctx);
            }
        });
    }

    destroy() {
        // Limpiar recursos
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.particleSystem.clear();
        if (this.audio && this.audio.music) {
            this.audio.music.stop();
        }
    }
}

// ===== INICIALIZACIÓN =====
window.addEventListener('load', () => {
    // Detectar dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const mobileControls = document.getElementById('mobileControls');
        if (mobileControls) {
            mobileControls.style.display = 'flex';
        }
    }

    // Iniciar juego
    window.game = new Game();
});

// Manejar errores
window.addEventListener('error', (e) => {
    console.error('Error en el juego:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Rechazo no manejado:', e.reason);
});