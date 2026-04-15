"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const events = [
  {
    type: "education",
    title: "B.Tech in Computer Science",
    subtitle: "Ajay Kumar Garg Engineering College",
    date: "2023 - 2027",
    desc: "Maintaining a strong CGPA while leading technical projects. Core focus on DSA, OS, and DBMS.",
    icon: GraduationCap,
    color: "#00f5ff",
  },
  {
    type: "experience",
    title: "Full Stack Developer Intern",
    subtitle: "TechVenture Solutions",
    date: "Summer 2024",
    desc: "Built scalable internal tools using Next.js and AWS. Reduced deployment time by 20%.",
    icon: Briefcase,
    color: "#bf00ff",
  },
  {
    type: "achievement",
    title: "Hackathon Winner",
    subtitle: "Web3 Innovations Challenge",
    date: "Jan 2024",
    desc: "Won 1st prize for developing a decentralized identity provider for low-income regions.",
    icon: Award,
    color: "#ff007a",
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="relative py-28 px-6 bg-dark-bg" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.7 }}
           className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold mb-4 glass"
            style={{ color: "#ff007a", border: "1px solid rgba(255,0,122,0.2)" }}
          >
            ◈ Career
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 origin-top hidden md:block"
            style={{ 
                scaleY, 
                background: "linear-gradient(180deg, #00f5ff, #bf00ff, #ff007a)",
                boxShadow: "0 0 15px rgba(0, 245, 255, 0.3)"
            }}
          />

          <div className="space-y-24">
            {events.map((event, index) => (
              <motion.div 
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Visual Dot on Line */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass border-2 z-10 hidden md:flex items-center justify-center"
                  style={{ borderColor: event.color, boxShadow: `0 0 20px ${event.color}40` }}
                >
                  <event.icon size={18} style={{ color: event.color }} />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass p-8 rounded-3xl animated-border relative overflow-hidden"
                    style={{ borderWidth: "1px" }}
                  >
                     <div 
                        className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10 rounded-full blur-3xl"
                        style={{ background: event.color }}
                     />
                     <span className="text-xs font-mono mb-2 block" style={{ color: event.color }}>
                        {event.date}
                     </span>
                     <h3 className="text-xl font-black text-slate-100 mb-1">{event.title}</h3>
                     <h4 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                        {event.subtitle}
                     </h4>
                     <p className="text-slate-400 text-sm leading-relaxed">
                        {event.desc}
                     </p>
                  </motion.div>
                </div>
                
                {/* Empty space for alignment */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
