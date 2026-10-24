// Design tokens shared by every Shazlo app.
// Brand colours come from the legacy theme (app/src/theme.js). Neutrals, spacing,
// radii and the type scale match the Penpot wireframe kit, so screens built from
// the wireframes line up with code.

export const brand = {
  black: '#000000',
  gold: '#FFD700',
  white: '#FFFFFF',
} as const

export const neutral = {
  ink: '#111111',
  inkSecondary: '#5C5C5C',
  inkTertiary: '#8C8C8C',
  line: '#E4E4E2',
  lineStrong: '#C9C9C6',
  surface: '#FFFFFF',
  canvas: '#F5F5F3',
  muted: '#EEEEEC',
  placeholder: '#E6E6E3',
} as const

// Each status colour passes WCAG AA (4.5:1) as text on white; see tokens.test.ts.
export const status = {
  success: '#1E7A46',
  warning: '#9A5B00',
  error: '#B3261E',
  info: '#1F5FBF',
} as const

export const fontFamily = {
  display: '"Voyage", "Instrument Serif", Georgia, "Times New Roman", serif',
  body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
} as const

export interface TypeStyle {
  family: keyof typeof fontFamily
  size: number
  lineHeight: number
  weight: 400 | 500 | 600 | 700
  letterSpacing: number
}

// Sizes, line heights and letter spacing in px.
export const typeScale = {
  displayXl: { family: 'display', size: 64, lineHeight: 68, weight: 400, letterSpacing: -1 },
  displayL: { family: 'display', size: 40, lineHeight: 44, weight: 400, letterSpacing: -0.5 },
  h1: { family: 'body', size: 24, lineHeight: 32, weight: 600, letterSpacing: -0.4 },
  h2: { family: 'body', size: 18, lineHeight: 26, weight: 600, letterSpacing: -0.2 },
  h3: { family: 'body', size: 15, lineHeight: 22, weight: 600, letterSpacing: -0.1 },
  body: { family: 'body', size: 14, lineHeight: 20, weight: 400, letterSpacing: 0 },
  bodyStrong: { family: 'body', size: 14, lineHeight: 20, weight: 500, letterSpacing: 0 },
  small: { family: 'body', size: 13, lineHeight: 18, weight: 400, letterSpacing: 0 },
  smallStrong: { family: 'body', size: 13, lineHeight: 18, weight: 500, letterSpacing: 0 },
  caption: { family: 'body', size: 12, lineHeight: 16, weight: 500, letterSpacing: 0 },
  overline: { family: 'body', size: 11, lineHeight: 16, weight: 600, letterSpacing: 0.6 },
  stat: { family: 'body', size: 28, lineHeight: 34, weight: 600, letterSpacing: -0.6 },
  mono: { family: 'mono', size: 12, lineHeight: 16, weight: 400, letterSpacing: 0 },
} as const satisfies Record<string, TypeStyle>

// 4 px grid. MUI's theme.spacing(n) keeps its 8 px unit; use these for exact values.
export const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const

export const radius = {
  control: 6,
  card: 8,
  sheet: 12,
  pill: 999,
} as const

export const shadow = {
  overlay: '0 4px 12px rgba(17, 17, 17, 0.18)',
} as const

export const tokens = { brand, neutral, status, fontFamily, typeScale, space, radius, shadow } as const
