import { describe, expect, it } from 'vitest'
import { APP_NAME } from './version'

describe('vendor-portal', () => {
  it('exposes its name', () => {
    expect(APP_NAME).toBe('vendor-portal')
  })
})
