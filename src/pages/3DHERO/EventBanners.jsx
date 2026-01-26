import * as THREE from 'three'
import { useEffect, useRef } from 'react'

// Helper function to create text texture
const createTextTexture = (text, fontSize = 48, color = '#ffffff', bgColor = '#000000', maxWidth = 1024) => {
  const canvas = document.createElement('canvas')
  canvas.width = maxWidth
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Background
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Text
  ctx.fillStyle = color
  ctx.font = `bold ${fontSize}px "Orbitron", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Word wrap
  const words = text.split(' ')
  let lines = []
  let currentLine = words[0]
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i]
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth - 40 && i > 0) {
      lines.push(currentLine)
      currentLine = words[i]
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine)
  
  const lineHeight = fontSize * 1.2
  const startY = (canvas.height - lines.length * lineHeight) / 2 + fontSize / 2
  
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight)
  })
  
  return new THREE.CanvasTexture(canvas)
}

// CTF Banner
export const CTFBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    
    // Main banner board
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2e,
      metalness: 0.3,
      roughness: 0.7
    })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    banner.receiveShadow = true
    group.add(banner)
    
    // Event name header
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    
    // Header gradient background
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#ff3333')
    gradient.addColorStop(1, '#cc0000')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    
    // Event name
    headerCtx.fillStyle = '#ffffff'
    headerCtx.font = 'bold 80px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('CAPTURE THE FLAG', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    // Info panel
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    
    // Dark background
    infoCtx.fillStyle = '#0a0a15'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    // Grid pattern
    infoCtx.strokeStyle = '#ff3333'
    infoCtx.lineWidth = 1
    for (let i = 0; i < 1024; i += 40) {
      infoCtx.beginPath()
      infoCtx.moveTo(i, 0)
      infoCtx.lineTo(i, 768)
      infoCtx.stroke()
    }
    for (let i = 0; i < 768; i += 40) {
      infoCtx.beginPath()
      infoCtx.moveTo(0, i)
      infoCtx.lineTo(1024, i)
      infoCtx.stroke()
    }
    infoCtx.globalAlpha = 0.1
    infoCtx.fillStyle = '#ff3333'
    infoCtx.fillRect(0, 0, 1024, 768)
    infoCtx.globalAlpha = 1
    
    // Info text
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹10,000', 50, 80)
    infoCtx.fillText('👥 Team: 1-4 Members', 50, 160)
    infoCtx.fillText('💰 Fee: ₹99 / ₹149', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    const desc = 'Crack codes, exploit vulnerabilities,'
    const desc2 = 'and capture flags in this intense'
    const desc3 = 'cybersecurity challenge!'
    infoCtx.fillText(desc, 50, 340)
    infoCtx.fillText(desc2, 50, 390)
    infoCtx.fillText(desc3, 50, 440)
    
    // Perks
    infoCtx.fillStyle = '#ff6666'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    infoCtx.fillText('✓ Internships', 50, 660)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    // Stand poles
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff3333,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xff3333,
      emissiveIntensity: 0.3
    })
    
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    // Glowing accent lights
    const accentLight1 = new THREE.PointLight(0xff3333, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    
    const accentLight2 = new THREE.PointLight(0xff3333, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'ctf'
    scene.add(group)
    
    return () => {
      scene.remove(group)
    }
  }, [scene, position])
  
  return null
}

// BuildFest Banner
export const BuildFestBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2e,
      metalness: 0.3,
      roughness: 0.7
    })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    // Header
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#33ff33')
    gradient.addColorStop(1, '#00cc00')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    
    headerCtx.fillStyle = '#000000'
    headerCtx.font = 'bold 70px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('BUILDFEST 2.0', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    // Info panel
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    
    infoCtx.fillStyle = '#0a150a'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.strokeStyle = '#33ff33'
    infoCtx.lineWidth = 1
    infoCtx.globalAlpha = 0.3
    for (let i = 0; i < 1024; i += 40) {
      infoCtx.beginPath()
      infoCtx.moveTo(i, 0)
      infoCtx.lineTo(i, 768)
      infoCtx.stroke()
    }
    infoCtx.globalAlpha = 1
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹10,000', 50, 80)
    infoCtx.fillText('👥 Team: 2-4 Members', 50, 160)
    infoCtx.fillText('💰 Fee: ₹99 / ₹149', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Build innovative tech solutions in', 50, 340)
    infoCtx.fillText('this vibrant hackathon. Code,', 50, 390)
    infoCtx.fillText('collaborate, and create!', 50, 440)
    
    infoCtx.fillStyle = '#66ff66'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    infoCtx.fillText('✓ Internships', 50, 660)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x33ff33,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x33ff33,
      emissiveIntensity: 0.3
    })
    
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0x33ff33, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    
    const accentLight2 = new THREE.PointLight(0x33ff33, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'buildfest'
    scene.add(group)
    
    return () => {
      scene.remove(group)
    }
  }, [scene, position])
  
  return null
}

// UI/UX Banner
export const UIUXBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2e,
      metalness: 0.3,
      roughness: 0.7
    })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#3333ff')
    gradient.addColorStop(1, '#0000cc')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    
    headerCtx.fillStyle = '#ffffff'
    headerCtx.font = 'bold 80px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('UI/UX DESIGN', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    
    infoCtx.fillStyle = '#0a0a15'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹3,000', 50, 80)
    infoCtx.fillText('👤 Solo Event', 50, 160)
    infoCtx.fillText('💰 Fee: FREE ENTRY!', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Design stunning interfaces and', 50, 340)
    infoCtx.fillText('exceptional user experiences', 50, 390)
    infoCtx.fillText('that truly stand out!', 50, 440)
    
    infoCtx.fillStyle = '#6666ff'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    infoCtx.fillText('✓ Internships', 50, 660)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3333ff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x3333ff,
      emissiveIntensity: 0.3
    })
    
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0x3333ff, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    
    const accentLight2 = new THREE.PointLight(0x3333ff, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'uiux'
    scene.add(group)
    
    return () => {
      scene.remove(group)
    }
  }, [scene, position])
  
  return null
}

// Prompt Engineering Banner
export const PromptBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3, roughness: 0.7 })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#ffaa33')
    gradient.addColorStop(1, '#ff8800')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    headerCtx.fillStyle = '#000000'
    headerCtx.font = 'bold 65px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('PROMPT ENGINEERING', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    infoCtx.fillStyle = '#150a0a'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹3,000', 50, 80)
    infoCtx.fillText('👥 Team: 1-2 Members', 50, 160)
    infoCtx.fillText('💰 Fee: ₹99', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Master AI prompting! Unlock the', 50, 340)
    infoCtx.fillText('full potential of AI with perfect', 50, 390)
    infoCtx.fillText('prompts and win big!', 50, 440)
    
    infoCtx.fillStyle = '#ffaa66'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    infoCtx.fillText('✓ Internships', 50, 660)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa33, metalness: 0.9, roughness: 0.1, emissive: 0xffaa33, emissiveIntensity: 0.3 })
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0xffaa33, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    const accentLight2 = new THREE.PointLight(0xffaa33, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'prompt'
    scene.add(group)
    
    return () => { scene.remove(group) }
  }, [scene, position])
  return null
}

// TechSentinel Banner
export const TechSentinelBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3, roughness: 0.7 })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#ff33ff')
    gradient.addColorStop(1, '#cc00cc')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    headerCtx.fillStyle = '#ffffff'
    headerCtx.font = 'bold 65px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('TECHSENTINEL 2.0', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    infoCtx.fillStyle = '#0a0a15'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🎙️ Tech Talkshow', 50, 80)
    infoCtx.fillText('👤 Solo Event', 50, 160)
    infoCtx.fillText('💰 Fee: FREE!', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Engage in tech discussions with', 50, 340)
    infoCtx.fillText('experts. Explore the future of', 50, 390)
    infoCtx.fillText('technology together!', 50, 440)
    
    infoCtx.fillStyle = '#ff66ff'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    infoCtx.fillText('✓ Internships', 50, 660)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xff33ff, metalness: 0.9, roughness: 0.1, emissive: 0xff33ff, emissiveIntensity: 0.3 })
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0xff33ff, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    const accentLight2 = new THREE.PointLight(0xff33ff, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'techsentinel'
    scene.add(group)
    
    return () => { scene.remove(group) }
  }, [scene, position])
  return null
}

// Alice in Borderland Banner
export const AliceBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3, roughness: 0.7 })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#ff6b35')
    gradient.addColorStop(1, '#cc3300')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    headerCtx.fillStyle = '#ffffff'
    headerCtx.font = 'bold 58px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('ALICE IN BORDERLAND', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    infoCtx.fillStyle = '#150a0a'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹5,000', 50, 80)
    infoCtx.fillText('👥 Team: Exactly 3', 50, 160)
    infoCtx.fillText('💰 Fee: ₹49 / ₹99', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Survive deadly games! Strategy,', 50, 340)
    infoCtx.fillText('teamwork, and quick thinking', 50, 390)
    infoCtx.fillText('are your only allies!', 50, 440)
    
    infoCtx.fillStyle = '#ff8855'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b35, metalness: 0.9, roughness: 0.1, emissive: 0xff6b35, emissiveIntensity: 0.3 })
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0xff6b35, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    const accentLight2 = new THREE.PointLight(0xff6b35, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'alice'
    scene.add(group)
    
    return () => { scene.remove(group) }
  }, [scene, position])
  return null
}

// Murder Mystery Banner
export const MurderMysteryBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3, roughness: 0.7 })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#8b00ff')
    gradient.addColorStop(1, '#5500aa')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    headerCtx.fillStyle = '#ffffff'
    headerCtx.font = 'bold 70px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('MURDER MYSTERY', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    infoCtx.fillStyle = '#0a0a15'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize Pool: ₹5,000', 50, 80)
    infoCtx.fillText('👥 Team: 3 Members', 50, 160)
    infoCtx.fillText('💰 Fee: ₹99 / ₹149', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Solve the ultimate whodunit!', 50, 340)
    infoCtx.fillText('Gather clues, interrogate and', 50, 390)
    infoCtx.fillText('unmask the killer!', 50, 440)
    
    infoCtx.fillStyle = '#aa66ff'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x8b00ff, metalness: 0.9, roughness: 0.1, emissive: 0x8b00ff, emissiveIntensity: 0.3 })
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0x8b00ff, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    const accentLight2 = new THREE.PointLight(0x8b00ff, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'murder'
    scene.add(group)
    
    return () => { scene.remove(group) }
  }, [scene, position])
  return null
}

// Escape Room Banner
export const EscapeRoomBanner = ({ position, scene }) => {
  useEffect(() => {
    if (!scene) return
    
    const group = new THREE.Group()
    const bannerGeometry = new THREE.BoxGeometry(8, 6, 0.3)
    const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.3, roughness: 0.7 })
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial)
    banner.castShadow = true
    group.add(banner)
    
    const headerCanvas = document.createElement('canvas')
    headerCanvas.width = 1024
    headerCanvas.height = 256
    const headerCtx = headerCanvas.getContext('2d')
    const gradient = headerCtx.createLinearGradient(0, 0, 1024, 0)
    gradient.addColorStop(0, '#00d9ff')
    gradient.addColorStop(1, '#0099cc')
    headerCtx.fillStyle = gradient
    headerCtx.fillRect(0, 0, 1024, 256)
    headerCtx.fillStyle = '#000000'
    headerCtx.font = 'bold 80px "Orbitron"'
    headerCtx.textAlign = 'center'
    headerCtx.fillText('ESCAPE ROOM', 512, 140)
    
    const headerTexture = new THREE.CanvasTexture(headerCanvas)
    const headerGeo = new THREE.PlaneGeometry(7.5, 1.5)
    const headerMat = new THREE.MeshBasicMaterial({ map: headerTexture })
    const header = new THREE.Mesh(headerGeo, headerMat)
    header.position.set(0, 2, 0.16)
    group.add(header)
    
    const infoCanvas = document.createElement('canvas')
    infoCanvas.width = 1024
    infoCanvas.height = 768
    const infoCtx = infoCanvas.getContext('2d')
    infoCtx.fillStyle = '#0a0a15'
    infoCtx.fillRect(0, 0, 1024, 768)
    
    infoCtx.fillStyle = '#ffffff'
    infoCtx.font = 'bold 40px "Rajdhani"'
    infoCtx.fillText('🏆 Prize: ₹2,000 + Goodies', 50, 80)
    infoCtx.fillText('👥 Team: 2-4 Members', 50, 160)
    infoCtx.fillText('💰 Fee: ₹99 / ₹149', 50, 240)
    
    infoCtx.font = '32px "Rajdhani"'
    infoCtx.fillStyle = '#cccccc'
    infoCtx.fillText('Race against time! Solve', 50, 340)
    infoCtx.fillText('puzzles, crack codes, find', 50, 390)
    infoCtx.fillText('your way out!', 50, 440)
    
    infoCtx.fillStyle = '#66ddff'
    infoCtx.font = 'bold 36px "Rajdhani"'
    infoCtx.fillText('✓ Certificates', 50, 540)
    infoCtx.fillText('✓ Goodies', 50, 600)
    
    const infoTexture = new THREE.CanvasTexture(infoCanvas)
    const infoGeo = new THREE.PlaneGeometry(7.5, 4)
    const infoMat = new THREE.MeshBasicMaterial({ map: infoTexture })
    const info = new THREE.Mesh(infoGeo, infoMat)
    info.position.set(0, -0.5, 0.16)
    group.add(info)
    
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 7, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x00d9ff, metalness: 0.9, roughness: 0.1, emissive: 0x00d9ff, emissiveIntensity: 0.3 })
    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-4.2, -3.5, 0)
    leftPole.castShadow = true
    group.add(leftPole)
    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(4.2, -3.5, 0)
    rightPole.castShadow = true
    group.add(rightPole)
    
    const accentLight1 = new THREE.PointLight(0x00d9ff, 1, 10)
    accentLight1.position.set(-4, 2, 1)
    group.add(accentLight1)
    const accentLight2 = new THREE.PointLight(0x00d9ff, 1, 10)
    accentLight2.position.set(4, 2, 1)
    group.add(accentLight2)
    
    group.position.set(position.x, 3.5, position.z)
    group.userData.eventId = 'escape'
    scene.add(group)
    
    return () => { scene.remove(group) }
  }, [scene, position])
  return null
}