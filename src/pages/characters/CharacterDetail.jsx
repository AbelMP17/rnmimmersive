import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { getCharacterById } from "@/lib/api/rickAndMorty";
import BackButton from '@/components/ui/BackButton'

export default function CharacterDetail() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    getCharacterById(id)
      .then((d) => !cancel && setC(d))
      .catch((e) => setError(e.message));
    return () => {
      cancel = true;
    };
  }, [id]);

  if (error)
    return (
      <section className="section container-responsive">Error: {error}</section>
    );
  if (!c)
    return (
      <section className="section container-responsive">Cargando...</section>
    );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.name,
    gender: c.gender,
    image: c.image,
    description: `${c.name} es un personaje ${c.species} (${c.status}).`,
    url: `https://tudominio.dev/characters/${c.id}`,
    sameAs: [],
  };

  return (
    <>
      <SEO
        title={`${c.name} — Personaje`}
        description={`${c.name} • ${c.status} • ${c.species} • ${c.gender}`}
        path={`/characters/${c.id}`}
        image={c.image}
        schema={schema}
      />
      <section className="section container-responsive">
              <BackButton fallback="/characters" />
      <section className="section container-responsive grid md:grid-cols-2 gap-8">
        
        <div className="card overflow-hidden h-fit">
          <img
            src={c.image}
            alt={`Imagen de ${c.name}`}
            className="w-full h-auto"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{c.name}</h1>
          <p className="mt-2 text-zinc-300">
            {c.status} • {c.species} • {c.gender}
          </p>
          <div className="mt-4 text-sm text-zinc-400 space-y-1">
            <p>
              <span className="text-zinc-500">Origen:</span> {c.origin?.name}
            </p>
            <p>
              <span className="text-zinc-500">Ubicación actual:</span>{" "}
              {c.location?.name}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Aparece en episodios:</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm">
              {c.episode.map((ep) => {
                const id = ep.split("/").pop();
                return (
                  <Link
                    key={ep}
                    to={`/episodes/${id}`}
                    className="px-3 py-1 rounded-lg border border-zinc-800 hover:border-portal-400 text-center"
                  >{`Ep ${id}`}</Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </section>
    </>
  );
}
