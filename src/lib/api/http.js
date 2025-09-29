// Wrapper fetch con caché en memoria + abortables
const memCache = new Map();

export async function httpGet(url, { signal, ttl = 30_000 } = {}) {
  const cached = memCache.get(url);
  const now = Date.now();
  if (cached && (now - cached.time) < ttl) return cached.data;

  const controller = new AbortController();
  const signals = [controller.signal, signal].filter(Boolean);
  const combinedSignal = signals.length === 1 ? signals[0] : undefined;

  const res = await fetch(url, { signal: combinedSignal, headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} - ${url}`);
  const data = await res.json();
  memCache.set(url, { time: now, data });
  return data;
}
