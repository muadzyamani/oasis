import { useOasisStore } from '@/stores/oasisStore'
import type { OasisState, GrowthTier } from '@/types/oasis.types'
import { GROWTH_TIERS } from '@/types/oasis.types'

/* ==========================================================================
   useOasisGrowth
   Exposes the current oasis state and computed growth progress.
   ========================================================================== */

export interface UseOasisGrowthReturn {
  oasis: OasisState
  currentTier: GrowthTier
  tierConfig: (typeof GROWTH_TIERS)[number]
  nextTierMinutes: number | null
  progressToNextTier: number // 0→1
}

export function useOasisGrowth(): UseOasisGrowthReturn {
  const { oasis, currentTier, nextTierMinutesRequired } = useOasisStore()
  const tierConfig = GROWTH_TIERS.find((t) => t.tier === currentTier) ?? GROWTH_TIERS[0]

  const currentTierMinutes = tierConfig.minMinutes
  const nextTierMinutes = nextTierMinutesRequired

  const progressToNextTier =
    nextTierMinutes !== null && nextTierMinutes > currentTierMinutes
      ? (oasis.totalFocusMinutes - currentTierMinutes) / (nextTierMinutes - currentTierMinutes)
      : 1

  return {
    oasis,
    currentTier,
    tierConfig,
    nextTierMinutes,
    progressToNextTier: Math.min(1, Math.max(0, progressToNextTier)),
  }
}
