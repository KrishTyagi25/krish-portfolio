"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b" : "bg-transparent border-transparent"
      }`}
      style={{ borderColor: scrolled ? "rgba(0,245,255,0.1)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="relative group">
          <span
            className="text-xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            KT.
          </span>
          <span
            className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
            style={{ background: "linear-gradient(90deg, #00f5ff, #bf00ff)" }}
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  active === link.href.slice(1)
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #00f5ff, #bf00ff)" }}
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          id="nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 rounded-full"
            style={{ background: "#00f5ff" }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 rounded-full"
            style={{ background: "#bf00ff" }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 rounded-full"
            style={{ background: "#ff007a" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t"
            style={{ borderColor: "rgba(0,245,255,0.1)" }}
          >
            <ul className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
