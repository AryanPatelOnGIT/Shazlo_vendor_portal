import { describe, expect, it } from 'vitest'
import { createShazloTheme, theme, voyageFontFaces } from './index'

describe('voyageFontFaces input checks', () => {
  it.each(['/', '/fonts', '/fonts/', 'https://cdn.shazlo.store/fonts', 'fonts'])('accepts %s', (baseUrl) => {
    expect(() => voyageFontFaces({ baseUrl })).not.toThrow()
  })

  it('rejects an empty base URL', () => {
    expect(() => voyageFontFaces({ baseUrl: '' })).toThrow(/baseUrl/)
    expect(() => voyageFontFaces({ baseUrl: '   ' })).toThrow(/baseUrl/)
  })

  // baseUrl is written into url('...'); these characters would end the string or the rule.
  it.each(["/fonts');x{}", '/fonts")', '/fon ts', '/fonts\n', '/fonts\\', '/fonts;'])('rejects %j', (baseUrl) => {
    expect(() => voyageFontFaces({ baseUrl })).toThrow(/baseUrl/)
  })

  it('fails early when the theme is given a bad URL', () => {
    expect(() => createShazloTheme({ voyage: { baseUrl: "x');" } })).toThrow(/baseUrl/)
  })
})

describe('createShazloTheme', () => {
  it('returns a new theme each time and never changes the default one', () => {
    const custom = createShazloTheme({ overrides: { palette: { primary: { main: '#222222' } } } })
    expect(custom).not.toBe(theme)
    expect(theme.palette.primary.main).toBe('#000000')
    expect(createShazloTheme().palette.primary.main).toBe('#000000')
  })
})
