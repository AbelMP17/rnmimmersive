import React, { useEffect, useState } from 'react'
import SEO from '@/components/seo/SEO'
import { getEpisodes } from '@/lib/api/rickAndMorty'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useDebounce from '@/hooks/useDebounce'
import { Link } from 'react-router-dom'
import BackButton from '@/components/ui/BackButton'

export default function Episodes() {
  const [name, setName] = useState('')
  const deb = useDebounce(name, 400)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { setItems([]); setPage(1); setInfo(null) }, [deb])
  useEffect(() => {
    let cancel=false
    setLoading(true)
    getEpisodes({ page, name: deb })
      .then(d => { if (!cancel){ setInfo(d.info); setItems(p => page===1? d.results : [...p, ...d.results]) }})
      .finally(() => !cancel && setLoading(false))
    return () => { cancel=true }
  }, [page, deb])

  const { sentinelRef } = useInfiniteScroll(() => { if (!loading && info?.next) setPage(p=>p+1) }, { disabled: !info?.next })

  return (
    <>
      <SEO
        title="Episodios — Rick & Morty Immersive"
        path="/episodes"
        description="Todos los episodios de Rick & Morty con búsqueda y scroll infinito."
      />

      <section className="section container-responsive">
        <BackButton fallback="/" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold">Episodios</h1>
          <input
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={e=>setName(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items?.map(ep => (
            <Link
              to={`/episodes/${ep.id}`}
              key={ep.id}
              className="card p-4 hover:border-portal-400 transition"
            >
              <h3 className="font-semibold">{ep.name}</h3>
              <p className="text-sm text-zinc-400">
                Código: {ep.episode} • Fecha: {ep.air_date}
              </p>
            </Link>
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />
        {loading && <p className="mt-6 text-center text-zinc-400">Cargando...</p>}
      </section>
    </>
  )
}
