import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import GlitchText from "./GlitchText"

export default function NavBar() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: "Home", path: "#home" },
    { name: "Events", path: "#events" },
    { name: "FAQ", path: "#faq" },
    { name: "Sponsors", path: "#sponsors" },
    { name: "Contact", path: "#contact" },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-6xl">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-2xl blur-2xl bg-cyan-500/20" />

      {/* Glass Body */}
      <div
        className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.15)] overflow-hidden"
        onMouseLeave={() => setOpen(false)}
      >
        {/* Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <GlitchText
            text="NOVUS"
            classname="font-['Orbitron'] text-xl tracking-widest text-cyan-300"
          />

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10">
            {links.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -3 }}>
                <a
                  href={item.path}
                  className="relative text-sm uppercase tracking-widest text-white/70 hover:text-cyan-300 transition"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[1px] w-full scale-x-0 bg-cyan-400 origin-left transition-transform duration-300 hover:scale-x-100" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen((v) => !v)} className="text-cyan-300">
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Hover Trigger */}
          <div
            className="hidden md:block absolute right-6 top-full h-4 w-32"
            onMouseEnter={() => setOpen(true)}
          />
        </div>

        {/* MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="nav-menu"
              initial={{ height: 0, opacity: 0, y: -8, filter: "blur(6px)" }}
              animate={{ height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{
                height: { duration: 0.45, ease: "easeInOut" },
                opacity: { duration: 0.25 },
                y: { duration: 0.35, ease: "easeInOut" },
                filter: { duration: 0.3 },
              }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-xl"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06 },
                  },
                }}
              >
                {links.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <a
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className="block w-full px-6 py-4 text-left text-white/70 hover:text-cyan-300 hover:bg-white/5 transition tracking-widest uppercase"
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
