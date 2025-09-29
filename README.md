# 🌌 Rick & Morty Immersive

![Rick & Morty Banner](./public/assets/logo.webp)

Una **web inmersiva** construida con **React, Vite, TailwindCSS, Three.js y GSAP** que consume la [Rick and Morty API](https://rickandmortyapi.com/).  
Explora personajes, episodios, ubicaciones y un mapa 3D interactivo de universos, con diseño responsive y optimizado para SEO.

---

## ✨ Características

- 🔍 **Exploración completa** de la API: personajes, episodios, ubicaciones.  
- 🌍 **Mapa 3D interactivo** con planetas texturizados (Three.js + react-three-fiber).  
- 🎭 **Animaciones fluidas** con GSAP y transiciones suaves.  
- 📱 **Diseño responsive** con Navbar burger y UX optimizado para móvil (toque para mostrar/navegar en el mapa 3D).  
- 🎨 **UI moderna** con TailwindCSS y colores personalizados estilo Rick & Morty.  
- 📈 **SEO optimizado** con Helmet (meta tags dinámicos por página).  
- ⚡ **Performance** gracias a Vite y lazy loading de rutas.

---

## 🛠️ Tecnologías usadas

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)  
- [GSAP](https://gsap.com/) para animaciones  
- [React Router](https://reactrouter.com/)  
- [@dr.pogodin/react-helmet](https://www.npmjs.com/package/@dr.pogodin/react-helmet) (alternativa moderna para SEO con React 19)  
- [Rick and Morty API](https://rickandmortyapi.com/)

---

## 📂 Estructura de carpetas

```
rnm-immersive/
├── public/               # Assets estáticos (logo, texturas, portales)
├── src/
│   ├── app/              # App principal y router
│   ├── components/       # Componentes UI (Navbar, Footer, SEO, etc.)
│   ├── pages/            # Páginas (Home, Characters, Episodes, Locations, Map)
│   ├── lib/              # Utilidades (hooks, helpers de geometría)
│   ├── styles/           # Tailwind globals.css
│   └── main.jsx          # Punto de entrada
├── tailwind.config.js    # Configuración Tailwind (colores portal, etc.)
├── postcss.config.js     # Configuración PostCSS
├── vite.config.js        # Configuración Vite (alias @ → src)
└── package.json
```

---

## 🚀 Instalación y ejecución local

1. Clonar el repo:

```bash
git clone https://github.com/AbelMP17/rnm-immersive.git
cd rnm-immersive
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build para producción

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy

El proyecto está preparado para **Vercel**:

- Node.js `20.x` (mínimo `20.19+`).  
- Configuración por defecto (`npm install`, `npm run build`).  
- Carpeta de salida: `dist/`.

---

## 🤝 Contribuciones

¡Las PRs son bienvenidas! 🚀  
Para contribuir:  
1. Haz un fork del repo  
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)  
3. Commit de cambios (`git commit -m 'Agrego nueva funcionalidad'`)  
4. Push (`git push origin feature/nueva-funcionalidad`)  
5. Abre un Pull Request  

---

## 📜 Licencia

Este proyecto es solo con fines educativos y no tiene relación oficial con **Rick and Morty** ni sus creadores.  

---

## 👨‍💻 Autor

Hecho con 💚 por **[DevAbel](https://github.com/AbelMP17)**
