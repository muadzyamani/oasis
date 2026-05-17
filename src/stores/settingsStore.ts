import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/* ==========================================================================
   Settings Store
   User preferences: sound, theme, UI options.
   All persisted.
   ========================================================================== */

export type AppTheme = 'auto' | 'light' | 'dark'

interface SettingsState {
  soundEnabled: boolean
  ambienceVolume: number // 0–1
  uiSoundsEnabled: boolean
  theme: AppTheme
  showStreakOnOpen: boolean
  focusWindowStart: number // hour 0–23
  focusWindowEnd: number // hour 0–23
  notificationsEnabled: boolean
  reducedMotion: boolean

  // Actions
  setSoundEnabled: (enabled: boolean) => void
  setAmbienceVolume: (volume: number) => void
  setUiSoundsEnabled: (enabled: boolean) => void
  setTheme: (theme: AppTheme) => void
  setShowStreakOnOpen: (show: boolean) => void
  setFocusWindow: (start: number, end: number) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setReducedMotion: (reduced: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: false, // Off by default — ask on first use
      ambienceVolume: 0.5,
      uiSoundsEnabled: true,
      theme: 'auto',
      showStreakOnOpen: true,
      focusWindowStart: 8,
      focusWindowEnd: 22,
      notificationsEnabled: false,
      reducedMotion: false,

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setAmbienceVolume: (volume) => set({ ambienceVolume: Math.max(0, Math.min(1, volume)) }),
      setUiSoundsEnabled: (enabled) => set({ uiSoundsEnabled: enabled }),
      setTheme: (theme) => set({ theme }),
      setShowStreakOnOpen: (show) => set({ showStreakOnOpen: show }),
      setFocusWindow: (start, end) => set({ focusWindowStart: start, focusWindowEnd: end }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
    }),
    { name: 'oasis-settings' },
  ),
)
