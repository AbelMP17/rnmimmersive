import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Cierra al navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const items = [
    { to: "/", label: "Inicio" },
    { to: "/characters", label: "Personajes" },
    { to: "/episodes", label: "Episodios" },
    { to: "/locations", label: "Ubicaciones" },
    { to: "/map", label: "Mapa 3D" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="container-responsive h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex justify-center items-center text-portal-400 font-extrabold text-lg tracking-tight transition-all duration-300 hover:text-portal-300 hover:scale-105"
        >
          <img src="/assets/logo.png" className="max-w-12"></img> R&amp;M
          Immersive
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`relative inline-block px-1 py-1 transition-colors group ${
                pathname === it.to
                  ? "text-portal-400"
                  : "text-zinc-300 hover:text-portal-400"
              }`}
            >
              {it.label}
              <span
                className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] bg-portal-400 transform transition-all duration-500 origin-left ${
                  pathname === it.to
                    ? "scale-x-100" // activo → barra visible
                    : "scale-x-0 group-hover:scale-x-100" // hover → animación
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Botón portal (móvil) */}
        <button
          className="md:hidden relative w-12 h-12 [perspective:800px]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <div
            className={`absolute inset-0 transition-all duration-500 [transform-style:preserve-3d] ${
              open ? "rotate-180 scale-50 animate-none" : ""
            }`}
          >
            <img
              src="/assets/portal-open.png"
              alt="Portal abierto"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed left-0 right-0 top-20 bottom-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel menú móvil */}
      <div
        id="mobile-menu"
        className={`fixed left-0 right-0 top-20 z-50 px-4 transform transition-all duration-500 origin-top ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-4 rounded-2xl border border-portal-400/40 bg-zinc-900/95 backdrop-blur shadow-xl overflow-hidden">
          <nav className="py-2 flex flex-col justify-center items-center text-center gap-2">
            {items.map((it) => (
              <Link
              key={it.to}
              to={it.to}
              className={`relative inline-block px-1 py-1 transition-colors group ${
                pathname === it.to
                  ? "text-portal-400"
                  : "text-zinc-300 hover:text-portal-400"
              }`}
            >
              {it.label}
              <span
                className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] bg-portal-400 transform transition-all duration-500 origin-left ${
                  pathname === it.to
                    ? "scale-x-100" // activo → barra visible
                    : "scale-x-0 group-hover:scale-x-100" // hover → animación
                }`}
              />
            </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
