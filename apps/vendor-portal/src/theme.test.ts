import { describe, expect, it } from 'vitest'
import { theme } from '@shazlo/ui'

describe('vendor-portal', () => {
  it('uses the shared Shazlo theme', () => {
    expect(theme.palette.secondary.main).toBe('#FFD700')
  })
})
