import { Helmet } from "@dr.pogodin/react-helmet"

export default function SEO({
  title = 'Rick & Morty Immersive',
  description = 'Explora personajes, episodios y ubicaciones de Rick & Morty en 3D con filtros y animaciones.',
  path = '/',
  image = '/icons/icon-512.png',
  schema = null,
  noIndex = false
}) {
  const url = `https://ricknmorty.vercel.app${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rick & Morty Immersive" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  )
}
