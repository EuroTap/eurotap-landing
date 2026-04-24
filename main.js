/**
 * 💎 EUROTAP SOBERANO INFRASTRUCTURE v2026
 * (c) 2026 Laury F.Z. Todos os direitos reservados.
 * PROPRIEDADE INTELECTUAL SOBERANA - USO NÃO AUTORIZADO É PROIBIDO.
 */

/**
 * EuroTap Website Main Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
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

    // DNA Sequence Randomizer (Visual Polish)
    const dnaSeq = document.querySelector('.dna-sequence');
    const bases = ['A', 'T', 'C', 'G'];

    setInterval(() => {
        let newSeq = '';
        for (let i = 0; i < 20; i++) {
            newSeq += bases[Math.floor(Math.random() * bases.length)] + (i < 19 ? '-' : '');
        }
        dnaSeq.textContent = newSeq;
    }, 2000);

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

    document.querySelectorAll('.feature-card, .section-title, .hero-content').forEach(el => {
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
