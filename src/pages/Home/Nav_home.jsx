import { motion } from "framer-motion"
import GlitchReveal from "./GlitchText"
import SandwichMenu from "./SandwichMenu"

export default function Nav_home() {
  return (

    <nav
      className="
fixed top-4 left-1/2 -translate-x-1/2
w-[94%] max-w-5xl h-14
flex items-center justify-between px-6
rounded-2xl

bg-black/50
backdrop-blur-xl backdrop-saturate-150

border border-white/10
shadow-[0_12px_40px_rgba(0,0,0,0.45)]

before:absolute before:inset-0 before:rounded-2xl
before:bg-white/5 before:pointer-events-none

      "
    >
      <div className="font-semibold text-2xl tracking-tight">
        & CSC
      </div>

      <div className="flex font-semibold gap-6 text-sm">
        <GlitchReveal text={"NOVUS"}/>
      </div>

      <div
        className="
          px-4 py-1.5 rounded-full
          bg-black/5 hover:bg-black/10
          transition text-sm
        "
      >
        <SandwichMenu/>
      </div>
    </nav>
  )
}
