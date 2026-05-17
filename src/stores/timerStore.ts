import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SessionConfig, SessionStatus, SessionType } from '@/types/session.types'
import { DEFAULT_SESSION_CONFIG } from '@/types/session.types'

/* ==========================================================================
   Timer Store
   Manages live timer state: countdown, session type, status.
   Settings (durations) are persisted; live timer state is not.
   ========================================================================== */

interface TimerState {
  // Live state (not persisted)
  status: SessionStatus
  sessionType: SessionType
  timeRemainingSeconds: number
  sessionStartedAt: number | null // timestamp when current session started
  completedFocusSessions: number // resets after a long break

  // Persisted settings
  config: SessionConfig

  // Actions
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  tick: () => void
  setConfig: (config: Partial<SessionConfig>) => void
  switchSessionType: (type: SessionType) => void
}

const getDurationSeconds = (type: SessionType, config: SessionConfig): number => {
  switch (type) {
    case 'focus':
      return config.focusDurationMinutes * 60
    case 'short-break':
      return config.shortBreakMinutes * 60
    case 'long-break':
      return config.longBreakMinutes * 60
  }
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      // Initial live state
      status: 'idle',
      sessionType: 'focus',
      timeRemainingSeconds: DEFAULT_SESSION_CONFIG.focusDurationMinutes * 60,
      sessionStartedAt: null,
      completedFocusSessions: 0,

      // Initial settings
      config: DEFAULT_SESSION_CONFIG,

      start: () => {
        const { config, sessionType } = get()
        set({
          status: 'active',
          timeRemainingSeconds: getDurationSeconds(sessionType, config),
          sessionStartedAt: Date.now(),
        })
      },

      pause: () => set({ status: 'paused' }),

      resume: () => set({ status: 'active' }),

      stop: () => {
        const { config, sessionType } = get()
        set({
          status: 'idle',
          timeRemainingSeconds: getDurationSeconds(sessionType, config),
          sessionStartedAt: null,
        })
      },

      tick: () => {
        const { timeRemainingSeconds, status } = get()
        if (status !== 'active') return
        if (timeRemainingSeconds <= 0) {
          set({ status: 'complete' })
          return
        }
        set({ timeRemainingSeconds: timeRemainingSeconds - 1 })
      },

      setConfig: (partial) => {
        const { config, sessionType } = get()
        const newConfig = { ...config, ...partial }
        set({
          config: newConfig,
          // Update remaining time only if idle (not mid-session)
          ...(get().status === 'idle' && {
            timeRemainingSeconds: getDurationSeconds(sessionType, newConfig),
          }),
        })
      },

      switchSessionType: (type) => {
        const { config } = get()
        set({
          sessionType: type,
          status: 'idle',
          timeRemainingSeconds: getDurationSeconds(type, config),
          sessionStartedAt: null,
        })
      },
    }),
    {
      name: 'oasis-timer',
      // Only persist config settings, not live timer state
      partialize: (state) => ({ config: state.config }),
    },
  ),
)
