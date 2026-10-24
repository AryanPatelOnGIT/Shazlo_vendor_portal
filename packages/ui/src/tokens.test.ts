import { describe, expect, it } from 'vitest'
import { brand, contrastRatio, neutral, status, voyageFontFaces } from './index'

describe('contrastRatio', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5)
    expect(contrastRatio('#777777', '#777777')).toBe(1)
  })

  it('rejects colours it cannot read', () => {
    expect(() => contrastRatio('gold', '#FFFFFF')).toThrow()
  })
})

describe('tokens meet WCAG AA', () => {
  it('body text on every surface', () => {
    for (const bg of [neutral.surface, neutral.canvas, neutral.muted]) {
      expect(contrastRatio(neutral.ink, bg)).toBeGreaterThanOrEqual(7)
      expect(contrastRatio(neutral.inkSecondary, bg)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('black on gold, never white on gold', () => {
    expect(contrastRatio(brand.black, brand.gold)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(brand.white, brand.gold)).toBeLessThan(3)
  })

  it('status colours as text on white', () => {
    for (const c of Object.values(status)) expect(contrastRatio(c, neutral.surface)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('voyageFontFaces', () => {
  it('declares both weights and trims trailing slashes', () => {
    const css = voyageFontFaces({ baseUrl: '/fonts//', display: 'optional' })
    expect(css.match(/@font-face/g)).toHaveLength(2)
    expect(css).toContain("url('/fonts/voyage-regular.otf')")
    expect(css).toContain('font-weight: 700')
    expect(css).toContain('font-display: optional')
  })
})
