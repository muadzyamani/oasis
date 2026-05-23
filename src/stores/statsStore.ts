import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session } from '@/types/session.types'

/* ==========================================================================
   Stats Store
   Aggregated focus statistics and streak tracking.
   Derived from session history but stored independently for fast reads.
   ========================================================================== */

interface DailyRecord {
  date: string // 'YYYY-MM-DD'
  focusMinutes: number
  sessionsCompleted: number
}

interface StatsState {
  totalFocusMinutes: number
  totalSessionsCompleted: number
  currentStreakDays: number
  longestStreakDays: number
  dailyRecords: DailyRecord[] // last 365 days

  // Actions
  recordCompletedSession: (session: Session) => void
  recomputeStreak: () => void
}

const toDateKey = (timestamp: number): string => {
  const d = new Date(timestamp)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const today = (): string => toDateKey(Date.now())

const computeStreak = (records: DailyRecord[]): { current: number; longest: number } => {
  if (records.length === 0) return { current: 0, longest: 0 }

  const dates = new Set(records.filter((r) => r.focusMinutes > 0).map((r) => r.date))
  let current = 0
  let longest = 0
  let streak = 0

  // Walk backwards from today
  const cursor = new Date()
  for (let i = 0; i < 365; i++) {
    const key = toDateKey(cursor.getTime())
    if (dates.has(key)) {
      streak++
      if (i === 0 || i === 1) current = streak // today or yesterday counts
      longest = Math.max(longest, streak)
    } else {
      if (i > 1) break // gap breaks backward streak
      streak = 0
    }
    cursor.setDate(cursor.getDate() - 1)
  }

  return { current, longest }
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      totalFocusMinutes: 0,
      totalSessionsCompleted: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      dailyRecords: [],

      recordCompletedSession: (session) => {
        if (session.status !== 'complete' || session.type !== 'focus') return

        const { dailyRecords } = get()
        const dateKey = toDateKey(session.completedAt ?? Date.now())
        const existing = dailyRecords.find((r) => r.date === dateKey)

        const updatedRecords = existing
          ? dailyRecords.map((r) =>
              r.date === dateKey
                ? {
                    ...r,
                    focusMinutes: r.focusMinutes + session.durationMinutes,
                    sessionsCompleted: r.sessionsCompleted + 1,
                  }
                : r,
            )
          : [
              ...dailyRecords,
              {
                date: dateKey,
                focusMinutes: session.durationMinutes,
                sessionsCompleted: 1,
              },
            ]

        // Keep only last 365 days
        const trimmed = updatedRecords.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 365)

        const { current, longest } = computeStreak(trimmed)

        set({
          dailyRecords: trimmed,
          totalFocusMinutes: get().totalFocusMinutes + session.durationMinutes,
          totalSessionsCompleted: get().totalSessionsCompleted + 1,
          currentStreakDays: current,
          longestStreakDays: Math.max(longest, get().longestStreakDays),
        })
      },

      recomputeStreak: () => {
        const { dailyRecords } = get()
        const { current, longest } = computeStreak(dailyRecords)
        set({ currentStreakDays: current, longestStreakDays: longest })
      },
    }),
    {
      name: 'oasis-stats',
      // Exclude recomputeStreak from persistence (it's an action)
      partialize: (state) => ({
        totalFocusMinutes: state.totalFocusMinutes,
        totalSessionsCompleted: state.totalSessionsCompleted,
        currentStreakDays: state.currentStreakDays,
        longestStreakDays: state.longestStreakDays,
        dailyRecords: state.dailyRecords,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.recomputeStreak()
      },
    },
  ),
)

// Export today's record helper for components
export const getTodayRecord = (records: DailyRecord[]): DailyRecord =>
  records.find((r) => r.date === today()) ?? {
    date: today(),
    focusMinutes: 0,
    sessionsCompleted: 0,
  }
