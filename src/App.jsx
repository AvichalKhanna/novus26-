import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Hero3D from "./pages/3DHERO/Hero3D"
import Events from "./pages/Events/Events"
import LoadingScreen from "./pages/LoadingScreen"
import Cart from "./pages/Events/Cart"
import "./App.css"
import Events2D from "./pages/2DEvents/Events2D"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  )
}

export default App
