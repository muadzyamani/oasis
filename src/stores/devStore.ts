import { create } from 'zustand'

/* ==========================================================================
   Dev Store — development-only overrides
   Never persisted. Ignored entirely in production builds.
   ========================================================================== */

interface DevStoreState {
  /** If set, overrides the real clock for ambient/sky testing */
  timeOverride: { hour: number; minute: number } | null

  setTimeOverride: (hour: number, minute: number) => void
  clearTimeOverride: () => void
}

export const useDevStore = create<DevStoreState>()((set) => ({
  timeOverride: null,
  setTimeOverride: (hour, minute) => set({ timeOverride: { hour, minute } }),
  clearTimeOverride: () => set({ timeOverride: null }),
}))
