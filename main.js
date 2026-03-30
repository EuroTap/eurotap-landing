/**
 * main.js - Draftly Intelligence 4.0 Logic
 * 🧪 [MIROFISH_ENGINE]
 */

class MockTelemetryEngine {
    constructor() {
        this.stats = {
            tps: 0,
            latency: 0,
            integrity: 'OPTIMAL',
            swarm: 5000
        };
    }

    generateStats() {
        this.stats.tps = Math.floor(Math.random() * (35000 - 30000) + 30000);
        this.stats.latency = Math.floor(Math.random() * (12 - 5) + 5);
        this.stats.integrity = Math.random() > 0.98 ? 'SHIELDING' : 'OPTIMAL';
        this.stats.swarm = Math.floor(Math.random() * (6000 - 4500) + 4500);
        return this.stats;
    }

    updateUI() {
        const s = this.generateStats();
        
        const elements = {
            'stat-tps': s.tps.toLocaleString(),
            'stat-integrity': s.integrity,
            'stat-latency': `NODE_LATENCY: ${s.latency}ms`
        };

        for (const [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
    }

    startDNAAnimation() {
        const stream = document.getElementById('dna-stream');
        if (!stream) return;
        const bases = ['A', 'T', 'G', 'C'];
        const prefixes = ['> SHIELDING...', '> MASKING...', '> DNA_CRYPT...', '> SOVEREIGN_STATUS: OK'];
        
        setInterval(() => {
            let seq = prefixes[Math.floor(Math.random() * prefixes.length)] + '<br>';
            for (let i = 0; i < 50; i++) {
                seq += bases[Math.floor(Math.random() * 4)] + (i % 10 === 0 ? ' ' : '');
            }
            stream.innerHTML = seq;
        }, 150);
    }

    init() {
        this.updateUI();
        this.startDNAAnimation();
        setInterval(() => this.updateUI(), 2500);
    }
}

// [SCROLL_REVEAL_LOGIC]
const reveal = () => {
    const reveals = document.querySelectorAll('[data-reveal]');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
    const engine = new MockTelemetryEngine();
    engine.init();
    reveal();
});
