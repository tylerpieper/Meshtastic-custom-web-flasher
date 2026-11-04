import type { ReleaseTarget } from './manifest'

export interface PrBuildArtifact {
  arch: string
  artifact_id: number
  name: string
  size_in_bytes: number
  expires_at: string
}

export interface PrBuildInfo {
  prNumber: number
  prTitle: string
  pageUrl: string
  author: string
  headSha: string
  runId: number
  version: string
  expiresAt: string
  artifacts: PrBuildArtifact[]
  targets: ReleaseTarget[]
}

export interface CustomTarget {
  board: string
  variantName: string
  platform: string
  basePath: string
  boardFolderUrl?: string
  mtJson?: string
}

export interface CustomWebFlasherManifest {
  generatedAt: string
  repo: string
  branch: string
  devices: DeviceHardware[]
  releases: {
    alpha: FirmwareResource[]
    stable: FirmwareResource[]
  }
}

export interface FirmwareResource {
  id: string
  title: string
  page_url?: string
  zip_url?: string
  release_notes?: string
  prBuild?: PrBuildInfo
  version?: string
  channel?: string
  profile?: string
  shortProfile?: string
  summary?: string
  description?: string
  readmeUrl?: string
  folderUrl?: string
  upstreamNotes?: string
  targets?: CustomTarget[]
}

/**
 * Response shape of the api.meshtastic.org /github/firmware/pr/{number} endpoint
 */
export interface PrBuildResponse {
  pr: {
    number: number
    title: string
    page_url: string
    author: string
    head_sha: string
    state: string
    merged: boolean
  }
  run_id: number
  version: string
  expires_at: string
  artifacts: PrBuildArtifact[]
  targets: ReleaseTarget[]
}

export interface FirmwareReleases {
  releases: {
    stable: FirmwareResource[]
    alpha: FirmwareResource[]
  }
  pullRequests: FirmwareResource[]
}

export interface DeviceHardware {
  hwModel: number
  hwModelSlug: string
  platformioTarget: string
  architecture: string
  activelySupported: boolean
  displayName: string
  supportLevel?: number
  tags?: string[]
  images?: string[]
  partitionScheme?: string
  requiresDfu?: boolean
  hasMui?: boolean
  hasInkHud?: boolean
  url?: string,
  key?: string; // Optional key to differentiate multiple entries for the same hwModel
  variant?: string; // Optional variant to differentiate multiple entries for the same hwModel
  variantName?: string; // Optional build variant folder name
  customDescription?: string; // Optional custom board description
  customRepoUrl?: string; // Optional custom repository URL
  isMaker?: boolean; // Independent maker hardware: ranked below Backer/Partner, above Community
}