import { motion } from "framer-motion"
import Hero from "./Hero/Hero"
import Contact from "./contact/contact"
import SponsorsPage from "./Sponsors.jsx/SponsorsPage"
import Events2D from "./2DEvents/Events2D"
import FAQ from "./FAQ/FAQ"

export default function Home() {
  return (
    <>
      {/* ✨ ENTRY FLASH (SCREEN ONLY) */}
      <motion.div
        className="fixed inset-0 z-[999] bg-white pointer-events-none overflow-x-hidden"
        initial={{ opacity: 0.06 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* 📜 SCROLL CONTAINER (THIS CREATES SCROLL) */}
      <motion.div
        className="absolute top-0 left-0 w-screen h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Hero/>
        <Events2D/>
        <FAQ/>
        <SponsorsPage/>
        <Contact/>
      </motion.div>
    </>
  )
}
