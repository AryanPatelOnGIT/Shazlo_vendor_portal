// Voyage (Violaine & Jérémy, vj-type.com) is a commercial typeface. Its licence for
// web use is not confirmed yet, so the font files are not shipped in this package.
// Apps host the files themselves and pass their URL here.

export const voyageFontFiles = {
  regular: 'voyage-regular.otf',
  bold: 'voyage-bold.otf',
} as const

export interface VoyageFontOptions {
  // URL of the folder holding the files in voyageFontFiles, e.g. '/fonts' or a CDN origin.
  baseUrl: string
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
}

export function voyageFontFaces({ baseUrl, display = 'swap' }: VoyageFontOptions): string {
  const base = baseUrl.replace(/\/+$/, '')
  const faces: [number, string][] = [
    [400, voyageFontFiles.regular],
    [700, voyageFontFiles.bold],
  ]
  return faces
    .map(
      ([weight, file]) => `@font-face {
  font-family: 'Voyage';
  src: url('${base}/${file}') format('opentype');
  font-weight: ${weight};
  font-style: normal;
  font-display: ${display};
}`,
    )
    .join('\n')
}
