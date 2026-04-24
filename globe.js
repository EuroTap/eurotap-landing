/**
 * 💎 EUROTAP SOBERANO INFRASTRUCTURE v2026
 * (c) 2026 Laury F.Z. Todos os direitos reservados.
 * PROPRIEDADE INTELECTUAL SOBERANA - USO NÃO AUTORIZADO É PROIBIDO.
 */

/**
 * EuroTap High-Performance 3D Particle Globe
 * Optimized for Web (Canvas 2D)
 */

const canvas = document.getElementById('globe-canvas');
const ctx = canvas.getContext('2d');
let width, height;

const particles = [];
const particleCount = 1200;
const globeRadius = 220;
let rotationX = 0;
let rotationY = 0;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        const phi = Math.acos(-1 + (2 * particles.length) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;

        this.x = globeRadius * Math.cos(theta) * Math.sin(phi);
        this.y = globeRadius * Math.sin(theta) * Math.sin(phi);
        this.z = globeRadius * Math.cos(phi);

        // Brand Colors: Deep Blue and White
        this.color = Math.random() > 0.4 ? '#0066FF' : '#FFFFFF';
        this.size = Math.random() * 1.5 + 0.5;
    }

    project(rx, ry) {
        // Rotation Y (Horizontal)
        const x1 = this.x * Math.cos(ry) - this.z * Math.sin(ry);
        const z1 = this.x * Math.sin(ry) + this.z * Math.cos(ry);

        // Rotation X (Vertical)
        const y2 = this.y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = this.y * Math.sin(rx) + z1 * Math.cos(rx);

        const perspective = 800 / (800 + z2);
        const px = x1 * perspective + width / 2;
        const py = y2 * perspective + height / 2;

        return { px, py, opacity: (z2 + globeRadius) / (2 * globeRadius) };
    }

    draw(rx, ry) {
        const { px, py, opacity } = this.project(rx, ry);

        if (opacity > 0) {
            ctx.beginPath();
            ctx.arc(px, py, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = opacity * 0.8;
            ctx.fill();
        }
    }
}

function init() {
    resize();
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
}

function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    rotationY += 0.002;
    rotationX = Math.sin(Date.now() * 0.0005) * 0.2;

    // Draw grid glow effect
    particles.forEach(p => p.draw(rotationX, rotationY));

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
