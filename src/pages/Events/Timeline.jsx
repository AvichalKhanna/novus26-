import { useState, useEffect } from "react"

export default function Timeline({ 
  totalEvents = 5, 
  currentIndex = 0, 
  onSlideChange 
}) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
        {/* Label */}
        <div className="text-cyan-400 font-bold text-sm tracking-[0.2em] text-glow">
          EVENTS
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[...Array(totalEvents)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSlideChange && onSlideChange(idx)}
              className={`relative transition-all duration-500 ${
                idx === currentIndex ? 'w-12 h-1.5' : 'w-1.5 h-1.5'
              }`}
              aria-label={`Go to event ${idx + 1}`}
            >
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse-glow' 
                    : 'bg-white/30 hover:bg-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                }`}
              ></div>
              
              {/* Active dot inner glow */}
              {idx === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-cyan-300 blur-sm opacity-60"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Counter */}
        <div className="text-white/60 text-sm font-mono tabular-nums">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalEvents).padStart(2, '0')}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 211, 238, 1);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .text-glow {
          text-shadow: 0 0 10px currentColor;
        }
      `}</style>
    </div>
  )
}
