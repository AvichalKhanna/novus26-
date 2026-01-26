import Background from './Background'
import Timeline from './Timeline'
import Card from './Card'
import escaperoom from "../../assets/ESCAPEROOM.png"
import ctf from "../../assets/ctf.png"
import buildfest from "../../assets/buildfest.png"
import uiux from "../../assets/uiux.png"
import prompt from "../../assets/prompt.png"
import alice from "../../assets/alice.png"
import murder from "../../assets/murdermystery.png"
import tech from "../../assets/tech.png"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowBigLeft, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { addToCart, getCart } from './CartStore'

export default function Events() {
  const baseEvents = [
    {
      id: 0,
      category: "Tech",
      title: "Capture The Flag",
      image: ctf,
      teamSize: "1–4",
      prize: "₹10,000",
      fee: "₹99 (Members) | ₹149 (Non-Members)",
      description:
        "High-intensity cybersecurity challenge. Find vulnerabilities, defend systems, and outsmart rival teams.",
      perks: "Certificates • Goodies • Internship Opportunities",
      tone: "cyan",
    },
    {
      id: 1,
      category: "Tech",
      title: "BuildFest 2.0 (Vibathon)",
      image: tech,
      teamSize: "2–4",
      prize: "₹10,000",
      fee: "₹99 (Members) | ₹149 (Non-Members)",
      description:
        "A fast-paced hackathon where innovation meets execution. Build, pitch, and vibe.",
      perks: "Certificates • Goodies • Internship Opportunities",
      tone: "purple",
    },
    {
      id: 2,
      category: "Tech",
      title: "UI/UX Design Challenge",
      image: uiux,
      teamSize: "Solo / Team",
      prize: "₹3,000",
      fee: "FREE ENTRY",
      description:
        "Design intuitive, aesthetic interfaces that solve real problems.",
      perks: "Certificates • Goodies",
      tone: "pink",
    },
    {
      id: 3,
      category: "Tech",
      title: "Prompt Engineering",
      image: prompt,
      teamSize: "1–2",
      prize: "₹3,000",
      fee: "₹99 (For All)",
      description:
        "Master the art of prompting AI systems to generate powerful, precise outputs.",
      perks: "Certificates • Goodies",
      tone: "blue",
    },
    {
      id: 4,
      category: "Fun",
      title: "Alice in Borderland 2.0",
      image: alice,
      teamSize: "Exactly 3",
      prize: "₹5,000",
      fee: "₹49 (Members) | ₹99 (Non-Members)",
      description:
        "Survival-style games inspired by Alice in Borderland. Strategy, speed, and teamwork decide your fate.",
      perks: "Certificates • Goodies",
      tone: "red",
    },
    {
      id: 5,
      category: "Fun",
      title: "Murder Mystery",
      image: murder,
      teamSize: "3",
      prize: "₹5,000",
      fee: "₹99 (Members) | ₹149 (Non-Members)",
      description:
        "Uncover secrets, interrogate suspects, and solve the crime before time runs out.",
      perks: "Certificates • Goodies",
      tone: "amber",
    },
    {
      id: 6,
      category: "Fun",
      title: "Escape Room",
      image: escaperoom,
      teamSize: "2–4",
      prize: "₹2,000 + Special Goodies",
      fee: "₹99 (Members) | ₹149 (Non-Members)",
      description:
        "A high-pressure escape room packed with puzzles, locks, and adrenaline.",
      perks: "Certificates • Goodies",
      tone: "green",
    },
  ]

  // Clone edges for desktop carousel
  const events = [
    baseEvents[baseEvents.length - 1],
    ...baseEvents,
    baseEvents[0],
  ]

  const navigate = useNavigate();
  const CARD_WIDTH = 600
  const GAP = 0

  // Desktop carousel state
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)

  // Mobile state
  const [mobileIndex, setMobileIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState(null)

  const next = () => {
    setAnimate(true)
    setIndex((i) => i + 1)
  }

  const prev = () => {
    setAnimate(true)
    setIndex((i) => i - 1)
  }

  // Mobile navigation
  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % baseEvents.length)
    setExpandedCard(null)
  }

  const prevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + baseEvents.length) % baseEvents.length)
    setExpandedCard(null)
  }

  // Handle infinite jump (no animation) - Desktop only
  useEffect(() => {
    if (index === events.length - 1) {
      setTimeout(() => {
        setAnimate(false)
        setIndex(1)
      }, 700)
    }

    if (index === 0) {
      setTimeout(() => {
        setAnimate(false)
        setIndex(events.length - 2)
      }, 700)
    }
  }, [index, events.length])

  // Timeline index (mapped to real items)
  const timelineIndex =
    index === 0
      ? baseEvents.length - 1
      : index === events.length - 1
      ? 0
      : index - 1

  const getToneColor = (tone) => {
    const colors = {
      cyan: 'from-cyan-500/20 to-cyan-600/20',
      purple: 'from-purple-500/20 to-purple-600/20',
      pink: 'from-pink-500/20 to-pink-600/20',
      blue: 'from-blue-500/20 to-blue-600/20',
      red: 'from-red-500/20 to-red-600/20',
      amber: 'from-amber-500/20 to-amber-600/20',
      green: 'from-green-500/20 to-green-600/20',
    }
    return colors[tone] || colors.cyan
  }

  const getToneBorder = (tone) => {
    const borders = {
      cyan: 'border-cyan-500/50',
      purple: 'border-purple-500/50',
      pink: 'border-pink-500/50',
      blue: 'border-blue-500/50',
      red: 'border-red-500/50',
      amber: 'border-amber-500/50',
      green: 'border-green-500/50',
    }
    return borders[tone] || borders.cyan
  }

  return (
    <>
    <div
      className="fixed top-4 left-4 rounded-3xl bg-white/20 hover:bg-blue-300/50 p-2 cursor-pointer"
      onClick={() => navigate("/home")}
    >
      <ArrowBigLeft />
    </div>
      <Background />

      {/* DESKTOP VERSION */}
      <div className="hidden md:block absolute top-0 left-0 w-screen h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          {/* TIMELINE */}
          <Timeline
            totalEvents={baseEvents.length}
            currentIndex={timelineIndex}
            onSlideChange={(i) => setIndex(i + 1)}
          />

          {/* CAROUSEL */}
          <div className="relative w-[90vw] h-[800px] overflow-hidden flex items-center justify-center">
            <div
              className={`flex items-center ${
                animate
                  ? 'transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]'
                  : ''
              }`}
              style={{
                transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${
                  index * (CARD_WIDTH + GAP)
                }px))`,
              }}
            >
              {events.map((event, i) => {
                const isActive = i === index

                return (
                  <div
                    key={`${event.id}-${i}`}
                    style={{ width: CARD_WIDTH }}
                    className={`
                      relative mx-[${GAP / 2}px]
                      transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                      ${isActive
                        ? 'scale-110 opacity-100 z-20'
                        : 'scale-95 opacity-40 blur-[2px] pointer-events-none'}
                    `}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/40 rounded-xl z-10" />
                    )}

                    <Card {...event} />
                  </div>
                )
              })}
            </div>


           <button
  onClick={() => {
    const item = {
      id: events[index].id,
      title: events[index].title,
      poster: events[index].image,
      fee: events[index].fee,
      teamSize: events[index].teamSize,
    }

    console.log("🛒 Adding to cart:", item)
    getCart()
    addToCart(item)

    console.log("✅ Cart after add:", JSON.parse(localStorage.getItem("cart")))
  }}
  className="absolute bottom-10 w-full max-w-2xl mt-3 py-2 
             bg-cyan-400 text-black rounded-lg font-semibold 
             hover:bg-cyan-500 active:bg-cyan-500"
>
  Add to Cart
</button>



          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl 
                      bg-white/10 hover:bg-cyan-400/20 
                      border border-white/10 
                      text-cyan-300 hover:text-cyan-200 
                      backdrop-blur-md transition-all"
          >
            <ShoppingCart size={18} />
            <span className="hidden md:block text-sm font-['Orbitron']">
              Cart
            </span>
          </button>

            {/* ARROWS */}
            <button
              onClick={prev}
              className="absolute left-6 z-30 text-white text-4xl opacity-70 hover:opacity-100 transition"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-6 z-30 text-white text-4xl opacity-70 hover:opacity-100 transition"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className="md:hidden absolute top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full w-full py-6 px-4 gap-6">
          
          {/* Mobile Header */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Orbitron'] text-2xl text-cyan-300 text-center flex-shrink-0"
          >
            Events
          </motion.h2>

          {/* Mobile Card Stack */}
          <div className="relative w-full max-w-[340px] flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center"
              >
                {/* Event Card */}
                <div className={`relative rounded-xl overflow-hidden border ${getToneBorder(baseEvents[mobileIndex].tone)} bg-gradient-to-br ${getToneColor(baseEvents[mobileIndex].tone)} backdrop-blur-sm w-full max-h-[calc(100vh-200px)] overflow-y-auto`}>
                  
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img 
                      src={baseEvents[mobileIndex].image} 
                      alt={baseEvents[mobileIndex].title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs text-white font-['Orbitron']">
                        {baseEvents[mobileIndex].category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-['Orbitron'] text-lg text-white mb-2">
                      {baseEvents[mobileIndex].title}
                    </h3>

                    <p className="text-xs text-white/70 mb-3 leading-relaxed">
                      {baseEvents[mobileIndex].description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-black/30 rounded-lg p-2">
                        <div className="text-[10px] text-white/50 mb-0.5">Team Size</div>
                        <div className="text-xs text-white font-medium">{baseEvents[mobileIndex].teamSize}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2">
                        <div className="text-[10px] text-white/50 mb-0.5">Prize Pool</div>
                        <div className="text-xs text-white font-medium">{baseEvents[mobileIndex].prize}</div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <motion.div
                      initial={false}
                      animate={{ height: expandedCard === mobileIndex ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-white/10">
                        <div className="mb-2">
                          <div className="text-[10px] text-white/50 mb-0.5">Entry Fee</div>
                          <div className="text-xs text-white">{baseEvents[mobileIndex].fee}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-white/50 mb-0.5">Perks</div>
                          <div className="text-xs text-white">{baseEvents[mobileIndex].perks}</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Toggle Details Button */}
                    <button
                      onClick={() => setExpandedCard(expandedCard === mobileIndex ? null : mobileIndex)}
                      className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-white text-xs font-['Orbitron'] transition-colors"
                    >
                      {expandedCard === mobileIndex ? 'Show Less' : 'Show More Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevMobile}
              className="absolute -left-5 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 active:opacity-100 transition z-30 touch-manipulation"
            >
              ‹
            </button>

            <button
              onClick={nextMobile}
              className="absolute -right-5 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 active:opacity-100 transition z-30 touch-manipulation"
            >
              ›
            </button>
          </div>

          {/* Mobile Indicator Dots */}
          <div className="flex gap-2 flex-shrink-0">
            {baseEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setMobileIndex(i)
                  setExpandedCard(null)
                }}
                className={`h-2 rounded-full transition-all touch-manipulation ${
                  i === mobileIndex 
                    ? 'w-8 bg-cyan-400' 
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-white/50 text-xs text-center flex-shrink-0 mb-10"
          >
            Swipe or use arrows to navigate
          </motion.div>
        </div>
      </div>
    </>
  )
}