import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid3x3, Clock, TrendingUp, ExternalLink } from "lucide-react"
import * as THREE from 'three'
import Arena from './Arena'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// Mock event data
const ALL_EVENTS = [
  { id: 'ctf', name: 'CTF Challenge', type: 'Competition', color: 0xff0000, position: { x: 20, z: 30 }, teamSize: '1-4', prizePool: '$500', feeMember: '$5', feeNonMember: '$10' },
  { id: 'buildfest', name: 'BuildFest', type: 'Hackathon', color: 0x00ff00, position: { x: -30, z: 40 }, teamSize: '2-5', prizePool: '$1000', feeMember: '$10', feeNonMember: '$15' },
  { id: 'uiux', name: 'UI/UX Design', type: 'Workshop', color: 0x0000ff, position: { x: 40, z: -20 }, teamSize: '1-3', prizePool: '$300', feeMember: '$5', feeNonMember: '$8' },
  { id: 'prompt', name: 'Prompt Engineering', type: 'Workshop', color: 0xffff00, position: { x: -40, z: -30 }, teamSize: '1-2', prizePool: '$200', feeMember: '$5', feeNonMember: '$7' },
  { id: 'techsentinel', name: 'Tech Sentinel', type: 'Competition', color: 0xff00ff, position: { x: 0, z: 50 }, teamSize: '2-4', prizePool: '$800', feeMember: '$8', feeNonMember: '$12' },
  { id: 'alice', name: 'Alice in Wonderland', type: 'Event', color: 0x00ffff, position: { x: 50, z: 0 }, teamSize: '1-5', prizePool: '$400', feeMember: '$6', feeNonMember: '$9' },
  { id: 'murder', name: 'Murder Mystery', type: 'Game', color: 0xff6600, position: { x: -50, z: 0 }, teamSize: '3-6', prizePool: '$350', feeMember: '$7', feeNonMember: '$10' },
  { id: 'escape', name: 'Escape Room', type: 'Game', color: 0x6600ff, position: { x: 0, z: -50 }, teamSize: '2-5', prizePool: '$450', feeMember: '$6', feeNonMember: '$9' },
]

export default function Hero3D() {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)
  const [arenaReady, setArenaReady] = useState(false)
  const [speed, setSpeed] = useState(0)
  const [discoveredEvents, setDiscoveredEvents] = useState(new Set())
  const [nearbyEvent, setNearbyEvent] = useState(null)
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false)
  const [selectedEventForReg, setSelectedEventForReg] = useState(null)
  const [eventRegistrations, setEventRegistrations] = useState({
    ctf: 127,
    buildfest: 143,
    uiux: 89,
    prompt: 76,
    techsentinel: 201,
    alice: 112,
    murder: 98,
    escape: 134
  })

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const registrationLinks = {
    ctf: "https://forms.gle/YOUR_CTF_FORM_ID",
    buildfest: "https://forms.gle/YOUR_BUILDFEST_FORM_ID",
    uiux: "https://forms.gle/YOUR_UIUX_FORM_ID",
    prompt: "https://forms.gle/YOUR_PROMPT_FORM_ID",
    techsentinel: "https://forms.gle/YOUR_TECHSENTINEL_FORM_ID",
    alice: "https://forms.gle/YOUR_ALICE_FORM_ID",
    murder: "https://forms.gle/YOUR_MURDER_FORM_ID",
    escape: "https://forms.gle/YOUR_ESCAPE_FORM_ID"
  }

  useEffect(() => {
    const eventDate = new Date('2026-01-30T09:00:00').getTime()
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

     const addscenebackground = () => {
        
    useEffect(() => {
    if (!sceneRef.current) return;   // important!

    const loader = new FBXLoader();

    loader.load(
        "/low-poly-sci-fi-fighting-stage/source/010_Stage.fbx",
        (fbx) => {
        fbx.scale.set(5, 5, 5);
        fbx.position.set(0, 0, 20);
        sceneRef.current.add(fbx);
        },
        undefined,
        (err) => {
        console.error("FBX failed to load", err);
        }
    );
    }, [sceneRef.current]);
        }

    addscenebackground()

  useEffect(() => {
    if (!canvasRef.current) return

    
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000510, 10, 150);
  scene.background = new THREE.Color(0x000510);

  sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.left = -100
    directionalLight.shadow.camera.right = 100
    directionalLight.shadow.camera.top = 100
    directionalLight.shadow.camera.bottom = -100
    scene.add(directionalLight)

    const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0a1428,
      roughness: 0.8,
      metalness: 0.2
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    const gridHelper = new THREE.GridHelper(200, 50, 0x00f5ff, 0x001a33)
    gridHelper.material.opacity = 0.3
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    const carGroup = new THREE.Group()
    
    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.8, 4),
      new THREE.MeshStandardMaterial({ 
        color: 0x00f5ff,
        metalness: 0.6,
        roughness: 0.4,
        emissive: 0x00f5ff,
        emissiveIntensity: 0.2
      })
    )
    carBody.castShadow = true
    carBody.position.y = 0.6
    carGroup.add(carBody)

    const carTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.6, 2),
      new THREE.MeshStandardMaterial({ 
        color: 0x0099ff,
        metalness: 0.8,
        roughness: 0.2
      })
    )
    carTop.castShadow = true
    carTop.position.y = 1.3
    carTop.position.z = -0.2
    carGroup.add(carTop)

    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.5
    })

    const wheelPositions = [
      { x: 1, z: 1.2 },
      { x: -1, z: 1.2 },
      { x: 1, z: -1.2 },
      { x: -1, z: -1.2 }
    ]

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(pos.x, 0.4, pos.z)
      wheel.castShadow = true
      carGroup.add(wheel)
    })

    const headlightGeometry = new THREE.SphereGeometry(0.15, 8, 8)
    const headlightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1
    })

    ;[-0.6, 0.6].forEach(x => {
      const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
      headlight.position.set(x, 0.5, 2.1)
      carGroup.add(headlight)
      
      const light = new THREE.PointLight(0xffff00, 0.5, 10)
      light.position.set(x, 0.5, 2.1)
      carGroup.add(light)
    })

    carGroup.position.y = 0
    scene.add(carGroup)

    // Event markers removed - Arena handles stages now

    const cameraOffset = new THREE.Vector3(0, 8, -12)
    camera.position.copy(carGroup.position).add(cameraOffset)
    camera.lookAt(carGroup.position)
    
    // NOW set the camera ref
    cameraRef.current = camera

    const keys = {}
    let carVelocity = 0
    let carRotation = 0
    const maxSpeed = 0.2
    const acceleration = 0.04
    const friction = 0.98
    const turnSpeed = 0.025
    
    let cameraAngleX = 0
    let cameraAngleY = 0.3
    const mouseSensitivity = 0.002
    let isMouseDown = false

    // Mouse movement handler for camera (click to activate)
    const handleMouseDown = (e) => {
      isMouseDown = true
    }

    const handleMouseUp = (e) => {
      isMouseDown = false
    }

    const handleMouseMove = (e) => {
      if (isMouseDown) {
        cameraAngleX -= e.movementX * mouseSensitivity
        cameraAngleY = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraAngleY - e.movementY * mouseSensitivity))
      }
    }

    const handleContextMenu = (e) => {
      e.preventDefault()
    }

    const handleKeyDown = (e) => {
      keys[e.key.toLowerCase()] = true
      console.log("e")
      if (e.key.toLowerCase() === 'e' && nearbyEvent) {
        const eventData = ALL_EVENTS.find(ev => ev.id === nearbyEvent.id)
        if (eventData) {
            console.log(eventData)
          setSelectedEventForReg(eventData)
          setShowRegistrationPopup(true)
          setDiscoveredEvents(prev => new Set([...prev, nearbyEvent.id]))
          
          setTimeout(() => {
            setEventRegistrations(prev => ({
              ...prev,
              [nearbyEvent.id]: prev[nearbyEvent.id] + 1
            }))
          }, 2000)
        }
      }
    }

    const handleKeyUp = (e) => {
      keys[e.key.toLowerCase()] = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('contextmenu', handleContextMenu)

    function updateCarPhysics() {
      // Forward/backward movement
      if (keys['w']) {
        carVelocity = Math.min(carVelocity + acceleration, maxSpeed)
      }
      if (keys['s']) {
        carVelocity = Math.max(carVelocity - acceleration, -maxSpeed * 0.5)
      }

      // Keyboard turning
      if (keys['a']) {
        carRotation += turnSpeed * (carVelocity / maxSpeed)
      }
      if (keys['d']) {
        carRotation -= turnSpeed * (carVelocity / maxSpeed)
      }

      // Slowdown near events
      if (nearbyEvent) {
        carVelocity *= 0.50 // Slow down to 95% speed when near event
      } else {
        carVelocity *= friction
      }

      carGroup.position.x += Math.sin(carRotation) * carVelocity
      carGroup.position.z += Math.cos(carRotation) * carVelocity
      carGroup.rotation.y = carRotation

      const boundary = 95
      carGroup.position.x = Math.max(-boundary, Math.min(boundary, carGroup.position.x))
      carGroup.position.z = Math.max(-boundary, Math.min(boundary, carGroup.position.z))

      setSpeed(Math.abs(carVelocity * 100))
    }

    function checkProximity() {
      let closestEvent = null
      const proximityThreshold = 10

      // Check proximity to event stages (hardcoded positions)
      const stagePositions = [
        { id: 'ctf', x: 20, z: 30 },
        { id: 'buildfest', x: -30, z: 40 },
        { id: 'uiux', x: 40, z: -20 },
        { id: 'prompt', x: -40, z: -30 },
        { id: 'techsentinel', x: 0, z: 50 },
        { id: 'alice', x: 50, z: 0 },
        { id: 'murder', x: -50, z: 0 },
        { id: 'escape', x: 0, z: -50 }
      ]

      stagePositions.forEach(stage => {
        const dx = carGroup.position.x - stage.x
        const dz = carGroup.position.z - stage.z
        const distance = Math.sqrt(dx * dx + dz * dz)
        
        if (distance < proximityThreshold) {
          const eventData = ALL_EVENTS.find(e => e.id === stage.id)
          if (eventData) {
            closestEvent = eventData
          }
        }
      })

      setNearbyEvent(closestEvent)
    }

    let animationId
    function animate() {
      animationId = requestAnimationFrame(animate)

      updateCarPhysics()
      checkProximity()

      // Camera follows car with mouse-controlled offset
      const distance = 12
      const offsetX = Math.sin(carRotation + cameraAngleX) * distance
      const offsetZ = Math.cos(carRotation + cameraAngleX) * distance
      const offsetY = 8 + Math.sin(cameraAngleY) * 5

      const targetPosition = new THREE.Vector3(
        carGroup.position.x - offsetX,
        carGroup.position.y + offsetY,
        carGroup.position.z - offsetZ
      )
      
      camera.position.lerp(targetPosition, 0.1)
      camera.lookAt(carGroup.position)

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    setTimeout(() => {
      setLoading(false)
      setArenaReady(true)
      console.log("Scene ready:", sceneRef.current)
      console.log("Camera ready:", cameraRef.current)
      animate()
    }, 2000)

    return () => {
    }
  }, [])

  const handleClosePopup = () => {
    setShowRegistrationPopup(false)
    setSelectedEventForReg(null)
  }

  const handleRegisterNow = () => {
    if (selectedEventForReg) {
      window.open(registrationLinks[selectedEventForReg.id], '_blank')
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Render Moon Arena */}
      {arenaReady && sceneRef.current && cameraRef.current && (
        <Arena scene={sceneRef.current} camera={cameraRef.current} />
      )}

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="font-['Orbitron'] text-4xl text-cyan-400 mb-8 tracking-[0.3em]"
              animate={{
                opacity: [0.5, 1, 0.5],
                textShadow: [
                  "0 0 10px #22d3ee",
                  "0 0 30px #22d3ee",
                  "0 0 10px #22d3ee"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING EVENT ARENA
            </motion.div>
            <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
          <motion.div
            className="font-['Orbitron'] text-3xl font-black tracking-[0.3em]"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #0099ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            animate={{
              textShadow: [
                "0 0 20px rgba(0,245,255,0.5)",
                "0 0 40px rgba(0,245,255,0.8)",
                "0 0 20px rgba(0,245,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NOVUS 26
          </motion.div>

          <div className="flex gap-4">
            <div className="bg-black/60 border border-cyan-500/30 px-5 py-3 rounded backdrop-blur-md">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Speed</div>
              <div className="text-cyan-400 text-2xl font-['Orbitron'] font-bold">{speed.toFixed(0)}</div>
            </div>
            <div className="bg-black/60 border border-cyan-500/30 px-5 py-3 rounded backdrop-blur-md">
              <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Discovered</div>
              <div className="text-cyan-400 text-2xl font-['Orbitron'] font-bold">{discoveredEvents.size}/{ALL_EVENTS.length}</div>
            </div>
          </div>
        </div>

        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 border-2 border-orange-500/50 px-6 py-3 rounded-lg backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-400" size={20} />
            <div className="text-center">
              <div className="text-orange-400 text-xs uppercase tracking-wider">Event Starts In</div>
              <div className="flex gap-2 mt-1">
                <div className="text-center">
                  <div className="text-white font-['Orbitron'] text-lg font-bold">{timeRemaining.days}</div>
                  <div className="text-slate-500 text-[9px]">DAYS</div>
                </div>
                <div className="text-white font-['Orbitron'] text-lg">:</div>
                <div className="text-center">
                  <div className="text-white font-['Orbitron'] text-lg font-bold">{timeRemaining.hours.toString().padStart(2, '0')}</div>
                  <div className="text-slate-500 text-[9px]">HRS</div>
                </div>
                <div className="text-white font-['Orbitron'] text-lg">:</div>
                <div className="text-center">
                  <div className="text-white font-['Orbitron'] text-lg font-bold">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-slate-500 text-[9px]">MIN</div>
                </div>
                <div className="text-white font-['Orbitron'] text-lg">:</div>
                <div className="text-center">
                  <div className="text-white font-['Orbitron'] text-lg font-bold">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-slate-500 text-[9px]">SEC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 bg-black/70 border border-cyan-500/40 p-6 rounded-lg backdrop-blur-md">
          <h3 className="font-['Orbitron'] text-cyan-400 text-sm mb-4 tracking-wider">CONTROLS</h3>
          <div className="space-y-2">
            {[
              { key: 'W', action: 'Accelerate' },
              { key: 'S', action: 'Brake / Reverse' },
              { key: 'A/D', action: 'Turn Left/Right' },
              { key: 'MOUSE', action: 'Click + Move to Look' },
              { key: 'E', action: 'View Registration Info' }
            ].map(({ key, action }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="bg-cyan-500/20 border border-cyan-500 px-3 py-1 rounded font-['Orbitron'] text-xs min-w-[60px] text-center">
                  {key}
                </div>
                <div className="text-slate-300 text-sm">{action}</div>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showRegistrationPopup && selectedEventForReg && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePopup}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900 to-black border-2 border-cyan-500 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-['Orbitron'] text-3xl font-black text-cyan-400 mb-2">
                      {selectedEventForReg.name}
                    </h2>
                    <div className="text-slate-400 uppercase tracking-wider text-sm">
                      {selectedEventForReg.type}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-emerald-400" size={24} />
                      <div>
                        <div className="text-emerald-400 font-['Orbitron'] text-2xl font-bold">
                          {eventRegistrations[selectedEventForReg.id]}
                        </div>
                        <div className="text-slate-400 text-sm">Teams Registered</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClosePopup}
                    className="flex-1 bg-slate-800 py-3 rounded-lg font-['Orbitron'] font-bold text-slate-300 hover:bg-slate-700 transition-all"
                  >
                    CONTINUE EXPLORING
                  </button>
                  <motion.button
                    onClick={handleRegisterNow}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg font-['Orbitron'] font-bold text-black hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    REGISTER NOW
                    <ExternalLink size={18} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}