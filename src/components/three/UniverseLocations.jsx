import React, { useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { hash01 } from "@/lib/geo";
import { useNavigate } from "react-router-dom";

// Lista de texturas de planetas (guárdalas en /public/textures/)
const planetTextures = [
  "/textures/2k_earth_clouds.jpg",
  "/textures/2k_earth_daymap.jpg",
  "/textures/2k_earth_nightmap.jpg",
  "/textures/2k_jupiter.jpg",
  "/textures/2k_makemake_fictional.jpg",
  "/textures/2k_mars.jpg",
  "/textures/2k_mercury.jpg",
  "/textures/2k_neptune.jpg",
];

// Punto individual que representa una ubicación
function LocationPoint({ loc }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [touchedOnce, setTouchedOnce] = useState(false);

  // Detectar si es touch (móvil/tablet)
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  const size = Math.max(0.2, Math.min(0.6, (loc.residents?.length || 1) / 30));

  const phi = Math.acos(2 * hash01(loc.name) - 1);
  const theta = 2 * Math.PI * hash01(loc.dimension + loc.name);
  const radius = 8 + hash01(loc.name + "r") * 5;
  const pos = [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];

  const texIndex = Math.floor(hash01(loc.name) * planetTextures.length);
  const texture = useLoader(TextureLoader, planetTextures[texIndex]);

  const handleClick = (e) => {
    e.stopPropagation();

    if (isTouchDevice) {
      if (touchedOnce) {
        navigate(`/locations/${loc.id}`);
      } else {
        setTouchedOnce(true);
        setHovered(true);
        setTimeout(() => setTouchedOnce(false), 2000);
      }
    } else {
      // en PC → click directo
      navigate(`/locations/${loc.id}`);
    }
  };

  return (
    <mesh
      position={pos}
      onClick={handleClick}
      onPointerOver={() => !isTouchDevice && setHovered(true)}
      onPointerOut={() => !isTouchDevice && setHovered(false)}
      scale={hovered ? 1.3 : 1}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissive={hovered ? "#22c55e" : "black"}
        emissiveIntensity={hovered ? 0.4 : 0.15}
      />

      {(hovered || touchedOnce) && (
        <Html distanceFactor={15} style={{ pointerEvents: "none" }}>
          <div className="px-2 py-1 bg-black/80 text-xs rounded border border-zinc-700 whitespace-nowrap">
            {loc.name}
          </div>
        </Html>
      )}
    </mesh>
  );
}



// Grupo que rota si autoRotate = true
function RotatingGroup({ locations, textures, autoRotate }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {locations.map((loc) => (
        <LocationPoint key={loc.id} loc={loc} textures={textures} />
      ))}
    </group>
  );
}

export default function UniverseLocations({ locations, autoRotate = false }) {
  // 👇 cargar todas las texturas solo UNA vez
  const textures = useLoader(TextureLoader, planetTextures);

  return (
    <div className="w-full h-[80vh] rounded-2xl border border-zinc-800">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Stars radius={70} depth={25} count={2000} factor={4} fade />

        <RotatingGroup
          locations={locations}
          textures={textures}
          autoRotate={autoRotate}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={!autoRotate}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
