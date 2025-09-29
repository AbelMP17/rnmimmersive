import { Link } from 'react-router-dom'

export default function CharacterCard({ c }) {
  return (
    <Link to={`/characters/${c.id}`} className="card overflow-hidden group">
      <div className="aspect-[16/11] overflow-hidden">
        <img src={c.image} alt={`Imagen de ${c.name}`} loading="lazy"
             className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{c.name}</h3>
        <p className="text-sm text-zinc-400 mt-1">
          {c.status} • {c.species} • {c.gender}
        </p>
        <p className="text-xs text-zinc-500 mt-1 line-clamp-1">Ubicación: {c.location?.name}</p>
      </div>
    </Link>
  )
}
