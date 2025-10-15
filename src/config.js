// Central API base configuration
// Priority: VITE_API_BASE > auto-detect by port (5173 => dev backend 8082)
const detectedBase = typeof window !== 'undefined' && window.location && window.location.port === '5173'
  ? 'http://localhost:8082'
  : 'http://localhost:8080';

export const API_BASE = import.meta?.env?.VITE_API_BASE || detectedBase;

export function apiUrl(path) {
  if (!path.startsWith('/')) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
}


