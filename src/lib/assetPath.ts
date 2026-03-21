/**
 * Get the correct asset path with basePath prefix for GitHub Pages
 */
export function assetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production'
    ? '/beverly-hills-luxury-estate'
    : '';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
