// scripts/generate-sitemap.js
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'

const SITE_URL = 'https://ricknmorty.vercel.app'

// Fetch util (sin dependencias extra)
async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Error ${res.status} en ${url}`)
  return res.json()
}

async function fetchAll(endpoint) {
  let page = 1
  let results = []
  while (true) {
    const data = await fetchJson(`https://rickandmortyapi.com/api/${endpoint}?page=${page}`)
    results = results.concat(data.results || [])
    if (!data.info?.next) break
    page++
  }
  return results
}

async function generate() {
  const smStream = new SitemapStream({ hostname: SITE_URL })

  // Rutas estáticas
  const staticRoutes = ['/', '/characters', '/episodes', '/locations', '/map']
  staticRoutes.forEach((url) => {
    smStream.write({ url, changefreq: 'weekly', priority: url === '/' ? 1.0 : 0.8 })
  })

  // Personajes
  const characters = await fetchAll('character')
  characters.forEach((c) => {
    smStream.write({ url: `/characters/${c.id}`, changefreq: 'monthly', priority: 0.6 })
  })

  // Episodios
  const episodes = await fetchAll('episode')
  episodes.forEach((ep) => {
    smStream.write({ url: `/episodes/${ep.id}`, changefreq: 'monthly', priority: 0.5 })
  })

  // Ubicaciones
  const locations = await fetchAll('location')
  locations.forEach((loc) => {
    smStream.write({ url: `/locations/${loc.id}`, changefreq: 'monthly', priority: 0.5 })
  })

  smStream.end()
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString())

  const outPath = resolve(process.cwd(), 'public', 'sitemap.xml')
  writeFileSync(outPath, sitemap, 'utf8')
  console.log(`✅ Sitemap generado en ${outPath}`)
}

generate().catch((err) => {
  console.error('❌ Error generando sitemap:', err)
  process.exit(1)
})
