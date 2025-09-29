// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

/**
 * Hook para sincronizar un estado con localStorage
 * @param {string} key clave en localStorage
 * @param {any} initial valor inicial (si no hay en localStorage)
 */
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch (e) {
      console.warn(`useLocalStorage error leyendo clave ${key}`, e)
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn(`useLocalStorage error guardando clave ${key}`, e)
    }
  }, [key, value])

  return [value, setValue]
}
