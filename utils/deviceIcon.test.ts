import { describe, expect, it } from 'vitest'
import { getDeviceBadge, getUnknownDeviceIcon } from './deviceIcon'

describe('deviceIcon utils', () => {
  it('returns SolarXiao badge with sun emoji and E22P label', () => {
    const badge = getDeviceBadge('solarxiao_e22p')
    expect(badge).toEqual({
      isSpicy: false,
      isSolarXiao: true,
      emoji: '☀️',
      label: 'E22P',
    })
  })

  it('returns SolarXiao badge with default E22P label for base solarxiao', () => {
    const badge = getDeviceBadge('solarxiao')
    expect(badge).toEqual({
      isSpicy: false,
      isSolarXiao: true,
      emoji: '☀️',
      label: 'E22P',
    })
  })

  it('returns Spicy E22P badge with pepper emoji and E22P label', () => {
    const badge = getDeviceBadge('spicy_e22p_i2c')
    expect(badge).toEqual({
      isSpicy: true,
      isSolarXiao: false,
      emoji: '🌶️',
      label: 'E22P',
    })
  })

  it('returns Spicy M33 badge with pepper emoji and M33 label', () => {
    const badge = getDeviceBadge('spicy_m33_i2c')
    expect(badge).toEqual({
      isSpicy: true,
      isSolarXiao: false,
      emoji: '🌶️',
      label: 'M33',
    })
  })

  it('returns null for standard non-spicy / non-solar devices', () => {
    expect(getDeviceBadge('heltec-v3')).toBeNull()
    expect(getDeviceBadge('station-g3')).toBeNull()
    expect(getDeviceBadge(undefined)).toBeNull()
    expect(getDeviceBadge(null)).toBeNull()
  })

  it('returns theme-aware unknown device icon paths', () => {
    expect(getUnknownDeviceIcon(true)).toBe('img/devices/unknown-new.svg')
    expect(getUnknownDeviceIcon(false)).toBe('img/devices/unknown-new-light.svg')
  })
})
