import { motion } from "framer-motion"
import React, { useState, useEffect, useMemo } from "react"

/* ⭐ INDIVIDUAL STAR */
const Star = ({ star, mouse }) => {
  const { xPct, yPct, size, delay, depth } = star

  const starXPx = (xPct / 100) * window.innerWidth
  const starYPx = (yPct / 100) * window.innerHeight

  const dx = starXPx - mouse.x
  const dy = starYPx - mouse.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const repelRadius = 160
  const strength = 28

  let offsetX = 0
  let offsetY = 0

  if (dist < repelRadius && dist > 0) {
    const factor = (repelRadius - dist) / repelRadius
    offsetX = (dx / dist) * factor * strength
    offsetY = (dy / dist) * factor * strength
  }

  return (
    <motion.div
      className="absolute"
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
      animate={{
        x: offsetX * depth,
        y: offsetY * depth,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 0.12,
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        style={{
          width: size,
          height: size,
          boxShadow: "0 0 6px rgba(255,255,255,0.6)"
        }}
        animate={{
          opacity: [0.25, 0.7, 0.35],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

const ShootingStar = () => {
  const start = useMemo(() => ({
    left: Math.random() * 60 + 10, // % across screen
    top: Math.random() * 60 + 10,  // % down screen
    delay: Math.random() * 4 + 3,
  }), [])

  return (
    <motion.div
      className="absolute w-64 h-[1px] 
        bg-gradient-to-r from-white via-white/70 to-transparent"
      style={{
        left: `${start.left}%`,
        top: `${start.top}%`,
      }}
      initial={{
        opacity: 0,
        x: -200,
      }}
      animate={{
        opacity: [0, 1, 0],
        x: window.innerWidth + 400,
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: start.delay,
      }}
    />
  )
}


export default function Background() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  /* 🔒 Generate stars ONCE */
  const stars = useMemo(() => {
    return Array.from({ length: 180 }).map(() => ({
      xPct: Math.random() * 100,
      yPct: Math.random() * 100,
      size: Math.random() * 1.6 + 0.6,
      delay: Math.random() * 4,
      depth: Math.random() * 0.6 + 0.3, // parallax strength
    }))
  }, [])

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden -z-50">

      {/* 🌟 STAR LAYERS */}
      {stars.map((star, i) => (
        <Star key={i} star={star} mouse={mouse} />
      ))}

      {/* 🌠 SHOOTING STARS */}
      <ShootingStar />
      <ShootingStar />
    </div>
  )
}
