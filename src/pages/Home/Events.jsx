import { useState, useRef, useEffect } from "react"
import escaperoom from "../../assets/ESCAPEROOM.png"
import "./Events.css"

// Sample events data - add your events here
const eventsData = [
  {
    image: escaperoom,
    title: "NEON ESCAPE ROOM",
    fee: "150",
    prize: "2000",
    description: "A high-intensity escape room experience inspired by cyberpunk worlds.",
    teamSize: "2–4",
    date: "12 Feb 2026",
    venue: "College Campus – Block C",
    link: "https://chat.whatsapp.com/xxxxx",
    shadow: "shadow-[0_0_60px_rgba(255,0,0,0.25)]",
    tone: "red"
  },
  {
    image: escaperoom,
    title: "QUANTUM HACKATHON",
    fee: "200",
    prize: "5000",
    description: "24-hour coding marathon pushing the boundaries of innovation.",
    teamSize: "1–3",
    date: "15 Feb 2026",
    venue: "Tech Hub – Lab 7",
    link: "https://chat.whatsapp.com/xxxxx",
    shadow: "shadow-[0_0_60px_rgba(0,255,255,0.25)]",
    tone: "cyan"
  },
  {
    image: escaperoom,
    title: "CYBER WARFARE",
    fee: "100",
    prize: "3000",
    description: "Strategic battle royale in a digital battlefield.",
    teamSize: "4–6",
    date: "18 Feb 2026",
    venue: "Arena – Main Hall",
    link: "https://chat.whatsapp.com/xxxxx",
    shadow: "shadow-[0_0_60px_rgba(255,0,255,0.25)]",
    tone: "purple"
  },
  {
    image: escaperoom,
    title: "NEON RACE",
    fee: "50",
    prize: "1500",
    description: "High-speed racing through holographic circuits.",
    teamSize: "1",
    date: "20 Feb 2026",
    venue: "Sports Complex",
    link: "https://chat.whatsapp.com/xxxxx",
    shadow: "shadow-[0_0_60px_rgba(0,255,0,0.25)]",
    tone: "green"
  },
  {
    image: escaperoom,
    title: "DIGITAL ART FEST",
    fee: "0",
    prize: "4000",
    description: "Showcase your creativity in the metaverse.",
    teamSize: "1–2",
    date: "25 Feb 2026",
    venue: "Gallery – Virtual Space",
    link: "https://chat.whatsapp.com/xxxxx",
    shadow: "shadow-[0_0_60px_rgba(255,165,0,0.25)]",
    tone: "orange"
  }
]

export default function Events() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)

  // Auto-play carousel
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % eventsData.length)
    }, 5000)

    return () => clearInterval(autoPlayRef.current)
  }, [])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    clearInterval(autoPlayRef.current)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % eventsData.length)
    clearInterval(autoPlayRef.current)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length)
    clearInterval(autoPlayRef.current)
  }

  // Touch/Mouse drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true)
    setStartX(e.pageX || e.touches[0].pageX)
    setScrollLeft(currentIndex)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX || e.touches[0].pageX
    const walk = (startX - x) / 100
    
    if (Math.abs(walk) > 0.5) {
      if (walk > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setIsDragging(false)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Timeline indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10">
          <div className="text-cyan-400 font-bold text-sm tracking-[0.2em]">TIMELINE</div>
          <div className="flex gap-2">
            {eventsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`relative transition-all duration-500 ${
                  idx === currentIndex ? 'w-12 h-1.5' : 'w-1.5 h-1.5'
                }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}></div>
              </button>
            ))}
          </div>
          <div className="text-white/60 text-sm font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(eventsData.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Main carousel container */}
      <div 
        ref={carouselRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center perspective-[2000px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {eventsData.map((event, index) => {
            const offset = index - currentIndex
            const absOffset = Math.abs(offset)
            
            // Calculate position and scale
            const isCenter = offset === 0
            const isLeft = offset < 0
            const isRight = offset > 0
            
            let xPos = offset * 45
            let zPos = -absOffset * 150
            let scale = 1 - absOffset * 0.25
            let opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0.3
            let rotateY = offset * 15
            let blur = absOffset === 0 ? 0 : absOffset === 1 ? 2 : 5
            
            if (absOffset > 2) {
              opacity = 0
              scale = 0.3
            }

            return (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-out"
                style={{
                  transform: `
                    translateX(${xPos}%) 
                    translateZ(${zPos}px) 
                    scale(${scale})
                    rotateY(${rotateY}deg)
                  `,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: 50 - absOffset,
                  transformStyle: 'preserve-3d',
                  pointerEvents: isCenter ? 'auto' : 'none'
                }}
              >
                {/* Card glow effect */}
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse"></div>
                )}
                
                {/* Preview labels */}
                {absOffset === 1 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white/70 text-xs font-mono tracking-widest">
                      {isLeft ? '← PREVIOUS' : 'NEXT →'}
                    </div>
                  </div>
                )}

                <div className={`
                  relative transition-all duration-700
                  ${isCenter ? 'scale-100' : 'scale-90'}
                `}>
                  <img src={escaperoom} className="w-[280px]"/>
                </div>

                {/* Holographic scan lines on center card */}
                {isCenter && (
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scanline"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 group"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 group"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/0 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Event details overlay - bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 max-w-2xl w-full px-8">
        <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 transition-all duration-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <div className="text-white/40 text-xs font-mono tracking-[0.3em]">FEATURED EVENT</div>
            </div>
            <div className="text-cyan-400 font-mono text-sm">{eventsData[currentIndex].date}</div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {eventsData[currentIndex].title}
          </h3>
          
          <p className="text-white/60 text-sm mb-4 leading-relaxed">
            {eventsData[currentIndex].description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
              <span className="text-white/40">Prize:</span>
              <span className="text-cyan-400 font-bold">₹{eventsData[currentIndex].prize}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-purple-400"></div>
              <span className="text-white/40">Team:</span>
              <span className="text-purple-400 font-bold">{eventsData[currentIndex].teamSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-pink-400"></div>
              <span className="text-white/40">Venue:</span>
              <span className="text-pink-400 font-bold">{eventsData[currentIndex].venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/10 text-white/40 text-xs font-mono">
          <kbd className="text-cyan-400">←</kbd> <kbd className="text-cyan-400">→</kbd> Navigate
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scanline {
          animation: scanline 3s linear infinite;
        }

        .perspective-\[2000px\] {
          perspective: 2000px;
        }
      `}</style>
    </div>
  )
}