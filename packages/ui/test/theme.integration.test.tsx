// @vitest-environment jsdom
// Renders real MUI components with the theme in a DOM and checks the CSS that reaches the page.
import { Button, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { brand, createShazloTheme, neutral, theme } from '../src'

afterEach(cleanup)

const renderWith = (ui: ReactNode, t: Theme = theme) =>
  render(
    <ThemeProvider theme={t}>
      <CssBaseline />
      {ui}
    </ThemeProvider>,
  )

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`
}

// MUI 9 sets colours through CSS variables; jsdom keeps var() unresolved, so resolve one level here.
const colour = (el: Element, prop: 'backgroundColor' | 'color') => {
  const style = getComputedStyle(el)
  const value = style[prop]
  const v = /^var\((--[\w-]+)\)$/.exec(value)
  const resolved = v?.[1] ? style.getPropertyValue(v[1]).trim() : value
  return /^#[0-9a-f]{6}$/i.test(resolved) ? rgb(resolved) : resolved
}

const pageCss = () => Array.from(document.querySelectorAll('style'), (s) => s.textContent ?? '').join('\n')

describe('theme rendered with MUI', () => {
  it('primary buttons are black with white text', () => {
    renderWith(<Button variant="contained">Submit for review</Button>)
    const button = screen.getByRole('button', { name: 'Submit for review' })
    expect(colour(button, 'backgroundColor')).toBe(rgb(brand.black))
    expect(colour(button, 'color')).toBe(rgb(brand.white))
    expect(getComputedStyle(button).textTransform).toBe('none')
  })

  it('secondary buttons are gold with black text', () => {
    renderWith(
      <Button variant="contained" color="secondary">
        Add product
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Add product' })
    expect(colour(button, 'backgroundColor')).toBe(rgb(brand.gold))
    expect(colour(button, 'color')).toBe(rgb(brand.black))
  })

  it('display variants render as headings in Voyage', () => {
    renderWith(
      <>
        <Typography variant="display1">Kalki Studio</Typography>
        <Typography variant="display2">Brand page</Typography>
      </>,
    )
    const h1 = screen.getByRole('heading', { level: 1, name: 'Kalki Studio' })
    const h2 = screen.getByRole('heading', { level: 2, name: 'Brand page' })
    expect(getComputedStyle(h1).fontFamily).toMatch(/^"?Voyage/)
    expect(getComputedStyle(h2).fontFamily).toMatch(/^"?Voyage/)
  })

  it('mono renders as <code> and stat as <p>', () => {
    renderWith(
      <>
        <Typography variant="mono">KS-AJR-014</Typography>
        <Typography variant="stat">18</Typography>
      </>,
    )
    expect(screen.getByText('KS-AJR-014').tagName).toBe('CODE')
    expect(screen.getByText('18').tagName).toBe('P')
  })

  it('CssBaseline paints the canvas colour and Inter body text', () => {
    renderWith(<span>page</span>)
    const body = getComputedStyle(document.body)
    expect(body.backgroundColor).toBe(rgb(neutral.canvas))
    expect(body.fontFamily).toMatch(/^"?Inter/)
  })
})

describe('Voyage loading in the page', () => {
  it('adds no @font-face rules by default', () => {
    renderWith(<span>page</span>)
    expect(pageCss()).not.toContain('@font-face')
  })

  it('adds both weights when the app hosts the files', () => {
    renderWith(<span>page</span>, createShazloTheme({ voyage: { baseUrl: '/fonts' } }))
    const css = pageCss()
    expect(css.match(/@font-face/g)).toHaveLength(2)
    expect(css).toContain("url('/fonts/voyage-regular.otf')")
    expect(css).toContain("url('/fonts/voyage-bold.otf')")
  })
})
