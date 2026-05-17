/* ==========================================================================
   Session Types
   ========================================================================== */

export type SessionStatus = 'idle' | 'active' | 'paused' | 'break' | 'complete' | 'abandoned'

export type SessionType = 'focus' | 'short-break' | 'long-break'

export interface Session {
  id: string
  type: SessionType
  startedAt: number // unix timestamp ms
  completedAt?: number // unix timestamp ms
  durationMinutes: number
  status: SessionStatus
  label?: string // user-set task name (Phase 2)
  oasisElementId?: string // links to element planted by this session
}

export interface SessionConfig {
  focusDurationMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  longBreakAfterSessions: number // e.g. every 4 focus sessions
  autoStartBreaks: boolean
  autoStartFocus: boolean
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  focusDurationMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakAfterSessions: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
}
