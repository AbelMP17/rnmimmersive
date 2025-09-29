export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 py-8">
      <div className="container-responsive text-sm text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>Hecho con 💚 por DevAbel · Datos de <a className="underline" href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">The Rick and Morty API</a></p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
