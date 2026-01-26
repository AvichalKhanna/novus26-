import { motion } from "framer-motion";
import { Sparkles, Calendar, Users, Trophy, IndianRupee } from "lucide-react";

export default function EventInfo({ tone }) {
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
  };

  const color = tones[tone] || tones.cyan;

  return (
    <motion.div
      className="h-full px-10 flex flex-col justify-between gap-6 relative overflow-hidden rounded-2xl border neon-grid"
      style={{ borderColor: `rgba(0,0,0,0.2)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
    >


      {/* TOP TEXT */}
      <div className="my-2 text-left w-fit">
        <motion.p
          className={`${color.text} text-2xl md:text-3xl font-semibold font-['Orbitron'] tracking-wider`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Escape Room
        </motion.p>

        <motion.div
          className="flex items-center gap-2 mt-2 text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Sparkles size={16} className={`text-${color.primary}`} />
          <span className="text-gray-200">Fun | AB1 | 20 mins</span>
        </motion.div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3">
        <motion.button
          className={`w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 px-2 hover:bg-white/15 transition ${color.hover}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Register
        </motion.button>

        <motion.button
          className={`w-full bg-transparent border border-${color.primary}/40 text-${color.text} rounded-xl py-3 px-2 hover:bg-${color.primary}/15 transition ${color.hover}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Join Group
        </motion.button>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 gap-2 text-gray-200 text-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IndianRupee size={16} className={`text-${color.primary}`} />
            <span className="text-gray-200">Register</span>
          </div>
          <span className="text-white font-semibold">$200</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy size={16} className={`text-${color.primary}`} />
            <span className="text-gray-200">Prize Pool</span>
          </div>
          <span className="text-white font-semibold">$3000</span>
        </div>

        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Users size={16} className={`text-${color.primary}`} />
            <span className="text-gray-200">Team Size</span>
          </div>
          <span className="text-white font-semibold">2 - 4</span>
        </div>
      </div>
    </motion.div>
  );
}
