import React, { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { dimensionToHex } from '@/lib/geo'

export default function Marker({ position = [0,0,0], location, onClick }) {
  const [hovered, setHovered] = useState(false)
  const color = useMemo(() => dimensionToHex(location.dimension), [location.dimension])

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick?.(location) }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={color} emissive={hovered ? color : 'black'} emissiveIntensity={hovered ? 0.6 : 0} />
      </mesh>

      {/* Etiqueta flotante al pasar el mouse */}
      {hovered && (
        <Html center distanceFactor={8} occlude>
          <div className="px-2 py-1 rounded-md text-xs bg-zinc-900/90 border border-zinc-800">
            <p className="font-semibold">{location.name}</p>
            <p className="text-zinc-400">{location.type} · {location.dimension}</p>
            <p className="text-zinc-500">Residentes: {location.residents?.length || 0}</p>
          </div>
        </Html>
      )}
    </group>
  )
}
