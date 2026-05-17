import { motion } from 'framer-motion'
import type { TimeOfDay } from '@/types/growth.types'
import { SCENE_COLORS } from '@/engines/ambientEngine'

interface WaterLayerProps {
  timeOfDay: TimeOfDay
  sessionActive: boolean
  tier: number
}

export function WaterLayer({ timeOfDay, sessionActive, tier }: WaterLayerProps) {
  const waterColor = SCENE_COLORS[timeOfDay].waterColor
  const rippleSpeed = sessionActive ? 1.4 : 2.4
  // Pool widens with tier
  const poolWidth = `${40 + tier * 6}%`

  return (
    <div className="absolute left-0 right-0" style={{ top: '60%', height: '12%', zIndex: 3 }}>
      {/* Water band — elliptical pool */}
      <motion.div
        className="absolute left-1/2"
        style={{
          width: poolWidth,
          height: '100%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
        animate={{ backgroundColor: waterColor }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        {/* Surface shimmer */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={{ repeat: Infinity, duration: rippleSpeed * 2, ease: 'linear' }}
        />

        {/* Ripple rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ width: ['10%', '90%'], height: ['30%', '80%'], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: rippleSpeed, ease: 'easeOut', delay: i * (rippleSpeed / 3) }}
          />
        ))}
      </motion.div>
    </div>
  )
}
