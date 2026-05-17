import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OasisElement, OasisElementType, OasisState, GrowthTier } from '@/types/oasis.types'
import { GROWTH_TIERS } from '@/types/oasis.types'
import { format } from '@/utils/formatters'

/* ==========================================================================
   Oasis Store
   Manages the persistent visual state of the oasis — name, elements, tier.
   Growth tier is derived from totalFocusMinutes against GROWTH_TIERS config.
   ========================================================================== */

interface OasisStoreState {
  oasis: OasisState

  // Derived (computed from oasis state)
  currentTier: GrowthTier
  nextTierMinutesRequired: number | null

  // Actions
  setName: (name: string) => void
  addElement: (
    type: OasisElementType,
    sessionId: string,
    plantedAt: number,
  ) => OasisElement
  addFocusMinutes: (minutes: number) => void
  reset: () => void
}

const generateElementId = (): string =>
  `el_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

const computeTier = (totalMinutes: number): GrowthTier => {
  // Find the highest tier whose minMinutes threshold has been crossed
  const tier = [...GROWTH_TIERS]
    .reverse()
    .find((t) => totalMinutes >= t.minMinutes)
  return (tier?.tier ?? 0) as GrowthTier
}

const computeNextTierMinutes = (currentTier: GrowthTier): number | null => {
  const next = GROWTH_TIERS.find((t) => t.tier === currentTier + 1)
  return next?.minMinutes ?? null
}

const SCENE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 50, y: 70 }, { x: 35, y: 65 }, { x: 65, y: 68 },
  { x: 25, y: 72 }, { x: 75, y: 63 }, { x: 45, y: 75 },
  { x: 55, y: 60 }, { x: 30, y: 58 }, { x: 70, y: 72 },
  { x: 20, y: 66 }, { x: 80, y: 65 }, { x: 40, y: 62 },
]

const initialOasis: OasisState = {
  name: 'My Oasis',
  tier: 0,
  totalFocusMinutes: 0,
  elements: [],
  createdAt: Date.now(),
}

export const useOasisStore = create<OasisStoreState>()(
  persist(
    (set, get) => ({
      oasis: initialOasis,
      currentTier: 0,
      nextTierMinutesRequired: GROWTH_TIERS[1].minMinutes,

      setName: (name) =>
        set((state) => ({ oasis: { ...state.oasis, name } })),

      addElement: (type, sessionId, plantedAt) => {
        const { oasis } = get()
        const index = oasis.elements.length % SCENE_POSITIONS.length
        const position = SCENE_POSITIONS[index]

        const element: OasisElement = {
          id: generateElementId(),
          type,
          plantedAt,
          sessionId,
          label: format.elementLabel(type, plantedAt),
          position,
          tier: oasis.tier,
        }

        const updatedElements = [...oasis.elements, element]
        set({ oasis: { ...oasis, elements: updatedElements } })
        return element
      },

      addFocusMinutes: (minutes) => {
        const { oasis } = get()
        const newTotal = oasis.totalFocusMinutes + minutes
        const newTier = computeTier(newTotal)
        const nextMinutes = computeNextTierMinutes(newTier)
        set({
          oasis: { ...oasis, totalFocusMinutes: newTotal, tier: newTier },
          currentTier: newTier,
          nextTierMinutesRequired: nextMinutes,
        })
      },

      reset: () =>
        set({
          oasis: { ...initialOasis, createdAt: Date.now() },
          currentTier: 0,
          nextTierMinutesRequired: GROWTH_TIERS[1].minMinutes,
        }),
    }),
    {
      name: 'oasis-world',
      partialize: (state) => ({ oasis: state.oasis }),
      // Recompute derived state on rehydration
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const tier = computeTier(state.oasis.totalFocusMinutes)
        state.currentTier = tier
        state.nextTierMinutesRequired = computeNextTierMinutes(tier)
      },
    },
  ),
)
