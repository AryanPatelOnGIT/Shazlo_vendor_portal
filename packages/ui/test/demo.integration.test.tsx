// @vitest-environment jsdom
// The token demo page must show every token, so a token added to src/tokens.ts without a demo entry fails here.
import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '../demo/App'
import { brand, neutral, radius, status, theme } from '../src'

afterEach(cleanup)

const renderDemo = () =>
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  )

describe('token demo page', () => {
  it('has a section for each token group', () => {
    renderDemo()
    for (const title of ['Brand', 'Neutrals', 'Status', 'Type scale', 'Spacing (4 px grid) and radius', 'Components']) {
      expect(screen.getByRole('region', { name: title })).toBeTruthy()
    }
  })

  it.each([
    ['Brand', brand],
    ['Neutrals', neutral],
    ['Status', status],
  ] as const)('shows every %s colour with its hex value', (title, colors) => {
    renderDemo()
    const section = within(screen.getByRole('region', { name: title }))
    for (const [name, hex] of Object.entries(colors)) {
      expect(section.getByText(name)).toBeTruthy()
      expect(section.getByText(hex)).toBeTruthy()
    }
  })

  it('shows every typography variant and radius', () => {
    renderDemo()
    const type = within(screen.getByRole('region', { name: 'Type scale' }))
    for (const v of ['display1', 'display2', 'h1', 'h2', 'h3', 'body1', 'body2', 'caption', 'overline', 'stat', 'mono']) {
      expect(type.getByText(new RegExp(`^${v} ·`))).toBeTruthy()
    }
    const shape = within(screen.getByRole('region', { name: 'Spacing (4 px grid) and radius' }))
    for (const [name, r] of Object.entries(radius)) expect(shape.getByText(`${name} ${r}`)).toBeTruthy()
  })

  it('shows the themed components', () => {
    renderDemo()
    const section = within(screen.getByRole('region', { name: 'Components' }))
    for (const label of ['Submit for review', 'Add product', 'Bulk import', 'Discard draft']) {
      expect(section.getByRole('button', { name: label })).toBeTruthy()
    }
    expect(section.getByRole('alert')).toBeTruthy()
  })
})
