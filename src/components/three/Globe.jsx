import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Planet({ textureUrl = '/textures/earth.jpg' }) {
  const texture = useLoader(TextureLoader, textureUrl)
  const ref = useRef()

  // Rotación continua
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025
  })

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[1.2, 16, 16]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function Globe({ children, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current

    function handleLost(e) {
      e.preventDefault()
      console.warn('⚠️ Contexto WebGL perdido, intentando recuperar...')
    }

    function handleRestored() {
      console.info('✅ Contexto WebGL restaurado')
    }

    canvas.addEventListener('webglcontextlost', handleLost)
    canvas.addEventListener('webglcontextrestored', handleRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleLost)
      canvas.removeEventListener('webglcontextrestored', handleRestored)
    }
  }, [])

  return (
    <div className={`w-full h-[70vh] rounded-2xl overflow-hidden border border-zinc-800 ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 3.6], fov: 50 }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <Stars radius={50} depth={30} count={1200} factor={4} fade />
        <Planet />
        {children}
        <OrbitControls enablePan={false} minDistance={2.6} maxDistance={6} />
      </Canvas>
    </div>
  )
}
