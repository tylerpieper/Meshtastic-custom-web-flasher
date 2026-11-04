import { reactive } from 'vue'
import { eventMode } from '~/types/resources'

// Releases live in the meshtastic-firmware-release R2 bucket, one directory per
// version at the bucket root (see the publish-firmware job in meshtastic/firmware's
// main_matrix.yml).
export const RELEASE_BASE = 'https://release.meshtastic.org'

// Raw base URL for custom builds repository
export const CUSTOM_BUILDS_RAW_BASE = 'https://raw.githubusercontent.com/tylerpieper/meshtastic-custom-builds/main'

// URL to static web flasher manifest in meshtastic-custom-builds
export const CUSTOM_MANIFEST_URL = `${CUSTOM_BUILDS_RAW_BASE}/builds/web-flasher-manifest.json`

/**
 * URI encodes each path segment so spaces and special characters in directory names
 * (e.g. 'pr-10531 - Multi MQTT') don't break HTTP requests.
 */
export function encodeRepoPath(path: string): string {
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/')
}

/**
 * Returns the base raw URL for a given target's base path in custom builds repo.
 */
export function getCustomTargetRawUrl(basePath: string): string {
  return `${CUSTOM_BUILDS_RAW_BASE}/${encodeRepoPath(basePath)}`
}

// Nightlies live in their own bucket/host, flat: everything sits at the root.
export const NIGHTLY_BASE = 'https://nightly.meshtastic.org'

// Nightly (develop) build version, discovered at runtime from
// nightly.meshtastic.org/index.json (never surfaced in event mode). Reactive so
// the dropdown re-renders when it resolves; read synchronously below to route
// this version to the nightly host.
export const nightlyState = reactive<{ id: string }>({ id: '' })

/** Record the current nightly firmware version id (e.g. 'v2.8.0.abc1234'). */
export function setNightlyVersion(id: string): void {
  nightlyState.id = id
}

/** Whether this version is the nightly discovered from NIGHTLY_BASE. */
export function isNightlyVersion(version: string): boolean {
  if (!nightlyState.id) return false
  return version.replace(/^v/, '') === nightlyState.id.replace(/^v/, '')
}

/**
 * Determine the correct base path for a firmware version within release.meshtastic.org
 * Event firmware uses a special path, while normal firmware uses the standard path
 * @param version - The firmware version (with or without 'v' prefix)
 * @returns The base path for fetching firmware files
 */
export function getManifestBasePath(version: string): string {
  const cleanVersion = version.replace(/^v/, '')
  const eventVersion = eventMode.firmware.id.replace(/^v/, '')
  // Check if this is the event firmware version
  if (cleanVersion === eventVersion) {
    return `event/${eventMode.pathPrefix}/${cleanVersion}`
  }
  return cleanVersion
}

/**
 * Get the base URL for fetching firmware files
 * @param version - The firmware version (with or without 'v' prefix)
 * @returns The base URL for the firmware files directory
 */
export function getFirmwareBaseUrl(version: string): string {
  // The nightly lives on its own host, flat at the root
  if (isNightlyVersion(version)) return NIGHTLY_BASE
  return `${RELEASE_BASE}/${getManifestBasePath(version)}`
}
