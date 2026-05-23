import { motion } from 'framer-motion'

interface TimerRingProps {
  progress: number // 0→1 elapsed
  sessionActive: boolean
  isBreak: boolean
  children: React.ReactNode
}

const RADIUS = 88
const STROKE = 3
const SIZE = (RADIUS + STROKE) * 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function TimerRing({ progress, sessionActive, isBreak, children }: TimerRingProps) {
  const offset = CIRCUMFERENCE * (1 - progress)
  const arcColor = isBreak ? '#6aaed0' : '#f0c060'

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
      {/* SVG ring */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={arcColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{
            strokeDashoffset: offset,
            stroke: arcColor,
          }}
          transition={{ duration: 0.5, ease: 'linear' }}
          style={{ filter: `drop-shadow(0 0 6px ${arcColor}88)` }}
        />
      </svg>

      {/* Pulse when active */}
      {sessionActive && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `1px solid ${arcColor}40`,
          }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
      )}

      {/* Inner content (timer digits) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
