/**
 * 💎 EUROTAP SOBERANO INFRASTRUCTURE v2026
 * (c) 2026 Laury F.Z. Todos os direitos reservados.
 * PROPRIEDADE INTELECTUAL SOBERANA - USO NÃO AUTORIZADO É PROIBIDO.
 */

/**
 * MockTelemetryEngine.js
 * Generates synthetic telemetry data for the EuroTap public website.
 * No real source code or PII is used here.
 */

export class MockTelemetryEngine {
    constructor() {
        this.stats = {
            tps: 31240,
            latency: 8, // ms
            agents: 154,
            integrity: 99.8,
            shieldCompression: 14.2
        };
    }

    start(callbacks) {
        setInterval(() => {
            // Random fluctuation for realism
            this.stats.tps += Math.floor(Math.random() * 200 - 100);
            this.stats.latency = 8 + (Math.random() * 4);
            this.stats.agents += Math.random() > 0.8 ? 1 : (Math.random() > 0.8 ? -1 : 0);
            this.stats.integrity = 99.7 + Math.random() * 0.3;
            
            if (this.stats.tps > 33760) this.stats.tps = 33000;
            if (this.stats.tps < 28000) this.stats.tps = 29000;

            if (callbacks.onUpdate) {
                callbacks.onUpdate(this.stats);
            }
        }, 1500);
    }

    getInitialStats() {
        return this.stats;
    }
}
