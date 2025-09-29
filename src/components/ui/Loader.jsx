export default function Loader({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-portal-400 border-t-transparent mb-4"></div>
      <p className="text-zinc-400">{text}</p>
    </div>
  )
}
