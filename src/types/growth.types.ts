import type { SceneColors } from '@/engines/ambientEngine'

/* ==========================================================================
   Growth & Atmosphere Types
   ========================================================================== */

export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night'

/** Full, minute-accurate atmosphere state. Replaces the 5-bucket TimeOfDay system. */
export interface AtmosphereState {
  // Backward-compat bucket (used by GroundLayer, WaterLayer, AtmosphereLayer)
  timeOfDay: TimeOfDay

  // Continuous solar values
  solarElevation: number // -1 (nadir) → 0 (horizon) → 1 (zenith)
  sunPosition: { x: number; y: number } | null // null at night
  moonPosition: { x: number; y: number } | null // null during day
  starsOpacity: number // 0–1 continuous
  lunarPhase: number // 0=new moon … 0.5=full … 1=new moon

  // Interpolated sky colours for this exact minute
  skyColors: SceneColors

  // Session context
  sessionActive: boolean
  sessionProgress: number // 0–1 through current session
  isBreak: boolean
}

/**
 * Derives the legacy TimeOfDay bucket from solar elevation.
 * Used wherever the old bucket-based layers still read timeOfDay.
 */
export function timeOfDayFromElevation(elevation: number, minuteOfDay: number): TimeOfDay {
  if (elevation > 0.15) {
    if (minuteOfDay < 780) return 'morning' // before solar noon
    return 'afternoon'
  }
  if (elevation > 0) return minuteOfDay < 780 ? 'dawn' : 'dusk'
  if (minuteOfDay > 300 && minuteOfDay < 420) return 'dawn'
  if (minuteOfDay > 1080 && minuteOfDay < 1200) return 'dusk'
  return 'night'
}

export interface MilestoneEvent {
  id: string
  type: 'tier-up' | 'streak' | 'first-session' | 'long-session' | 'element-unlocked'
  triggeredAt: number
  seen: boolean
  payload?: Record<string, unknown>
}
