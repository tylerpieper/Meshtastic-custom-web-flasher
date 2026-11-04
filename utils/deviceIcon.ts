export interface DeviceBadgeInfo {
  isSpicy: boolean
  isSolarXiao: boolean
  label?: string
  emoji: string
}

/**
 * Returns badge overlay information for special variants (Spicy and SolarXiao).
 */
export function getDeviceBadge(target?: string | null): DeviceBadgeInfo | null {
  if (!target) return null
  const normalized = target.toLowerCase()

  if (normalized.includes('solarxiao')) {
    return {
      isSpicy: false,
      isSolarXiao: true,
      emoji: '☀️',
    }
  }

  if (normalized.includes('spicy')) {
    let label = ''
    if (normalized.includes('m33')) {
      label = 'M33'
    }
    else if (normalized.includes('e22p')) {
      label = 'E22P'
    }
    else {
      const match = normalized.match(/spicy_([^_]+)/)
      label = match ? match[1].toUpperCase() : ''
    }

    return {
      isSpicy: true,
      isSolarXiao: false,
      emoji: '🌶️',
      label,
    }
  }

  return null
}

/**
 * Returns the theme-aware unknown device icon path.
 */
export function getUnknownDeviceIcon(isDark = true): string {
  return isDark ? 'img/devices/unknown-new.svg' : 'img/devices/unknown-new-light.svg'
}
