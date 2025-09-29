import React, { useEffect, useState } from 'react'
import SEO from '@/components/seo/SEO'
import { getLocations } from '@/lib/api/rickAndMorty'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useDebounce from '@/hooks/useDebounce'
import { Link } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'

export default function Locations() {
  const [name, setName] = useState('')
  const deb = useDebounce(name, 400)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { setItems([]); setPage(1); setInfo(null) }, [deb])
  useEffect(() => {
    let cancel = false
    setLoading(true)
    getLocations({ page, name: deb })
      .then(d => { if (!cancel) { setInfo(d.info); setItems(p => page === 1 ? d.results : [...p, ...d.results]) }})
      .finally(() => !cancel && setLoading(false))
    return () => { cancel = true }
  }, [page, deb])

  const { sentinelRef } = useInfiniteScroll(() => { if (!loading && info?.next) setPage(p=>p+1) }, { disabled: !info?.next })

  return (
    <>
      <SEO title="Ubicaciones — Rick & Morty Immersive" path="/locations"
           description="Explora todas las ubicaciones y dimensiones del universo de Rick & Morty." />

      <section className="section container-responsive">
        <BackButton fallback="/" />
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold">Ubicaciones</h1>
          <input className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
                 placeholder="Buscar por nombre..." value={name} onChange={e=>setName(e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items?.map(loc => (
            <Link to={`/locations/${loc.id}`} key={loc.id} className="card p-4 hover:border-portal-400">
              <h3 className="font-semibold">{loc.name}</h3>
              <p className="text-sm text-zinc-400">{loc.type} — {loc.dimension}</p>
            </Link>
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />
        {loading && <p className="mt-6 text-center text-zinc-400">Cargando...</p>}
      </section>
    </>
  )
}
