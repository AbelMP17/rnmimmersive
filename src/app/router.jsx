import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Characters = lazy(() => import('@/pages/characters/Characters'))
const CharacterDetail = lazy(() => import('@/pages/characters/CharacterDetail'))
const Episodes = lazy(() => import('@/pages/episodes/Episodes'))
const EpisodeDetail = lazy(() => import('@/pages/episodes/EpisodeDetail'))
const Locations = lazy(() => import('@/pages/locations/Locations'))
const LocationDetail = lazy(() => import('@/pages/locations/LocationDetail'))
const DimensionMap = lazy(() => import('@/pages/map/DimensionMap'))

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterDetail />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/episodes/:id" element={<EpisodeDetail />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:id" element={<LocationDetail />} />
      <Route path="/map" element={<DimensionMap />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
