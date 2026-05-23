import { motion } from 'framer-motion'
import type { TimeOfDay } from '@/types/growth.types'

interface WaterLayerProps {
  timeOfDay: TimeOfDay
  sessionActive: boolean
  tier: number
}

const WATER_PALETTES = {
  dawn: {
    stop0: '#E0F7FA', // soft pastel cyan
    stop60: '#80DEEA', // pale cyan
    stop100: '#006064', // deep teal
    inner: '#4DD0E1',
    highlight: '#E0F7FA',
  },
  morning: {
    stop0: '#81D4FA', // light blue
    stop60: '#29B6F6', // medium blue
    stop100: '#0277BD', // deep blue
    inner: '#4FC3F7',
    highlight: '#E1F5FE',
  },
  afternoon: {
    stop0: '#90CAF9', // gentle warm blue
    stop60: '#42A5F5',
    stop100: '#1565C0',
    inner: '#64B5F6',
    highlight: '#E3F2FD',
  },
  dusk: {
    stop0: '#80CBC4', // soft dusk teal
    stop60: '#26A69A',
    stop100: '#00695C', // deep dusk teal
    inner: '#4DB6AC',
    highlight: '#E0F2F1',
  },
  night: {
    stop0: '#006064', // deep moonlit teal
    stop60: '#004D40',
    stop100: '#00251A', // deep night blue-black
    inner: '#00838F',
    highlight: '#E0F7FA',
  },
}

export function WaterLayer({ timeOfDay, sessionActive, tier }: WaterLayerProps) {
  const rippleSpeed = sessionActive ? 1.4 : 2.4
  // Pool widens with tier
  const poolWidth = `${40 + tier * 6}%`
  const palette = WATER_PALETTES[timeOfDay]

  return (
    <div className="absolute left-0 right-0" style={{ top: '68%', height: '12%', zIndex: 3 }}>
      {/* Responsive SVG Container for Redesigned Water Feature */}
      <svg
        className="absolute left-1/2 -translate-x-1/2"
        viewBox="0 0 440 90"
        preserveAspectRatio="none"
        style={{
          width: poolWidth,
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Radial Gradient for water body matching redesign style */}
          <radialGradient id="waterGrad" cx="50%" cy="40%" r="60%">
            <stop
              offset="0%"
              stopColor={palette.stop0}
              style={{ transition: 'stop-color 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
            />
            <stop
              offset="60%"
              stopColor={palette.stop60}
              style={{ transition: 'stop-color 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
            />
            <stop
              offset="100%"
              stopColor={palette.stop100}
              style={{ transition: 'stop-color 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
            />
          </radialGradient>
        </defs>

        {/* Outer water pool ellipse */}
        <ellipse
          cx="220"
          cy="45"
          rx="220"
          ry="45"
          fill="url(#waterGrad)"
          opacity="0.9"
          style={{ transition: 'all 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />

        {/* Inner water pool ellipse for depth */}
        <ellipse
          cx="220"
          cy="40"
          rx="180"
          ry="30"
          fill={palette.inner}
          opacity="0.5"
          style={{ transition: 'fill 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />

        {/* Ripple rings scaling outward along the water aspect ratio (220:45) */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={i}
            cx="220"
            cy="45"
            rx="0"
            ry="0"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            animate={{
              rx: [0, 220],
              ry: [0, 45],
              opacity: [0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: rippleSpeed * 2.5,
              ease: 'easeOut',
              delay: i * ((rippleSpeed * 2.5) / 3),
            }}
          />
        ))}

        {/* Shimmering highlights with floating and opacity animations */}
        <motion.ellipse
          cx="170"
          cy="37"
          rx="40"
          ry="4"
          fill={palette.highlight}
          animate={{
            cx: [168, 172, 168],
            opacity: [0.5, 0.75, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.2,
            ease: 'easeInOut',
          }}
          style={{ transition: 'fill 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />
        <motion.ellipse
          cx="290"
          cy="45"
          rx="30"
          ry="3"
          fill={palette.highlight}
          animate={{
            cx: [292, 288, 292],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: 'easeInOut',
          }}
          style={{ transition: 'fill 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />
        <motion.ellipse
          cx="220"
          cy="53"
          rx="25"
          ry="3"
          fill={palette.highlight}
          animate={{
            cx: [219, 221, 219],
            opacity: [0.45, 0.65, 0.45],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: 'easeInOut',
          }}
          style={{ transition: 'fill 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />
        <motion.ellipse
          cx="120"
          cy="48"
          rx="20"
          ry="2.5"
          fill={palette.highlight}
          animate={{
            cx: [118, 122, 118],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.0,
            ease: 'easeInOut',
          }}
          style={{ transition: 'fill 4s cubic-bezier(0.45, 0.05, 0.55, 0.95)' }}
        />
      </svg>
    </div>
  )
}
