import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

export default function GlitchText({ text, classname }) {
  const controls = useAnimation()
  const [seed, setSeed] = useState(1)
  const [freq, setFreq] = useState(0.01)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const glitch = () => {
      const newSeed = Math.floor(Math.random() * 1000)
      const newFreq = Math.random() * 0.02 + 0.004
      const newScale = Math.random() * 35 + 10

      setSeed(newSeed)
      setFreq(newFreq)
      setScale(newScale)

      controls.start({
        x: [0, -2, 3, -1, 0],
        transition: {
          duration: 0.2,
          ease: "steps(4)",
        },
      })

      setTimeout(() => setScale(0), 120)
    }

    const loop = () => {
      glitch()
      setTimeout(loop, Math.random() * 2500 + 800)
    }

    loop()
  }, [controls])

  return (
    <div className="relative inline-block">
      {/* SVG FILTER */}
      <svg className="absolute w-0 h-0">
        <filter id="random-glitch">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={freq}
            numOctaves="1"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
          />
        </filter>
      </svg>

      {/* MAIN TEXT */}
      <motion.h1
        animate={controls}
        style={{ filter: "url(#random-glitch)" }}
        className="
          relative z-10 font-extrabold tracking-tight
          text-cyan-400/70
          drop-shadow-[1px_0_rgba(255,0,0,0.25)]
          drop-shadow-[-1px_0_rgba(0,255,255,0.25)]
        "
      >
        <p className={classname}>
          {text}
        </p>
      </motion.h1>

      {/* RANDOM TEAR */}
      <motion.h1
        aria-hidden
        animate={{
          opacity: [0, 1, 0],
          x: [0, 6, -4, 0],
          clipPath: [
            "inset(40% 0 45% 0)",
            "inset(20% 0 60% 0)",
          ],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 1.5,
          ease: "steps(2)",
        }}
        className="
          absolute inset-0 font-extrabold
          text-white opacity-60
          mix-blend-difference
          pointer-events-none
        "
      >
        {text}
      </motion.h1>
    </div>
  )
}
