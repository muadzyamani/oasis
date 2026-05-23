import { GROWTH_TIERS } from '@/types/oasis.types'
import type { OasisElementType, OasisState } from '@/types/oasis.types'
import type { Session } from '@/types/session.types'

/* ==========================================================================
   Growth Engine — Pure Functions
   No side effects. Given session + oasis state → returns what to plant.
   ========================================================================== */

export interface GrowthEvent {
  elementType: OasisElementType
  position: { x: number; y: number }
  plantedAt: number
  tierUp: boolean
  newTier: number
}

// Smart placement zones per element type (x,y as % of scene)
const ZONES: Record<OasisElementType, Array<{ x: number; y: number }>> = {
  palm: [
    { x: 22, y: 80 },
    { x: 38, y: 81 },
    { x: 55, y: 82 },
    { x: 72, y: 80 },
    { x: 84, y: 81 },
  ],
  acacia: [
    { x: 18, y: 80 },
    { x: 32, y: 81 },
    { x: 48, y: 82 },
    { x: 64, y: 80 },
    { x: 78, y: 81 },
  ],
  succulent: [
    { x: 25, y: 80 },
    { x: 42, y: 81 },
    { x: 58, y: 82 },
    { x: 70, y: 80 },
    { x: 82, y: 81 },
  ],
  willow: [
    { x: 15, y: 80 },
    { x: 30, y: 82 },
    { x: 52, y: 81 },
    { x: 67, y: 80 },
    { x: 80, y: 81 },
  ],
  sprout: [
    { x: 48, y: 81 },
    { x: 53, y: 80 },
    { x: 43, y: 82 },
    { x: 57, y: 81 },
  ],
  flower: [
    { x: 32, y: 80 },
    { x: 66, y: 79 },
    { x: 42, y: 81 },
    { x: 58, y: 80 },
    { x: 27, y: 80 },
    { x: 72, y: 79 },
  ],
  reed: [
    { x: 22, y: 75 },
    { x: 78, y: 74 },
    { x: 17, y: 76 },
    { x: 83, y: 75 },
  ],
  lantern: [
    { x: 50, y: 73 },
    { x: 36, y: 72 },
    { x: 64, y: 74 },
    { x: 50, y: 70 },
  ],
  lily: [
    { x: 40, y: 72 },
    { x: 55, y: 71 },
    { x: 47, y: 73 },
    { x: 52, y: 70 },
  ],
  waterfall: [
    { x: 12, y: 66 },
    { x: 88, y: 65 },
  ],
  firefly: [
    { x: 30, y: 62 },
    { x: 70, y: 60 },
    { x: 45, y: 65 },
    { x: 60, y: 59 },
    { x: 25, y: 63 },
    { x: 75, y: 61 },
  ],
}

const TIER_THRESHOLDS = [0, 25, 120, 480, 1440, 4320]

function computeTier(totalMinutes: number): number {
  return TIER_THRESHOLDS.reduce((acc, threshold, i) => (totalMinutes >= threshold ? i : acc), 0)
}

function pickElementType(oasis: OasisState, sessionIndex: number): OasisElementType {
  const currentTier = computeTier(oasis.totalFocusMinutes)
  
  // Collect all elements unlocked up to current tier
  const unlocked: OasisElementType[] = []
  for (let i = 0; i <= currentTier; i++) {
    const tierConfig = GROWTH_TIERS.find((t) => t.tier === i)
    if (tierConfig) {
      unlocked.push(...tierConfig.unlockedElements)
    }
  }

  // Filter to our 4 growing saplings
  const allowed = unlocked.filter((t) => ['palm', 'acacia', 'succulent', 'willow'].includes(t))

  if (allowed.length === 0) {
    return 'palm' // fallback
  }

  return allowed[sessionIndex % allowed.length]
}

function pickPosition(type: OasisElementType, usedCount: number): { x: number; y: number } {
  const zones = ZONES[type]
  // Cycle through zones; add slight random jitter so elements never perfectly overlap
  const base = zones[usedCount % zones.length]
  const jitter = { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 2 }
  return {
    x: Math.round((base.x + jitter.x) * 10) / 10,
    y: Math.round((base.y + jitter.y) * 10) / 10,
  }
}

export function resolveGrowthEvent(session: Session, oasis: OasisState): GrowthEvent {
  const sessionIndex = oasis.elements.length
  const elementType = pickElementType(oasis, sessionIndex)

  // Count how many of this type already exist for zone cycling
  const existingOfType = oasis.elements.filter((e) => e.type === elementType).length
  const position = pickPosition(elementType, existingOfType)

  const plantedAt = session.completedAt ?? Date.now()
  const newTotalMinutes = oasis.totalFocusMinutes + session.durationMinutes
  const newTier = computeTier(newTotalMinutes)
  const tierUp = newTier > oasis.tier

  return { elementType, position, plantedAt, tierUp, newTier }
}

/** Preview: returns the type + position of the NEXT element to be planted,
 *  without requiring a completed session. Used for the live preview plant. */
export function peekNextElement(oasis: OasisState): {
  type: OasisElementType
  position: { x: number; y: number }
} {
  const sessionIndex = oasis.elements.length
  const type = pickElementType(oasis, sessionIndex)
  const existingOfType = oasis.elements.filter((e) => e.type === type).length
  const position = pickPosition(type, existingOfType)
  return { type, position }
}
