import { motion } from 'framer-motion'
import { format } from '@/utils/formatters'
import type { SessionStatus, SessionType } from '@/types/session.types'

interface CompactBarProps {
  status: SessionStatus
  sessionType: SessionType
  timeRemainingSeconds: number
  progress: number
  onPause: () => void
  onResume: () => void
  onStop: () => void
}

const SESSION_LABEL: Record<SessionType, string> = {
  'focus':       'Focus',
  'short-break': 'Short Break',
  'long-break':  'Long Break',
}

const ARC_RADIUS = 10
const ARC_CIRC = 2 * Math.PI * ARC_RADIUS

export function CompactBar({
  status,
  sessionType,
  timeRemainingSeconds,
  progress,
  onPause,
  onResume,
  onStop,
}: CompactBarProps) {
  const isActive = status === 'active'
  const arcColor = sessionType !== 'focus' ? '#6aaed0' : '#f0c060'
  const offset = ARC_CIRC * (1 - progress)

  return (
    /*
     * Outer div: handles fixed centering ONLY — no transform animation here,
     * so Framer Motion doesn't overwrite the translateX(-50%) centering.
     */
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      {/* Inner motion div: handles y/opacity animation only */}
      <motion.div
        key="compact-inner"
        layout
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        style={{ pointerEvents: 'auto' }}
      >
        <motion.div
          layout
          className="glass-panel flex items-center"
          style={{
            borderRadius: 999,
            padding: '10px 14px 10px 12px',
            gap: 10,
            position: 'relative',
            overflow: 'hidden',
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          {/* Specular top edge */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.45) 60%, transparent)',
            }}
          />

          {/* Mini progress ring + countdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width={28} height={28} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
              <circle cx={14} cy={14} r={ARC_RADIUS} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
              <circle
                cx={14} cy={14} r={ARC_RADIUS}
                fill="none" stroke={arcColor} strokeWidth={2} strokeLinecap="round"
                strokeDasharray={ARC_CIRC}
                strokeDashoffset={offset}
                style={{
                  transition: 'stroke-dashoffset 0.5s linear',
                  filter: `drop-shadow(0 0 3px ${arcColor})`,
                }}
              />
            </svg>

            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 400,
              color: '#ffffff', letterSpacing: '-0.02em', minWidth: 52,
            }}>
              {format.countdown(timeRemainingSeconds)}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />

          {/* Session label */}
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
            color: arcColor, letterSpacing: '0.05em', whiteSpace: 'nowrap',
          }}>
            {SESSION_LABEL[sessionType]}
          </span>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />

          {/* Pause / Resume */}
          <motion.button
            layout
            id={isActive ? 'btn-compact-pause' : 'btn-compact-resume'}
            onClick={isActive ? onPause : onResume}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
              color: 'var(--color-text-on-dark)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999, padding: '5px 13px', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <motion.span layout="position">{isActive ? 'Pause' : 'Resume'}</motion.span>
          </motion.button>

          {/* Stop */}
          <motion.button
            layout
            id="btn-compact-stop"
            onClick={onStop}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
              color: 'var(--color-text-on-dark-muted)',
              background: 'transparent', border: 'none',
              cursor: 'pointer', padding: '5px 4px',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <motion.span layout="position">End</motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
