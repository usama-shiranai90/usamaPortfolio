"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function ScientificBackground() {
    const canvasRef = useRef(null);
    const { accent, isDark, backgroundStyle, language } = useTheme();

    const themeRef = useRef({ accent, isDark, backgroundStyle, language });

    useEffect(() => {
        themeRef.current = { accent, isDark, backgroundStyle, language };
    }, [accent, isDark, backgroundStyle, language]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let animationFrameId;
        let lastTime = 0;
        let entities = { nodes: [], experts: [], tokens: [], particles: [], streams: [], neurons: [], pulses: [] };
        let gridOffset = 0;
        let mouse = { x: -1000, y: -1000, active: false };

        const dpr = window.devicePixelRatio || 1;

        // Configuration with REDUCED SPEEDS
        const config = {
            gridSize: 50,
            tokenCount: 80,
            expertCount: 3,
            connectionDistance: 130, // Increased for better web
            baseSpeed: 10,           // Reduced from 20 to 10
            mouseInfluenceRadius: 250,
        };

        // --- Classes ---

        class SymbolicNode {
            constructor(x, y) {
                this.x = x; this.y = y; this.alpha = 0.03;
                this.baseAlpha = 0.03; this.targetAlpha = 0.03;
            }
            update(dt) {
                // Slower fade: factor reduced from -5 to -2.5
                this.alpha += (this.targetAlpha - this.alpha) * (1 - Math.exp(-2.5 * dt));
            }
            draw(ctx, accentRgb) {
                ctx.fillStyle = `rgba(${accentRgb}, ${this.alpha})`;
                ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
            }
        }

        class Expert {
            constructor() {
                this.x = Math.random() * width; this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.baseSpeed;
                this.vy = (Math.random() - 0.5) * config.baseSpeed;
                this.radius = 0; this.maxRadius = 250;
                this.activation = 0;
                this.timer = Math.random() * 4 + 3; // Slower toggle (3-7s)
            }
            update(dt) {
                this.x += this.vx * dt; this.y += this.vy * dt;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                this.timer -= dt;
                if (this.timer <= 0) {
                    this.activation = this.activation > 0 ? 0 : 1;
                    this.timer = Math.random() * 4 + 3;
                }
                // Slower decay: factor 0.3
                if (this.activation > 0) this.radius += (this.maxRadius - this.radius) * dt * 0.5;
                else this.radius -= this.radius * dt * 0.3;
            }
            draw(ctx, accentRgb) {
                if (this.radius < 1) return;
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                grad.addColorStop(0, `rgba(${accentRgb}, ${0.12 * (this.radius / this.maxRadius)})`);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            }
        }

        class Token {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width; this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.baseSpeed;
                this.vy = (Math.random() - 0.5) * config.baseSpeed;
                this.type = Math.random() > 0.8 ? 'neuro' : 'symbol';
            }
            update(dt) {
                const dx = mouse.x - this.x; const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < config.mouseInfluenceRadius) {
                    const angle = Math.atan2(dy, dx);
                    // Reduced push strength: 200 instead of 400
                    const force = (config.mouseInfluenceRadius - dist) / config.mouseInfluenceRadius * 200 * dt;
                    this.vx -= Math.cos(angle) * force;
                    this.vy -= Math.sin(angle) * force;
                }

                // Drag
                this.vx *= 0.98; this.vy *= 0.98;

                // Speed limit (halved)
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const maxSpeed = config.baseSpeed * 2;
                if (speed > maxSpeed) { this.vx = (this.vx / speed) * maxSpeed; this.vy = (this.vy / speed) * maxSpeed; }

                this.x += this.vx * dt; this.y += this.vy * dt;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
            }
            draw(ctx, accentRgb, isDark) {
                ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.6 : 0.4})`;
                ctx.beginPath();
                if (this.type === 'neuro') { ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2); }
                else { ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3); }
                ctx.fill();
            }
        }

        class Particle {
            constructor(style) {
                this.style = style;
                this.init();
            }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Slower particles: 20 instead of 50
                this.vx = (Math.random() - 0.5) * 20;
                this.vy = (Math.random() - 0.5) * 20;
                this.size = Math.random() * 2 + 1;
            }
            update(dt) {
                this.x += this.vx * dt;
                this.y += this.vy * dt;

                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        const force = (200 - dist) * 2 * dt; // Weaker interaction
                        this.vx += (dx / dist) * force;
                        this.vy += (dy / dist) * force;
                    }
                }

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw(ctx, accentRgb, isDark) {
                ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.5 : 0.3})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class MatrixSymbol {
            constructor(x, y, speed) {
                this.x = x;
                this.y = y;
                this.value = '';
                this.speed = speed;
                this.switchInterval = Math.random() * 0.2 + 0.2; // Slower switch (0.2-0.4s)
                this.switchTimer = 0;
                this.setRandomSymbol();
            }
            setRandomSymbol() {
                const lang = themeRef.current.language;
                // Switch character set based on language
                const chars = lang === 'jp'
                    ? '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
                    : '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                this.value = chars.charAt(Math.floor(Math.random() * chars.length));
            }
            update(dt) {
                // Slower fall speed multiplier: 30 instead of 60
                this.y += this.speed * dt * 30;
                if (this.y > height + 50) {
                    this.y = -50;
                    this.setRandomSymbol();
                }
                this.switchTimer -= dt;
                if (this.switchTimer <= 0) {
                    this.switchTimer = this.switchInterval;
                    this.setRandomSymbol();
                }
            }
            draw(ctx, accentRgb, alpha) {
                ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
                ctx.fillText(this.value, this.x, this.y);
            }
        }

        class MatrixStream {
            constructor(x) {
                this.x = x;
                this.symbols = [];
                const count = Math.random() * 15 + 8;
                // Slower scroll speed: 1.0 to 2.5
                this.speed = Math.random() * 1.5 + 1;
                for (let i = 0; i < count; i++) {
                    const y = Math.random() * height - height;
                    this.symbols.push(new MatrixSymbol(x, y, this.speed));
                }
            }
            update(dt) {
                let dist = 9999;
                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - height / 2; // rough center y
                    dist = Math.sqrt(dx * dx + dy * dy);
                }

                // Distortion effect (keeping logic, but less intense?)
                // Just keeping movement logic
                this.symbols.forEach(s => {
                    // Slight mouse repulsion for x? No, matrix usually vertical.
                    // Just vertical fall is fine.
                    s.update(dt);
                });
            }
            draw(ctx, accentRgb) {
                ctx.font = '14px monospace';
                this.symbols.forEach((s, i) => {
                    // Fade out tail
                    const alpha = i === 0 ? 0.9 : 0.8 - (i / this.symbols.length) * 0.8;
                    s.draw(ctx, accentRgb, Math.max(0.1, alpha));
                });
            }
        }

        class Neuron {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.connections = [];
                this.activation = 0;
            }
            update(dt) {
                // Slower decay: factor 1 instead of 2
                this.activation = Math.max(0, this.activation - dt * 1);

                // Mouse interaction
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    if (dx * dx + dy * dy < 10000) this.activation = 1;
                }

                // Random fire (rare)
                if (Math.random() < 0.005) this.activation = 1; // 0.5% chance per frame
            }
            draw(ctx, accentRgb) {
                if (this.activation > 0.01) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = `rgba(${accentRgb}, ${this.activation})`;
                    ctx.fillStyle = `rgba(${accentRgb}, ${this.activation})`;
                    ctx.beginPath(); ctx.arc(this.x, this.y, 4, 0, Math.PI * 2); ctx.fill();
                    ctx.shadowBlur = 0;
                }
                // Draw fixed nodes always slightly visible
                ctx.fillStyle = `rgba(${accentRgb}, 0.2)`;
                ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
            }
        }

        class Pulse {
            constructor(start, end) {
                this.start = start;
                this.end = end;
                this.progress = 0;
                // Slower pulse speed: 0.1-0.4
                this.speed = Math.random() * 0.3 + 0.1;
                this.dead = false;
            }
            update(dt) {
                this.progress += this.speed * dt;
                if (this.progress >= 1) {
                    this.progress = 1;
                    this.dead = true;
                    this.end.activation = 1; // Trigger target
                }
            }
            draw(ctx, accentRgb) {
                const x = this.start.x + (this.end.x - this.start.x) * this.progress;
                const y = this.start.y + (this.end.y - this.start.y) * this.progress;

                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(${accentRgb}, 1)`;
                ctx.fillStyle = `rgba(${accentRgb}, 1)`;
                ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // --- Init ---
        const init = () => {
            entities = { nodes: [], experts: [], tokens: [], particles: [], streams: [], neurons: [], pulses: [] };

            if (backgroundStyle === 'scientific') {
                for (let x = 0; x <= width; x += config.gridSize) {
                    for (let y = 0; y <= height; y += config.gridSize) {
                        entities.nodes.push(new SymbolicNode(x, y));
                    }
                }
                for (let i = 0; i < config.expertCount; i++) entities.experts.push(new Expert());
                for (let i = 0; i < config.tokenCount; i++) entities.tokens.push(new Token());
            }
            else if (backgroundStyle === 'ai-network') {
                // Layered Neural Network
                for (let i = 0; i < 40; i++) entities.neurons.push(new Neuron());
                // Connect neurons
                entities.neurons.forEach(n1 => {
                    entities.neurons.forEach(n2 => {
                        if (n1 === n2) return;
                        const dx = n1.x - n2.x; const dy = n1.y - n2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150 && Math.random() < 0.15) { // limited connections
                            n1.connections.push(n2);
                        }
                    });
                });
            }
            else if (backgroundStyle === 'algorithm') {
                // Matrix Rain
                const columns = Math.floor(width / 20);
                for (let i = 0; i < columns; i++) {
                    entities.streams.push(new MatrixStream(i * 20));
                }
            }
            else if (backgroundStyle === 'particles' || backgroundStyle === 'research') {
                const count = backgroundStyle === 'research' ? 60 : 100;
                for (let i = 0; i < count; i++) {
                    entities.particles.push(new Particle(backgroundStyle));
                }
            }
            else if (backgroundStyle === 'blueprint') {
                // Just grid logic in animate
            }
        };

        const resize = () => {
            width = canvas.width = window.innerWidth * dpr;
            height = canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            width = window.innerWidth;
            height = window.innerHeight;
            init();
        };

        // --- Animate ---
        const animate = (time) => {
            const dt = (time - lastTime) / 1000;
            lastTime = time;

            // Safe DT cap
            if (dt > 0.1) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const { accent: currentAccent, isDark: currentIsDark, backgroundStyle: currentStyle } = themeRef.current;
            const accentRgb = currentAccent.rgb;

            ctx.clearRect(0, 0, width, height);

            if (currentStyle === 'scientific') {
                // Update Experts
                entities.experts.forEach(expert => {
                    expert.update(dt);
                    expert.draw(ctx, accentRgb);
                    // Light up nodes nearby
                    entities.nodes.forEach(node => {
                        const dx = node.x - expert.x; const dy = node.y - expert.y;
                        if (dx * dx + dy * dy < expert.radius * expert.radius) {
                            node.targetAlpha = 0.4; // Highlight
                        } else {
                            node.targetAlpha = node.baseAlpha;
                        }
                    });
                });

                // Nodes
                entities.nodes.forEach(node => {
                    node.update(dt);
                    node.draw(ctx, accentRgb);
                });

                // Tokens & Connections
                ctx.lineWidth = 1;
                entities.tokens.forEach((token, i) => {
                    token.update(dt);
                    token.draw(ctx, accentRgb, currentIsDark);

                    // Connect to nearby tokens
                    for (let j = i + 1; j < entities.tokens.length; j++) {
                        const t2 = entities.tokens[j];
                        const dx = token.x - t2.x; const dy = token.y - t2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < config.connectionDistance) {
                            const alpha = (1 - dist / config.connectionDistance) * 0.15;
                            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
                            ctx.beginPath(); ctx.moveTo(token.x, token.y); ctx.lineTo(t2.x, t2.y); ctx.stroke();
                        }
                    }
                });
            }
            else if (currentStyle === 'ai-network') {
                // Draw Connections
                ctx.lineWidth = 0.5;
                entities.neurons.forEach(n => {
                    n.update(dt);
                    n.connections.forEach(target => {
                        ctx.strokeStyle = `rgba(${accentRgb}, 0.1)`;
                        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(target.x, target.y); ctx.stroke();

                        // Spawn pulse
                        if (n.activation === 1 && Math.random() < 0.05) {
                            entities.pulses.push(new Pulse(n, target));
                        }
                    });
                    n.draw(ctx, accentRgb);
                });

                // Update/Draw Pulses
                entities.pulses = entities.pulses.filter(p => !p.dead);
                entities.pulses.forEach(p => {
                    p.update(dt);
                    p.draw(ctx, accentRgb);
                });
            }
            else if (currentStyle === 'algorithm') {
                entities.streams.forEach(s => {
                    s.update(dt);
                    s.draw(ctx, accentRgb);
                });
            }
            else if (currentStyle === 'particles' || currentStyle === 'research') {
                const limit = currentStyle === 'research' ? 3 : entities.particles.length;
                // Connect particles
                entities.particles.forEach((p, i) => {
                    p.update(dt);
                    p.draw(ctx, accentRgb, currentIsDark);

                    if (currentStyle === 'research') return; // Fewer connections for research

                    // Connections
                    let connected = 0;
                    for (let j = i + 1; j < entities.particles.length; j++) {
                        if (connected > 3) break;
                        const p2 = entities.particles[j];
                        const dx = p.x - p2.x; const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const connectDist = currentStyle === 'research' ? 100 : 150;
                        if (dist < connectDist) {
                            ctx.strokeStyle = `rgba(${accentRgb}, ${(1 - dist / connectDist) * 0.2})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                            connected++;
                        }
                    }
                });
            }
            else if (currentStyle === 'grid' || currentStyle === 'blueprint') {
                // Cyber Grid / Blueprint
                const gap = 40;
                // Move grid with time
                gridOffset += dt * 10; // Slower grid: 10 instead of 20
                if (gridOffset > gap) gridOffset = 0;

                ctx.strokeStyle = currentStyle === 'blueprint'
                    ? `rgba(${accentRgb}, 0.08)`
                    : `rgba(${accentRgb}, 0.15)`;
                ctx.lineWidth = 1;

                // Vertical lines
                for (let x = 0; x < width; x += gap) {
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
                }

                // Horizontal lines (moving)
                // Perspective effect for 'grid' could be complex, keeping simple moving flat grid for now
                // Or simplified perspective:
                if (currentStyle === 'grid') {
                    // Horizon effect
                    const horizon = height * 0.4;
                    for (let y = horizon; y < height; y += gap * ((y - horizon) / 100 + 0.5)) {
                        const drawY = (y + gridOffset) % height;
                        if (drawY < horizon) continue;
                        ctx.beginPath(); ctx.moveTo(0, drawY); ctx.lineTo(width, drawY); ctx.stroke();
                    }
                } else {
                    // Blueprint: flat grid
                    for (let y = 0; y < height; y += gap) {
                        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
                    }

                    // Scanning line
                    const scanY = (Date.now() / 3000 % 1) * height; // Very slow scan
                    ctx.strokeStyle = `rgba(${accentRgb}, 0.4)`;
                    ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(width, scanY); ctx.stroke();

                    // Crosshair cursor
                    if (mouse.active) {
                        ctx.strokeStyle = `rgba(${accentRgb}, 0.6)`;
                        ctx.setLineDash([5, 5]);
                        ctx.beginPath(); ctx.moveTo(mouse.x, 0); ctx.lineTo(mouse.x, height); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(0, mouse.y); ctx.lineTo(width, mouse.y); ctx.stroke();
                        ctx.setLineDash([]);

                        // Coordinates
                        ctx.fillStyle = `rgba(${accentRgb}, 1)`;
                        ctx.font = '10px monospace';
                        ctx.fillText(`X:${mouse.x.toFixed(0)} Y:${mouse.y.toFixed(0)}`, mouse.x + 5, mouse.y - 5);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [backgroundStyle]); // Re-init when style changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-theme-bg pointer-events-none transition-colors duration-700"
            style={{ touchAction: 'none' }}
        />
    );
}
