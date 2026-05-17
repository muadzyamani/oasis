import { useState, useEffect } from 'react'
import { computeAtmosphere } from '@/engines/ambientEngine'
import type { AtmosphereState } from '@/types/growth.types'
import { useTimerStore } from '@/stores/timerStore'

/* ==========================================================================
   useAmbient
   Polls the real clock every 60s and reads session state.
   Returns AtmosphereState for the scene to consume.
   ========================================================================== */

export function useAmbient(): AtmosphereState {
  const [hour, setHour] = useState(() => new Date().getHours())
  const { status, timeRemainingSeconds, sessionType, config } = useTimerStore()

  useEffect(() => {
    const id = setInterval(() => setHour(new Date().getHours()), 60_000)
    return () => clearInterval(id)
  }, [])

  const sessionActive = status === 'active'
  const isBreak = sessionType !== 'focus'
  const totalSeconds =
    sessionType === 'focus'
      ? config.focusDurationMinutes * 60
      : sessionType === 'short-break'
        ? config.shortBreakMinutes * 60
        : config.longBreakMinutes * 60
  const sessionProgress =
    totalSeconds > 0 ? (totalSeconds - timeRemainingSeconds) / totalSeconds : 0

  return computeAtmosphere(hour, sessionActive, sessionProgress, isBreak)
}
