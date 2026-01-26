import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  IndianRupee,
  ExternalLink
} from "lucide-react"
import { Sparkles } from "lucide-react";
import EventInfo from "./EventInfo";

export default function EventCard({
  image,
  title,
  tags=["fun"],
  fee,
  prize,
  description,
  teamSize,
  date,
  venue,
  link,
  shadow,
  tone = "purple" // default tone
}) {


return (
  <>
<motion.div
  className="relative w-[600px] overflow-hidden flex items-center justify-center rounded-2xl"
  initial="initial"
  animate="initial"     // ✅ add this
  whileHover="hover"
>
  {/* BACK CARD (Hidden behind) */}
  <motion.div
    className="absolute inset-0 bg-black/70 w-[300px] rounded-2xl"
    variants={{
      initial: { x: "70%", filter: "blur(3px)" },   // hidden to left
      hover: { x: "100%", filter: "blur(0px)" }      // slight peek
    }}
    transition={{ type: "tween", duration: 0.8 }}
  >

    <EventInfo tone={tone}/>
    </motion.div>
  {/* FRONT POSTER CARD */}
  <motion.div
    className="relative h-96 w-full"
    variants={{
      initial: { x: "0",  filter: "blur(0px)" },
      hover: { x: "-23%",  }
    }}
    transition={{ type: "tween", duration: 0.8 }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-contain rounded-xl"
    />
  </motion.div>
</motion.div>



  </>
)
}

function EvenCard({
  image,
  title,
  fee,
  prize,
  description,
  teamSize,
  date,
  venue,
  link,
  shadow,
  tone = "cyan" // default tone
}) {

  // 💠 TONE COLORS
  const tones = {
    cyan: {
      primary: "cyan-400",
      border: "cyan-400/30",
      bg: "bg-cyan-400/10",
      hover: "hover:bg-cyan-400/20",
      text: "text-cyan-300"
    },
    red: {
      primary: "red-500",
      border: "red-500/30",
      bg: "bg-red-500/10",
      hover: "hover:bg-red-500/20",
      text: "text-red-400"
    },
    purple: {
      primary: "purple-500",
      border: "purple-500/30",
      bg: "bg-purple-500/10",
      hover: "hover:bg-purple-500/20",
      text: "text-purple-300"
    }
  }

  const color = tones[tone] || tones.cyan

  return (
    <div className="relative flex justify-center items-center py-24">

      {/* 🧊 FLOATING CRYSTALS */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-6 h-6 bg-${color.primary}/80 blur-[1px]`}
          style={{
            top: `calc(50% + ${Math.sin(i) * 350}px)`,
            left: `calc(50% + ${Math.cos(i) * 280}px)`,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🖤 MAIN CARD */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`
          relative z-10
          w-[200px] md:w-[320px]
          bg-black/60 backdrop-blur-xl
          border border-${color.border}
          rounded-2xl
          ${shadow}
          overflow-hidden
        `}
      >

        {/* 🖼 EVENT IMAGE */}
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* 📄 CONTENT */}
        <div className="p-6 space-y-4 text-white">

          <h2 className={`text-xl font-bold tracking-wide ${color.text}`}>
            {title}
          </h2>

          <p className="text-sm text-gray-300">
            {description}
          </p>

          {/* 💰 INFO GRID */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-200">

            <div className="flex items-center gap-2">
              <IndianRupee size={16} />
              <span>Fee: ₹{fee}</span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>Prize: ₹{prize}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Team: {teamSize}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <MapPin size={16} />
              <span>{venue}</span>
            </div>

          </div>

          {/* ☑ REGISTER */}
          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" className={`accent-${color.primary}`} />
            <span className="text-sm text-gray-300">
              I want to register
            </span>
          </div>

          {/* 🔗 JOIN BUTTON */}
          <a
            href={link}
            target="_blank"
            className={`
              mt-4 flex items-center justify-center gap-2
              w-full py-2 rounded-lg
              ${color.bg}
              border border-${color.border}
              ${color.text}
              ${color.hover}
              transition
            `}
          >
            Join Group
            <ExternalLink size={16} />
          </a>

        </div>
      </motion.div>
    </div>
  )
}
