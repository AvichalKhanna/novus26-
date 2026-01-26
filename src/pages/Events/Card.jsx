import { useState } from "react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { addToCart } from "./CartStore"
export default function Card({
  id,
  image,
  title,
  fee,
  prize,
  description,
  teamSize,
  date,
  venue,
  link,
  shadow = "shadow-[0_0_60px_rgba(34,211,238,0.25)]",
  tone = "cyan"
}) {

  // Dynamic color themes based on tone
  const toneColors = {
    red: {
      gradient: "from-red-500/20 via-pink-500/20 to-orange-500/20",
      border: "border-red-500/30",
      glow: "shadow-[0_0_60px_rgba(239,68,68,0.3)]",
      accent: "text-red-400",
      accentBg: "bg-red-500/10",
      accentBorder: "border-red-500/30",
      buttonGradient: "from-red-600 to-pink-600",
      shimmer: "from-transparent via-red-500/20 to-transparent"
    },
    cyan: {
      gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_60px_rgba(34,211,238,0.3)]",
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500/10",
      accentBorder: "border-cyan-500/30",
      buttonGradient: "from-cyan-600 to-blue-600",
      shimmer: "from-transparent via-cyan-500/20 to-transparent"
    },
    purple: {
      gradient: "from-purple-500/20 via-pink-500/20 to-fuchsia-500/20",
      border: "border-purple-500/30",
      glow: "shadow-[0_0_60px_rgba(168,85,247,0.3)]",
      accent: "text-purple-400",
      accentBg: "bg-purple-500/10",
      accentBorder: "border-purple-500/30",
      buttonGradient: "from-purple-600 to-pink-600",
      shimmer: "from-transparent via-purple-500/20 to-transparent"
    },
    green: {
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      border: "border-green-500/30",
      glow: "shadow-[0_0_60px_rgba(34,197,94,0.3)]",
      accent: "text-green-400",
      accentBg: "bg-green-500/10",
      accentBorder: "border-green-500/30",
      buttonGradient: "from-green-600 to-emerald-600",
      shimmer: "from-transparent via-green-500/20 to-transparent"
    },
    orange: {
      gradient: "from-orange-500/20 via-yellow-500/20 to-amber-500/20",
      border: "border-orange-500/30",
      glow: "shadow-[0_0_60px_rgba(249,115,22,0.3)]",
      accent: "text-orange-400",
      accentBg: "bg-orange-500/10",
      accentBorder: "border-orange-500/30",
      buttonGradient: "from-orange-600 to-amber-600",
      shimmer: "from-transparent via-orange-500/20 to-transparent"
    }
  }

  const colors = toneColors[tone] || toneColors.cyan

   const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 3000); // 3 seconds
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setIsHovered(false);
  };

  return (

    
    <div 
      className="relative w-[600px] h-[400px] group perspective-[1000px]"
      onMouseLeave={() => handleMouseLeave}
    >
      {/* Outer glow container */}
      <div className={`absolute inset-0 rounded-3xl `}></div>
      
      {/* Main card container */}
     <motion.div
  className={`
    relative w-full h-full rounded-3xl overflow-hidden
  `}
  initial="rest"
  whileHover="hover"
  animate="rest"
>
  {/* SLIDING WRAPPER */}
  <motion.div className={`absolute inset-0 flex rounded-3xl overflow-hidden
    bg-gradient-to-br from-black/80 via-black/60 to-black/80
    backdrop-blur-2xl border ${colors.border} ${shadow} z-1`}
    variants={{
        rest: { x:"30%", width:"300px" },
        hover: { x: "0%", width:"300px" }
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}

      >
    {/* 🖼 LEFT PANEL — IMAGE / COVER */}
    <motion.div
      className="relative w-1/2 h-full overflow-hidden"
      variants={{
        rest: { x: "0%", width:"400px" },
        hover: { x: "0%", width:"400px" }
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onMouseEnter={() => handleMouseEnter}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} opacity-40`} />

      {/* Title on cover */}
      <div className="absolute bottom-8 left-8">
        <div className={`mt-2 h-1 w-24 ${colors.accentBg} rounded-full`} />
      </div>
    </motion.div>
    </motion.div>
      {/* SLIDING WRAPPER */}
  <motion.div className={`absolute inset-0 flex rounded-3xl overflow-hidden
    bg-gradient-to-br from-black/80 via-black/60 to-black/80
    backdrop-blur-2xl border ${colors.border} ${shadow}`}
    variants={{
        rest: { x:"50%", width:"300px" },
        hover: { x: "95%", width:"300px" }
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      >
    {/* 📄 RIGHT PANEL — CONTENT */}
    <motion.div
      className="relative w-[300px] h-full p-8 flex flex-col justify-between -z-1"
      variants={{
        rest: { x: "10%", width:"300px" },
        hover: { x: "0%", width:"300px" }
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10`} />

      {/* CONTENT */}
      <div className="relative space-y-4">
        <h3 className={`text-2xl font-black ${colors.accent}`}>
          {title}
        </h3>

        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-white/40 text-xs">PRIZE</div>
            <div className={`text-xl font-black ${colors.accent}`}>
              ₹{prize}
            </div>
          </div>
          <div>
            <div className="text-white/40 text-xs">TEAM</div>
            <div className={`text-xl font-black ${colors.accent}`}>
              {teamSize}
            </div>
          </div>
        </div>

        <div className="text-white/60 text-xs">
          📅 {date}
        </div>

        <div className="text-white/60 text-xs">
          📍 {venue}
        </div>
      </div>

    </motion.div>

  </motion.div>
</motion.div>


      <style jsx>{`
        @keyframes scan-slow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scan-slow {
          animation: scan-slow 8s linear infinite;
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }

        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 20px currentColor;
          }
          50% {
            text-shadow: 0 0 40px currentColor;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .perspective-\[1000px\] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}