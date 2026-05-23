/* ==========================================================================
   Oasis Types
   ========================================================================== */

export type GrowthTier = 0 | 1 | 2 | 3 | 4 | 5

export type GrowthStage = 'sapling' | 'mature'

export type OasisElementType =
  | 'sprout'
  | 'flower'
  | 'reed'
  | 'palm'
  | 'lantern'
  | 'lily'
  | 'waterfall'
  | 'firefly'
  | 'acacia'
  | 'succulent'
  | 'willow'

export interface OasisElement {
  id: string
  type: OasisElementType
  plantedAt: number // unix timestamp ms
  sessionId: string // the session that created this element
  label: string // e.g. "The Reed of Monday, 12th May"
  position: {
    x: number // percentage 0–100 (relative to scene width)
    y: number // percentage 0–100 (relative to scene height)
  }
  tier: GrowthTier // which tier this element was unlocked at
  stage: GrowthStage // 'sapling' while preview/growing, 'mature' once planted
}

export interface OasisState {
  name: string
  tier: GrowthTier
  totalFocusMinutes: number
  elements: OasisElement[]
  createdAt: number // unix timestamp ms
}

export interface GrowthTierConfig {
  tier: GrowthTier
  name: string
  label: string
  minMinutes: number
  description: string
  unlockedElements: OasisElementType[]
}

export const GROWTH_TIERS: GrowthTierConfig[] = [
  {
    tier: 0,
    name: 'Seed',
    label: 'Your oasis awaits',
    minMinutes: 0,
    description: 'A bare sandy clearing, full of potential.',
    unlockedElements: ['palm'],
  },
  {
    tier: 1,
    name: 'Sprout',
    label: 'Life begins',
    minMinutes: 25,
    description: 'Your first plant takes root. A pool shimmers in the distance.',
    unlockedElements: ['acacia'],
  },
  {
    tier: 2,
    name: 'Bloom',
    label: 'The oasis awakens',
    minMinutes: 120,
    description: 'Flowers open, the pool fills, and the first lantern flickers.',
    unlockedElements: ['succulent'],
  },
  {
    tier: 3,
    name: 'Grove',
    label: 'A quiet refuge',
    minMinutes: 480,
    description: 'Palms cast soft shadows. Fireflies appear at dusk.',
    unlockedElements: ['willow'],
  },
  {
    tier: 4,
    name: 'Sanctuary',
    label: 'Your own sanctuary',
    minMinutes: 1440,
    description: 'A full canopy, lotus flowers, and the sound of water.',
    unlockedElements: [],
  },
  {
    tier: 5,
    name: 'Eden',
    label: 'A living Eden',
    minMinutes: 4320,
    description: 'A lush, breathing world. Every corner holds wonder.',
    unlockedElements: [],
  },
]
