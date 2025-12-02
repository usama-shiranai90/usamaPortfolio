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
        let nodes = [];
        let connections = [];
        let pulses = [];
        let mouse = { x: -1000, y: -1000 };

        // Configuration
        const config = {
            layerCount: 5,
            nodesPerLayer: [5, 8, 12, 8, 5],
            nodeSize: 3,
            pulseSpeed: 3,
            mouseRadius: 250,
            mouseStrength: 0.5,
            tetherStrength: 0.05,
            friction: 0.9,
        };

        class Node {
            constructor(x, y, layerIndex) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.vx = 0;
                this.vy = 0;
                this.layerIndex = layerIndex;
                this.phase = Math.random() * Math.PI * 2;
                this.frequency = 0.001 + Math.random() * 0.002;
            }

            update(time) {
                const driftX = Math.sin(time * this.frequency + this.phase) * 20;
                const driftY = Math.cos(time * this.frequency + this.phase) * 20;

                const targetX = this.baseX + driftX;
                const targetY = this.baseY + driftY;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (config.mouseRadius - distance) / config.mouseRadius;

                    this.vx -= forceDirectionX * force * config.mouseStrength;
                    this.vy -= forceDirectionY * force * config.mouseStrength;
                }

                const returnX = targetX - this.x;
                const returnY = targetY - this.y;

                this.vx += returnX * config.tetherStrength;
                this.vy += returnY * config.tetherStrength;

                this.vx *= config.friction;
                this.vy *= config.friction;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw(currentAccentRgb) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, config.nodeSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentAccentRgb}, 0.8)`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(this.x, this.y, config.nodeSize * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentAccentRgb}, 0.1)`;
                ctx.fill();
            }
        }

        class Pulse {
            constructor(connection) {
                this.connection = connection;
                this.progress = 0;
                this.speed = config.pulseSpeed * (0.5 + Math.random() * 0.5);
                this.size = 2 + Math.random();
            }

            update() {
                const dx = this.connection.end.x - this.connection.start.x;
                const dy = this.connection.end.y - this.connection.start.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 0.1) {
                    this.progress = 1;
                    return true;
                }

                this.progress += this.speed / dist;
                return this.progress >= 1;
            }

            draw(currentAccentRgb, isDarkTheme) {
                const start = this.connection.start;
                const end = this.connection.end;

                const x = start.x + (end.x - start.x) * this.progress;
                const y = start.y + (end.y - start.y) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = isDarkTheme ? '#fff' : '#000';
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgb(${currentAccentRgb})`;
                ctx.fill();
                ctx.shadowBlur = 0;

                const tailLength = 0.1;
                if (this.progress > tailLength) {
                    const tx = start.x + (end.x - start.x) * (this.progress - tailLength);
                    const ty = start.y + (end.y - start.y) * (this.progress - tailLength);

                    const gradient = ctx.createLinearGradient(x, y, tx, ty);
                    gradient.addColorStop(0, `rgba(${currentAccentRgb}, 0.8)`);
                    gradient.addColorStop(1, `rgba(${currentAccentRgb}, 0)`);

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(tx, ty);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }
        }

        const init = () => {
            nodes = [];
            connections = [];

            const layerWidth = width / (config.layerCount + 1);

            for (let i = 0; i < config.layerCount; i++) {
                const layerNodes = [];
                const count = config.nodesPerLayer[i];
                const x = layerWidth * (i + 1);

                for (let j = 0; j < count; j++) {
                    const spreadY = height * 0.7;
                    const stepY = spreadY / (count - 1 || 1);
                    const startY = (height - spreadY) / 2;
                    const y = startY + (stepY * j);

                    const node = new Node(x, y, i);
                    layerNodes.push(node);
                    nodes.push(node);
                }
            }

            const layers = [];
            for (let i = 0; i < config.layerCount; i++) {
                layers.push(nodes.filter(n => n.layerIndex === i));
            }

            for (let i = 0; i < layers.length - 1; i++) {
                const currentLayer = layers[i];
                const nextLayer = layers[i + 1];

                currentLayer.forEach(startNode => {
                    const connectionCount = 2 + Math.floor(Math.random() * 2);
                    const targets = [...nextLayer].sort(() => 0.5 - Math.random()).slice(0, connectionCount);

                    targets.forEach(endNode => {
                        connections.push({ start: startNode, end: endNode });
                    });
                });
            }
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            width = window.innerWidth;
            height = window.innerHeight;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            init();
        };

        let animationFrameId;

        const animate = (time) => {
            try {
                const { accent: currentAccent, isDark: currentIsDark } = themeRef.current;
                const currentAccentRgb = currentAccent?.rgb || '20, 184, 166';

                ctx.fillStyle = currentIsDark ? '#0f0f0f' : '#ffffff';
                ctx.fillRect(0, 0, width, height);

                ctx.strokeStyle = currentIsDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
                ctx.lineWidth = 1;

                for (let i = 1; i < config.layerCount + 1; i++) {
                    const x = (width / (config.layerCount + 1)) * i;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                }

                ctx.lineWidth = 0.5;
                connections.forEach(conn => {
                    ctx.beginPath();
                    ctx.moveTo(conn.start.x, conn.start.y);
                    ctx.lineTo(conn.end.x, conn.end.y);
                    ctx.strokeStyle = `rgba(${currentAccentRgb}, 0.1)`;
                    ctx.stroke();
                });

                nodes.forEach(node => {
                    node.update(time * 0.001);
                    node.draw(currentAccentRgb);
                });

                if (Math.random() < 0.05 && connections.length > 0) {
                    const randomConnection = connections[Math.floor(Math.random() * connections.length)];
                    if (randomConnection) {
                        pulses.push(new Pulse(randomConnection));
                    }
                }

                for (let i = pulses.length - 1; i >= 0; i--) {
                    if (pulses[i].update()) {
                        pulses.splice(i, 1);
                    } else {
                        pulses[i].draw(currentAccentRgb, currentIsDark);
                    }
                }
            } catch (e) {
                console.error("Animation error:", e);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
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
    }, []); // Empty dependency array - effect runs once

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-theme-bg"
            style={{ pointerEvents: 'none' }}
        />
    );
}
