"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Globe } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Frontend",
    desc: "Pixel-perfect UIs with React, Next.js & Tailwind. Focused on performance and delightful UX.",
    color: "#00f5ff",
  },
  {
    icon: Code2,
    title: "Backend",
    desc: "RESTful APIs and microservices with Node.js, Express and MongoDB. Scalable and secure.",
    color: "#bf00ff",
  },
  {
    icon: Cpu,
    title: "AI / ML",
    desc: "Exploring LLM integrations, prompt engineering and ML model deployment. Always learning.",
    color: "#ff007a",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 px-6" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,245,255,0.4))" }} />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold mb-4 glass"
            style={{ color: "#00f5ff", border: "1px solid rgba(0,245,255,0.2)" }}>
            ◈ About Me
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Who Am I?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              Hey! I'm <span className="text-cyan-400 font-semibold">Krish Tyagi</span> — a passionate
              developer and 2nd year B.Tech student at{" "}
              <span className="text-purple-400 font-semibold">Ajay Kumar Garg Engineering College</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I love turning complex ideas into elegant, performant web applications. I specialise in the full
              JavaScript/TypeScript stack — from sleek React interfaces to robust Node.js backends — and I'm
              actively exploring the frontier of AI integration.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Beyond coding, I enjoy competitive programming, open-source contributions and building tools
              that solve real problems. I believe great software is the perfect blend of engineering rigour and
              design sensibility.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Projects", value: "10+" },
                { label: "Technologies", value: "15+" },
                { label: "Caffeine Cups", value: "∞" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-4 text-center animated-border"
                  style={{ borderWidth: "1px" }}
                >
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pillar cards */}
          <div className="grid gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="group glass rounded-2xl p-6 flex gap-5 items-start hover:scale-[1.02] transition-transform duration-300 cursor-default"
                style={{ border: `1px solid rgba(${
                  p.color === "#00f5ff" ? "0,245,255" :
                  p.color === "#bf00ff" ? "191,0,255" : "255,0,122"
                },0.15)` }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  <p.icon style={{ color: p.color }} size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
