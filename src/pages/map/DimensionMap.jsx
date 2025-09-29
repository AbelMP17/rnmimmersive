import React, { useEffect, useState } from 'react'
import SEO from '@/components/seo/SEO'
import { getLocations } from '@/lib/api/rickAndMorty'
import UniverseLocations from '@/components/three/UniverseLocations'
import BackButton from '@/components/ui/BackButton'

export default function DimensionMap() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancel = false
    async function load() {
      let page = 1
      let all = []
      while (true) {
        const data = await getLocations({ page })
        all = all.concat(data.results)
        if (!data.info?.next) break
        page++
        if (cancel) break
      }
      if (!cancel) {
        setLocations(all)
        setLoading(false)
      }
    }
    load()
    return () => { cancel = true }
  }, [])

  return (
    <>
      <SEO
        title="Mapa Multiversal 3D — Rick & Morty"
        description="Explora todas las ubicaciones en un espacio 3D interactivo, agrupadas por dimensión."
        path="/map"
      />

      <section className="section container-responsive">
        <BackButton fallback="/" />

        <h1 className="text-3xl font-bold mb-4">Mapa Multiversal 3D</h1>

        {loading ? (
          <p className="py-20 text-center text-zinc-400">Cargando ubicaciones...</p>
        ) : (
          <UniverseLocations locations={locations} />
        )}

        <p className="mt-3 text-xs text-zinc-500">
          Cada punto es una ubicación. El <span className="text-portal-400">color</span> indica su dimensión,
          y el <span className="text-portal-400">tamaño</span> depende de la cantidad de residentes.
          Haz clic en un punto para ver el detalle de la ubicación.
        </p>
      </section>
    </>
  )
}
