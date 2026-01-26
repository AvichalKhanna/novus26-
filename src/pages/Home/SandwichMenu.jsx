import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SandwichMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-10 h-9
          flex flex-col justify-center items-center gap-1.5
          rounded-full
          bg-black/10 hover:bg-black/20
          backdrop-blur-md
          transition
        "
      >
        <span
          className={`w-5 h-[1.5px] bg-black transition ${
            open && "rotate-45 translate-y-[4px]"
          }`}
        />
        <span
          className={`w-5 h-[1.5px] bg-black transition ${
            open && "opacity-0"
          }`}
        />
        <span
          className={`w-5 h-[1.5px] bg-black transition ${
            open && "-rotate-45 -translate-y-[4px]"
          }`}
        />
      </button>

      {/* MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute right-0 mt-3
              w-44
              rounded-2xl
              bg-white/70
              backdrop-blur-xl backdrop-saturate-150
              border border-white/30
              shadow-[0_20px_40px_rgba(0,0,0,0.15)]
              overflow-hidden
            "
          >
            {["Home", "Events", "About", "Contact"].map((item) => (
              <button
                key={item}
                className="
                  w-full text-left px-4 py-2.5
                  text-sm text-black/80
                  hover:bg-black/5
                  transition
                "
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
