"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Terminal, User, Mail } from "lucide-react";

const TYPING_STRINGS = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "AI Enthusiast",
  "B.Tech @ AKGEC",
  "Open Source Contributor",
];

function useTypingEffect(strings: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => i + 1);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
          ),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings, speed, pause]);

  return text;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedText = useTypingEffect(TYPING_STRINGS);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const cols = ["#00f5ff", "#bf00ff", "#ff007a", "#00ff88"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: -0.2 - Math.random() * 0.5,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: cols[Math.floor(Math.random() * cols.length)],
      });
    }

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.y += p.vy;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Gradient blobs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold glass animated-border"
            style={{ color: "#00f5ff", borderWidth: "1px" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00f5ff" }} />
            Available for Opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="gradient-text">Krish</span>{" "}
          <span className="text-slate-100">Tyagi</span>
        </motion.h1>

        {/* Typing */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4 h-10">
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300">
            {typedText}
          </span>
          <span
            className="inline-block w-0.5 h-7 animate-pulse"
            style={{ background: "#00f5ff" }}
          />
        </motion.div>

        {/* College */}
        <motion.p variants={itemVariants} className="text-sm sm:text-base font-mono text-slate-500 mb-8">
          🎓 Ajay Kumar Garg Engineering College · 2nd Year B.Tech
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-10"
        >
          I craft immersive digital experiences with cutting-edge tech — from smooth, performant UIs to scalable backends. Passionate about shipping products that actually matter.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#projects"
            id="view-projects-btn"
            className="group relative px-8 py-3.5 rounded-2xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00f5ff 0%, #bf00ff 100%)", color: "#000" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            id="contact-btn"
            className="px-8 py-3.5 rounded-2xl font-semibold text-sm glass animated-border transition-all duration-300 hover:scale-105 text-slate-200"
            style={{ borderWidth: "1px" }}
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {[
            { icon: Terminal, href: "https://github.com/krishtyagi", label: "GitHub" },
            { icon: User, href: "https://linkedin.com/in/krishtyagi", label: "LinkedIn" },
            { icon: Mail, href: "mailto:krish@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center w-11 h-11 rounded-full glass animated-border transition-all duration-300 hover:scale-110 text-slate-400 hover:text-cyan-400"
              style={{ borderWidth: "1px" }}
            >
              <Icon className="w-4.5 h-4.5" size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-cyan-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
