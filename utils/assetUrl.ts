/**
 * Resolves a public asset path against the app baseURL.
 */
export function withBase(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const base = useRuntimeConfig().app.baseURL || '/'
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`
}
