import { useState, useEffect } from 'react'
import { computeAtmosphere } from '@/engines/ambientEngine'
import type { AtmosphereState } from '@/types/growth.types'
import { useTimerStore } from '@/stores/timerStore'
import { useSettingsStore } from '@/stores/settingsStore'

/* ==========================================================================
   useAmbient
   Polls real clock every 30s (minute-level precision for sun/moon arc).
   Reads sunrise/sunset from settings store.
   ========================================================================== */

function getNow() {
  const d = new Date()
  return { hour: d.getHours(), minute: d.getMinutes() }
}

export function useAmbient(): AtmosphereState {
  const [time, setTime] = useState(getNow)
  const { status, timeRemainingSeconds, sessionType, config } = useTimerStore()
  const { sunriseHour, sunsetHour } = useSettingsStore()

  useEffect(() => {
    // Poll every 30s — fine-grained enough for smooth sun/moon movement
    const id = setInterval(() => setTime(getNow()), 30_000)
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

  return computeAtmosphere(
    time.hour,
    time.minute,
    sunriseHour,
    sunsetHour,
    sessionActive,
    sessionProgress,
    isBreak,
  )
}
