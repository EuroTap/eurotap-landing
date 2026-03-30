/**
 * EuroTap Website Main Interactions
 */

import { MockTelemetryEngine } from './MockTelemetryEngine.js';

document.addEventListener('DOMContentLoaded', () => {
    // 🧪 Initialize MiroFish Mock Telemetry
    const telemetry = new MockTelemetryEngine();
    
    const uiElements = {
        tps: document.getElementById('stat-tps'),
        latency: document.getElementById('stat-latency'),
        agents: document.getElementById('swarm-agents'),
        health: document.getElementById('network-health'),
        bar: document.querySelector('.bar-fill')
    };

    telemetry.start({
        onUpdate: (stats) => {
            if (uiElements.tps) uiElements.tps.textContent = stats.tps.toLocaleString();
            if (uiElements.latency) uiElements.latency.textContent = stats.latency.toFixed(1) + 'ms';
            if (uiElements.agents) uiElements.agents.textContent = stats.agents;
            if (uiElements.health) {
                uiElements.health.textContent = stats.integrity.toFixed(1) + '%';
                if (uiElements.bar) uiElements.bar.style.width = stats.integrity + '%';
            }
        }
    });

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-actions a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // DNA Sequence Randomizer (Cyber Attack / DNA Shield Visualization)
    const dnaSeq = document.querySelector('.dna-sequence');
    const bases = ['A', 'T', 'C', 'G'];

    const updateDNA = () => {
        let newSeq = '';
        const len = window.innerWidth < 600 ? 15 : 30;
        for (let i = 0; i < len; i++) {
            newSeq += bases[Math.floor(Math.random() * bases.length)];
            if (i < len - 1) newSeq += (Math.random() > 0.8 ? ' ' : '-');
        }
        if (dnaSeq) dnaSeq.textContent = newSeq;
    };

    setInterval(updateDNA, 150);

    // Scroll Reveal Effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .section-title, .hero-content, .glass-panel, .hero-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom Animation for revealed items
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
