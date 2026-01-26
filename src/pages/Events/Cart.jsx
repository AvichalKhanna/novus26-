import { useEffect, useState } from "react"
import { getCart, removeFromCart } from "./CartStore"
import { ArrowLeft, Trash2, Tag, Sparkles, ShoppingCart, CheckCircle2, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Cart() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  
  // Global user info (auto-fills all forms)
  const [globalUser, setGlobalUser] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    setEvents(getCart())
  }, [])

  // Available coupons
  const COUPONS = {
    "FIRST10": { discount: 0.10, description: "10% off your first order" },
    "CYBER15": { discount: 0.15, description: "15% off for Cyber Space members" },
    "NOVUS20": { discount: 0.20, description: "20% off - Limited time!" },
    "WELCOME5": { discount: 0.05, description: "5% welcome discount" },
  }

  const applyCoupon = () => {
    const coupon = COUPONS[couponCode.toUpperCase()]
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon })
      setCouponError("")
      setShowCouponInput(false)
    } else {
      setCouponError("Invalid coupon code")
      setAppliedCoupon(null)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  // Calculate totals
  const subtotal = events.reduce((sum, e) => sum + e.discountedFee, 0)
  const couponDiscount = appliedCoupon ? Math.floor(subtotal * appliedCoupon.discount) : 0
  const total = subtotal - couponDiscount

  // Check if all forms are filled
  const canProceed = events.length > 0 && 
    globalUser.name.trim() !== "" && 
    globalUser.email.trim() !== "" && 
    globalUser.phone.trim() !== ""

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-['Orbitron'] hidden sm:inline">Back to Events</span>
          </button>
          
          <div className="flex-1 flex items-center justify-center gap-3">
            <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
            <h1 className="font-['Orbitron'] text-2xl md:text-4xl text-white">
              Your Cart
            </h1>
          </div>
          
          <div className="w-20 sm:w-32" /> {/* Spacer for centering */}
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-20 h-20 text-white/20 mx-auto mb-4" />
            <h2 className="font-['Orbitron'] text-2xl text-white/50 mb-2">Your cart is empty</h2>
            <p className="text-white/30 mb-6">Add some events to get started!</p>
            <button
              onClick={() => navigate("/events")}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 px-6 py-3 rounded-lg font-['Orbitron'] transition-all"
            >
              Browse Events
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Event Cards */}
            <div className="lg:col-span-2 space-y-4">
              {/* Global User Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-['Orbitron'] text-lg text-white">Your Information</h3>
                  <span className="text-xs text-white/50 ml-auto">Auto-fills all events</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-3">
                  <Input
                    label="Full Name"
                    value={globalUser.name}
                    onChange={(v) => setGlobalUser({ ...globalUser, name: v })}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address"
                    value={globalUser.email}
                    onChange={(v) => setGlobalUser({ ...globalUser, email: v })}
                    placeholder="john@example.com"
                    type="email"
                  />
                  <Input
                    label="Phone Number"
                    value={globalUser.phone}
                    onChange={(v) => setGlobalUser({ ...globalUser, phone: v })}
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                </div>
              </motion.div>

              {/* Event Cards */}
              <AnimatePresence>
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCartCard
                      event={event}
                      user={globalUser}
                      onRemove={() => {
                        removeFromCart(event.id)
                        setEvents(getCart())
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-8 space-y-4"
              >
                {/* Coupon Section */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-purple-400" />
                    <h3 className="font-['Orbitron'] text-lg text-white">Promo Code</h3>
                  </div>

                  {appliedCoupon ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-green-400 font-['Orbitron'] text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          {appliedCoupon.code}
                        </div>
                        <p className="text-xs text-white/50 mt-1">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {!showCouponInput ? (
                        <button
                          onClick={() => setShowCouponInput(true)}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 text-sm transition-all"
                        >
                          + Add Promo Code
                        </button>
                      ) : (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value.toUpperCase())
                                setCouponError("")
                              }}
                              placeholder="Enter code"
                              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-400 outline-none"
                            />
                            <button
                              onClick={applyCoupon}
                              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-lg text-sm font-['Orbitron'] transition-all"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-1 text-red-400 text-xs mt-2"
                            >
                              <AlertCircle className="w-3 h-3" />
                              {couponError}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </>
                  )}

                  {/* Available Coupons */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-white/40">Available codes:</p>
                    {Object.entries(COUPONS).map(([code, data]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCouponCode(code)
                          setShowCouponInput(true)
                        }}
                        className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-['Orbitron'] text-purple-300">{code}</span>
                          <span className="text-xs text-white/40 group-hover:text-white/60">{Math.floor(data.discount * 100)}% off</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 md:p-6">
                  <h3 className="font-['Orbitron'] text-lg text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Subtotal ({events.length} {events.length === 1 ? 'event' : 'events'})</span>
                      <span className="text-white font-medium">₹{subtotal}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-green-400">Discount ({appliedCoupon.code})</span>
                        <span className="text-green-400 font-medium">-₹{couponDiscount}</span>
                      </motion.div>
                    )}
                    
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-['Orbitron'] text-white text-lg">Total</span>
                        <motion.span
                          key={total}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="font-['Orbitron'] text-cyan-400 text-2xl"
                        >
                          ₹{total}
                        </motion.span>
                      </div>
                      {appliedCoupon && (
                        <p className="text-xs text-green-400 text-right mt-1">
                          You saved ₹{couponDiscount}!
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={!canProceed}
                    className={`w-full py-3 md:py-4 rounded-lg font-['Orbitron'] text-base md:text-lg transition-all relative overflow-hidden group ${
                      canProceed
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {canProceed && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {canProceed ? 'Proceed to Payment' : 'Fill in your details'}
                    </span>
                  </button>

                  {!canProceed && (
                    <p className="text-xs text-white/40 text-center mt-2">
                      Please fill in all required fields above
                    </p>
                  )}
                </div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-4 text-white/30 text-xs"
                >
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Instant Confirmation
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EventCartCard({ event, user, onRemove }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      layout
      className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all group"
    >
      {/* Background Poster with Overlay */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Event Image */}
          <div className="w-full sm:w-32 h-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Event Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="inline-block px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-300 font-['Orbitron'] mb-2">
                  {event.category}
                </span>
                <h3 className="font-['Orbitron'] text-lg md:text-xl text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-white/50">Team Size: {event.teamSize}</p>
              </div>

              <button
                onClick={onRemove}
                className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all flex-shrink-0"
                title="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/40 line-through text-sm">₹{event.originalFee}</span>
              <span className="font-['Orbitron'] text-cyan-400 text-xl">₹{event.discountedFee}</span>
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                {Math.round((1 - event.discountedFee / event.originalFee) * 100)}% OFF
              </span>
            </div>

            {/* Toggle Details */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {showDetails ? 'Hide details ▲' : 'Show details ▼'}
            </button>
          </div>
        </div>

        {/* Expandable Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-white/50 text-xs">Description:</span>
                  <p className="text-white/70 mt-1">{event.description}</p>
                </div>
                <div>
                  <span className="text-white/50 text-xs">Perks:</span>
                  <p className="text-white/70 mt-1">{event.perks}</p>
                </div>
              </div>
              
              {/* Participant Details (Pre-filled) */}
              <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                <p className="text-xs text-cyan-400 mb-2 font-['Orbitron']">Participant Details (Auto-filled)</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-white/40">Name:</span>
                    <p className="text-white/70">{user.name || '—'}</p>
                  </div>
                  <div>
                    <span className="text-white/40">Email:</span>
                    <p className="text-white/70 truncate">{user.email || '—'}</p>
                  </div>
                  <div>
                    <span className="text-white/40">Phone:</span>
                    <p className="text-white/70">{user.phone || '—'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-white/50 font-['Orbitron']">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
        required
      />
    </div>
  )
}