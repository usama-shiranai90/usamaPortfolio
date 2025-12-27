"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function ScientificBackground() {
    const canvasRef = useRef(null);
    const { accent, isDark } = useTheme();

    // Use refs to hold latest theme values without triggering effect re-runs
    const themeRef = useRef({ accent, isDark });

    useEffect(() => {
        themeRef.current = { accent, isDark };
    }, [accent, isDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let lastTime = 0;

        // AI Architecture Entities
        let symbolicGrid = [];
        let tokens = [];
        let experts = [];

        let mouse = { x: -1000, y: -1000, active: false };

        const config = {
            gridSize: 50,
            tokenCount: 80, // Slightly increased for better density
            expertCount: 3,
            connectionDistance: 130, // Adjusted
            baseSpeed: 20, // Pixels per second
            mouseInfluenceRadius: 250,
        };

        // --- Classes for Neuro-Symbolic Architecture ---

        class SymbolicNode {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseAlpha = 0.03;
                this.activeAlpha = 0.4;
                this.alpha = this.baseAlpha;
            }

            update(dt) {
                // Neuro-Symbolic Integration: Grid nodes light up near activity
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Smooth alpha transition using delta time
                let targetAlpha = this.baseAlpha;
                if (dist < config.mouseInfluenceRadius) {
                    targetAlpha = this.activeAlpha * (1 - dist / config.mouseInfluenceRadius);
                }

                // Lerp alpha: Current + (Target - Current) * factor
                // Using 1 - exp(-decay * dt) for frame-rate independent dampening
                const dampening = 1 - Math.exp(-5 * dt);
                this.alpha += (targetAlpha - this.alpha) * dampening;
            }

            draw(ctx, accentRgb, isDark) {
                // Skip if invisible
                if (this.alpha < 0.001) return;

                ctx.fillStyle = isDark
                    ? `rgba(255, 255, 255, ${this.alpha})`
                    : `rgba(0, 0, 0, ${this.alpha})`;

                ctx.beginPath();
                ctx.rect(this.x - 1, this.y - 1, 2, 2);
                ctx.fill();
            }
        }

        class Expert {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = 0;
                this.maxRadius = 250;
                this.activation = 0;
                this.targetActivation = 0;
                this.timer = Math.random() * 10;
            }

            update(dt) {
                this.timer -= dt;

                // Random expert routing activation
                if (this.timer <= 0) {
                    this.targetActivation = Math.random() > 0.7 ? 1 : 0; // Activate sporadically
                    this.timer = Math.random() * 3 + 2; // Reset timer
                }

                // Decay target if it was active
                if (this.targetActivation > 0) {
                    this.targetActivation -= dt * 0.5; // Slowly fade out target
                    if (this.targetActivation < 0) this.targetActivation = 0;
                }

                // Smooth fade
                const dampening = 1 - Math.exp(-2 * dt);
                this.activation += (this.targetActivation - this.activation) * dampening;
            }

            draw(ctx, accentRgb) {
                if (this.activation < 0.01) return;

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.maxRadius * this.activation);
                gradient.addColorStop(0, `rgba(${accentRgb}, ${0.12 * this.activation})`);
                gradient.addColorStop(1, `rgba(${accentRgb}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.maxRadius * this.activation, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = `rgba(${accentRgb}, ${0.08 * this.activation})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.maxRadius * this.activation * 0.6, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        class Token {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.baseSpeed;
                this.vy = (Math.random() - 0.5) * config.baseSpeed;
                this.size = Math.random() * 2 + 1;
                this.type = Math.random() > 0.6 ? 'neuro' : 'symbolic';
            }

            update(dt) {
                this.x += this.vx * dt;
                this.y += this.vy * dt;

                // Wrap
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (200 - dist) / 200;
                    // Add force to velocity temporarily? Or just push
                    // We directly modify position for "repulsion field" effect or simple push, 
                    // but modifying velocity creates smoother, lasting "wind"
                    const pushStrength = 400 * dt * force; // Scale by dt

                    this.vx -= Math.cos(angle) * pushStrength * 0.5;
                    this.vy -= Math.sin(angle) * pushStrength * 0.5;
                }

                // Dampen velocity back to base speed bounds
                // This prevents them from accelerating infinitely
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > config.baseSpeed * 2) {
                    this.vx *= 0.95;
                    this.vy *= 0.95;
                } else if (speed < config.baseSpeed * 0.5) {
                    this.vx *= 1.05;
                    this.vy *= 1.05;
                }
            }

            draw(ctx, accentRgb, isDark) {
                const alpha = isDark ? 0.6 : 0.4;
                ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;

                ctx.beginPath();
                if (this.type === 'neuro') {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                } else {
                    ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                }
                ctx.fill();
            }
        }

        // Initialize
        const init = () => {
            symbolicGrid = [];
            tokens = [];
            experts = [];

            const cols = Math.floor(width / config.gridSize);
            const rows = Math.floor(height / config.gridSize);
            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    symbolicGrid.push(new SymbolicNode(i * config.gridSize, j * config.gridSize));
                }
            }

            for (let i = 0; i < config.expertCount; i++) {
                experts.push(new Expert(
                    Math.random() * width,
                    Math.random() * height
                ));
            }

            for (let i = 0; i < config.tokenCount; i++) {
                tokens.push(new Token());
            }
        };

        const resize = () => {
            // Only reset if dimensions actually changed significantly to avoid jitter on mobile scroll
            const dpr = window.devicePixelRatio || 1;
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            if (width !== newWidth || height !== newHeight) {
                canvas.width = newWidth * dpr;
                canvas.height = newHeight * dpr;
                width = newWidth;
                height = newHeight;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
                init();
            }
        };

        let animationFrameId;

        const animate = (time) => {
            // Delta Time Calculation
            if (!lastTime) lastTime = time;
            const dt = (time - lastTime) / 1000; // Seconds
            lastTime = time;

            // Cap dt to prevent huge jumps if tab was inactive
            const safeDt = Math.min(dt, 0.1);

            const { accent: currentAccent, isDark: currentIsDark } = themeRef.current;
            const currentAccentRgb = currentAccent?.rgb || '20, 184, 166';

            ctx.clearRect(0, 0, width, height);

            // Update & Draw Grid
            symbolicGrid.forEach(node => {
                node.update(safeDt);
                node.draw(ctx, currentAccentRgb, currentIsDark);
            });

            // Update & Draw Experts
            experts.forEach(expert => {
                expert.update(safeDt);
                expert.draw(ctx, currentAccentRgb);
            });

            // Linear Attention Lines
            ctx.lineWidth = 0.5;
            for (let i = 0; i < tokens.length; i++) {
                const windowSize = 5;
                for (let j = 1; j <= windowSize; j++) {
                    const neighbor = tokens[(i + j) % tokens.length];

                    const dx = tokens[i].x - neighbor.x;
                    const dy = tokens[i].y - neighbor.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(tokens[i].x, tokens[i].y);
                        ctx.lineTo(neighbor.x, neighbor.y);

                        const alpha = 1 - (dist / config.connectionDistance);
                        ctx.strokeStyle = `rgba(${currentAccentRgb}, ${alpha * 0.15})`;
                        ctx.stroke();
                    }
                }
            }

            // Update & Draw Tokens
            tokens.forEach(token => {
                token.update(safeDt);
                token.draw(ctx, currentAccentRgb, currentIsDark);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initial setup
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        width = window.innerWidth;
        height = window.innerHeight;
        ctx.scale(dpr, dpr);
        init();

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none bg-theme-bg"
        />
    );
}
