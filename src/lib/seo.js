// src/lib/seo.js

const SITE_NAME = 'Rick & Morty Immersive'
const SITE_URL = 'https://tudominio.dev'
const DEFAULT_DESC = 'Explora personajes, episodios y ubicaciones de Rick & Morty en 3D con animaciones y filtros avanzados.'

/**
 * Devuelve un título completo para <title>
 */
export function buildTitle(title) {
  if (!title) return SITE_NAME
  return `${title} — ${SITE_NAME}`
}

/**
 * Devuelve la URL canónica completa
 */
export function canonical(path = '/') {
  if (!path.startsWith('/')) path = '/' + path
  return `${SITE_URL}${path}`
}

/**
 * Schema básico de WebSite para la home
 */
export function schemaWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/characters?name={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
}

/**
 * Schema de Personaje
 */
export function schemaCharacter(c) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": c.name,
    "gender": c.gender,
    "image": c.image,
    "description": `${c.name} es un personaje ${c.species} (${c.status}).`,
    "url": `${SITE_URL}/characters/${c.id}`
  }
}

/**
 * Schema de Episodio
 */
export function schemaEpisode(ep) {
  return {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": ep.name,
    "episodeNumber": ep.episode,
    "datePublished": ep.air_date,
    "url": `${SITE_URL}/episodes/${ep.id}`
  }
}

/**
 * Schema de Ubicación
 */
export function schemaLocation(loc) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": loc.name,
    "description": `Tipo: ${loc.type}, Dimensión: ${loc.dimension}`,
    "url": `${SITE_URL}/locations/${loc.id}`
  }
}

export { SITE_NAME, SITE_URL, DEFAULT_DESC }
