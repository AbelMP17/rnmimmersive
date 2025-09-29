import SEO from "@/components/seo/SEO";
import { Link } from "react-router-dom";
import UniverseLocations from "@/components/three/UniverseLocations";
import { useEffect, useState } from "react";
import { getLocations } from "@/lib/api/rickAndMorty";

export default function Home() {
  const [sample, setSample] = useState([]);

  useEffect(() => {
    let cancel = false;
    async function load() {
      let page = 1;
      let all = [];
      while (page <= 2) {
        // solo 2 páginas (≈40 ubicaciones)
        const data = await getLocations({ page });
        all = all.concat(data.results);
        if (!data.info?.next) break;
        page++;
      }
      if (!cancel) {
        // elegir 20 ubicaciones aleatorias
        const shuffled = all.sort(() => 0.5 - Math.random());
        setSample(shuffled.slice(0, 20));
      }
    }
    load();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <SEO
        title="Inicio — Rick & Morty Immersive"
        description="Explora personajes, episodios, ubicaciones y un mapa 3D del multiverso de Rick & Morty."
        path="/"
      />

      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center">
        {/* Preview del universo */}
        {sample.length > 0 ? (
          <div className="absolute inset-0 -z-10">
            <UniverseLocations locations={sample} autoRotate={true} />
          </div>
        ) : (
          <p className="text-zinc-400">Cargando universo...</p>
        )}

        {/* Overlay de contenido */}
        <div className="z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-portal-400 mb-6 drop-shadow-lg">
            Rick & Morty Immersive
          </h1>
          <p className="text-lg text-zinc-200 mb-8">
            Una experiencia web inmersiva para explorar todo el multiverso de
            Rick & Morty.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/characters"
              className="px-5 py-3 rounded-xl hover:border-portal-400 bg-zinc-800 border border-zinc-700 hover:bg-opacity-70 hover:shadow-glow transition-all"
            >
              Personajes
            </Link>
            <Link
              to="/episodes"
              className="px-5 py-3 rounded-xl hover:border-portal-400 bg-zinc-800 border border-zinc-700 hover:bg-opacity-70 hover:shadow-glow transition-all"
            >
              Episodios
            </Link>
            <Link
              to="/locations"
              className="px-5 py-3 rounded-xl hover:border-portal-400 bg-zinc-800 border border-zinc-700 hover:bg-opacity-70 hover:shadow-glow transition-all"
            >
              Ubicaciones
            </Link>
            <Link
              to="/map"
              className="px-5 py-3 rounded-xl hover:border-portal-400 bg-zinc-800 border border-zinc-700 hover:bg-opacity-70 hover:shadow-glow transition-all"
            >
              Mapa 3D
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
