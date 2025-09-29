// Hash simple y determinista desde string -> [0,1)
export function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  // convertir a positivo y normalizar
  return (h >>> 0) / 4294967295;
}

// Mapea una cadena a lat [-60,60] y lon [-180,180] (evitamos polos extremos para legibilidad)
export function stringToLatLon(key) {
  const h1 = hash01(key);
  const h2 = hash01(key + '::lon');
  const lat = (h1 * 120) - 60;       // -60..60
  const lon = (h2 * 360) - 180;      // -180..180
  return { lat, lon };
}

// Convierte lat/lon en radianes a XYZ sobre un radio dado
export function latLonToXYZ(latDeg, lonDeg, radius = 1.22) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);
  return [x, y, z];
}

// Color por dimensión (determinista)
export function dimensionToHex(dimension) {
  if (!dimension || dimension === 'unknown') return '#9ca3af'; // zinc-400
  const h = hash01(dimension) * 360; // tono
  const s = 70; // saturación
  const l = 55; // luminosidad
  return `hsl(${h.toFixed(0)} ${s}% ${l}%)`;
}
