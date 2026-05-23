import { useStatsStore, getTodayRecord } from '@/stores/statsStore'

/* ==========================================================================
   useStreak
   Returns current streak and today's focus summary.
   ========================================================================== */

export interface UseStreakReturn {
  currentStreakDays: number
  longestStreakDays: number
  todayMinutes: number
  todaySessions: number
  totalMinutes: number
  totalSessions: number
}

export function useStreak(): UseStreakReturn {
  const {
    currentStreakDays,
    longestStreakDays,
    totalFocusMinutes,
    totalSessionsCompleted,
    dailyRecords,
  } = useStatsStore()
  const today = getTodayRecord(dailyRecords)

  return {
    currentStreakDays,
    longestStreakDays,
    todayMinutes: today.focusMinutes,
    todaySessions: today.sessionsCompleted,
    totalMinutes: totalFocusMinutes,
    totalSessions: totalSessionsCompleted,
  }
}
