"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JourneySection from "@/components/sections/JourneySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Disable scrolling while intro is active
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [introComplete]);

  return (
    <main className="min-h-screen bg-dark-bg text-slate-100">
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <IntroScreen key="intro" onComplete={() => setIntroComplete(true)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Cursor />
            <Navbar />
            
            <div className="relative">
               {/* Global noise/grain texture overlay */}
               <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               
               <HeroSection />
               <AboutSection />
               <SkillsSection />
               <ProjectsSection />
               <JourneySection />
               <ContactSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
