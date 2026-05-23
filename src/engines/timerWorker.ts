/// <reference lib="webworker" />

/* ==========================================================================
   Timer Web Worker
   Runs the countdown independently of the main thread.
   Uses Date.now() delta correction — immune to setInterval throttling.
   ========================================================================== */

type InMsg =
  | { type: 'START'; durationSeconds: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }

type OutMsg = { type: 'TICK'; timeRemaining: number } | { type: 'COMPLETE' }

let intervalId: ReturnType<typeof setInterval> | null = null
let endTime: number | null = null
let pausedRemaining: number | null = null

function startTicking(): void {
  intervalId = setInterval(() => {
    if (endTime === null) return
    const remaining = Math.ceil((endTime - Date.now()) / 1000)
    if (remaining <= 0) {
      if (intervalId !== null) clearInterval(intervalId)
      intervalId = null
      endTime = null
      self.postMessage({ type: 'COMPLETE' } satisfies OutMsg)
    } else {
      self.postMessage({ type: 'TICK', timeRemaining: remaining } satisfies OutMsg)
    }
  }, 250)
}

self.addEventListener('message', (e: MessageEvent<InMsg>) => {
  switch (e.data.type) {
    case 'START':
      if (intervalId !== null) clearInterval(intervalId)
      endTime = Date.now() + e.data.durationSeconds * 1000
      pausedRemaining = null
      startTicking()
      break

    case 'PAUSE':
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
      pausedRemaining = endTime !== null ? Math.ceil((endTime - Date.now()) / 1000) : null
      endTime = null
      break

    case 'RESUME':
      if (pausedRemaining !== null) {
        endTime = Date.now() + pausedRemaining * 1000
        pausedRemaining = null
        startTicking()
      }
      break

    case 'STOP':
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
      endTime = null
      pausedRemaining = null
      break
  }
})
