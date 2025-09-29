import React, { useEffect, useMemo, useState } from "react";
import SEO from "@/components/seo/SEO";
import { getCharacters } from "@/lib/api/rickAndMorty";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import CharacterCard from "./CharacterCard";
import BackButton from "../../components/ui/BackButton";

export default function Characters() {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
  });
  const debounced = useDebounce(filters, 400);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => ({ ...debounced, page }), [debounced, page]);

  useEffect(() => {
    // reset listado al cambiar filtros
    setItems([]);
    setPage(1);
    setInfo(null);
  }, [debounced.name, debounced.status, debounced.species, debounced.gender]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await getCharacters(params);
        if (!cancelled) {
          setInfo(data.info);
          setItems((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params.page, params.name, params.status, params.species, params.gender]);

  const { sentinelRef } = useInfiniteScroll(
    () => {
      if (!loading && info?.next) setPage((p) => p + 1);
    },
    { disabled: !info?.next }
  );

  return (
    <>
      <SEO
        title="Personajes — Rick & Morty Immersive"
        description="Filtra y navega por todos los personajes de Rick & Morty con scroll infinito."
        path="/characters"
      />

      <section className="section container-responsive">
        <BackButton fallback="/" />
        <h1 className="text-3xl font-bold mb-6">Personajes</h1>

        <div className="card p-4 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 outline-none"
            placeholder="Buscar por nombre..."
            value={filters.name}
            onChange={(e) =>
              setFilters((f) => ({ ...f, name: e.target.value }))
            }
          />
          <select
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option value="">Estado</option>
            <option>alive</option>
            <option>dead</option>
            <option>unknown</option>
          </select>
          <input
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
            placeholder="Especie (p. ej. Human)"
            value={filters.species}
            onChange={(e) =>
              setFilters((f) => ({ ...f, species: e.target.value }))
            }
          />
          <select
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
            value={filters.gender}
            onChange={(e) =>
              setFilters((f) => ({ ...f, gender: e.target.value }))
            }
          >
            <option value="">Género</option>
            <option>female</option>
            <option>male</option>
            <option>genderless</option>
            <option>unknown</option>
          </select>
        </div>

        {error && <p className="text-red-400">Error: {error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items?.map((c) => (
            <CharacterCard key={c.id} c={c} />
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />
        {loading && (
          <p className="mt-6 text-center text-zinc-400">Cargando...</p>
        )}
        {!loading && !info?.next && items.length > 0 && (
          <p className="mt-6 text-center text-zinc-500">
            Has llegado al final 🎉
          </p>
        )}
      </section>
    </>
  );
}
