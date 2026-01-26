import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function LoadingScreen({ onFinish }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 🔒 TIMING (LOCKED)
    let frame = 0;
    const FPS = 60;
    const DURATION = 3; // 3 seconds
    const MAX_FRAMES = Math.floor(FPS * DURATION);
    const FLY_START = 180;
    const text = "NOVUS";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      // Background gradient
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.8);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Scanlines
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.fillRect(0, y, w, 1);
      }

      // Noise
      for (let i = 0; i < 250; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      // Responsive font size
      const fontSize = Math.min(w * 0.20, 160);
      ctx.font = `${fontSize}px Orbitron`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Fly into camera
      let scale = 1;
      if (frame > FLY_START) {
        const t = Math.min((frame - FLY_START) / 12, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        scale = 1 + eased * 4;
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const shake = (Math.random() - 0.5) * (frame > FLY_START ? 12 : 4);

      // RGB split
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00ffff";
      ctx.fillStyle = "#00ffff";
      ctx.fillText(text, -3 + shake, shake);

      ctx.shadowColor = "#ff00ff";
      ctx.fillStyle = "#ff00ff";
      ctx.fillText(text, 3 + shake, shake);

      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ffffff";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, shake, shake);

      ctx.restore();

      // Glitch slices
      if (frame % 3 === 0) {
        for (let i = 0; i < 3; i++) {
          const sliceHeight = 6;
          const y = Math.random() * h;
          ctx.drawImage(
            canvas,
            0,
            y,
            w,
            sliceHeight,
            Math.random() * 40 - 20,
            y,
            w,
            sliceHeight
          );
        }
      }

      // Countdown timer
      const seconds = Math.max(0, Math.ceil(DURATION - frame / FPS));
      ctx.font = "22px Orbitron";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(`Loading • ${seconds}s`, cx, h - 60);

      frame++;
      if (frame < MAX_FRAMES) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        onFinish?.();
      }
    };

    document.fonts.ready.then(draw);

    // Countdown state
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onFinish]);

  return (
   <>
    {/* 🎨 CANVAS LAYER */}
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[999] bg-black"
    />
  </>

  );
}
