import { motion, AnimatePresence } from 'framer-motion'
import type { TimeOfDay } from '@/types/growth.types'
import { SCENE_COLORS, getSunOpacity, getMoonOpacity, getSunPosition, getMoonPosition, getShowStars } from '@/engines/ambientEngine'

interface SkyLayerProps {
  timeOfDay: TimeOfDay
}

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 97.3) % 58,
  size: i % 3 === 0 ? 2 : 1,
  opacity: 0.25 + (i % 5) * 0.13,
}))

const TRANSITION = { duration: 4, ease: [0.4, 0, 0.2, 1] } as const

export function SkyLayer({ timeOfDay }: SkyLayerProps) {
  const showStars = getShowStars(timeOfDay)
  const sunPos = getSunPosition(timeOfDay)
  const moonPos = getMoonPosition(timeOfDay)
  const sunOp = getSunOpacity(timeOfDay)
  const moonOp = getMoonOpacity(timeOfDay)

  return (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {/* Sky gradient — cross-fade between time-of-day layers */}
      {(Object.keys(SCENE_COLORS) as TimeOfDay[]).map((tod) => (
        <motion.div
          key={tod}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${SCENE_COLORS[tod].skyTop} 0%, ${SCENE_COLORS[tod].skyBottom} 100%)`,
          }}
          animate={{ opacity: tod === timeOfDay ? 1 : 0 }}
          transition={TRANSITION}
        />
      ))}

      {/* Stars */}
      <AnimatePresence>
        {showStars && (
          <motion.div
            key="stars"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            {STARS.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, opacity: star.opacity }}
                animate={{ opacity: [star.opacity * 0.6, star.opacity, star.opacity * 0.6] }}
                transition={{ repeat: Infinity, duration: 2 + (star.id % 4), ease: 'easeInOut', delay: star.id * 0.05 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sun */}
      <motion.div
        className="absolute"
        style={{ left: sunPos.x, top: sunPos.y, width: 56, height: 56, transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: sunOp }}
        transition={TRANSITION}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #fff8d0, #f5c840)',
          boxShadow: '0 0 40px 12px rgba(245,200,64,0.45)',
        }} />
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ left: moonPos.x, top: moonPos.y, width: 44, height: 44, transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: moonOp }}
        transition={TRANSITION}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f0f8ff, #c8d8e8)',
          boxShadow: '0 0 28px 6px rgba(200,216,232,0.25)',
        }} />
      </motion.div>
    </div>
  )
}
