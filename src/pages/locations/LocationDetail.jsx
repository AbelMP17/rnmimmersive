import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { getLocationById } from "@/lib/api/rickAndMorty";
import BackButton from "../../components/ui/BackButton";
import { getCharacterById } from "../../lib/api/rickAndMorty";

export default function LocationDetail() {
  const { id } = useParams();
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    getLocationById(id)
      .then((d) => !cancel && setLoc(d))
      .catch((e) => setError(e.message));
    return () => {
      cancel = true;
    };
  }, [id]);

  if (error)
    return (
      <section className="section container-responsive">Error: {error}</section>
    );
  if (!loc)
    return (
      <section className="section container-responsive">Cargando...</section>
    );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: loc.name,
    description: `Tipo: ${loc.type}, Dimensión: ${loc.dimension}`,
    url: `https://rnm3d.vercel.app/locations/${loc.id}`,
  };

  return (
    <>
      <SEO
        title={`${loc.name} — Ubicación`}
        description={`Ubicación ${loc.type} en dimensión ${loc.dimension}`}
        path={`/locations/${loc.id}`}
        schema={schema}
      />

      <section className="section container-responsive">
        <BackButton fallback="/locations" />
        <h1 className="text-3xl font-bold">{loc.name}</h1>
        <p className="mt-2 text-zinc-300">
          {loc.type} — {loc.dimension}
        </p>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Residentes:</h2>
          <div className="flex flex-wrap gap-2">
            {loc.residents.length > 0 ? (
              loc.residents.map(async (ch) => {
                const charId = ch.split("/").pop();
                const character = await getCharacterById(charId);
                return (
                  <Link
                    key={ch}
                    to={`/characters/${charId}`}
                    className="px-3 py-2 rounded-lg border border-zinc-800 hover:border-portal-400 text-sm hover:shadow-glow transition"
                  >
                    {character.name} - <span className="bg-gray-700 p-1 px-3 rounded-xl font-bold">{character.species}</span>
                  </Link>
                );
              })
            ) : (
              <p className="text-zinc-400">No hay residentes.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
