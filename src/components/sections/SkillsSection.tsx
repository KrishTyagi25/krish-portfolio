"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Next.js", level: 90, color: "#00f5ff" },
  { name: "React", level: 95, color: "#bf00ff" },
  { name: "TypeScript", level: 85, color: "#ff007a" },
  { name: "Tailwind CSS", level: 95, color: "#00ff88" },
  { name: "Node.js", level: 80, color: "#00f5ff" },
  { name: "MongoDB", level: 75, color: "#bf00ff" },
  { name: "AWS (Basic)", level: 60, color: "#ff007a" },
  { name: "AI/ML (Basics)", level: 65, color: "#00ff88" },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-28 px-6 bg-dark-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold mb-4 glass"
            style={{ color: "#00f5ff", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            ◈ Expertise
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-2xl relative group overflow-hidden"
              style={{ border: `1px solid ${skill.color}20` }}
            >
              {/* Animated Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-100">{skill.name}</span>
                  <span className="text-xs font-mono" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, #fff)`,
                      boxShadow: `0 0 10px ${skill.color}`,
                    }}
                  />
                </div>
              </div>

              {/* Decorative corner element */}
              <div
                className="absolute -top-4 -right-4 w-12 h-12 rotate-45 opacity-20"
                style={{ borderRight: `2px solid ${skill.color}`, borderBottom: `2px solid ${skill.color}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
