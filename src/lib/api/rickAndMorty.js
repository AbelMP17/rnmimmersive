import { API_BASE } from '@/lib/constants'
import { buildQuery } from '@/lib/utils'
import { httpGet } from './http'

// Characters
export const getCharacters = async (params = {}) => {
  const q = buildQuery(params)
  return httpGet(`${API_BASE}/character${q ? `?${q}` : ''}`)
}
export const getCharacterById = async (id) => httpGet(`${API_BASE}/character/${id}`)

// Episodes
export const getEpisodes = async (params = {}) => {
  const q = buildQuery(params)
  return httpGet(`${API_BASE}/episode${q ? `?${q}` : ''}`)
}
export const getEpisodeById = async (id) => httpGet(`${API_BASE}/episode/${id}`)

// Locations
export const getLocations = async (params = {}) => {
  const q = buildQuery(params)
  return httpGet(`${API_BASE}/location${q ? `?${q}` : ''}`)
}
export const getLocationById = async (id) => httpGet(`${API_BASE}/location/${id}`)
