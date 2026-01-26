import GlitchText from "./GlitchText"
import NavBar from "./Navbar"
import Body from "./Body"
import Sponsors from "./Sponsors"
import { motion } from "framer-motion"
import Background from "../Home/Background"
export default function Hero(){
    return (
        <>


          {/* 🚀 FLYING CYBER SHARDS */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-[40vh] bg-gradient-to-b from-cyan-400 to-purple-400 blur-sm z-50 overflow-hidden"
              initial={{ y: "110%", opacity: 0 }}
              animate={{
                y: "-20%",
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        <Background/>
        <div id = "home" className="w-screen h-screen
        flex flex-col items-center justify-between px-2">
            <NavBar/>
            <Body/>
            <Sponsors/>
        </div>
        </>
    )
}
