import { useEffect, useRef } from "react"

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    let w, h, dpr
    let panels = []
    let COLS = 0
    let ROWS = 0

    // 🔩 FIX: CONTROL PANEL SIZE, NOT COUNT
    const PANEL_SIZE = 220 // px (sweet spot for desktop + mobile)

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 🔥 Adaptive grid count
      COLS = Math.ceil(w / PANEL_SIZE)
      ROWS = Math.ceil(h / PANEL_SIZE)

      const panelW = w / COLS
      const panelH = h / ROWS

      panels = []
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          panels.push({
            x: x * panelW,
            y: y * panelH,
            w: panelW,
            h: panelH,
            shine: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)

    let frame = 0

    const animate = () => {
      frame++
      ctx.clearRect(0, 0, w, h)

      // Base bunker black
      ctx.fillStyle = "#05070b"
      ctx.fillRect(0, 0, w, h)

      panels.forEach((p) => {
        const sheen = 0.55 + Math.sin(frame * 0.002 + p.shine) * 0.05

        const grad = ctx.createLinearGradient(
          p.x,
          p.y,
          p.x + p.w,
          p.y + p.h
        )

        grad.addColorStop(0, "#0b0f16")
        grad.addColorStop(sheen, "#1b2330")
        grad.addColorStop(1, "#070b12")

        ctx.fillStyle = grad
        ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2)

        // seams
        ctx.strokeStyle = "rgba(100,130,160,0.15)"
        ctx.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
    />
  )
}
