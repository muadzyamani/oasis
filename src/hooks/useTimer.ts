import { useEffect, useRef, useCallback, useState } from 'react'
import { useTimerStore } from '@/stores/timerStore'
import { useSessionStore } from '@/stores/sessionStore'
import { useOasisStore } from '@/stores/oasisStore'
import { useStatsStore } from '@/stores/statsStore'
import { resolveGrowthEvent, peekNextElement } from '@/engines/growthEngine'
import type { SessionStatus, SessionType } from '@/types/session.types'
import type { OasisElementType } from '@/types/oasis.types'

/* ==========================================================================
   useTimer
   Bridges the Web Worker timer to all Zustand stores.
   Owns the session-completion pipeline.
   Also computes the preview element shown during an active session.
   ========================================================================== */

type WorkerMsg = { type: 'TICK'; timeRemaining: number } | { type: 'COMPLETE' }

export interface PreviewElement {
  type: OasisElementType
  position: { x: number; y: number }
}

export interface UseTimerReturn {
  status: SessionStatus
  timeRemainingSeconds: number
  sessionType: SessionType
  progress: number
  plantedElementId: string | null
  previewElement: PreviewElement | null // shows during active focus session
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  switchType: (type: SessionType) => void
  clearPlanted: () => void
}

export function useTimer(): UseTimerReturn {
  const workerRef = useRef<Worker | null>(null)
  const [plantedElementId, setPlantedElementId] = useState<string | null>(null)
  const [previewElement, setPreviewElement] = useState<PreviewElement | null>(null)

  const onCompleteRef = useRef<() => void>(() => {})
  useEffect(() => {
    onCompleteRef.current = () => {
      const { sessionType } = useTimerStore.getState()
      const { currentSession } = useSessionStore.getState()

      if (sessionType === 'focus' && currentSession) {
        const completed = useSessionStore.getState().completeSession()
        if (completed) {
          useStatsStore.getState().recordCompletedSession(completed)
          const { oasis } = useOasisStore.getState()
          const event = resolveGrowthEvent(completed, oasis)
          const planted = useOasisStore
            .getState()
            .addElement(event.elementType, completed.id, event.plantedAt)
          useOasisStore.getState().addFocusMinutes(completed.durationMinutes)
          setPlantedElementId(planted.id)
          setPreviewElement(null) // preview becomes the real element
        }
      } else {
        useSessionStore.getState().completeSession()
      }

      useTimerStore.setState({ status: 'complete' })
    }
  })

  useEffect(() => {
    workerRef.current = new Worker(new URL('../engines/timerWorker.ts', import.meta.url), {
      type: 'module',
    })
    workerRef.current.onmessage = (e: MessageEvent<WorkerMsg>) => {
      if (e.data.type === 'TICK') {
        useTimerStore.setState({ timeRemainingSeconds: e.data.timeRemaining })
      } else if (e.data.type === 'COMPLETE') {
        onCompleteRef.current()
      }
    }
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    const { config, sessionType } = useTimerStore.getState()
    const durationMinutes =
      sessionType === 'focus'
        ? config.focusDurationMinutes
        : sessionType === 'short-break'
          ? config.shortBreakMinutes
          : config.longBreakMinutes

    // Compute preview element immediately on start (focus sessions only)
    if (sessionType === 'focus') {
      const { oasis } = useOasisStore.getState()
      const preview = peekNextElement(oasis)
      setPreviewElement(preview)
    }

    useSessionStore.getState().beginSession(sessionType, durationMinutes)
    useTimerStore.setState({
      status: 'active',
      timeRemainingSeconds: durationMinutes * 60,
      sessionStartedAt: Date.now(),
    })
    workerRef.current?.postMessage({ type: 'START', durationSeconds: durationMinutes * 60 })
  }, [])

  const pause = useCallback(() => {
    useTimerStore.setState({ status: 'paused' })
    workerRef.current?.postMessage({ type: 'PAUSE' })
  }, [])

  const resume = useCallback(() => {
    useTimerStore.setState({ status: 'active' })
    workerRef.current?.postMessage({ type: 'RESUME' })
  }, [])

  const stop = useCallback(() => {
    useSessionStore.getState().abandonSession()
    useTimerStore.getState().stop()
    workerRef.current?.postMessage({ type: 'STOP' })
    setPreviewElement(null) // clear preview on abandon
  }, [])

  const switchType = useCallback((type: SessionType) => {
    workerRef.current?.postMessage({ type: 'STOP' })
    useTimerStore.getState().switchSessionType(type)
    setPreviewElement(null)
  }, [])

  const { status, timeRemainingSeconds, sessionType, config } = useTimerStore()

  const totalSeconds =
    sessionType === 'focus'
      ? config.focusDurationMinutes * 60
      : sessionType === 'short-break'
        ? config.shortBreakMinutes * 60
        : config.longBreakMinutes * 60

  const progress = totalSeconds > 0 ? (totalSeconds - timeRemainingSeconds) / totalSeconds : 0

  return {
    status,
    timeRemainingSeconds,
    sessionType,
    progress: Math.min(1, Math.max(0, progress)),
    plantedElementId,
    previewElement,
    start,
    pause,
    resume,
    stop,
    switchType,
    clearPlanted: () => setPlantedElementId(null),
  }
}
