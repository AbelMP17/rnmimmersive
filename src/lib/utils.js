export const buildQuery = (obj = {}) =>
  Object.entries(obj)
    .filter(([,v]) => v !== undefined && v !== '' && v !== null)
    .map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
