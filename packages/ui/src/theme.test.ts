import { describe, expect, it } from 'vitest'
import { createShazloTheme, theme } from './index'

const baselineStyles = (t: typeof theme) => t.components?.MuiCssBaseline?.styleOverrides

describe('theme', () => {
  it('uses the brand black and gold', () => {
    expect(theme.palette.primary.main).toBe('#000000')
    expect(theme.palette.primary.contrastText).toBe('#FFFFFF')
    expect(theme.palette.secondary.main).toBe('#FFD700')
    expect(theme.palette.secondary.contrastText).toBe('#000000')
  })

  it('uses Voyage for display text and Inter for everything else', () => {
    expect(theme.typography.display1.fontFamily).toMatch(/^"Voyage"/)
    expect(theme.typography.display2.fontFamily).toMatch(/^"Voyage"/)
    expect(theme.typography.fontFamily).toMatch(/^"Inter"/)
    expect(theme.typography.h1.fontFamily).toMatch(/^"Inter"/)
  })

  it('matches the wireframe type scale', () => {
    expect(theme.typography.h1.fontSize).toBe('1.5rem')
    expect(theme.typography.h1.fontWeight).toBe(600)
    expect(theme.typography.body1.fontSize).toBe('0.875rem')
    expect(theme.typography.button.textTransform).toBe('none')
  })

  it('uses the shared surfaces and radius', () => {
    expect(theme.palette.background.default).toBe('#F5F5F3')
    expect(theme.palette.background.paper).toBe('#FFFFFF')
    expect(theme.palette.divider).toBe('#E4E4E2')
    expect(theme.shape.borderRadius).toBe(6)
  })

  it('does not declare Voyage font files unless asked to', () => {
    expect(baselineStyles(theme)).toBeUndefined()
  })

  it('adds @font-face rules when a Voyage URL is given', () => {
    const t = createShazloTheme({ voyage: { baseUrl: 'https://cdn.shazlo.store/fonts/' } })
    const css = String(baselineStyles(t))
    expect(css).toContain("url('https://cdn.shazlo.store/fonts/voyage-regular.otf')")
    expect(css).toContain("url('https://cdn.shazlo.store/fonts/voyage-bold.otf')")
    expect(css).toContain('font-display: swap')
  })

  it('merges overrides over the defaults', () => {
    const t = createShazloTheme({ overrides: { palette: { primary: { main: '#222222' } } } })
    expect(t.palette.primary.main).toBe('#222222')
    expect(t.palette.secondary.main).toBe('#FFD700')
  })
})
