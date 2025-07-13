export function getBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean); // убираем пустые
  const startIndex = parts.findIndex((p) => p === 'tt' || p === 'fb');
  if (startIndex === -1) return [];

  return parts.slice(startIndex); // включительно с tt/fb
}
