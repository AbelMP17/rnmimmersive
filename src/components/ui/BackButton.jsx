import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react' // usa lucide-react (liviana, moderna)

export default function BackButton({ fallback = '/' }) {
  const navigate = useNavigate()

  function handleClick() {
    if (window.history.length > 1) {
      navigate(-1) // vuelve atrás en el historial
    } else {
      navigate(fallback) // si no hay historial, vuelve al home
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg border border-zinc-700 hover:border-portal-400 hover:text-portal-400 transition  hover:shadow-glow"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Volver</span>
    </button>
  )
}
