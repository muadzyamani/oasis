import { motion } from 'framer-motion'
import type { TimeOfDay } from '@/types/growth.types'
import { SCENE_COLORS } from '@/engines/ambientEngine'

interface GroundLayerProps {
  timeOfDay: TimeOfDay
}

export function GroundLayer({ timeOfDay }: GroundLayerProps) {
  const colors = SCENE_COLORS[timeOfDay]

  return (
    <>
      {/* Far dune silhouettes */}
      <div className="absolute left-0 right-0" style={{ top: '55%', zIndex: 2 }}>
        <motion.svg
          viewBox="0 0 1440 120" preserveAspectRatio="none"
          style={{ width: '100%', height: 120, display: 'block' }}
          animate={{ opacity: 1 }}
        >
          <motion.path
            d="M0,80 C180,20 360,100 540,55 C720,10 900,90 1080,48 C1260,8 1380,70 1440,58 L1440,120 L0,120Z"
            animate={{ fill: colors.groundFar }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            fillOpacity="0.55"
          />
          <motion.path
            d="M0,100 C240,55 480,110 720,78 C960,46 1200,102 1440,88 L1440,120 L0,120Z"
            animate={{ fill: colors.groundFar }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            fillOpacity="0.75"
          />
        </motion.svg>
      </div>

      {/* Near ground plane */}
      <motion.div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: '28%', zIndex: 4 }}
        animate={{ backgroundColor: colors.groundColor }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />

      {/* Ground-sky blend at top of ground */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ bottom: '28%', height: 40, zIndex: 4 }}
        animate={{
          background: `linear-gradient(to bottom, transparent, ${colors.groundColor})`,
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />
    </>
  )
}
