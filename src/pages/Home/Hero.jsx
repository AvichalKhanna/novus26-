import hero_bg_techno from "../../assets/hero_bg_techno.mp4"

export default function Hero() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">

      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={hero_bg_techno} type="video/mp4" />
      </video>

      {/* optional overlay */}
      <div className="absolute inset-0 bg-black/30" />

    </div>
  )
}
