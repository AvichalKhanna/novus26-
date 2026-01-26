import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
  X,
  Send,
  Command,
} from "lucide-react";

export default function ContactSystem() {
  const [view, setView] = useState("gateway"); // 'gateway' | 'message'

  return (
    <section className="relative w-full bg-gradient-to-b from-transaprent to-[#050505] text-white overflow-hidden font-sans">
      {/* SECTION BACKGROUND (NOT FIXED) */}


      <AnimatePresence mode="wait">
        {view === "gateway" ? (
          <Gateway key="gateway" onWriteClick={() => setView("message")} />
        ) : (
          <MessageTerminal key="message" onBack={() => setView("gateway")} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===============================
   GATEWAY VIEW
================================ */
function Gateway({ onWriteClick }) {
  return (
    <motion.section
    id = "contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT */}
        <div className="space-y-10">
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
            <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase border-l-2 border-cyan-500 pl-4">
              Access Point: 001
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mt-6 leading-[0.85]">
              SAY <br />
              <span className="text-white/20 italic">HELLO.</span>
            </h1>
          </motion.div>

          <div className="grid gap-6">
            <ContactLink icon={<Mail />} label="Secure Email" value="ops@novus.tech" />
            <ContactLink icon={<Phone />} label="Direct Line" value="+91 XXXXX XXXXX" />
            <ContactLink icon={<MapPin />} label="Node Location" value="India / Remote" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] backdrop-blur-3xl">
          <Command
            className="absolute top-8 right-8 text-white/10"
            size={40}
          />

          <h2 className="text-2xl font-light mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Skip the formalities. Send a direct transmission to our core systems.
          </p>

          <button
            onClick={onWriteClick}
            className="group flex items-center gap-6 bg-white text-black pl-8 pr-4 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all active:scale-95"
          >
            WRITE TO US
            <div className="bg-black text-white p-2 rounded-full group-hover:-rotate-45 transition-transform">
              <ArrowRight size={20} />
            </div>
          </button>

          <div className="mt-14 pt-8 border-t border-white/5 flex gap-8">
            <SocialIcon icon={<Instagram />} />
            <SocialIcon icon={<Linkedin />} />
            <SocialIcon icon={<Github />} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ===============================
   MESSAGE TERMINAL
================================ */
function MessageTerminal({ onBack }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-3xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>

          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
            New_Transmission.log
          </span>

          <button
            onClick={onBack}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form className="p-8 md:p-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <TerminalInput label="Identity" placeholder="Your Name" />
            <TerminalInput label="Return Path" placeholder="email@address.com" />
          </div>

          <TerminalInput label="Subject" placeholder="Collaboration Inquiry" />

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-cyan-500 font-mono">
              Message Body
            </label>
            <textarea
              rows={4}
              className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-cyan-500 transition-colors resize-none text-lg"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-3 text-cyan-500 hover:text-cyan-400 transition-colors font-mono text-sm group"
          >
            <Send
              size={16}
              className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
            />
            EXECUTE_SEND
          </button>
        </form>
      </div>
    </motion.section>
  );
}

/* ===============================
   SMALL COMPONENTS
================================ */
function ContactLink({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="text-gray-600 group-hover:text-cyan-500 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase text-gray-600 font-mono tracking-widest">
          {label}
        </p>
        <p className="text-lg text-white/80 group-hover:text-white transition-colors">
          {value}
        </p>
      </div>
    </div>
  );
}

function TerminalInput({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase text-cyan-500 font-mono">
        {label}
      </label>
      <input
        className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-lg"
        placeholder={placeholder}
      />
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <motion.a
      whileHover={{ y: -5, scale: 1.1 }}
      className="text-gray-500 hover:text-cyan-500 transition-colors"
      href="#"
    >
      {React.cloneElement(icon, { size: 24 })}
    </motion.a>
  );
}
