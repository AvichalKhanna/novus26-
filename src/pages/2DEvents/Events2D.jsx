import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Users, Trophy } from "lucide-react"
import { ALL_EVENTS, TECH_EVENTS, FUN_EVENTS } from "./eventData"

export default function Events() {
  const [category, setCategory] = useState("all")
  const [activeEvent, setActiveEvent] = useState(null)

  const events =
    category === "tech"
      ? TECH_EVENTS
      : category === "fun"
      ? FUN_EVENTS
      : ALL_EVENTS

  return (
    <div id="events" className="min-h-screen text-white px-6 py-12">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="font-['Orbitron'] text-5xl font-black tracking-widest text-cyan-400 mb-4">
          NOVUS 2026
        </h1>
        <p className="text-slate-400 text-lg">
          Choose your arena. Prove your skill.
        </p>

        {/* CATEGORY FILTER */}
        <div className="flex justify-center gap-4 mt-8">
          {["all", "tech", "fun"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-6 py-2 rounded-full uppercase tracking-wide text-sm transition ${
                category === c
                  ? "bg-cyan-500 text-black"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* EVENT GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50"
            onClick={() => setActiveEvent(event)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: `#${event.color.toString(16)}` }}
              />
              <h3 className="font-['Orbitron'] text-xl text-cyan-400">
                {event.name}
              </h3>
            </div>

            <p className="text-slate-400 text-sm mb-4 line-clamp-3">
              {event.description}
            </p>

            <div className="flex justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Users size={14} />
                {event.teamSize}
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={14} />
                {event.prizePool}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EVENT SPOTLIGHT MODAL */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveEvent(null)}
          >
            <motion.div
              className="max-w-3xl w-full bg-gradient-to-br from-slate-900 to-black border border-cyan-500 rounded-2xl p-8"
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-['Orbitron'] text-4xl text-cyan-400 mb-3">
                {activeEvent.name}
              </h2>

              <p className="text-slate-300 text-lg mb-6">
                {activeEvent.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/50 p-4 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-500 uppercase mb-1">
                    Team Size
                  </div>
                  <div className="text-cyan-400 font-bold">
                    {activeEvent.teamSize}
                  </div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-500 uppercase mb-1">
                    Prize Pool
                  </div>
                  <div className="text-yellow-400 font-bold">
                    {activeEvent.prizePool}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="flex-1 bg-slate-800 py-3 rounded-lg text-slate-300 font-bold"
                >
                  CLOSE
                </button>

                <a
                  href={activeEvent.formLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg text-black font-['Orbitron'] font-bold flex items-center justify-center gap-2"
                >
                  REGISTER
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
