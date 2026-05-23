import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTimer } from '@/hooks/useTimer'
import { useStreak } from '@/hooks/useStreak'
import { useOasisGrowth } from '@/hooks/useOasisGrowth'
import { TimerRing } from './TimerRing'
import { SessionControls } from './SessionControls'
import { CompactBar } from './CompactBar'
import { MilestoneToast, buildToastMessage } from '@/components/ui/MilestoneToast'
import { format } from '@/utils/formatters'
import type { SessionType } from '@/types/session.types'

/* ==========================================================================
   TimerWidget — two modes
   Expanded  (idle / complete): full glass card, centered
   Minimized (active / paused): CompactBar slides up from bottom
   ========================================================================== */

interface TimerWidgetProps {
  onPreviewChange?: (preview: ReturnType<typeof useTimer>['previewElement'], progress: number) => void
}

export function TimerWidget({ onPreviewChange }: TimerWidgetProps) {
  const timer = useTimer()
  const streak = useStreak()
  const growth = useOasisGrowth()
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // Notify parent of preview changes for scene rendering
  useEffect(() => {
    onPreviewChange?.(timer.previewElement, timer.progress)
  }, [timer.previewElement, timer.progress, onPreviewChange])

  // Show milestone toast when a new element is permanently planted
  useEffect(() => {
    if (!timer.plantedElementId) return
    const planted = growth.oasis.elements.find((e) => e.id === timer.plantedElementId)
    
    const handle = setTimeout(() => {
      if (planted) setToastMsg(buildToastMessage(planted.type, false))
      timer.clearPlanted()
    }, 0)
    return () => clearTimeout(handle)
  }, [timer.plantedElementId, growth.oasis.elements, timer])

  const isBreak = timer.sessionType !== 'focus'
  const isMinimized = timer.status === 'active' || timer.status === 'paused'

  const handleNextSession = () => {
    const completedFocus = growth.oasis.elements.length
    const nextType: SessionType =
      timer.sessionType === 'focus'
        ? completedFocus % 4 === 3 ? 'long-break' : 'short-break'
        : 'focus'
    timer.switchType(nextType)
  }

  return (
    <>
      {/*
       * Simultaneous transitions using Apple-style spring physics.
       */}
      <AnimatePresence>
        {isMinimized ? (
          /* ── COMPACT BAR ── */
          <CompactBar
            key="compact"
            status={timer.status}
            sessionType={timer.sessionType}
            timeRemainingSeconds={timer.timeRemainingSeconds}
            progress={timer.progress}
            onPause={timer.pause}
            onResume={timer.resume}
            onStop={timer.stop}
          />
        ) : (
          /* ── EXPANDED CARD ── */
          <motion.div
            key="expanded"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          >
            <div
              className="glass-panel flex flex-col items-center"
              style={{
                width: 380,
                borderRadius: 36,
                padding: '40px 44px 36px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Specular top edge */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.55) 70%, transparent)',
                }}
              />

              {/* Oasis name */}
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                color: 'var(--color-text-on-dark)', marginBottom: 20,
              }}>
                {growth.oasis.name}
              </p>

              {/* Timer ring */}
              <div style={{ marginBottom: 28 }}>
                <TimerRing progress={timer.progress} sessionActive={false} isBreak={isBreak}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontWeight: 400,
                      fontSize: '3.6rem', lineHeight: 1, letterSpacing: '-0.02em',
                      color: '#ffffff',
                      textShadow: '0 1px 12px rgba(255,255,255,0.15)',
                    }}>
                      {format.countdown(timer.timeRemainingSeconds)}
                    </div>
                    {timer.status === 'complete' && (
                      <p style={{
                        fontFamily: 'var(--font-display)', fontSize: '0.8rem',
                        color: 'var(--color-lantern-gold)', marginTop: 6, letterSpacing: '0.08em',
                      }}>
                        {isBreak ? 'Rest complete.' : 'Well done.'}
                      </p>
                    )}
                  </div>
                </TimerRing>
              </div>

              {/* Session controls */}
              <SessionControls
                status={timer.status}
                sessionType={timer.sessionType}
                onStart={timer.start}
                onPause={timer.pause}
                onResume={timer.resume}
                onStop={timer.stop}
                onSwitchType={(t: SessionType) => timer.switchType(t)}
                onNextSession={handleNextSession}
              />

              {/* Streak pill */}
              <div
                className="glass-surface flex items-center"
                style={{ borderRadius: 999, padding: '6px 14px', gap: 6, marginTop: 16 }}
              >
                <span style={{ color: 'var(--color-lantern-gold)', fontSize: '0.7rem' }}>✦</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 400,
                  color: 'var(--color-text-on-dark)', letterSpacing: '0.03em',
                }}>
                  {streak.currentStreakDays === 0 ? 'Start your streak' : `${streak.currentStreakDays} day streak`}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone toast — lives outside AnimatePresence so it doesn't get caught in mode="wait" */}
      <MilestoneToast message={toastMsg} onDismiss={() => setToastMsg(null)} />
    </>
  )
}
