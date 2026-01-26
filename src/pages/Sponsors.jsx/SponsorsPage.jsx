import { motion } from "framer-motion"

import dojo from "../../assets/sponsors/dojoworks.jpeg"
import launched from "../../assets/sponsors/launchedglobal.jpeg"
import balaji from "../../assets/sponsors/balajiwafers.jpeg"
import davat from "../../assets/sponsors/davatbeverages.jpeg"
import crossroads from "../../assets/sponsors/crossroadscafe.jpeg"
import sundarone from "../../assets/sponsors/sundaronehostel.png"
import greensole from "../../assets/sponsors/greensale.jpeg"
import bloom from "../../assets/sponsors/bloom.jpeg"
import devfolio from "../../assets/sponsors/devfolio.jpeg"
import unstop from "../../assets/sponsors/unstop.jpeg"
import interviewcake from "../../assets/sponsors/interviewcake.jpeg"

export const sponsors = [
  { name: "DojoWorks", role: "Title Sponsor", image: dojo, tier: "title" },
  { name: "LaunchED Global", role: "Powered Sponsor", image: launched, tier: "powered" },
  { name: "Balaji Wafers", role: "Snacking Partner", image: balaji },
  { name: "Davat Beverages", role: "Beverage Sponsor", image: davat },
  { name: "Crossroads Café", role: "Gift Partner", image: crossroads },
  { name: "Sundarone Hostels", role: "Promotional Partner", image: sundarone },
  { name: "GreenSole", role: "Lifestyle Partner", image: greensole },
  { name: "Bloom Hotels", role: "Travel & Accommodation Partner", image: bloom },
  { name: "Devfolio", role: "Knowledge Partner", image: devfolio },
  { name: "Unstop", role: "Platform Partner", image: unstop },
  { name: "Interview Cake", role: "Skill Enhancement Partner", image: interviewcake },
]

const tierStyles = {
  title: "col-span-2 md:col-span-3 scale-105",
  powered: "col-span-2",
}

export default function SponsorsPage() {
  return (
    <section id = "sponsors" className="relative min-h-screen px-6 py-20 text-white">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl md:text-5xl font-bold tracking-widest text-cyan-300"
      >
        OUR SPONSORS
      </motion.h1>

      <p className="text-center text-gray-400 mt-4 max-w-xl mx-auto">
        Powering innovation, creativity, and controlled chaos.
      </p>

      {/* Grid */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {sponsors.map((sponsor, i) => (
          <motion.div
            key={sponsor.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative group overflow-hidden rounded-xl 
              bg-gradient-to-br from-[#0b0f16] to-[#05070b] 
              border border-white/10 backdrop-blur-md
              ${tierStyles[sponsor.tier] || ""}`}
          >
            {/* Metallic shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* Content */}
            <div className="relative p-6 flex flex-col items-center gap-4">
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="h-20 object-contain grayscale group-hover:grayscale-0 transition"
              />

              <div className="text-center">
                <h3 className="font-semibold tracking-wide">
                  {sponsor.name}
                </h3>
                <p className="text-sm text-cyan-300/70">
                  {sponsor.role}
                </p>
              </div>
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
