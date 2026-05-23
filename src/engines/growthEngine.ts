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
  sprout:    [{ x: 48, y: 75 }, { x: 53, y: 74 }, { x: 43, y: 76 }, { x: 57, y: 75 }],
  flower:    [{ x: 32, y: 73 }, { x: 66, y: 72 }, { x: 42, y: 75 }, { x: 58, y: 74 }, { x: 27, y: 73 }, { x: 72, y: 72 }],
  reed:      [{ x: 22, y: 67 }, { x: 78, y: 66 }, { x: 17, y: 68 }, { x: 83, y: 67 }],
  palm: [
    { x: 28, y: 61 }, // Left shore
    { x: 72, y: 61 }, // Right shore
    { x: 20, y: 62 }, // Far left shore
    { x: 80, y: 62 }, // Far right shore
    { x: 35, y: 60 }, // Back left shoreline
    { x: 65, y: 60 }, // Back right shoreline
    { x: 14, y: 63 }, // Deep left shore
    { x: 86, y: 63 }  // Deep right shore
  ],
  lantern:   [{ x: 50, y: 65 }, { x: 36, y: 64 }, { x: 64, y: 66 }, { x: 50, y: 62 }],
  lily:      [{ x: 40, y: 64 }, { x: 55, y: 63 }, { x: 47, y: 65 }, { x: 52, y: 62 }],
  waterfall: [{ x: 12, y: 58 }, { x: 88, y: 57 }],
  firefly:   [{ x: 30, y: 54 }, { x: 70, y: 52 }, { x: 45, y: 57 }, { x: 60, y: 51 }, { x: 25, y: 55 }, { x: 75, y: 53 }],
}

const TIER_THRESHOLDS = [0, 25, 120, 480, 1440, 4320]

function computeTier(totalMinutes: number): number {
  return TIER_THRESHOLDS.reduce((acc, threshold, i) => (totalMinutes >= threshold ? i : acc), 0)
}

function pickElementType(_oasis: OasisState, _sessionIndex: number): OasisElementType {
  return 'palm'
}

function pickPosition(type: OasisElementType, usedCount: number): { x: number; y: number } {
  const zones = ZONES[type]
  // Cycle through zones; add slight random jitter so elements never perfectly overlap
  const base = zones[usedCount % zones.length]
  const jitter = { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 2 }
  return { x: Math.round((base.x + jitter.x) * 10) / 10, y: Math.round((base.y + jitter.y) * 10) / 10 }
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
export function peekNextElement(oasis: OasisState): { type: OasisElementType; position: { x: number; y: number } } {
  const sessionIndex = oasis.elements.length
  const type = pickElementType(oasis, sessionIndex)
  const existingOfType = oasis.elements.filter((e) => e.type === type).length
  const position = pickPosition(type, existingOfType)
  return { type, position }
}
