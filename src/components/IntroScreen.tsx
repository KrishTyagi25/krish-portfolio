"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"particles" | "name" | "exit">("particles");

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; color: string; alpha: number;
    }[] = [];

    const colors = ["#00f5ff", "#bf00ff", "#ff007a", "#00ff88"];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Neon grid lines
      ctx.strokeStyle = "rgba(0,245,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, p.color.replace(")", ",0.3)").replace("rgb", "rgba"));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Phase timing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 500);
    const t2 = setTimeout(() => setPhase("exit"), 4000);
    const t3 = setTimeout(() => onComplete(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden scanline"
          style={{ background: "radial-gradient(ellipse at center, #0a0014 0%, #030712 60%, #000 100%)" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(191,0,255,0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)" }} />

          {/* Center content */}
          <div className="relative z-10 text-center select-none">
            <AnimatePresence>
              {phase === "name" && (
                <motion.div
                  key="nameBlock"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Cyberpunk tag line */}
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.5em" }}
                    animate={{ opacity: 1, letterSpacing: "0.3em" }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xs font-mono uppercase mb-6"
                    style={{ color: "#00f5ff" }}
                  >
                    ◈ Initialising Portfolio ◈
                  </motion.p>

                  {/* Main name */}
                  <div className="relative">
                    {/* Glitch shadow layers */}
                    <motion.h1
                      className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl font-black tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(191,0,255,0.6)",
                        transform: "translate(-3px, 1px)",
                        filter: "blur(1px)",
                      }}
                    >
                      Krish Tyagi
                    </motion.h1>
                    <motion.h1
                      className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl font-black tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(0,245,255,0.6)",
                        transform: "translate(3px, -1px)",
                        filter: "blur(1px)",
                      }}
                    >
                      Krish Tyagi
                    </motion.h1>
                    <motion.h1
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.6, ease: "backOut" }}
                      className="relative text-6xl sm:text-7xl md:text-8xl font-black tracking-tight gradient-text"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Krish Tyagi
                    </motion.h1>
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    className="h-px mt-4 mx-auto"
                    style={{
                      maxWidth: "400px",
                      background: "linear-gradient(90deg, transparent, #00f5ff, #bf00ff, #ff007a, transparent)",
                      transformOrigin: "left",
                    }}
                  />

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-6 text-base sm:text-lg font-mono"
                    style={{ color: "rgba(226,232,240,0.6)" }}
                  >
                    {"< Full Stack Developer />"}
                  </motion.p>

                  {/* Loading bar */}
                  <motion.div
                    className="mt-10 mx-auto h-0.5 rounded-full overflow-hidden"
                    style={{ maxWidth: "200px", background: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 3, ease: "linear" }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #00f5ff, #bf00ff, #ff007a)" }}
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    className="mt-3 text-xs font-mono"
                    style={{ color: "rgba(0,245,255,0.5)" }}
                  >
                    Loading experience...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
