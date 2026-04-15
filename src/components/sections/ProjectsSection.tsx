"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code, Layers } from "lucide-react";

const projects = [
  {
    title: "PrepVerse",
    description: "An AI-powered interview preparation platform featuring real-time chat, coding challenges, and personalized roadmaps.",
    tech: ["Next.js", "Socket.io", "Gemini AI", "MongoDB"],
    github: "https://github.com/krishtyagi/prepverse",
    demo: "https://prepverse.vercel.app",
    color: "#00f5ff",
    image: "/projects/prepverse.png",
  },
  {
    title: "CyberCommerce",
    description: "A high-performance e-commerce engine with complex state management, glassmorphism UI, and blazing fast payments.",
    tech: ["React", "Redux", "Stripe", "Firebase"],
    github: "https://github.com/krishtyagi/cyber-commerce",
    demo: "https://cyber-commerce.vercel.app",
    color: "#bf00ff",
    image: "/projects/cybercommerce.png",
  },
  {
    title: "EcoTrack AI",
    description: "Sustainability dashboard that uses machine learning to predict carbon footprints based on daily user activity.",
    tech: ["TypeScript", "Node.js", "Python", "AWS"],
    github: "https://github.com/krishtyagi/ecotrack",
    demo: "https://ecotrack-ai.vercel.app",
    color: "#ff007a",
    image: "/projects/ecotrack.png",
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-28 px-6 bg-dark-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold mb-4 glass"
            style={{ color: "#bf00ff", border: "1px solid rgba(191,0,255,0.2)" }}
          >
            ◈ Showcase
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              className="group glass rounded-3xl overflow-hidden flex flex-col h-full animated-border"
              style={{ borderWidth: "1px" }}
            >
              {/* Project Preview Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity duration-500"
                  style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }}
                />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-cyan-400/30">
                     LIVE PROJECT
                   </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/50 text-slate-300 border border-slate-700 group-hover:border-slate-500 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <Code size={18} />
                    Code
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-black group-hover:scale-110 transition-all duration-300"
                    style={{ background: project.color }}
                  >
                    <ExternalLink size={16} />
                    Preview
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
