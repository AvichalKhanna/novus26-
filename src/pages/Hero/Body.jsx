import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Body() {
  return (
    <section className="relative w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 xl:pt-40">

      {/* Content Container */}
      <div className="relative z-10 w-full">

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex flex-col items-center text-center pt-24 pb-20 space-y-10">

          {/* Cyberspace */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-sm"
          >
            <h2 className="font-['Orbitron'] text-lg text-cyan-300 mb-2 tracking-wide">
              Cyber Space Club
            </h2>
            <p className="text-sm text-white/65 leading-relaxed">
              Builders, hackers and thinkers pushing technology beyond classrooms.
            </p>
          </motion.div>

          {/* Central N */}
          <div className="scale-[0.85]">
            <CentralN />
          </div>

          {/* NOVUS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-sm"
          >
            <h2 className="font-['Orbitron'] text-lg text-cyan-300 mb-2 tracking-wide">
              NOVUS
            </h2>
            <p className="text-sm text-white/65 leading-relaxed">
              A symbol of new beginnings and future-forward innovation.
            </p>
          </motion.div>

        </div>

        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-14 lg:gap-20 px-8 lg:px-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 1 }}
            className="text-right max-w-lg justify-self-end"
          >
            <h2 className="font-['Orbitron'] text-2xl lg:text-3xl text-cyan-300 mb-4 text-left whitespace-nowrap">
              Cyber Space Club
            </h2>
            <p className="text-white/65 leading-relaxed text-base lg:text-lg">
              A community driven by curiosity, experimentation, and real-world creation.
            </p>
          </motion.div>

          {/* Center */}
          <div className="flex items-center justify-center w-[250px]">
            <CentralN />
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-left max-w-md justify-self-start"
          >
            <h2 className="font-['Orbitron'] text-2xl lg:text-3xl text-cyan-300 mb-4">
              NOVUS
            </h2>
            <p className="text-white/65 leading-relaxed text-base lg:text-lg">
              The future-facing identity representing advanced systems and ideas.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  )
}


/* ===============================
   CENTRAL N COMPONENT - EPIC CUBOID ASSEMBLY
================================ */

function CentralN() {
  const [assembled, setAssembled] = useState(false);
  const [transformed, setTransformed] = useState(false);

  useEffect(() => {
    const assemblyTimer = setTimeout(() => setAssembled(true), 500);
    const transformTimer = setTimeout(() => setTransformed(true), 3000); // Transform after 3 seconds
    return () => {
      clearTimeout(assemblyTimer);
      clearTimeout(transformTimer);
    };
  }, []);

  // Define cuboid pieces that form the letter N
  const cuboidPieces = [
    // Left vertical column (5 pieces)
    { id: 1, finalX: -40, finalY: -60, finalZ: 0, initialY: 300, color: 'from-cyan-400 to-cyan-600', delay: 0 },
    { id: 2, finalX: -40, finalY: -30, finalZ: 0, initialY: 350, color: 'from-cyan-500 to-cyan-700', delay: 0.1 },
    { id: 3, finalX: -40, finalY: 0, finalZ: 0, initialY: 400, color: 'from-cyan-400 to-cyan-600', delay: 0.2 },
    { id: 4, finalX: -40, finalY: 30, finalZ: 0, initialY: 450, color: 'from-cyan-500 to-cyan-700', delay: 0.3 },
    { id: 5, finalX: -40, finalY: 60, finalZ: 0, initialY: 500, color: 'from-cyan-400 to-cyan-600', delay: 0.4 },
    
    // Diagonal middle pieces (3 pieces)
    { id: 6, finalX: -10, finalY: -20, finalZ: 5, initialY: 320, color: 'from-blue-400 to-cyan-500', delay: 0.5, rotate: 45 },
    { id: 7, finalX: 0, finalY: 0, finalZ: 10, initialY: 370, color: 'from-blue-500 to-cyan-600', delay: 0.6, rotate: 45 },
    { id: 8, finalX: 10, finalY: 20, finalZ: 5, initialY: 420, color: 'from-blue-400 to-cyan-500', delay: 0.7, rotate: 45 },
    
    // Right vertical column (5 pieces)
    { id: 9, finalX: 40, finalY: -60, finalZ: 0, initialY: 280, color: 'from-cyan-400 to-cyan-600', delay: 0.8 },
    { id: 10, finalX: 40, finalY: -30, finalZ: 0, initialY: 330, color: 'from-cyan-500 to-cyan-700', delay: 0.9 },
    { id: 11, finalX: 40, finalY: 0, finalZ: 0, initialY: 380, color: 'from-cyan-400 to-cyan-600', delay: 1.0 },
    { id: 12, finalX: 40, finalY: 30, finalZ: 0, initialY: 430, color: 'from-cyan-500 to-cyan-700', delay: 1.1 },
    { id: 13, finalX: 40, finalY: 60, finalZ: 0, initialY: 480, color: 'from-cyan-400 to-cyan-600', delay: 1.2 },
  ];

  return (
    <div className="relative flex items-center justify-center perspective-1000">
      {/* Pulse Glow - only shows during assembly */}
      {!transformed && (
        <motion.div
          animate={{
            scale: assembled ? [1, 1.1, 1] : 0.5,
            opacity: assembled ? [0.1, 0.2, 0.1] : 0
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full bg-cyan-400/10 blur-3xl"
        />
      )}

      {/* Cuboid Assembly Container */}
      <div className="relative w-48 h-48 md:w-96 md:h-96 flex items-center justify-center preserve-3d">
        {!transformed ? (
          // Cuboid pieces
          cuboidPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: piece.finalX,
                y: piece.initialY,
                z: -100,
                rotateX: Math.random() * 360,
                rotateY: Math.random() * 360,
                rotateZ: Math.random() * 360,
                opacity: 0
              }}
              animate={assembled ? {
                x: piece.finalX,
                y: piece.finalY,
                z: piece.finalZ || 0,
                rotateX: 0,
                rotateY: piece.rotate || 0,
                rotateZ: 0,
                opacity: 1
              } : {}}
              transition={{
                duration: 1.2,
                delay: piece.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="absolute preserve-3d"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 3D Cuboid */}
              <div className="relative preserve-3d">
                {/* Front Face */}
                <motion.div
                  animate={{
                    boxShadow: assembled ? [
                      '0 0 10px rgba(0,255,255,0.5)',
                      '0 0 20px rgba(0,255,255,0.8)',
                      '0 0 10px rgba(0,255,255,0.5)',
                    ] : '0 0 0px rgba(0,255,255,0)'
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: piece.delay }}
                  className={`w-6 h-7 md:w-8 md:h-9 bg-gradient-to-br ${piece.color} 
                    border border-cyan-300/50 rounded-sm`}
                  style={{ transform: 'translateZ(3px)' }}
                />
                
                {/* Back Face */}
                <div 
                  className={`absolute top-0 left-0 w-6 h-7 md:w-8 md:h-9 bg-gradient-to-br ${piece.color} 
                    opacity-40 border border-cyan-300/30 rounded-sm`}
                  style={{ transform: 'translateZ(-3px) rotateY(180deg)' }}
                />
                
                {/* Top Face */}
                <div 
                  className={`absolute top-0 left-0 w-6 h-1.5 md:w-8 md:h-2 bg-gradient-to-br from-cyan-300 to-cyan-500
                    border border-cyan-300/50 rounded-sm`}
                  style={{ 
                    transform: 'rotateX(90deg) translateZ(3.5px)',
                    transformOrigin: 'top'
                  }}
                />
                
                {/* Bottom Face */}
                <div 
                  className={`absolute bottom-0 left-0 w-6 h-1.5 md:w-8 md:h-2 bg-gradient-to-br from-cyan-600 to-cyan-800
                    opacity-60 border border-cyan-300/30 rounded-sm`}
                  style={{ 
                    transform: 'rotateX(-90deg) translateZ(3.5px)',
                    transformOrigin: 'bottom'
                  }}
                />
                
                {/* Left Face */}
                <div 
                  className={`absolute top-0 left-0 w-1.5 h-7 md:w-2 md:h-9 bg-gradient-to-br ${piece.color}
                    opacity-70 border border-cyan-300/40 rounded-sm`}
                  style={{ 
                    transform: 'rotateY(-90deg) translateZ(3px)',
                    transformOrigin: 'left'
                  }}
                />
                
                {/* Right Face */}
                <div 
                  className={`absolute top-0 right-0 w-1.5 h-7 md:w-2 md:h-9 bg-gradient-to-br ${piece.color}
                    opacity-70 border border-cyan-300/40 rounded-sm`}
                  style={{ 
                    transform: 'rotateY(90deg) translateZ(3px)',
                    transformOrigin: 'right'
                  }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          // Solid N Letter after transformation
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              textShadow: [
                "0 0 20px rgba(0,255,255,0.4)",
                "0 0 40px rgba(0,255,255,0.7)",
                "0 0 20px rgba(0,255,255,0.4)",
              ],
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8, ease: "backOut" },
              textShadow: { duration: 3, repeat: Infinity }
            }}
            className="font-['Orbitron'] text-[6rem] md:text-[11rem] font-bold text-cyan-300"
          >
            N
          </motion.span>
        )}
      </div>

      {/* Energy Particles - only during assembly */}
      {assembled && !transformed && [...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: 1.3 + i * 0.05,
            ease: "easeOut"
          }}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full"
          style={{
            boxShadow: '0 0 10px rgba(0,255,255,0.8)'
          }}
        />
      ))}

      {/* Transformation Flash */}
      {transformed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.5, 2]
          }}
          transition={{ 
            duration: 1,
            times: [0, 0.3, 1]
          }}
          className="absolute w-64 h-64 md:w-96 md:h-96 bg-cyan-400/30 blur-2xl rounded-full"
        />
      )}
    </div>
  );
}