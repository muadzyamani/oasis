/* ==========================================================================
   Growth & Atmosphere Types
   ========================================================================== */

export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night'

export interface AtmosphereState {
  timeOfDay: TimeOfDay
  sessionActive: boolean
  sessionProgress: number // 0–1 (how far through the current session)
  isBreak: boolean
}

/**
 * Computes time of day from a real clock hour (0–23).
 * Used by the ambient engine to drive scene atmosphere.
 */
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 8) return 'dawn'
  if (hour >= 8 && hour < 17) return 'morning'
  if (hour >= 17 && hour < 19) return 'afternoon'
  if (hour >= 19 && hour < 21) return 'dusk'
  return 'night'
}

export interface MilestoneEvent {
  id: string
  type: 'tier-up' | 'streak' | 'first-session' | 'long-session' | 'element-unlocked'
  triggeredAt: number // unix timestamp ms
  seen: boolean
  payload?: Record<string, unknown>
}
