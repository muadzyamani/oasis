import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session, SessionType } from '@/types/session.types'

/* ==========================================================================
   Session Store
   Manages the history of all completed/abandoned sessions.
   Each completed focus session triggers a growth event in the oasis.
   ========================================================================== */

interface SessionState {
  currentSession: Session | null
  sessionHistory: Session[]

  // Actions
  beginSession: (type: SessionType, durationMinutes: number) => Session
  completeSession: () => Session | null
  abandonSession: () => void
  clearHistory: () => void
}

const generateId = (): string => `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessionHistory: [],

      beginSession: (type, durationMinutes) => {
        const session: Session = {
          id: generateId(),
          type,
          startedAt: Date.now(),
          durationMinutes,
          status: 'active',
        }
        set({ currentSession: session })
        return session
      },

      completeSession: () => {
        const { currentSession, sessionHistory } = get()
        if (!currentSession) return null

        const completed: Session = {
          ...currentSession,
          completedAt: Date.now(),
          status: 'complete',
        }
        set({
          currentSession: null,
          sessionHistory: [completed, ...sessionHistory],
        })
        return completed
      },

      abandonSession: () => {
        const { currentSession, sessionHistory } = get()
        if (!currentSession) return

        const abandoned: Session = {
          ...currentSession,
          completedAt: Date.now(),
          status: 'abandoned',
        }
        set({
          currentSession: null,
          sessionHistory: [abandoned, ...sessionHistory],
        })
      },

      clearHistory: () => set({ sessionHistory: [] }),
    }),
    {
      name: 'oasis-sessions',
      // Persist history, not live current session (cleared on reload)
      partialize: (state) => ({ sessionHistory: state.sessionHistory }),
    },
  ),
)
