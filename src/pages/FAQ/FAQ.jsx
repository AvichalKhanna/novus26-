import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const FAQS = [
  {
    q: "Who can participate in NOVUS 2026?",
    a: "Any college student with a valid ID can participate. Some events may have specific eligibility criteria mentioned in the event description."
  },
  {
    q: "How do I register for events?",
    a: "Each event has a dedicated Google Form. Click the REGISTER button on the event page and fill in the required details."
  },
  {
    q: "Can I participate in multiple events?",
    a: "Yes. You can register for as many events as you like, provided their timings do not clash."
  },
  {
    q: "Is there any on-spot registration?",
    a: "On-spot registrations are subject to availability. We highly recommend registering in advance."
  },
  {
    q: "Do I need to bring my own equipment?",
    a: "Most events do not require personal equipment. If needed, it will be clearly mentioned in the event details."
  },
  {
    q: "Are there participation certificates?",
    a: "Yes. All registered participants who attend the event will receive participation certificates."
  },
  {
    q: "What happens if I arrive late?",
    a: "Late entry may not be allowed for certain events once the event has started."
  },
  {
    q: "Who do I contact for queries?",
    a: "You can reach out to the event coordinators listed on the event page or contact the NOVUS organizing team."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div id="faq" className="min-h-screen text-white px-6 py-16">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <div className="flex justify-center mb-4">
          <HelpCircle size={42} className="text-cyan-400" />
        </div>
        <h1 className="font-['Orbitron'] text-4xl font-black tracking-widest text-cyan-400 mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-slate-400 text-lg">
          Everything you need to know before entering the arena.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-4xl mx-auto space-y-4">
        {FAQS.map((faq, i) => {
          const open = openIndex === i

          return (
            <motion.div
              key={i}
              layout
              className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-medium text-slate-200">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="text-cyan-400" />
                </motion.div>
              </button>

              <AnimateAnswer open={open}>
                {faq.a}
              </AnimateAnswer>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* Smooth Answer Animation */
function AnimateAnswer({ open, children }) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6 text-slate-400 leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
