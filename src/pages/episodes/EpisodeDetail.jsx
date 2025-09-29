import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { getEpisodeById, getCharacterById } from "@/lib/api/rickAndMorty";
import BackButton from "../../components/ui/BackButton";

export default function EpisodeDetail() {
  const { id } = useParams();
  const [ep, setEp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    getEpisodeById(id)
      .then((d) => !cancel && setEp(d))
      .catch((e) => setError(e.message));
    return () => {
      cancel = true;
    };
  }, [id]);

  if (error)
    return (
      <section className="section container-responsive">Error: {error}</section>
    );
  if (!ep)
    return (
      <section className="section container-responsive">Cargando...</section>
    );

  const schema = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    name: ep.name,
    episodeNumber: ep.episode,
    datePublished: ep.air_date,
    url: `https://rnm3d.vercel.app/episodes/${ep.id}`,
  };

  return (
    <>
      <SEO
        title={`${ep.name} — Episodio`}
        description={`Episodio ${ep.episode} emitido el ${ep.air_date}.`}
        path={`/episodes/${ep.id}`}
        schema={schema}
      />

      <section className="section container-responsive">
        <BackButton fallback="/episodes" />
        <h1 className="text-3xl font-bold">{ep.name}</h1>
        <p className="mt-2 text-zinc-300">
          Código: {ep.episode} • Fecha: {ep.air_date}
        </p>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Personajes en este episodio:</h2>
          <div className="flex flex-wrap gap-2">
            {ep.characters.map(async (ch) => {
              const charId = ch.split("/").pop();
              const character = await getCharacterById(charId);
              return (
                <Link
                  key={ch}
                  to={`/characters/${charId}`}
                  className="px-3 py-2 rounded-lg border border-zinc-800 hover:border-portal-400 text-sm hover:shadow-glow transition"
                >
                  {character.name} -{" "}
                  <span className="bg-gray-700 p-1 px-3 rounded-xl font-bold">
                    {character.species}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
