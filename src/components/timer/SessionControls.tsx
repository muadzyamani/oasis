import { motion, AnimatePresence } from 'framer-motion'
import type { SessionStatus, SessionType } from '@/types/session.types'

interface SessionControlsProps {
  status: SessionStatus
  sessionType: SessionType
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onSwitchType: (t: SessionType) => void
  onNextSession?: () => void // after complete — start break
}

const SESSION_TYPES: { type: SessionType; label: string }[] = [
  { type: 'focus', label: 'Focus' },
  { type: 'short-break', label: 'Short Break' },
  { type: 'long-break', label: 'Long Break' },
]

export function SessionControls({
  status,
  sessionType,
  onStart,
  onPause,
  onResume,
  onStop,
  onSwitchType,
  onNextSession,
}: SessionControlsProps) {
  const isActive = status === 'active'
  const isPaused = status === 'paused'
  const isIdle = status === 'idle'
  const isComplete = status === 'complete'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
      }}
    >
      {/* Session type selector */}
      <div className="glass-surface flex" style={{ borderRadius: 999, padding: 4, gap: 2 }}>
        {SESSION_TYPES.map(({ type, label }) => (
          <button
            key={type}
            disabled={isActive || isPaused}
            onClick={() => onSwitchType(type)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '6px 14px',
              borderRadius: 999,
              border: 'none',
              cursor: isActive || isPaused ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 180ms ease',
              background: type === sessionType ? 'rgba(240,192,96,0.18)' : 'transparent',
              color:
                type === sessionType ? 'var(--color-lantern-gold)' : 'var(--color-text-on-dark)',
              opacity: (isActive || isPaused) && type !== sessionType ? 0.4 : 1,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Primary action button */}
      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.button
            key="next"
            id="btn-next-session"
            onClick={onNextSession ?? onStart}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-primary)',
              background: 'linear-gradient(135deg, #f5c842 0%, #e89a3c 100%)',
              boxShadow: '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 4px 16px rgba(240,192,96,0.35)',
            }}
          >
            Take a Break
          </motion.button>
        ) : isIdle ? (
          <motion.button
            key="start"
            id="btn-start-session"
            onClick={onStart}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-primary)',
              background: 'linear-gradient(135deg, #f5c842 0%, #e89a3c 100%)',
              boxShadow: '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 4px 16px rgba(240,192,96,0.35)',
            }}
          >
            Enter Oasis
          </motion.button>
        ) : (
          <motion.div
            key="active-controls"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: 'flex', gap: 10, width: '100%' }}
          >
            {/* Pause / Resume */}
            <button
              id={isActive ? 'btn-pause' : 'btn-resume'}
              onClick={isActive ? onPause : onResume}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                background: 'linear-gradient(135deg, #f5c842 0%, #e89a3c 100%)',
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 4px 16px rgba(240,192,96,0.3)',
              }}
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>

            {/* Stop */}
            <button
              id="btn-stop"
              onClick={onStop}
              className="glass-surface"
              style={{
                padding: '12px 18px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--color-text-on-dark-muted)',
              }}
            >
              End
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
