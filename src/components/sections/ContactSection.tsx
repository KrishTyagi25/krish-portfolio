"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageSquare, Send, Code, Globe, User, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { icon: Code, href: "https://github.com/krishtyagi", color: "#00f5ff" },
    { icon: User, href: "https://linkedin.com/in/krishtyagi", color: "#bf00ff" },
    { icon: Globe, href: "#", color: "#ff007a" },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 bg-dark-bg overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none" 
           style={{ background: "radial-gradient(circle, #ff007a 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none" 
           style={{ background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-mono font-semibold mb-4 glass"
            style={{ color: "#00ff88", border: "1px solid rgba(0,255,136,0.2)" }}
          >
            ◈ Get In Touch
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-6 text-slate-400 max-w-xl mx-auto">
            Open for collaborations, freelance opportunities, or just a friendly chat about tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300">
                  <Mail className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-xs font-mono uppercase tracking-widest">Email Me</h4>
                  <p className="text-slate-100 text-xl font-bold">krish.tyagi@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border border-purple-400/20 group-hover:border-purple-400/50 transition-all duration-300">
                  <MessageSquare className="text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-xs font-mono uppercase tracking-widest">Let&apos;s Chat</h4>
                  <p className="text-slate-100 text-xl font-bold">@krishtyagi on Discord</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <h4 className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-6">Connect Everywhere</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/5 hover:border-white/20 transition-all"
                    style={{ color: link.color }}
                  >
                    <link.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <motion.div 
               whileHover={{ x: 10 }}
               className="inline-flex items-center gap-3 px-6 py-4 rounded-3xl glass border border-white/5 cursor-pointer"
            >
               <span className="text-sm font-bold text-slate-300">Download My Resume</span>
               <ExternalLink size={16} className="text-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass p-10 rounded-[2rem] border border-white/5 relative group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[2rem]">
               <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl" />
            </div>

            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 ml-2">YOUR NAME</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 outline-none focus:border-cyan-400/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 ml-2">YOUR EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 outline-none focus:border-purple-400/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 ml-2">SUBJECT</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 outline-none focus:border-pink-400/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 ml-2">MESSAGE</label>
                <textarea 
                  rows={4} 
                  placeholder="Hey, let's talk about..." 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-slate-100 outline-none focus:border-cyan-400/50 transition-all resize-none"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-5 rounded-2xl font-black text-black text-sm flex items-center justify-center gap-3 group transition-all duration-500 overflow-hidden relative"
                style={{ background: "linear-gradient(90deg, #00f5ff, #bf00ff, #ff007a)" }}
              >
                 <span className="relative z-10 flex items-center gap-2">
                   TRANSMIT MESSAGE
                   <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </span>
                 {/* Shine effect */}
                 <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-full transition-all duration-1000" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="mt-28 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-mono">
            © 2026 KRISH TYAGI. HAND-CRAFTED WITH NEXT.JS & NEON SOUL.
          </p>
          <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
             <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-purple-400 transition-colors">Cookie Meta</a>
             <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
}
